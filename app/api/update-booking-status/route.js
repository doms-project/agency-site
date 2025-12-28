import { updateOpportunityCustomFields } from '@/lib/ghlIntegration'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { bookingId, newStatus } = await request.json()

    console.log('🔄 Server-side booking status update requested')
    console.log('   Booking ID:', bookingId)
    console.log('   New Status:', newStatus)

    if (!bookingId || !newStatus) {
      return Response.json(
        { success: false, error: 'Missing bookingId or newStatus' },
        { status: 400 }
      )
    }

    // Update Supabase status first
    console.log('📝 Updating Supabase status...')
    const { error: updateError } = await supabaseAdmin
      .from('strategy_calls')
      .update({ status: newStatus })
      .eq('id', bookingId)

    if (updateError) {
      console.error('❌ Supabase update failed:', updateError)
      return Response.json(
        { success: false, error: 'Failed to update status in database' },
        { status: 500 }
      )
    }

    console.log('✅ Supabase status updated successfully')

    // Get opportunity ID and contact name for GHL sync
    console.log('🔍 Getting GHL opportunity data...')
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from('strategy_calls')
      .select('ghl_opportunity_id, contact_name')
      .eq('id', bookingId)
      .single()

    if (fetchError) {
      console.error('❌ Failed to fetch booking:', fetchError)
      // Don't fail the entire request if we can't get the opportunity ID
      return Response.json({
        success: true,
        message: 'Status updated but GHL sync skipped',
        supabaseUpdated: true,
        ghlSynced: false
      })
    }

    if (booking?.ghl_opportunity_id) {
      console.log('🔄 Syncing status to GHL opportunity:', booking.ghl_opportunity_id)

      try {
        await updateOpportunityCustomFields(booking.ghl_opportunity_id, booking.contact_name, newStatus)
        console.log('✅ GHL opportunity status synced successfully')
      } catch (ghlError) {
        console.error('❌ GHL sync failed:', ghlError)
        // Don't fail the entire request if GHL sync fails
        return Response.json({
          success: true,
          message: 'Status updated but GHL sync failed',
          supabaseUpdated: true,
          ghlSynced: false,
          ghlError: ghlError.message
        })
      }
    } else {
      console.log('⚠️ No GHL opportunity ID found for booking:', bookingId)
      return Response.json({
        success: true,
        message: 'Status updated but no GHL opportunity to sync',
        supabaseUpdated: true,
        ghlSynced: false
      })
    }

    console.log('🎉 Booking status update completed successfully')
    return Response.json({
      success: true,
      message: 'Status updated successfully',
      supabaseUpdated: true,
      ghlSynced: true
    })

  } catch (error) {
    console.error('❌ Server error in booking status update:', error)
    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
