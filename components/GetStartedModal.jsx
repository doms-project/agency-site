'use client'

import { useState, memo, useCallback } from 'react'
import { useRouter } from 'next/navigation'

function GetStartedModal({ isOpen, onClose }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agreeToTerms: false
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName || !formData.phone || !formData.email) {
      alert('Please fill in all required fields: First Name, Phone, and Email')
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                    placeholder="your@email.com"
                  />
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
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 resize-none"
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
                  <span className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    By checking this box, I agree to the terms and conditions provided by <strong>Yo Marketing Company</strong>. I authorize the company to contact me via SMS or phone call regarding free website offers, business growth services, and related updates. Message and data rates may apply. I understand that I may opt out at any time by replying <strong>STOP</strong>.
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex gap-2 text-xs text-white/50">
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Terms of Service</a>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-white/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="get-started-form"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#7BB9E8] hover:bg-[#5fa6d6] text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(GetStartedModal)

