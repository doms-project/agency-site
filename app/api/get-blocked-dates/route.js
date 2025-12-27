import { supabase } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'

// Helper function to format date as local date string (YYYY-MM-DD)
const formatLocalDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function GET() {
  try {
    // Fetch all pending and confirmed bookings using separate queries
    // (since .in() operator has issues in this Supabase setup)
    // ULTIMATE CACHE-BUSTING: Fresh Supabase client + unique session ID
    const sessionId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36)

    // Create a fresh Supabase client instance to bypass connection-level caching
    const freshSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    // Use session ID as a dummy parameter to force unique query (use string column, not UUID)
    const { data: pendingBookings, error: pendingError } = await freshSupabase
      .from('strategy_calls')
      .select('preferred_date')
      .eq('status', 'pending')
      .neq('notes', sessionId) // Use notes column (string) instead of id (UUID)
      .order('created_at', { ascending: false })

    const { data: confirmedBookings, error: confirmedError } = await freshSupabase
      .from('strategy_calls')
      .select('preferred_date')
      .eq('status', 'confirmed')
      .neq('notes', sessionId) // Use notes column (string) instead of id (UUID)
      .order('created_at', { ascending: false })

    console.log('Fresh client session ID:', sessionId)
    console.log('Fresh client pending bookings:', pendingBookings?.length || 0)
    console.log('Fresh client confirmed bookings:', confirmedBookings?.length || 0)

    // Combine the results
    const bookings = [...(pendingBookings || []), ...(confirmedBookings || [])]

    console.log('=== FRESH CLIENT RESULTS ===')
    console.log('Session ID:', sessionId)
    console.log('Pending bookings found:', pendingBookings?.length || 0)
    console.log('Confirmed bookings found:', confirmedBookings?.length || 0)
    console.log('Total bookings processed:', bookings.length)
    if (pendingError || confirmedError) {
      console.log('Query errors:', { pendingError, confirmedError })
    }

    // Check for errors in either query
    if (pendingError || confirmedError) {
      console.error('Error fetching bookings:', { pendingError, confirmedError })
      return Response.json({ error: 'Failed to fetch bookings' }, {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
    }

    // Calculate all blocked dates from the 3-day buffer periods
    const blockedDates = new Set()

    for (const booking of bookings || []) {
      console.log('Processing booking:', booking.id, 'date:', booking.preferred_date, 'status:', booking.status)
      const consultationDate = new Date(booking.preferred_date)
      console.log('Parsed consultation date:', consultationDate)

      // Add the consultation day
      const consultationStr = formatLocalDate(consultationDate)
      blockedDates.add(consultationStr)
      console.log('Added consultation day:', consultationStr)

      // Add buffer day 1 (next day)
      const bufferDay1 = new Date(consultationDate)
      bufferDay1.setDate(bufferDay1.getDate() + 1)
      const bufferDay1Str = formatLocalDate(bufferDay1)
      blockedDates.add(bufferDay1Str)
      console.log('Added buffer day 1:', bufferDay1Str)

      // Add buffer day 2 (day after that)
      const bufferDay2 = new Date(consultationDate)
      bufferDay2.setDate(bufferDay2.getDate() + 2)
      const bufferDay2Str = formatLocalDate(bufferDay2)
      blockedDates.add(bufferDay2Str)
      console.log('Added buffer day 2:', bufferDay2Str)
    }

    // Convert Set to Array and sort
    const blockedDatesArray = Array.from(blockedDates).sort()

    console.log(`Found ${blockedDatesArray.length} blocked dates:`, blockedDatesArray.slice(0, 10), '...')

    return Response.json({
      blockedDates: blockedDatesArray,
      count: blockedDatesArray.length
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Error in get-blocked-dates:', error)
    return Response.json({ error: 'Internal server error' }, {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  }
}
