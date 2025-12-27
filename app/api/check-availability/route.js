import { supabase } from '@/lib/supabase'

// Call duration in minutes (should match your form setting)
const CALL_DURATION_MINUTES = 30

// Business hours in Eastern Time (8 AM to 11 PM)
const BUSINESS_HOURS_EASTERN = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
]

// Helper function to convert Eastern Time to UTC
const easternTimeToUTC = (easternTime24) => {
  const [hours, minutes] = easternTime24.split(':').map(Number)
  // Eastern Time is UTC-5 (EST) or UTC-4 (EDT), but we'll use EST for consistency
  const utcHours = hours + 5 // Add 5 hours for EST
  return `${utcHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

// Helper function to convert Eastern time to user's timezone for display
const easternTimeToUserTimezone = (easternTime24, userTimezone) => {
  try {
    const [hours, minutes] = easternTime24.split(':').map(Number)
    // Eastern Time is UTC-5 (EST), convert to UTC first
    const utcHours = hours + 5
    const utcDate = new Date(Date.UTC(2024, 0, 1, utcHours, minutes))

    return utcDate.toLocaleString('en-US', {
      timeZone: userTimezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  } catch (error) {
    console.error('Error converting Eastern time to user timezone:', error)
    return easternTime24 // Fallback to Eastern time
  }
}

// Helper function to convert UTC time to user's timezone for display
const utcTimeToUserTimezone = (utcTime24, userTimezone) => {
  try {
    const [hours, minutes] = utcTime24.split(':').map(Number)
    const utcDate = new Date(Date.UTC(2024, 0, 1, hours, minutes))

    return utcDate.toLocaleString('en-US', {
      timeZone: userTimezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  } catch (error) {
    console.error('Error converting timezone:', error)
    return utcTime24 // Fallback
  }
}

export async function POST(request) {
  try {
    const { date, time, checkAllTimes, checkSingleTime, timezone, excludeBookingId } = await request.json()


    if (!date) {
      return Response.json({ message: 'Date is required' }, { status: 400 })
    }

    if (checkAllTimes) {
      // Check availability for consultation day with 3-day block logic
      // NOTE: excludeBookingId should NEVER be used for new bookings (checkAllTimes)
      // Only used for rescheduling existing bookings
      const result = await checkConsultationDayAvailability(date)

      if (result.available) {
        // If consultation day is available, show time slots
        // Return Eastern times for API consistency, convert to user timezone for display
        const availabilityResults = BUSINESS_HOURS_EASTERN.map(easternTime => ({
          time: easternTime, // Eastern time for API consistency
          displayTime: timezone ? easternTimeToUserTimezone(easternTime, timezone) : easternTime,
          available: true // All slots available since the day is available
        }))

        console.log(`Returning ${availabilityResults.length} time slots for consultation day ${date}`)

        return Response.json({
          date,
          availableTimes: availabilityResults,
          bufferInfo: 'This booking includes 2 follow-up days after consultation'
        })
      } else {
        // Consultation day not available - return no slots
        return Response.json({
          date,
          availableTimes: [],
          blockedReason: result.reason,
          nextAvailableDate: result.nextAvailableDate
        })
      }

    } else if (time) {
      // Check specific time slot availability for consultation
      const dayAvailable = await checkConsultationDayAvailability(date, excludeBookingId)

      if (!dayAvailable.available) {
        return Response.json({
          available: false,
          date,
          time,
          message: `Consultation not available: ${dayAvailable.reason}`
        })
      }

      // Check if this specific time slot conflicts with existing bookings on the same day
      const timeSlotAvailable = await checkSpecificTimeSlot(date, time, excludeBookingId)

      return Response.json({
        available: timeSlotAvailable.available,
        date,
        time,
        message: timeSlotAvailable.available ? 'Time slot available' : 'Time slot not available',
        bufferInfo: timeSlotAvailable.available ? 'This booking includes 2 follow-up days after consultation' : null
      })
    } else {
      return Response.json({ message: 'Date and time required for specific check' }, { status: 400 })
    }

  } catch (error) {
    console.error('API error:', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to check if a consultation day is available (checks 3-day block)
async function checkConsultationDayAvailability(consultationDate, excludeBookingId = null) {
  try {
    const consultationDateObj = new Date(consultationDate)

    // Calculate the 3-day block: consultation day + 2 buffer days
    const bufferDay1 = new Date(consultationDateObj)
    bufferDay1.setDate(bufferDay1.getDate() + 1)

    const bufferDay2 = new Date(consultationDateObj)
    bufferDay2.setDate(bufferDay2.getDate() + 2)

    // FORWARD CHECK: Check for any existing bookings in the 3-day block this booking would create
    let forwardQuery = supabase
      .from('strategy_calls')
      .select('preferred_date, preferred_time')
      .in('status', ['pending', 'confirmed'])
      .or(`preferred_date.eq.${consultationDate},preferred_date.eq.${bufferDay1.toISOString().split('T')[0]},preferred_date.eq.${bufferDay2.toISOString().split('T')[0]}`)

    if (excludeBookingId) {
      forwardQuery = forwardQuery.neq('id', excludeBookingId)
    }

    const { data: forwardBookings, error: forwardError } = await forwardQuery
    if (forwardError) {
      console.error('Database query error (forward):', forwardError)
      return { available: false, reason: 'Database error' }
    }

    // BACKWARD CHECK: Check if this date falls within any existing booking's buffer zone
    const backwardDay1 = new Date(consultationDateObj)
    backwardDay1.setDate(backwardDay1.getDate() - 1)

    const backwardDay2 = new Date(consultationDateObj)
    backwardDay2.setDate(backwardDay2.getDate() - 2)

    let backwardQuery = supabase
      .from('strategy_calls')
      .select('preferred_date, preferred_time')
      .in('status', ['pending', 'confirmed'])
      .or(`preferred_date.eq.${backwardDay2.toISOString().split('T')[0]},preferred_date.eq.${backwardDay1.toISOString().split('T')[0]},preferred_date.eq.${consultationDate}`)

    if (excludeBookingId) {
      backwardQuery = backwardQuery.neq('id', excludeBookingId)
    }

    const { data: backwardBookings, error: backwardError } = await backwardQuery
    if (backwardError) {
      console.error('Database query error (backward):', backwardError)
      return { available: false, reason: 'Database error' }
    }

    // Combine results
    const allConflictingBookings = [...(forwardBookings || []), ...(backwardBookings || [])]

    if (allConflictingBookings && allConflictingBookings.length > 0) {
      // Find the earliest conflicting booking to determine next available date
      const conflictingDates = allConflictingBookings.map(b => new Date(b.preferred_date)).sort((a, b) => a - b)
      const latestConflict = conflictingDates[conflictingDates.length - 1]

      // Next available is 1 day after the latest conflict's buffer period ends
      const nextAvailable = new Date(latestConflict)
      nextAvailable.setDate(nextAvailable.getDate() + 3) // +3 because conflict date + 2 buffer days

      return {
        available: false,
        reason: 'This date conflicts with existing booking buffer period',
        nextAvailableDate: nextAvailable.toISOString().split('T')[0]
      }
    }

    return { available: true, reason: null, nextAvailableDate: null }

  } catch (error) {
    console.error('Consultation day availability check error:', error)
    return { available: false, reason: 'System error' }
  }
}

// Helper function to check specific time slot availability on an available consultation day
async function checkSpecificTimeSlot(date, startTime, excludeBookingId = null) {
  try {
    // Get all existing bookings for this specific date (excluding the specified booking if provided)
    let query = supabase
      .from('strategy_calls')
      .select('preferred_time, duration')
      .eq('preferred_date', date)
      .in('status', ['pending', 'confirmed'])

    if (excludeBookingId) {
      query = query.neq('id', excludeBookingId)
    }

    const { data: existingBookings, error } = await query

    if (error) {
      console.error('Database query error:', error)
      return { available: false, conflictReason: 'Database error' }
    }

    // Calculate the time range this booking would occupy
    const [hours, minutes] = startTime.split(':').map(Number)
    const startDateTime = new Date(date)
    startDateTime.setHours(hours, minutes, 0, 0)

    const endDateTime = new Date(startDateTime)
    endDateTime.setMinutes(endDateTime.getMinutes() + CALL_DURATION_MINUTES)

    // Check for conflicts with existing bookings on the same day
    for (const booking of existingBookings) {
      const [bookHours, bookMinutes] = booking.preferred_time.split(':').map(Number)
      const bookingStart = new Date(date)
      bookingStart.setHours(bookHours, bookMinutes, 0, 0)

      const bookingEnd = new Date(bookingStart)
      bookingEnd.setMinutes(bookingEnd.getMinutes() + (booking.duration || CALL_DURATION_MINUTES))

      // Check for overlap
      const hasOverlap = (
        (startDateTime >= bookingStart && startDateTime < bookingEnd) || // New booking starts during existing
        (endDateTime > bookingStart && endDateTime <= bookingEnd) ||     // New booking ends during existing
        (startDateTime <= bookingStart && endDateTime >= bookingEnd)     // New booking completely encompasses existing
      )

      if (hasOverlap) {
        const conflictTime = booking.preferred_time
        return {
          available: false,
          conflictReason: `Overlaps with existing ${conflictTime} booking`
        }
      }
    }

    return { available: true, conflictReason: null }

  } catch (error) {
    console.error('Specific time slot check error:', error)
    return { available: false, conflictReason: 'System error' }
  }
}