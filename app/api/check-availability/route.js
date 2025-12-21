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
    const { date, time, checkAllTimes, checkSingleTime, timezone } = await request.json()

    if (!date) {
      return Response.json({ message: 'Date is required' }, { status: 400 })
    }

    if (checkAllTimes) {
      // Business hours in Eastern Time - convert to UTC for database queries
      const timeSlots = BUSINESS_HOURS_EASTERN.map(slot => easternTimeToUTC(slot))

      const availabilityResults = await Promise.all(
        timeSlots.map(async (slotTime) => {
          const result = await checkTimeSlotAvailability(date, slotTime)
          return {
            time: slotTime,
            displayTime: timezone ? utcTimeToUserTimezone(slotTime, timezone) : slotTime,
            available: result.available
            // Removed conflictReason for cleaner UI
          }
        })
      )

      console.log(`Returning ${availabilityResults.length} time slots for date ${date}`)
      console.log('Sample slots:', availabilityResults.slice(0, 3))

      return Response.json({
        date,
        availableTimes: availabilityResults
      })

    } else if (time) {
      // Check specific time slot availability (for custom time input)
      const result = await checkTimeSlotAvailability(date, time)

      return Response.json({
        available: result.available,
        date,
        time,
        message: result.available ? 'Time slot available' : 'Time slot not available'
        // Removed conflictReason for cleaner UI
      })
    } else {
      return Response.json({ message: 'Date and time required for specific check' }, { status: 400 })
    }

  } catch (error) {
    console.error('API error:', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to check if a time slot is available considering call duration
async function checkTimeSlotAvailability(date, startTime) {
  try {
    // Calculate the time range this booking would occupy
    const [hours, minutes] = startTime.split(':').map(Number)
    const startDateTime = new Date(date)
    startDateTime.setHours(hours, minutes, 0, 0)

    const endDateTime = new Date(startDateTime)
    endDateTime.setMinutes(endDateTime.getMinutes() + CALL_DURATION_MINUTES)

    // Get all existing bookings for this date that could potentially conflict
    const { data: existingBookings, error } = await supabase
      .from('strategy_calls')
      .select('preferred_time, duration')
      .eq('preferred_date', date)
      .in('status', ['pending', 'confirmed'])

    if (error) {
      console.error('Database query error:', error)
      return { available: false, conflictReason: 'Database error' }
    }

    // Check for conflicts with existing bookings
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
          conflictReason: `Overlaps with existing ${conflictTime} booking (${booking.duration || CALL_DURATION_MINUTES}min duration)`
        }
      }
    }

    return { available: true, conflictReason: null }

  } catch (error) {
    console.error('Availability check error:', error)
    return { available: false, conflictReason: 'System error' }
  }
}