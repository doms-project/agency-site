'use client'

import { useState, memo, useCallback } from 'react'
import { useRouter } from 'next/navigation'

function GoogleBusinessProfileModal({ isOpen, onClose }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessAddress: '',
    interestedPackage: 'both',
    message: ''
  })

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName || !formData.phone || !formData.email) {
      alert('Please fill in all required fields: First Name, Phone, and Email')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/google-business-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        console.log('✅ Google Business Profile form submitted successfully!')
        console.log('Contact ID:', result.contactId)
        router.push('/thank-you')
        onClose()
      } else {
        console.error('❌ Submission failed:', result.error)
        alert(result.error || 'Something went wrong. Please try again.')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('❌ Submission error:', error)
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
              Google Business Profile Optimization
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Get started with your free assessment
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
          <form onSubmit={handleSubmit} id="gbp-form">
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
                    placeholder="(330) 555-1234"
                  />
                </div>
              </div>

              {/* Business Fields */}
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Business Name
                </label>
                <input
                  type="text"
                  autoComplete="organization"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                  placeholder="Your Business Name"
                />
              </div>

              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Business Address
                </label>
                <textarea
                  autoComplete="street-address"
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                  placeholder="Street Address, City, State, ZIP"
                />
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-white/90 mb-3 text-sm font-medium">
                  Interested Package
                </label>
                <div className="space-y-3">
                  <label className="flex items-start p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#7BB9E8]/30 cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="interestedPackage"
                      value="setup"
                      checked={formData.interestedPackage === 'setup'}
                      onChange={(e) => handleInputChange('interestedPackage', e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-1">Setup Package</div>
                      <div className="text-white/70 text-sm space-y-1">
                        <div>✔ Full Google Business Profile setup</div>
                        <div>✔ Optimize name, description, and categories</div>
                        <div>✔ Add keywords for better ranking</div>
                        <div>✔ Upload high-quality photos and business info</div>
                        <div>✔ Verify your business on Google</div>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#7BB9E8]/30 cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="interestedPackage"
                      value="monthly"
                      checked={formData.interestedPackage === 'monthly'}
                      onChange={(e) => handleInputChange('interestedPackage', e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-1">Monthly Management</div>
                      <div className="text-white/70 text-sm space-y-1">
                        <div>✔ Post weekly updates and offers</div>
                        <div>✔ Respond to reviews professionally</div>
                        <div>✔ Monitor analytics and ranking performance</div>
                        <div>✔ Keep your profile active and competitive</div>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#7BB9E8]/30 cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="interestedPackage"
                      value="both"
                      checked={formData.interestedPackage === 'both'}
                      onChange={(e) => handleInputChange('interestedPackage', e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-1">Both Packages</div>
                      <div className="text-white/70 text-sm">Setup + Monthly Management</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Additional Message (Optional)
                </label>
                <textarea
                  autoComplete="off"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                  placeholder="Tell us about your business or any specific needs..."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer with Submit Button */}
        <div className="sticky bottom-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10 px-6 py-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="gbp-form"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#7BB9E8] hover:bg-[#6AA8D7] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(GoogleBusinessProfileModal)

