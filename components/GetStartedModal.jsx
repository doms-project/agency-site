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
    preferredTime: '',
    timezone: getUserTimezone(), // User's actual timezone with fallback
    agreeToTerms: false
  })

  const [availableSlots, setAvailableSlots] = useState([])
  const [hasSelectedDate, setHasSelectedDate] = useState(false)
  const [isLoadingTimes, setIsLoadingTimes] = useState(false)


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

  // Helper function to convert 24-hour UTC time to AM/PM format in user's timezone
  const formatTimeToAMPM = (time24, timezone = formData.timezone) => {
    try {
      // Create a date in UTC with the given time
      const utcDate = new Date(`2024-01-01T${time24}:00Z`)

      // Convert to user's timezone and format as AM/PM
      const result = utcDate.toLocaleString('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })

      // Check for invalid result
      if (result === 'Invalid Date') {
        throw new Error('Invalid timezone conversion')
      }

      return result
    } catch (error) {
      console.warn('Timezone formatting failed, using simple conversion:', error.message)
      // Fallback to simple conversion if timezone conversion fails
      try {
        const [hours, minutes] = time24.split(':').map(Number)
        const period = hours >= 12 ? 'PM' : 'AM'
        const hours12 = hours % 12 || 12
        return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
      } catch (fallbackError) {
        console.error('Fallback conversion also failed:', fallbackError)
        return time24 // Ultimate fallback
      }
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

  const handleCheckboxChange = useCallback((checked) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: checked
    }))
  }, [])

  const handleDateSelection = async (date) => {
    // Validate that the selected date is not in the past
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    tomorrow.setHours(0, 0, 0, 0) // Set to start of day for comparison

    if (date && date < tomorrow) {
      alert('Please select a date from tomorrow onwards.')
      return
    }

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
      console.log(`Setting ${data.availableTimes?.length || 0} available slots`)
      setAvailableSlots(data.availableTimes || [])
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
    
    // Validate required fields
    if (!formData.firstName || !formData.phone || !formData.email) {
      alert('Please fill in all required fields: First Name, Phone, and Email')
      return
    }

    // Validate time selection
    if (!formData.preferredDate || !formData.preferredTime) {
      alert('Please select your preferred date and time for the strategy call')
      return
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions to continue')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/get-started', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        if (process.env.NODE_ENV === 'development') {
        console.log('✅ Get Started form submitted successfully!')
        console.log('Contact ID:', result.contactId)
        }
        router.push('/thank-you')
        onClose()
      } else {
        console.error('❌ Submission failed:', result.error)
        alert(result.error || 'Something went wrong. Please try again.')
        setIsSubmitting(false)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
      console.error('❌ Submission error:', error)
      }
      alert('An error occurred. Please try again.')
      setIsSubmitting(false)
    }
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

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
          <form onSubmit={handleSubmit} id="get-started-form">
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-medium">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 text-sm"
                    placeholder="John"
                  />
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
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white/5 border border-white/10 rounded-lg pt-3 px-3 pb-1">
                    <div className="text-center mb-1">
                      <h3 className="text-white font-bold text-base mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Schedule Your Call
                      </h3>
                      <p className="text-white/60 text-xs leading-tight">
                        {hasSelectedDate ? 'Choose your preferred time' : 'Select a date to see available times'}
                      </p>
                    </div>

                    {/* Progressive Layout */}
                    <div className={`flex-1 transition-all duration-500 ease-out ${
                      hasSelectedDate ? 'flex gap-3 items-start' : 'block'
                    }`}>
                      {/* Date Section - Always visible, shrinks when time appears */}
                      <div className={`transition-all duration-500 ease-out ${
                        hasSelectedDate ? 'w-44 flex-shrink-0' : 'w-full mb-2'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white/90 text-xs font-medium">📅 Date</span>
                          <span className="text-red-400 text-xs">*</span>
                        </div>
                        <div className="relative" id="datepicker-portal">
                          <DatePicker
                            selected={formData.preferredDate}
                            onChange={(date) => handleDateSelection(date)}
                            // Allow full navigation but restrict selection in onChange
                            placeholderText="Select date"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 text-sm"
                            wrapperClassName="w-full"
                            popperClassName="react-datepicker-popper"
                            calendarClassName="react-datepicker-custom"
                            dateFormat="MMMM d, yyyy"
                            showPopperArrow={false}
                            popperPlacement="bottom-end"
                            required
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 pointer-events-none">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Time Section - Only renders after date selection */}
                      {hasSelectedDate && (
                        <div className="flex-1 transition-all duration-500 ease-out opacity-100 translate-x-0">
                        <label className="block text-white/90 text-xs font-medium mb-1">
                          🕐 Time <span className="text-red-400">*</span>
                        </label>

                        {/* Loading state */}
                        {isLoadingTimes ? (
                          <div className="flex items-center justify-center py-4">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white/60 mr-2"></div>
                            <span className="text-white/60 text-xs">Finding available times...</span>
                          </div>
                        ) : (
                          /* Compact time grid */
                          <div className="grid grid-cols-4 gap-1">
                            {availableSlots.length > 0 ? (
                              availableSlots.map((slot, index) => (
                                slot.available ? (
                                  // Available slot - clickable button
                                  <button
                                    key={slot.time}
                                    onClick={() => handleInputChange('preferredTime', slot.time)}
                                    className={`p-1.5 rounded border text-center transition-all duration-200 hover:scale-105 text-xs ${
                                      formData.preferredTime === slot.time
                                        ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                                        : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                                    }`}
                                    style={{
                                      animationDelay: `${index * 100}ms`,
                                      animation: 'fadeInScale 0.4s ease-out forwards',
                                      opacity: 0
                                    }}
                                  >
                                    <div className="font-medium text-sm">{formatTimeToAMPM(slot.displayTime || slot.time)}</div>
                                  </button>
                                ) : (
                                  // Booked slot - compact styling with "Booked" + time
                                  <div
                                    key={slot.time}
                                    className="p-1 rounded border text-center bg-red-900/20 border-red-500/30 text-red-400 text-xs cursor-not-allowed leading-none"
                                    style={{
                                      animationDelay: `${index * 100}ms`,
                                      animation: 'fadeInScale 0.4s ease-out forwards',
                                      opacity: 0
                                    }}
                                  >
                                    <div className="font-medium text-xs leading-none">Booked</div>
                                    <div className="text-xs opacity-75 leading-none">{formatTimeToAMPM(slot.displayTime || slot.time)}</div>
                                  </div>
                                )
                              ))
                            ) : (
                              // Default time slots (Eastern Time business hours 8 AM - 11 PM)
                              [
                                '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
                                '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
                              ].map((easternTime, index) => {
                                const userTime = easternTimeToUserTimezone(easternTime)
                                const displayTime = formatTimeToAMPM(userTime)
                                return (
                                  <button
                                    key={userTime}
                                    onClick={() => handleInputChange('preferredTime', userTime)}
                                    className={`p-3 rounded-lg border text-center transition-all duration-200 hover:scale-105 ${
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
                                    <div className="font-medium text-xs">{displayTime}</div>
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
      </div>
    </div>
    </>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(GetStartedModal)


