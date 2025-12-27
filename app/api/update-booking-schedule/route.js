import { updateOpportunitySchedule } from '@/lib/ghlIntegration'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { bookingId, newDate, newTime } = await request.json()

    console.log('🔄 Server-side booking schedule update requested')
    console.log('   Booking ID:', bookingId)
    console.log('   New Date:', newDate)
    console.log('   New Time:', newTime)

    if (!bookingId || !newDate || !newTime) {
      return Response.json(
        { success: false, error: 'Missing bookingId, newDate, or newTime' },
        { status: 400 }
      )
    }

    // Get current booking details to compare with new date/time
    console.log('🔍 Getting current booking details...')
    const { data: currentBooking, error: fetchError } = await supabase
      .from('strategy_calls')
      .select('preferred_date, preferred_time')
      .eq('id', bookingId)
      .single()

    if (fetchError) {
      console.error('❌ Failed to fetch current booking:', fetchError)
      return Response.json(
        { success: false, error: 'Failed to fetch current booking details' },
        { status: 500 }
      )
    }

    console.log('📋 Current booking:', currentBooking)

    // Skip availability check if date/time hasn't changed
    if (currentBooking.preferred_date === newDate && currentBooking.preferred_time === newTime) {
      console.log('✅ Same date/time - skipping availability check (no conflict with self)')
    } else {
      // Only check availability if date/time actually changed
      console.log('🔍 Checking availability for new date/time...')
      try {
      const availabilityResponse = await fetch(
        `/api/check-availability`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            date: newDate,
            time: newTime,
            timezone: 'America/New_York',
            excludeBookingId: bookingId
          })
        }
      )

      if (!availabilityResponse.ok) {
        console.error('❌ Availability API call failed:', availabilityResponse.status)
        return Response.json(
          { success: false, error: 'Unable to verify availability' },
          { status: 500 }
        )
      }

      const availabilityData = await availabilityResponse.json()
      console.log('📊 Availability data:', availabilityData)

      // Check if the specific time slot is available
      if (!availabilityData.available) {
        console.log('❌ Requested time slot is not available:', availabilityData.message)
        return Response.json(
          { success: false, error: 'Requested time slot is already booked' },
          { status: 409 }
        )
      }

      console.log('✅ Time slot is available for booking')
    } catch (availabilityError) {
      console.error('❌ Error checking availability:', availabilityError)
      return Response.json(
        { success: false, error: 'Failed to check availability' },
        { status: 500 }
      )
    }
    } // Close the else block

    // Get full current booking details for GHL sync (we already have basic details)
    console.log('🔍 Getting full current booking details for GHL sync...')
    const { data: fullCurrentBooking, error: fullFetchError } = await supabase
      .from('strategy_calls')
      .select('ghl_opportunity_id, contact_name, preferred_date, preferred_time')
      .eq('id', bookingId)
      .single()

    if (fullFetchError) {
      console.error('❌ Failed to fetch full current booking:', fullFetchError)
      return Response.json(
        { success: false, error: 'Failed to fetch current booking details' },
        { status: 500 }
      )
    }

    console.log('📋 Full current booking:', fullCurrentBooking)

    // Update Supabase schedule
    console.log('📝 Updating Supabase schedule...')
    const { error: updateError } = await supabase
      .from('strategy_calls')
      .update({
        preferred_date: newDate,
        preferred_time: newTime,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)

    if (updateError) {
      console.error('❌ Supabase update failed:', updateError)
      return Response.json(
        { success: false, error: 'Failed to update schedule in database' },
        { status: 500 }
      )
    }

    console.log('✅ Supabase schedule updated successfully')

    // Sync new schedule to GHL opportunity
    if (fullCurrentBooking?.ghl_opportunity_id) {
      console.log('🔄 Syncing new schedule to GHL opportunity:', fullCurrentBooking.ghl_opportunity_id)

      try {
        await updateOpportunitySchedule(fullCurrentBooking.ghl_opportunity_id, newDate, newTime)
        console.log('✅ GHL opportunity schedule synced successfully')
      } catch (ghlError) {
        console.error('❌ GHL schedule sync failed:', ghlError)
        // Don't fail the entire request if GHL sync fails
        return Response.json({
          success: true,
          message: 'Schedule updated but GHL sync failed',
          supabaseUpdated: true,
          ghlSynced: false,
          ghlError: ghlError.message
        })
      }
    } else {
      console.log('⚠️ No GHL opportunity ID found for booking:', bookingId)
      return Response.json({
        success: true,
        message: 'Schedule updated but no GHL opportunity to sync',
        supabaseUpdated: true,
        ghlSynced: false
      })
    }

    console.log('🎉 Booking schedule update completed successfully')
    return Response.json({
      success: true,
      message: 'Schedule updated successfully',
      supabaseUpdated: true,
      ghlSynced: true,
      newDate: newDate,
      newTime: newTime
    })

  } catch (error) {
    console.error('❌ Server error in booking schedule update:', error)
    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
