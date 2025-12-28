'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { toast } from 'sonner'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [allBookings, setAllBookings] = useState([]) // Keep full dataset for accurate counts
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all') // all, pending, confirmed, cancelled, completed
  const [supabaseError, setSupabaseError] = useState(null)
  const [renderKey, setRenderKey] = useState(0) // Force re-renders when needed

  // Simple password protection with localStorage persistence
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [updatingBookingId, setUpdatingBookingId] = useState(null) // Track which booking is being updated
  const [editingBookingId, setEditingBookingId] = useState(null) // Track which booking is being edited
  const [editFormData, setEditFormData] = useState({ date: '', time: '' }) // Edit form data
  const [loginLoading, setLoginLoading] = useState(false) // Track login submission
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123' // Change this!

  // Debug logging
  console.log('AdminBookings render:', {
    isAuthenticated,
    loading,
    supabaseError: !!supabaseError,
    allBookingsCount: allBookings.length,
    bookingsCount: bookings.length,
    currentFilter: filter
  })
  console.log('Current bookings in state:', bookings.map(b => ({ id: b.id, status: b.status })))
  console.log('All bookings in state:', allBookings.map(b => ({ id: b.id, status: b.status })))

  // Check for existing authentication on component mount (only for React Strict Mode remounts)
  useEffect(() => {
    console.log('useEffect: checking authentication')
    const authStatus = localStorage.getItem('adminAuthenticated')
    const authTimestamp = localStorage.getItem('adminAuthTimestamp')
    console.log('localStorage values:', { authStatus, authTimestamp })

    const REMOUNT_DURATION = 5 * 60 * 1000 // 5 minutes (handles React Strict Mode remounts)

    // Only auto-authenticate if logged in within the last 5 minutes (to handle component remounts)
    // This prevents showing the password form on every page refresh while still requiring login on new visits
    if (authStatus === 'true' && authTimestamp) {
      const timeElapsed = Date.now() - parseInt(authTimestamp)
      if (timeElapsed < REMOUNT_DURATION) {
        console.log('Auto-authenticating user')
        setIsAuthenticated(true)
      } else {
        console.log('Authentication expired, clearing')
        // Clear expired authentication
        localStorage.removeItem('adminAuthenticated')
        localStorage.removeItem('adminAuthTimestamp')
      }
    } else {
      console.log('No stored authentication found')
    }
  }, [])

  useEffect(() => {
    console.log('useEffect: isAuthenticated changed to', isAuthenticated)
    if (isAuthenticated) {
      console.log('Calling fetchBookings')
      fetchBookings()
    } else {
      console.log('Not authenticated, not fetching bookings')
    }
  }, [isAuthenticated])

  // Handle filter changes client-side
  useEffect(() => {
    if (filter === 'all') {
      setBookings(allBookings)
    } else {
      setBookings(allBookings.filter(booking => booking.status === filter))
    }
  }, [filter, allBookings])

  const fetchBookings = useCallback(async () => {
    console.log('fetchBookings called')
    try {
      // Always fetch all bookings for accurate counts
      const { data, error } = await supabase
        .from('strategy_calls')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('fetchBookings result:', { dataCount: data?.length, error })
      console.log('Booking data received:', JSON.stringify(data, null, 2))
      console.log('Booking statuses:', data?.map(b => `${b.id}: ${b.status}`))

      if (error) {
        console.error('Error fetching bookings:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        if (error.message === 'Supabase not configured') {
          setSupabaseError('Supabase not configured. Please set up environment variables from ENV_SETUP_INSTRUCTIONS.txt')
        } else {
          setSupabaseError(`Failed to load bookings: ${error.message}`)
        }
      } else {
        console.log('Setting allBookings with', data?.length, 'items')
        setAllBookings(data || [])
        setSupabaseError(null) // Clear any previous errors

        // Apply client-side filtering for display
        if (filter === 'all') {
          console.log('Setting bookings to all data:', data?.length, 'items')
          setBookings(data || [])
        } else {
          const filtered = (data || []).filter(booking => booking.status === filter)
          console.log('Setting bookings to filtered data:', filtered.length, 'items for filter:', filter)
          setBookings(filtered)
        }

        // Force re-render to ensure UI updates
        setRenderKey(prev => prev + 1)
      }
    } catch (error) {
      console.error('Error connecting to database:', error)
      if (error.message === 'Supabase not configured') {
        setSupabaseError('Supabase not configured. Please set up environment variables from ENV_SETUP_INSTRUCTIONS.txt')
      } else {
        setSupabaseError('Database connection failed')
      }
    }
    setLoading(false)
  }, [filter])

  const startEditingBooking = (booking) => {
    setEditingBookingId(booking.id)
    setEditFormData({
      date: booking.preferred_date,
      time: booking.preferred_time
    })
  }

  const updateBookingSchedule = async (bookingId) => {
    // Basic validation
    if (!editFormData.date || !editFormData.time) {
      toast.error('Please fill in both date and time')
      return
    }

    // Check if the new date/time is not in the past (for same-day bookings)
    const now = new Date()
    const bookingDateTime = new Date(`${editFormData.date}T${editFormData.time}`)
    const today = now.toISOString().split('T')[0]

    if (editFormData.date === today && bookingDateTime < now) {
      toast.error('Cannot schedule consultations in the past')
      return
    }

    setUpdatingBookingId(bookingId)
    try {
      console.log('=== SCHEDULE UPDATE DEBUG ===')
      console.log('Updating booking schedule via API:', bookingId, editFormData)
      setUpdatingBookingId(bookingId) // Set loading state

      // NEW: Use API route for schedule updates (like status updates)
      console.log('🔄 Calling schedule update API...')
      const response = await fetch('/api/update-booking-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingId,
          newDate: editFormData.date,
          newTime: editFormData.time
        })
      })

      const result = await response.json()
      console.log('📋 Schedule update API result:', result)

      if (response.ok && result.success) {
        console.log('✅ Schedule update completed:', result.message)
        if (result.supabaseUpdated) {
          console.log('✅ Database updated successfully')
        }
        if (result.ghlSynced) {
          console.log('✅ GHL opportunity schedule synced successfully')
        } else {
          console.log('⚠️ GHL sync was skipped or failed:', result.message)
        }

        // Success message
        if (result.ghlSynced) {
          toast.success('Booking schedule updated successfully! GHL has been updated automatically.')
        } else {
          toast.warning('Booking schedule updated successfully, but GHL sync failed. Manual update may be needed.')
        }

        setEditingBookingId(null)
        await fetchBookings() // Refresh the list
      } else {
        console.error('❌ Schedule update API failed:', result.error)

        // Handle specific error types
        if (response.status === 409) {
          // Conflict - time slot already booked
          toast.error('Time slot conflict: The requested time is already booked by another client. Please choose a different time.')
        } else {
          toast.error('Failed to update booking schedule: ' + (result.error || 'Unknown error'))
        }
      }
    } catch (error) {
      console.error('Error updating booking schedule:', error)
      toast.error('Failed to update booking schedule')
    } finally {
      setUpdatingBookingId(null)
    }
  }

  const updateBookingStatus = async (bookingId, newStatus) => {
    console.log('=== UPDATE DEBUG ===')
    console.log('Updating booking', bookingId, 'to status:', newStatus)
    setUpdatingBookingId(bookingId) // Set loading state
    try {
      console.log('Calling supabase update...')
      console.log('Supabase admin client type:', supabaseAdmin?.from ? 'real' : 'mock')
      console.log('Update payload:', { status: newStatus, bookingId })
      console.log('Using supabaseAdmin for update')
      const result = await supabaseAdmin
        .from('strategy_calls')
        .update({
          status: newStatus
          // Temporarily removed confirmed_at and completed_at to test if they exist
        })
        .eq('id', bookingId)

      console.log('Supabase update result:', result)
      console.log('Update status:', result.status)
      console.log('Update error:', result.error)
      console.log('Update count:', result.count)
      console.log('Update data:', result.data)
      const { data, error } = result

      if (error) {
        console.error('Error updating status:', error)
        if (error.message === 'Supabase not configured') {
          toast.error('Supabase not configured. Please set up environment variables first.')
        } else {
          toast.error('Failed to update status: ' + error.message)
        }
      } else {
        console.log('Status updated successfully in Supabase')

        // NEW: Sync status to GHL via server-side API route
        try {
          console.log('🔄 Syncing status to GHL via API route...')
          const response = await fetch('/api/update-booking-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bookingId: bookingId,
              newStatus: newStatus
            })
          })

          const result = await response.json()

          if (response.ok && result.success) {
            console.log('✅ Status sync completed:', result.message)
            // Show comprehensive success message with GHL sync status
            if (result.ghlSynced) {
              toast.success(`Booking status updated to "${newStatus}" and synced to GHL successfully!`)
            } else {
              toast.success(`Booking status updated to "${newStatus}" successfully! (GHL sync skipped)`)
            }
          } else {
            console.error('⚠️ GHL sync API call failed:', result.error)
            toast.success(`Booking status updated to "${newStatus}" successfully! (GHL sync failed)`)
          }
        } catch (apiError) {
          console.error('⚠️ Failed to call GHL sync API:', apiError)
          // Don't fail the entire operation if GHL sync fails
          toast.success(`Booking status updated to "${newStatus}" successfully! (GHL sync failed)`)
        }

        // Refresh the full dataset
        await fetchBookings()
      }
    } catch (error) {
      console.error('Error connecting to database:', error)
      if (error.message === 'Supabase not configured') {
        toast.error('Supabase not configured. Please set up environment variables first.')
      } else {
        toast.error('Database connection failed')
      }
    } finally {
      setUpdatingBookingId(null) // Clear loading state
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('handleLogin called with password:', password)
    console.log('ADMIN_PASSWORD:', ADMIN_PASSWORD)

    setLoginLoading(true) // Set loading state

    // Small delay for better UX feedback
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        console.log('Password correct, authenticating user')
        setIsAuthenticated(true)
        setLoginError('') // Clear any previous errors
        localStorage.setItem('adminAuthenticated', 'true')
        localStorage.setItem('adminAuthTimestamp', Date.now().toString())
      } else {
        console.log('Password incorrect')
        setLoginError('🚫 Incorrect password. Please try again.')
      }
      setLoginLoading(false) // Clear loading state
    }, 500)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600'
      case 'confirmed': return 'bg-green-600'
      case 'cancelled': return 'bg-red-600'
      case 'completed': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusCount = (status) => {
    return allBookings.filter(booking => booking.status === status).length
  }

  // Helper function to calculate buffer dates for a booking
  const getBufferDates = (consultationDate) => {
    const consultationDateObj = new Date(consultationDate)
    const bufferDay1 = new Date(consultationDateObj)
    bufferDay1.setDate(bufferDay1.getDate() + 1)

    const bufferDay2 = new Date(consultationDateObj)
    bufferDay2.setDate(bufferDay2.getDate() + 2)

    const nextAvailable = new Date(consultationDateObj)
    nextAvailable.setDate(nextAvailable.getDate() + 3)

    return {
      consultationDay: consultationDateObj.toISOString().split('T')[0],
      bufferDay1: bufferDay1.toISOString().split('T')[0],
      bufferDay2: bufferDay2.toISOString().split('T')[0],
      nextAvailable: nextAvailable.toISOString().split('T')[0]
    }
  }

  // Show configuration error if Supabase is not set up (both authenticated and non-authenticated)
  console.log('Render check: supabaseError =', !!supabaseError)
  if (supabaseError) {
    console.log('Rendering: supabase error screen')
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900 border border-red-700 p-8 rounded-lg max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-200 mb-4">Configuration Error</h2>
          <p className="text-red-300 mb-4">{supabaseError}</p>
          <div className="text-sm text-red-400">
            <p className="mb-2">Please follow these steps:</p>
            <ol className="text-left list-decimal list-inside space-y-1">
              <li>Create a Supabase project at supabase.com</li>
              <li>Check ENV_SETUP_INSTRUCTIONS.txt for setup instructions</li>
              <li>Create a .env.local file with your Supabase credentials</li>
              <li>Restart the development server</li>
            </ol>
            {isAuthenticated && (
              <div className="mt-4 pt-4 border-t border-red-700">
                <button
                  onClick={() => {
                    setIsAuthenticated(false)
                    localStorage.removeItem('adminAuthenticated')
                    localStorage.removeItem('adminAuthTimestamp')
                    setSupabaseError(null)
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Logout & Return to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  console.log('Render check: isAuthenticated =', isAuthenticated)
  if (!isAuthenticated) {
    console.log('Rendering: password form')
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7BB9E8]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6ba8d8]/10 rounded-full blur-3xl"></div>
        </div>

        {/* Login Form */}
        <div className="relative z-10 w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#7BB9E8] to-[#6ba8d8] rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Yo Marketing
            </h1>
            <p className="text-white/60 text-sm">Admin Portal</p>
          </div>

          {/* Form Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Admin Access
              </h2>
              <p className="text-white/60 text-sm">
                Enter your admin password to manage bookings
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-red-300 text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {loginError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Admin Password
                </label>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (loginError) setLoginError('') // Clear error when user starts typing
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 focus:border-[#7BB9E8]/50 transition-all duration-200"
                  required
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className={`w-full text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  loginLoading
                    ? 'bg-gray-600 cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-r from-[#7BB9E8] to-[#6ba8d8] hover:from-[#6ba8d8] hover:to-[#5fa6d6] shadow-lg hover:shadow-xl hover:shadow-[#7BB9E8]/25'
                }`}
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {loginLoading ? 'Authenticating...' : 'Access Admin Panel'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/40 text-xs">
                Secure admin access • Yo Marketing
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  console.log('Render check: loading =', loading)
  if (loading) {
    console.log('Rendering: loading screen')
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading bookings...</div>
      </div>
    )
  }

  console.log('Rendering: main interface')
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Booking Management</h1>
            <p className="text-gray-400 mt-2">Manage strategy call bookings and availability</p>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false)
              localStorage.removeItem('adminAuthenticated')
              localStorage.removeItem('adminAuthTimestamp')
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{bookings.length}</div>
            <div className="text-gray-400 text-sm">Total</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-400">{getStatusCount('pending')}</div>
            <div className="text-gray-400 text-sm">Pending</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-400">{getStatusCount('confirmed')}</div>
            <div className="text-gray-400 text-sm">Confirmed</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-400">{getStatusCount('cancelled')}</div>
            <div className="text-gray-400 text-sm">Cancelled</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-400">{getStatusCount('completed')}</div>
            <div className="text-gray-400 text-sm">Completed</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg">
          {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && ` (${getStatusCount(status)})`}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <div className="text-gray-400 text-lg">No bookings found</div>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={`${booking.id}-${booking.status}`} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{booking.contact_name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      {/* Debug info */}
                      <span className="text-xs text-gray-500">ID: {booking.id}</span>
                    </div>
                    <div className="text-gray-400 space-y-1">
                      <p>📧 {booking.contact_email}</p>
                      <p>📱 {booking.contact_phone}</p>
                    </div>
                  </div>

                  <div className="lg:text-left">
                    {editingBookingId === booking.id ? (
                      // Edit Mode
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">📅 Date</label>
                          <input
                            type="date"
                            value={editFormData.date}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, date: e.target.value }))}
                            className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min={new Date().toISOString().split('T')[0]} // Prevent past dates
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">🕐 Time</label>
                          <input
                            type="time"
                            value={editFormData.time}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, time: e.target.value }))}
                            className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateBookingSchedule(booking.id)}
                            disabled={updatingBookingId === booking.id}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors disabled:opacity-50"
                          >
                            {updatingBookingId === booking.id ? 'Updating...' : 'Save'}
                          </button>
                          <button
                            onClick={() => setEditingBookingId(null)}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="text-lg font-bold text-blue-400 mb-2">
                          📅 {booking.preferred_date}
                        </div>
                        <div className="text-lg font-bold text-blue-400 mb-2">
                          🕐 {booking.preferred_time} {booking.timezone}
                        </div>

                        {/* Edit Button */}
                        <button
                          onClick={() => startEditingBooking(booking)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors mb-3"
                        >
                          ✏️ Edit Schedule
                        </button>
                      </>
                    )}

                    {/* 3-Day Buffer Information */}
                    <div className="mt-3 p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                      <div className="text-amber-300 text-sm font-medium mb-2">
                        🛡️ 3-Day Commitment
                      </div>
                      {(() => {
                        const bufferDates = getBufferDates(booking.preferred_date)
                        return (
                          <div className="text-amber-200 text-xs space-y-1">
                            <div>📅 Day 1: {bufferDates.consultationDay} (Consultation)</div>
                            <div>🔒 Day 2: {bufferDates.bufferDay1} (Follow-up blocked)</div>
                            <div>🔒 Day 3: {bufferDates.bufferDay2} (Implementation blocked)</div>
                            <div className="mt-2 pt-2 border-t border-amber-500/20 text-green-300">
                              ✅ Next available: {bufferDates.nextAvailable}
                            </div>
                          </div>
                        )
                      })()}
                    </div>

                    {/* Status Update */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Update Status
                      </label>
                      <select
                        value={booking.status || 'pending'}
                        disabled={updatingBookingId === booking.id}
                        onChange={(e) => {
                          console.log('Select changed from', booking.status, 'to:', e.target.value, 'for booking:', booking.id)
                          console.log('Current booking data:', { id: booking.id, status: booking.status })
                          const newStatus = e.target.value
                          if (newStatus && newStatus !== booking.status) {
                            updateBookingStatus(booking.id, newStatus)
                          } else {
                            console.log('Status unchanged or invalid:', { newStatus, currentStatus: booking.status })
                          }
                        }}
                        className={`px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          updatingBookingId === booking.id
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-70'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        {updatingBookingId === booking.id ? (
                          <option>⏳ Updating...</option>
                        ) : (
                          <>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                {booking.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h4 className="font-semibold mb-2">Notes</h4>
                    <p className="text-gray-300 bg-gray-700 p-3 rounded">{booking.notes}</p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Created: {new Date(booking.created_at).toLocaleString()}</span>
                    {booking.confirmed_at && (
                      <span>Confirmed: {new Date(booking.confirmed_at).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}