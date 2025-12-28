'use client'

import { useState, memo, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function GetStartedModal({ isOpen, onClose }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Safe timezone detection
  const getUserTimezone = () => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone
      // Validate the timezone by testing it
      new Date().toLocaleString('en-US', { timeZone: detected })
      return detected
    } catch (error) {
      console.warn('Timezone detection failed, falling back to Eastern Time:', error)
      return 'America/New_York'
    }
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    preferredDate: null, // Now using Date object for react-datepicker
    preferredTime: '', // Display time for UI
    preferredTimeEastern: '', // Eastern time for API (always valid)
    timezone: getUserTimezone(), // User's actual timezone with fallback
    agreeToTerms: false
  })

  const [availableSlots, setAvailableSlots] = useState([])
  const [hasSelectedDate, setHasSelectedDate] = useState(false)
  const [isLoadingTimes, setIsLoadingTimes] = useState(false)
  const [blockedDates, setBlockedDates] = useState([]) // Dates disabled in calendar
  const [isLoadingBlockedDates, setIsLoadingBlockedDates] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Client-side blocked dates cache for instant updates
  const updateBlockedDatesCache = (newBlockedDates) => {
    // Ensure all dates are valid strings
    const validDates = newBlockedDates.filter(date =>
      typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)
    )

    const cacheData = {
      dates: validDates,
      timestamp: Date.now()
    }
    localStorage.setItem('blockedDatesCache', JSON.stringify(cacheData))

    // Convert to Date objects for React state
    const dateObjects = validDates.map(dateStr => new Date(dateStr))
    setBlockedDates(dateObjects)
  }

  // Calculate blocked dates for a booking (3-day rule)
  const calculateBlockedDatesForBooking = (bookingDate) => {
    const blocked = []
    const baseDate = new Date(bookingDate)

    // Add consultation day and 2 buffer days
    for (let i = 0; i < 3; i++) {
      const blockedDate = new Date(baseDate)
      blockedDate.setDate(baseDate.getDate() + i)
      blocked.push(blockedDate.toISOString().split('T')[0])
    }

    return blocked
  }

  // Add booking to client cache immediately
  const addBookingToCache = (bookingDate) => {
    const newBlockedDates = calculateBlockedDatesForBooking(bookingDate)
    const currentCache = JSON.parse(localStorage.getItem('blockedDatesCache') || '{"dates":[]}')
    const updatedDates = [...new Set([...currentCache.dates, ...newBlockedDates])]
    updateBlockedDatesCache(updatedDates)
  }

  // Handle confirmed booking submission
  const handleConfirmedSubmit = async () => {
    setShowConfirmation(false)
    setIsSubmitting(true)

    try {
      // Format the date properly to avoid timezone issues
      const formatLocalDate = (date) => {
        if (!date) return null
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      }

      const formattedData = {
        ...formData,
        preferredDate: formatLocalDate(formData.preferredDate),
        preferredTime: formData.preferredTimeEastern // Send Eastern time to API
      }

      const response = await fetch('/api/get-started', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      })

      const result = await response.json()

      if (response.ok) {
        // Immediately add new booking's blocked dates to cache for instant UI update
        addBookingToCache(formattedData.preferredDate)

        // Sync with server in background (don't wait for it)
        fetchBlockedDates()

        router.push('/thank-you')
        onClose()
      } else {
        console.error('❌ Submission failed:', result.error)
        setFormError(result.error || 'Something went wrong. Please try again.')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('❌ Submission error:', error)
      setFormError('Network error. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }
  const [formError, setFormError] = useState('') // General form errors


  // Helper function to convert Eastern Time to user's timezone
  const easternTimeToUserTimezone = (easternTime24, userTimezone = formData.timezone) => {
    try {
      // Validate timezone first
      if (!userTimezone || userTimezone === 'Invalid Date') {
        console.warn('Invalid timezone detected, using Eastern Time as fallback')
        return easternTime24
      }

      const [hours, minutes] = easternTime24.split(':').map(Number)
      // Eastern Time is UTC-5 (EST), add 5 hours to get UTC
      const utcHours = hours + 5
      const utcDate = new Date(Date.UTC(2024, 0, 1, utcHours, minutes))

      const userTimeString = utcDate.toLocaleString('en-US', {
        timeZone: userTimezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })

      // Check if conversion resulted in invalid date
      if (userTimeString === 'Invalid Date') {
        console.warn('Timezone conversion failed, using Eastern Time as fallback')
        return easternTime24
      }

      return userTimeString
    } catch (error) {
      console.error('Error converting Eastern time:', error, 'timezone:', userTimezone)
      return easternTime24 // Fallback to Eastern time
    }
  }

  // Helper function to format 24-hour time for display (already in user timezone)
  const formatTimeToAMPM = (time24) => {
    try {
      const [hours, minutes] = time24.split(':').map(Number)
      const period = hours >= 12 ? 'PM' : 'AM'
      const hours12 = hours % 12 || 12
      return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
    } catch (error) {
      // Fallback - return as-is
      return time24
    }
  }

  // Clean up datepicker to show clean display
  useEffect(() => {
    const cleanupDatePicker = () => {

      // Clean day names to show only abbreviations
      const dayNameElements = document.querySelectorAll('.react-datepicker-custom .react-datepicker__day-name')
      dayNameElements.forEach((element, index) => {
        const abbreviations = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        if (abbreviations[index]) {
          element.textContent = abbreviations[index]
        }
      })

      // Remove duplicate month/year headers
      const monthHeaders = document.querySelectorAll('.react-datepicker-custom .react-datepicker__current-month')
      if (monthHeaders.length > 1) {
        // Keep only the first one
        for (let i = 1; i < monthHeaders.length; i++) {
          monthHeaders[i].style.display = 'none'
        }
      }

      // Datepicker setup complete

      // Add click handlers to custom navigation arrows
      console.log('=== SETTING UP HEADER CLICK HANDLER ===')
      const header = document.querySelector('.react-datepicker-custom .react-datepicker__header')
      console.log('Header element found:', header)
      if (header) {
        console.log('Header found, adding click handler')
        console.log('Header classes:', header.className)
        console.log('Header text:', header.textContent)
        // Remove existing click handlers to avoid duplicates
        const existingHandler = header._customNavHandler
        if (existingHandler) {
          console.log('Removing existing handler')
          header.removeEventListener('click', existingHandler)
        }

        // Click handler for header navigation with arrows
        const handleHeaderClick = (e) => {
          const rect = header.getBoundingClientRect()
          const clickX = e.clientX - rect.left

          // Debug: Check all datepicker buttons
          const allButtons = document.querySelectorAll('.react-datepicker button')
          console.log('=== INSPECTION ===')
          console.log('All datepicker buttons:', allButtons.length)
          allButtons.forEach((btn, i) => {
            console.log(`Button ${i}:`, btn.className, 'disabled:', btn.disabled, 'text:', btn.textContent?.trim())
          })

          // Left arrow area (first 40px)
          if (clickX >= 0 && clickX <= 40) {
            console.log('LEFT ARROW CLICK - Looking for prev button...')
            const prevButton = document.querySelector('.react-datepicker__navigation--previous')
            console.log('Prev button element:', prevButton)
            if (prevButton) {
              console.log('Prev button disabled:', prevButton.disabled)
              console.log('Prev button display:', prevButton.style.display)
              console.log('Prev button classes:', prevButton.className)
              if (!prevButton.disabled) {
                console.log('CLICKING PREV BUTTON')
                prevButton.click()
              } else {
                console.log('PREV BUTTON DISABLED - not clicking')
              }
            } else {
              console.log('PREV BUTTON NOT FOUND')
            }
          }
          // Right arrow area (last 40px)
          else if (clickX >= rect.width - 40 && clickX <= rect.width) {
            console.log('RIGHT ARROW CLICK - Looking for next button...')
            const nextButton = document.querySelector('.react-datepicker__navigation--next')
            console.log('Next button element:', nextButton)
            if (nextButton) {
              console.log('Next button disabled:', nextButton.disabled)
              console.log('Next button display:', nextButton.style.display)
              console.log('Next button classes:', nextButton.className)
              if (!nextButton.disabled) {
                console.log('CLICKING NEXT BUTTON')
                nextButton.click()
              } else {
                console.log('NEXT BUTTON DISABLED - not clicking')
              }
            } else {
              console.log('NEXT BUTTON NOT FOUND')
            }
          }
          console.log('=== END INSPECTION ===')
        }

        header.addEventListener('click', handleHeaderClick)
        header._navHandler = handleHeaderClick

        header.addEventListener('click', handleHeaderClick)
        header._customNavHandler = handleHeaderClick
      }
    }

    // Clean immediately and also after delays to catch all rendering phases
    cleanupDatePicker()
    const timeout1 = setTimeout(cleanupDatePicker, 50)
    const timeout2 = setTimeout(cleanupDatePicker, 150)
    const timeout3 = setTimeout(cleanupDatePicker, 300)
    const timeout4 = setTimeout(cleanupDatePicker, 500) // Extra delay for datepicker rendering

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
    }
  }, [hasSelectedDate]) // Re-run when date selection state changes

  // Also watch for datepicker popup appearing
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const header = document.querySelector('.react-datepicker-custom .react-datepicker__header')
          if (header && !header._hasNavHandler) {
            console.log('=== DATEPICKER POPUP DETECTED - ATTACHING HANDLER ===')
            console.log('Header found via observer:', header)

            const handleHeaderClick = (e) => {
              console.log('Header clicked via observer!')
              const rect = header.getBoundingClientRect()
              const clickX = e.clientX - rect.left
              console.log('Click coordinates:', clickX, rect.width)

              // Left arrow area (first 40px)
              if (clickX >= 0 && clickX <= 40) {
                console.log('LEFT ARROW - finding prev button...')
                const prevButton = document.querySelector('.react-datepicker__navigation--previous')
                console.log('Prev button:', prevButton)
                if (prevButton && !prevButton.disabled) {
                  console.log('Clicking prev button')
                  prevButton.click()
                }
              }
              // Right arrow area (last 40px)
              else if (clickX >= rect.width - 40 && clickX <= rect.width) {
                console.log('RIGHT ARROW - finding next button...')
                const nextButton = document.querySelector('.react-datepicker__navigation--next')
                console.log('Next button:', nextButton)
                if (nextButton && !nextButton.disabled) {
                  console.log('Clicking next button')
                  nextButton.click()
                }
              }
            }

            header.addEventListener('click', handleHeaderClick)
            header._hasNavHandler = true
            header._navHandler = handleHeaderClick
            console.log('Header click handler attached via observer')
          }
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => observer.disconnect()
  }, [])

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleTimeSelection = useCallback((displayTime, easternTime) => {
    console.log('Time selected:', { displayTime, easternTime, timezone: formData.timezone })
    setFormData(prev => ({
      ...prev,
      preferredTime: displayTime, // For UI display
      preferredTimeEastern: easternTime // For API (always Eastern time)
    }))
  }, [formData.timezone])

  const handleCheckboxChange = useCallback((checked) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: checked
    }))
  }, [])

  const handleDateSelection = async (date) => {

    handleInputChange('preferredDate', date)

    if (date) {
      // Always check availability when a date is selected
      if (!hasSelectedDate) {
        // Only trigger UI transition the first time
        setHasSelectedDate(true)
      }

      setIsLoadingTimes(true)

      // Check availability for the new date
      await checkAvailability(date)

      // Minimum loading time for smooth UX
      setTimeout(() => {
        setIsLoadingTimes(false)
      }, 600)
    } else {
      // Reset to initial state when date is cleared
      setHasSelectedDate(false)
      setIsLoadingTimes(false)
      setAvailableSlots([])
    }
  }

  // Handle date clearing (when date becomes empty)
  useEffect(() => {
    if (!formData.preferredDate) {
      setHasSelectedDate(false)
      setIsLoadingTimes(false)
      setAvailableSlots([])
    }
  }, [formData.preferredDate])

  // Retry utility for failed API calls
  const fetchWithRetry = async (fetchFn, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fetchFn()
      } catch (error) {
        if (attempt === maxRetries) throw error
        console.warn(`API call failed (attempt ${attempt}/${maxRetries}), retrying...`, error.message)
        await new Promise(resolve => setTimeout(resolve, delay * attempt))
      }
    }
  }

  // Fetch all dates blocked by existing bookings (with client cache)
  const fetchBlockedDates = useCallback(async () => {
    try {
      setIsLoadingBlockedDates(true)

      // AGGRESSIVE CACHE-BUSTING: Multiple unique parameters to force fresh server data
      const cacheBuster1 = Date.now()
      const cacheBuster2 = Math.random().toString(36).substring(2, 15)
      const response = await fetchWithRetry(async () => {
        const res = await fetch(`/api/get-blocked-dates?t=${cacheBuster1}&r=${cacheBuster2}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        return res
      })
      const data = await response.json()

      if (response.ok && data.blockedDates) {
        // Update cache with server data (store as strings, convert to Date objects for state)
        const validDates = data.blockedDates.filter(dateStr =>
          dateStr && typeof dateStr === 'string' && !isNaN(new Date(dateStr).getTime())
        )
        const blockedDateObjects = validDates.map(dateStr => new Date(dateStr))
        updateBlockedDatesCache(validDates)
        setBlockedDates(blockedDateObjects)
        console.log(`Loaded ${blockedDateObjects.length} blocked dates from server`)
      } else {
        // Fallback to cache if server fails
        console.error('Failed to load blocked dates from server, trying cache:', data.error)
        const cached = JSON.parse(localStorage.getItem('blockedDatesCache') || '{"dates":[]}')
        if (cached.dates && cached.dates.length > 0) {
          try {
            const blockedDateObjects = cached.dates
              .filter(dateStr => dateStr && typeof dateStr === 'string')
              .map(dateStr => new Date(dateStr))
              .filter(date => !isNaN(date.getTime())) // Only valid dates
            setBlockedDates(blockedDateObjects)
            console.log(`Loaded ${blockedDateObjects.length} blocked dates from cache`)
          } catch (error) {
            console.error('Error parsing cached dates:', error)
            setBlockedDates([])
          }
        } else {
          setBlockedDates([])
        }
      }
    } catch (error) {
      console.error('Error loading blocked dates:', error)
      // Try cache as last resort
      try {
        const cached = JSON.parse(localStorage.getItem('blockedDatesCache') || '{"dates":[]}')
        if (cached.dates && cached.dates.length > 0) {
          const blockedDateObjects = cached.dates
            .filter(dateStr => dateStr && typeof dateStr === 'string')
            .map(dateStr => new Date(dateStr))
            .filter(date => !isNaN(date.getTime()))
          setBlockedDates(blockedDateObjects)
        } else {
          setBlockedDates([])
        }
      } catch (cacheError) {
        console.error('Cache also failed:', cacheError)
        setBlockedDates([])
      }
    } finally {
      setIsLoadingBlockedDates(false)
    }
  }, [])

  // Load blocked dates on component mount
  useEffect(() => {
    fetchBlockedDates()
  }, [])

  // Refresh blocked dates whenever modal opens (NUCLEAR FRESH FETCH)
  useEffect(() => {
    if (isOpen) {
      // COMPLETE CACHE PURGE on modal open
      localStorage.removeItem('blockedDatesCache')
      setBlockedDates([]) // Clear state immediately

      // Small delay to ensure clean slate, then fetch fresh data
      setTimeout(() => {
        fetchBlockedDates()
      }, 50)
    }
  }, [isOpen])

  const checkAvailability = async (date) => {
    try {
      const response = await fetch('/api/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          checkAllTimes: true,
          timezone: formData.timezone
        })
      })

      const data = await response.json()
      console.log('Received availability data:', data)

      if (data.blockedReason) {
        // Date is blocked due to buffer period
        console.log(`Date ${date} is blocked: ${data.blockedReason}`)
        setAvailableSlots([])
        return
      }

      console.log(`Setting ${data.availableTimes?.length || 0} available slots`)
      setAvailableSlots(data.availableTimes || [])

      // Show buffer information if available
      if (data.bufferInfo) {
        console.log('Buffer info:', data.bufferInfo)
      }
    } catch (error) {
      console.error('Availability check failed:', error)
      // Set default available slots if API fails - use all business hours
      const fallbackSlots = [
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
      ].map(time => ({
        time: easternTimeToUserTimezone(time),
        displayTime: formatTimeToAMPM(easternTimeToUserTimezone(time)),
        available: true
      }))
      setAvailableSlots(fallbackSlots)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    // Clear any previous errors
    setFormError('')

    // Validate required fields
    if (!formData.firstName || !formData.phone || !formData.email) {
      setFormError('Please fill in all required fields: First Name, Phone, and Email')
      return
    }

    // Validate time selection
    if (!formData.preferredDate || !formData.preferredTime || !formData.preferredTimeEastern) {
      setFormError('Please select your preferred date and time for the strategy call')
      return
    }

    if (!formData.agreeToTerms) {
      setFormError('Please agree to the terms and conditions to continue')
      return
    }

    // Show confirmation dialog instead of immediately submitting
    setShowConfirmation(true)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Custom animations for progressive form */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] rounded-2xl border border-white/10 shadow-2xl overflow-visible">
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Get Started Today
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Book your free strategy call
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Error Display */}
        {formError && (
          <div className="mx-6 mt-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-red-300 font-medium text-sm mb-1">
                    Booking Not Available
                  </h3>
                  <p className="text-red-200 text-sm leading-relaxed">
                    {formError}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
          <form onSubmit={handleSubmit} id="get-started-form">
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-white/90 mb-2 text-sm font-medium">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 text-sm"
                    placeholder="John"
                    aria-describedby="first-name-help"
                  />
                  <div id="first-name-help" className="sr-only">Enter your first name for the booking</div>
                </div>
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 text-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-medium">
                    Phone <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 text-sm"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-medium">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Call Scheduling Section */}
              <div className="bg-white/5 rounded-lg pt-4 px-4 pb-2 border border-white/10">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    📅 Schedule Your Strategy Call
                  </h3>
                  <p className="text-white/60 text-sm">
                    Choose your preferred date and time for the call
                  </p>
                </div>

                {/* Progressive Date & Time Selection */}
                <div className="max-w-2xl md:max-w-4xl mx-auto">
                  <div className="bg-white/5 border border-white/10 rounded-lg pt-3 px-3 pb-1">
                    <div className="text-center mb-1">
                      <h3 className="text-white font-bold text-base mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Schedule Your Call
                      </h3>
                      <p className="text-white/60 text-xs leading-tight">
                        {hasSelectedDate ? 'Choose your preferred time' : 'Select a date to see available times'}
                      </p>
                      {hasSelectedDate && (
                        <div className="mt-2 px-3 py-2 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                          <div className="flex items-start gap-2">
                            <span className="text-blue-400 text-xs">ℹ️</span>
                            <div className="text-blue-300 text-xs leading-tight">
                              <div className="font-medium mb-1">3-Day Commitment</div>
                              <div>Your consultation includes 2 dedicated follow-up days for comprehensive strategy work.</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Progressive Layout */}
                    <div className={`flex-1 transition-all duration-500 ease-out ${
                      hasSelectedDate ? 'flex-col md:flex-row gap-3 md:gap-8 md:items-start' : 'block'
                    }`}>
                      {/* Date Section - Always visible, shrinks when time appears */}
                      <div className={`transition-all duration-500 ease-out ${
                        hasSelectedDate ? 'w-full md:w-44 flex-shrink-0' : 'w-full mb-2'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white/90 text-xs font-medium">📅 Date</span>
                          <span className="text-red-400 text-xs">*</span>
                        </div>
                        <div className="relative" id="datepicker-portal">
                          {console.log('DatePicker blockedDates:', blockedDates)}
                          <DatePicker
                            id="preferred-date"
                            aria-label="Select your preferred date for the strategy call"
                            selected={formData.preferredDate}
                            onChange={(date) => handleDateSelection(date)}
                            excludeDates={blockedDates.filter(date => date instanceof Date && !isNaN(date.getTime()))}
                            filterDate={(date) => {
                              // Return false for blocked dates to disable them in the picker
                              return !blockedDates.some(blockedDate => {
                                // Ensure blockedDate is a valid Date object
                                if (!(blockedDate instanceof Date) || isNaN(blockedDate.getTime())) {
                                  return false
                                }
                                return date.getFullYear() === blockedDate.getFullYear() &&
                                       date.getMonth() === blockedDate.getMonth() &&
                                       date.getDate() === blockedDate.getDate()
                              })
                            }}
                            dayClassName={(date) => {
                              // Add CSS class to visually distinguish blocked dates
                              const isBlocked = blockedDates.some(blockedDate => {
                                // Ensure blockedDate is a valid Date object
                                if (!(blockedDate instanceof Date) || isNaN(blockedDate.getTime())) {
                                  return false
                                }
                                return date.getFullYear() === blockedDate.getFullYear() &&
                                       date.getMonth() === blockedDate.getMonth() &&
                                       date.getDate() === blockedDate.getDate()
                              })
                              return isBlocked ? 'blocked-date' : ''
                            }}
                            // Allow full navigation but restrict selection in onChange
                            placeholderText={isLoadingBlockedDates ? "Loading available dates..." : "Select date"}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 text-sm"
                            wrapperClassName="w-full"
                            popperClassName="react-datepicker-popper"
                            calendarClassName="react-datepicker-custom"
                            dateFormat="MMMM d, yyyy"
                            showPopperArrow={false}
                            popperPlacement="bottom-end"
                            required
                            disabled={isLoadingBlockedDates}
                          />
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Time Section - Only renders after date selection */}
                      {hasSelectedDate && (
                        <div className="flex-1 md:max-w-lg mt-6 transition-all duration-500 ease-out opacity-100 translate-x-0">
                        <label className="block text-white/90 text-xs font-medium mb-1">
                          🕐 Time <span className="text-red-400">*</span>
                        </label>

                        {/* Loading state with skeleton */}
                        {isLoadingTimes ? (
                          <div className="py-2">
                            <div className="text-center mb-3">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white/60 mx-auto mb-1"></div>
                              <span className="text-white/60 text-xs">Finding available times...</span>
                            </div>
                            {/* Skeleton loading for time slots */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                              {Array.from({ length: 12 }).map((_, index) => (
                                <div
                                  key={index}
                                  className="animate-pulse bg-white/10 rounded border border-white/20 p-2"
                                  style={{ animationDelay: `${index * 50}ms` }}
                                >
                                  <div className="h-3 bg-white/20 rounded mb-1"></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* Compact time grid */
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 md:justify-center gap-2 overflow-hidden">
                            {availableSlots.length > 0 ? (
                              availableSlots.map((slot, index) => {
                                console.log(`Available slot ${index}: time=${slot.time}, displayTime=${slot.displayTime}`)
                                return slot.available ? (
                                  // Available slot - clickable button
                                  <button
                                    key={slot.time}
                                    onClick={() => handleTimeSelection(slot.displayTime || slot.time, slot.time)}
                                    onTouchStart={() => {}} // Improve touch responsiveness
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        handleTimeSelection(slot.displayTime || slot.time, slot.time)
                                      }
                                    }}
                                    aria-label={`Select time slot ${slot.displayTime || slot.time}`}
                                    aria-pressed={formData.preferredTime === slot.displayTime}
                                    role="button"
                                    tabIndex={0}
                                    className={`p-1.5 sm:p-1 md:p-2 rounded border text-center transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 ${
                                      formData.preferredTime === slot.displayTime
                                        ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                                        : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                                    }`}
                                    style={{
                                      animationDelay: `${index * 100}ms`,
                                      animation: 'fadeInScale 0.4s ease-out forwards',
                                      opacity: 0
                                    }}
                                  >
                                    <div className="font-medium text-base sm:text-sm md:text-xs truncate">{formatTimeToAMPM(slot.displayTime || slot.time)}</div>
                                  </button>
                                ) : (
                                  // Booked slot - compact styling with "Booked" + time
                                  <div
                                    key={slot.time}
                                    className="p-2 sm:p-1.5 md:p-1 rounded border text-center bg-red-900/20 border-red-500/30 text-red-400 cursor-not-allowed leading-none"
                                    style={{
                                      animationDelay: `${index * 100}ms`,
                                      animation: 'fadeInScale 0.4s ease-out forwards',
                                      opacity: 0
                                    }}
                                  >
                                    <div className="font-medium text-xs leading-none truncate">Booked</div>
                                    <div className="text-xs opacity-75 leading-none truncate">{formatTimeToAMPM(slot.displayTime || slot.time)}</div>
                                  </div>
                                )
                              })
                            ) : (
                              // Default time slots (Eastern Time business hours 8 AM - 11 PM)
                              [
                                '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
                                '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
                              ].map((easternTime, index) => {
                                const userTime = easternTimeToUserTimezone(easternTime)
                                const displayTime = formatTimeToAMPM(userTime)
                                console.log(`Time slot ${index}: Eastern=${easternTime}, User=${userTime}, Display=${displayTime}`)
                                return (
                                  <button
                                    key={userTime}
                                    onClick={() => handleTimeSelection(userTime, easternTime)}
                                    onTouchStart={() => {}} // Improve touch responsiveness
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        handleTimeSelection(userTime, easternTime)
                                      }
                                    }}
                                    aria-label={`Select time slot ${userTime}`}
                                    aria-pressed={formData.preferredTime === userTime}
                                    role="button"
                                    tabIndex={0}
                                    className={`p-1.5 sm:p-1 md:p-2 rounded border text-center transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 ${
                                      formData.preferredTime === userTime
                                        ? 'bg-green-600 border-green-500 text-white shadow-lg'
                                        : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                                    }`}
                                    style={{
                                      animationDelay: `${index * 100}ms`,
                                      animation: 'fadeInScale 0.4s ease-out forwards',
                                      opacity: 0
                                    }}
                                  >
                                    <div className="font-medium text-base sm:text-sm md:text-xs truncate">{displayTime}</div>
                                  </button>
                                )
                              })
                            )}
                          </div>
                        )}

                        {/* Empty state */}
                        {availableSlots.length > 0 && availableSlots.filter(slot => slot.available).length === 0 && !isLoadingTimes && (
                          <div className="mt-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-center">
                            <div className="text-red-400 text-xs">No times available</div>
                          </div>
                        )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  autoComplete="off"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 resize-none text-sm"
                  placeholder="Tell us about your business goals and what you'd like to discuss..."
                />
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-[#7BB9E8] focus:ring-2 focus:ring-[#7BB9E8]/50"
                  />
                  <span className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    By checking this box, I agree to the terms and conditions provided by <strong>Yo Marketing Company</strong>. I authorize the company to contact me via SMS or phone call regarding free website offers, business growth services, and related updates. Message and data rates may apply. I understand that I may opt out at any time by replying <strong>STOP</strong>.
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10 px-4 py-2 md:px-6 md:py-3 flex items-center justify-between">
          <div className="flex gap-2 text-xs text-white/50">
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Terms of Service</a>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs md:text-sm text-white/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="get-started-form"
              disabled={isSubmitting}
              className="px-4 py-1.5 text-xs md:text-sm bg-[#7BB9E8] hover:bg-[#5fa6d6] text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        {/* Booking Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] rounded-2xl border border-white/10 shadow-2xl p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#7BB9E8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Confirm Your Booking
                </h3>

                <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Date:</span>
                      <span className="text-white">{formData.preferredDate ? formData.preferredDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Time:</span>
                      <span className="text-white">{formData.preferredTime || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Timezone:</span>
                      <span className="text-white">{formData.timezone || 'Auto-detected'}</span>
                    </div>
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-6">
                  This booking includes 2 follow-up days that will be blocked for comprehensive strategy work.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 px-4 py-2 text-white/70 hover:text-white border border-white/20 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmedSubmit}
                    className="flex-1 px-4 py-2 bg-[#7BB9E8] hover:bg-[#5fa6d6] text-black font-bold rounded-lg transition-colors"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(GetStartedModal)


