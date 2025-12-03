'use client'

import { useState, useRef, memo, useCallback } from 'react'
import { useRouter } from 'next/navigation'

function WebsiteSurveyModal({ isOpen, onClose }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)
  const logoInputRef = useRef(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [isLogoDragActive, setIsLogoDragActive] = useState(false)
  
  const totalSteps = 8
  
  const [formData, setFormData] = useState({
    // Website Goals
    websiteGoals: [],
    
    // Functionality Needs
    functionalityNeeds: [],
    otherFeatures: '',
    
    // Design & Branding
    hasLogo: '',
    hasBrandColors: '',
    brandColors: ['', '', ''],
    designRequests: '',
    preferredFonts: '',
    referenceWebsites: '',
    
    // Social Media Links
    linkSocialMedia: '',
    facebookLink: '',
    youtubeLink: '',
    tiktokLink: '',
    instagramLink: '',
    
    // Content & Services
    servicesList: '',
    businessDescription: '',
    specialOffers: '',
    uploadedFiles: [],
    logoFile: null,
    
    // Domain & Hosting
    hasWebsite: '',
    domainName: '',
    needDomainHelp: '',
    
    // Business Basics
    ownerContact: '',
    businessName: '',
    phone: '',
    email: '',
    businessAddress: '',
    
    // Legal / Copyright
    needContentWriting: '',
    hasLegalRequirements: '',
    privacyPolicy: false,
    disclaimer: false,
    terms: false,
    agreeToTerms: false,
  })

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleCheckboxChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }, [])

  // Helper function to format file size
  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }, [])

  // Helper function to get file icon
  const getFileIcon = useCallback((file) => {
    if (file.type.startsWith('image/')) {
      return (
        <svg className="w-5 h-5 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    } else if (file.type === 'application/pdf') {
      return (
        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    } else {
      return (
        <svg className="w-5 h-5 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  }, [])

  // Handle drag and drop for files
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...files]
      }))
    }
  }, [])

  // Handle drag and drop for logo
  const handleLogoDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLogoDragActive(true)
  }, [])

  const handleLogoDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLogoDragActive(false)
  }, [])

  const handleLogoDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLogoDragActive(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        logoFile: file
      }))
    }
  }, [])

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files]
    }))
  }, [])

  const handleLogoUpload = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        logoFile: file
      }))
    }
  }, [])

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }))
  }

  const removeLogo = () => {
    setFormData(prev => ({
      ...prev,
      logoFile: null
    }))
    if (logoInputRef.current) {
      logoInputRef.current.value = ''
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateStep = () => {
    if (currentStep === 7) {
      // Business Basics - required fields (ownerContact, phone, email are required for GHL contact)
      if (!formData.ownerContact || !formData.phone || !formData.email) {
        return false
      }
    }
    if (currentStep === 8) {
      // Legal - must agree to terms
      if (!formData.agreeToTerms) {
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep()) {
      if (currentStep === 7) {
        const missing = []
        if (!formData.ownerContact) missing.push('Owner / Primary Contact')
        if (!formData.phone) missing.push('Phone')
        if (!formData.email) missing.push('Email')
        alert(`Please fill in all required fields: ${missing.join(', ')}`)
      } else {
        alert('Please fill in all required fields')
      }
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'uploadedFiles') {
          formData.uploadedFiles.forEach((file, index) => {
            formDataToSend.append(`files`, file)
          })
        } else if (key === 'logoFile') {
          // Handle logo file separately
          if (formData.logoFile) {
            formDataToSend.append('logo', formData.logoFile)
          }
        } else if (Array.isArray(formData[key])) {
          formDataToSend.append(key, JSON.stringify(formData[key]))
        } else {
          formDataToSend.append(key, formData[key] || '')
        }
      })

      console.log('📤 Submitting survey form...')
      console.log('Form data:', {
        ownerContact: formData.ownerContact,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        websiteGoals: formData.websiteGoals,
        functionalityNeeds: formData.functionalityNeeds
      })

      const response = await fetch('/api/survey', {
        method: 'POST',
        body: formDataToSend,
      })

      console.log('📥 Response status:', response.status)
      const result = await response.json()
      console.log('📥 Response data:', result)

      if (response.ok) {
        console.log('✅ Survey submitted successfully!')
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
      console.error('Error details:', error.message, error.stack)
      alert('An error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              Website Assessment Form
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Step {currentStep} of {totalSteps}
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

        {/* Progress Bar */}
        <div className="h-1 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#7BB9E8] to-[#5fa6db] transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
          <form onSubmit={handleSubmit} id="survey-form">
            {/* Step 1: Website Goals */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Website Goals
                  </h3>
                  <p className="text-white/70 mb-6">What do you want your website to achieve? (Select all that apply)</p>
                  <div className="space-y-3">
                    {['Sell products online', 'Get more calls', 'Showcase services', 'Collect leads', 'Booking / Appointments'].map((goal) => (
                      <label key={goal} className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#7BB9E8]/30 cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={formData.websiteGoals.includes(goal)}
                          onChange={() => handleCheckboxChange('websiteGoals', goal)}
                          className="w-5 h-5 text-[#7BB9E8] bg-white/5 border-white/20 rounded focus:ring-[#7BB9E8]"
                        />
                        <span className="ml-3 text-white">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Functionality Needs */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Functionality Needs
                  </h3>
                  <p className="text-white/70 mb-6">What features does your website need? (Select all that apply)</p>
                  <div className="space-y-3">
                    {['Contact Form', 'Click-to-Call Button', 'Appointment Booking', 'Online Payments', 'Other Features'].map((feature) => (
                      <label key={feature} className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#7BB9E8]/30 cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={formData.functionalityNeeds.includes(feature)}
                          onChange={() => handleCheckboxChange('functionalityNeeds', feature)}
                          className="w-5 h-5 text-[#7BB9E8] bg-white/5 border-white/20 rounded focus:ring-[#7BB9E8]"
                        />
                        <span className="ml-3 text-white">{feature}</span>
                      </label>
                    ))}
                  </div>
                  {formData.functionalityNeeds.includes('Other Features') && (
                    <div className="mt-4">
                      <label className="block text-white/90 mb-2">Please specify other features</label>
                      <textarea
                        value={formData.otherFeatures}
                        onChange={(e) => handleInputChange('otherFeatures', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                        placeholder="Describe the other features you need..."
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Design & Branding */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Design & Branding
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/90 mb-2">Do you already have a logo?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasLogo"
                            value="Yes"
                            checked={formData.hasLogo === 'Yes'}
                            onChange={(e) => handleInputChange('hasLogo', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasLogo"
                            value="No"
                            checked={formData.hasLogo === 'No'}
                            onChange={(e) => handleInputChange('hasLogo', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">No</span>
                        </label>
                      </div>
                      
                      {formData.hasLogo === 'Yes' && (
                        <div className="mt-4">
                          <label className="block text-white/90 mb-2">Upload your logo</label>
                          <input
                            ref={logoInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            id="logo-upload-input"
                            className="hidden"
                          />
                          {!formData.logoFile ? (
                            <div
                              onDragOver={handleLogoDragOver}
                              onDragLeave={handleLogoDragLeave}
                              onDrop={handleLogoDrop}
                              onClick={() => logoInputRef.current?.click()}
                              className={`
                                relative border-2 border-dashed rounded-xl p-8 text-center
                                transition-all duration-300 cursor-pointer
                                ${isLogoDragActive 
                                  ? 'border-[#7BB9E8] bg-[#7BB9E8]/10 scale-[1.02] shadow-lg shadow-[#7BB9E8]/20' 
                                  : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                                }
                              `}
                            >
                              <div className="flex flex-col items-center gap-4">
                                <div className={`
                                  w-16 h-16 rounded-full bg-white/5 flex items-center justify-center
                                  transition-transform duration-300
                                  ${isLogoDragActive ? 'scale-110' : ''}
                                `}>
                                  <svg className={`w-8 h-8 transition-colors ${isLogoDragActive ? 'text-[#7BB9E8]' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-white font-medium text-base">
                                    {isLogoDragActive ? 'Drop logo here' : 'Drag & drop your logo'}
                                  </p>
                                  <p className="text-white/50 text-sm mt-1">
                                    or <span className="text-[#7BB9E8] hover:underline">browse</span>
                                  </p>
                                  <p className="text-white/40 text-xs mt-2">
                                    PNG, JPG, SVG or WEBP (Max 5MB)
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <div className="flex items-start space-x-4">
                                  {/* Logo Preview */}
                                  {formData.logoFile.type.startsWith('image/') ? (
                                    <div className="flex-shrink-0">
                                      <img
                                        src={URL.createObjectURL(formData.logoFile)}
                                        alt="Logo preview"
                                        className="w-20 h-20 object-cover rounded-lg border border-white/10 shadow-lg"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex-shrink-0 w-20 h-20 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                                      {getFileIcon(formData.logoFile)}
                                    </div>
                                  )}
                                  {/* File Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-white/90 text-sm font-medium truncate">{formData.logoFile.name}</p>
                                        <p className="text-white/50 text-xs mt-1">{formatFileSize(formData.logoFile.size)}</p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          removeLogo()
                                        }}
                                        className="ml-3 text-red-400 hover:text-red-300 text-sm px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-red-400/10"
                                        aria-label="Remove logo"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Do you have brand colors HEX code?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasBrandColors"
                            value="Yes"
                            checked={formData.hasBrandColors === 'Yes'}
                            onChange={(e) => handleInputChange('hasBrandColors', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasBrandColors"
                            value="No"
                            checked={formData.hasBrandColors === 'No'}
                            onChange={(e) => handleInputChange('hasBrandColors', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">No</span>
                        </label>
                      </div>
                    </div>

                    {formData.hasBrandColors === 'Yes' && (
                      <div>
                        <label className="block text-white/90 mb-2">Colors You Like to Add</label>
                        <div className="grid grid-cols-3 gap-4">
                          {[0, 1, 2].map((index) => (
                            <div key={index}>
                              <input
                                type="color"
                                value={formData.brandColors[index] || '#7BB9E8'}
                                onChange={(e) => {
                                  const newColors = [...formData.brandColors]
                                  newColors[index] = e.target.value
                                  handleInputChange('brandColors', newColors)
                                }}
                                className="w-full h-12 rounded-lg cursor-pointer"
                              />
                            <input
                              type="text"
                              autoComplete="off"
                              placeholder={`Color ${index + 1}`}
                              value={formData.brandColors[index] || ''}
                              onChange={(e) => {
                                const newColors = [...formData.brandColors]
                                newColors[index] = e.target.value
                                handleInputChange('brandColors', newColors)
                              }}
                              className="w-full mt-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                            />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-white/90 mb-2">Design, colors, and or custom requests</label>
                      <textarea
                        value={formData.designRequests}
                        onChange={(e) => handleInputChange('designRequests', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                        placeholder="Describe your design preferences..."
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Preferred Fonts / Style</label>
                      <input
                        type="text"
                        value={formData.preferredFonts}
                        onChange={(e) => handleInputChange('preferredFonts', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                        placeholder="e.g., Modern, Classic, Bold..."
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Any websites you like</label>
                      <input
                        type="text"
                        value={formData.referenceWebsites}
                        onChange={(e) => handleInputChange('referenceWebsites', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                        placeholder="Enter website URLs..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Social Media Links */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Social Media Links
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/90 mb-2">Do you like to link Social Media?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="linkSocialMedia"
                            value="Yes"
                            checked={formData.linkSocialMedia === 'Yes'}
                            onChange={(e) => handleInputChange('linkSocialMedia', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="linkSocialMedia"
                            value="No"
                            checked={formData.linkSocialMedia === 'No'}
                            onChange={(e) => handleInputChange('linkSocialMedia', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">No</span>
                        </label>
                      </div>
                    </div>

                    {formData.linkSocialMedia === 'Yes' && (
                      <>
                        <div>
                          <label className="block text-white/90 mb-2">Facebook Link</label>
                        <input
                          type="url"
                          autoComplete="url"
                          value={formData.facebookLink}
                          onChange={(e) => handleInputChange('facebookLink', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                          placeholder="https://facebook.com/yourpage"
                        />
                        </div>
                        <div>
                          <label className="block text-white/90 mb-2">YouTube Link</label>
                        <input
                          type="url"
                          autoComplete="url"
                          value={formData.youtubeLink}
                          onChange={(e) => handleInputChange('youtubeLink', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                          placeholder="https://youtube.com/yourchannel"
                        />
                        </div>
                        <div>
                          <label className="block text-white/90 mb-2">TikTok Link</label>
                        <input
                          type="url"
                          autoComplete="url"
                          value={formData.tiktokLink}
                          onChange={(e) => handleInputChange('tiktokLink', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                          placeholder="https://tiktok.com/@yourhandle"
                        />
                        </div>
                        <div>
                          <label className="block text-white/90 mb-2">Instagram Link</label>
                        <input
                          type="url"
                          autoComplete="url"
                          value={formData.instagramLink}
                          onChange={(e) => handleInputChange('instagramLink', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                          placeholder="https://instagram.com/yourhandle"
                        />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Content & Services */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Content & Services
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/90 mb-2">List of Services / Products</label>
                      <textarea
                        value={formData.servicesList}
                        onChange={(e) => handleInputChange('servicesList', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                        placeholder="List your services or products..."
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Short Business Description / About Us</label>
                      <textarea
                        value={formData.businessDescription}
                        onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                        placeholder="Tell us about your business..."
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Special Offers / Promotion</label>
                      <textarea
                        value={formData.specialOffers}
                        onChange={(e) => handleInputChange('specialOffers', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                        placeholder="Any special offers or promotions..."
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Upload photos / videos (staff, before/after, etc.)</label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        id="file-upload-input"
                        className="hidden"
                      />
                      {formData.uploadedFiles.length === 0 ? (
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`
                            relative border-2 border-dashed rounded-xl p-8 text-center
                            transition-all duration-300 cursor-pointer
                            ${isDragActive 
                              ? 'border-[#7BB9E8] bg-[#7BB9E8]/10 scale-[1.02] shadow-lg shadow-[#7BB9E8]/20' 
                              : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                            }
                          `}
                        >
                          <div className="flex flex-col items-center gap-4">
                            <div className={`
                              w-16 h-16 rounded-full bg-white/5 flex items-center justify-center
                              transition-transform duration-300
                              ${isDragActive ? 'scale-110' : ''}
                            `}>
                              <svg className={`w-8 h-8 transition-colors ${isDragActive ? 'text-[#7BB9E8]' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-white font-medium text-base">
                                {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                              </p>
                              <p className="text-white/50 text-sm mt-1">
                                or <span className="text-[#7BB9E8] hover:underline">browse</span>
                              </p>
                              <p className="text-white/40 text-xs mt-2">
                                Images, videos, PDF, DOC (Max 10MB per file)
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Add More Files Button */}
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                              border-2 border-dashed rounded-lg p-4 text-center
                              transition-all duration-300 cursor-pointer
                              ${isDragActive 
                                ? 'border-[#7BB9E8] bg-[#7BB9E8]/10' 
                                : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                              }
                            `}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <svg className={`w-5 h-5 transition-colors ${isDragActive ? 'text-[#7BB9E8]' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              <span className="text-white/70 text-sm">
                                {isDragActive ? 'Drop to add more files' : 'Add more files'}
                              </span>
                            </div>
                          </div>
                          {/* Total Size Display */}
                          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-white/5 to-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-white font-medium text-sm">
                                {formData.uploadedFiles.length} file{formData.uploadedFiles.length !== 1 ? 's' : ''} selected
                              </span>
                            </div>
                            <span className="text-white/60 text-xs font-medium">
                              Total: {formatFileSize(formData.uploadedFiles.reduce((sum, file) => sum + file.size, 0))}
                            </span>
                          </div>
                          {/* File Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {formData.uploadedFiles.map((file, index) => (
                              <div 
                                key={index} 
                                className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#7BB9E8]/10"
                              >
                                <div className="flex items-start space-x-3">
                                  {/* File Preview/Icon */}
                                  {file.type.startsWith('image/') ? (
                                    <div className="flex-shrink-0 relative">
                                      <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-16 h-16 object-cover rounded-lg border border-white/10 shadow-md"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors" />
                                    </div>
                                  ) : (
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10 flex items-center justify-center shadow-md">
                                      {getFileIcon(file)}
                                    </div>
                                  )}
                                  {/* File Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-white/90 text-sm font-medium truncate" title={file.name}>
                                          {file.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className="text-white/50 text-xs">{formatFileSize(file.size)}</span>
                                          <span className="text-white/30">•</span>
                                          <span className="text-white/50 text-xs truncate">{file.type?.split('/')[1]?.toUpperCase() || 'FILE'}</span>
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="flex-shrink-0 text-red-400 hover:text-red-300 text-sm p-1.5 rounded-lg transition-all duration-200 hover:bg-red-400/10 opacity-0 group-hover:opacity-100"
                                        aria-label={`Remove ${file.name}`}
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Domain & Hosting */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Domain & Hosting
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/90 mb-2">Do you already have a website?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasWebsite"
                            value="Yes"
                            checked={formData.hasWebsite === 'Yes'}
                            onChange={(e) => handleInputChange('hasWebsite', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasWebsite"
                            value="No"
                            checked={formData.hasWebsite === 'No'}
                            onChange={(e) => handleInputChange('hasWebsite', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">No</span>
                        </label>
                      </div>
                    </div>

                    {formData.hasWebsite === 'Yes' && (
                      <div>
                        <label className="block text-white/90 mb-2">Current Domain Name</label>
                        <input
                          type="text"
                          autoComplete="url"
                          value={formData.domainName}
                          onChange={(e) => handleInputChange('domainName', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                          placeholder="yoursite.com"
                        />
                        <p className="text-white/50 text-sm mt-2">Enter your current website domain (optional)</p>
                      </div>
                    )}

                    {formData.hasWebsite === 'No' && (
                      <>
                        <div>
                          <label className="block text-white/90 mb-2">Do you need help purchasing a domain (yoursite.com)?</label>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="needDomainHelp"
                                value="Yes"
                                checked={formData.needDomainHelp === 'Yes'}
                                onChange={(e) => handleInputChange('needDomainHelp', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="needDomainHelp"
                                value="No"
                                checked={formData.needDomainHelp === 'No'}
                                onChange={(e) => handleInputChange('needDomainHelp', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">No</span>
                            </label>
                          </div>
                        </div>

                        {formData.needDomainHelp === 'Yes' && (
                          <div>
                            <label className="block text-white/90 mb-2">Domain Name for your website</label>
                            <input
                              type="text"
                              value={formData.domainName}
                              onChange={(e) => handleInputChange('domainName', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                              placeholder="yoursite.com"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Business Basics */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Business Basics
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/90 mb-2">Owner / Primary Contact <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.ownerContact}
                        onChange={(e) => handleInputChange('ownerContact', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                        placeholder="Full Name"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Business Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        required
                        autoComplete="organization"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                        placeholder="Your Business Name"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Phone <span className="text-red-400">*</span></label>
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

                    <div>
                      <label className="block text-white/90 mb-2">Email <span className="text-red-400">*</span></label>
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
                      <label className="block text-white/90 mb-2">Business Address</label>
                      <textarea
                        autoComplete="street-address"
                        value={formData.businessAddress}
                        onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                        placeholder="Street Address, City, State, ZIP"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 8: Legal / Copyright */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Legal / Copyright
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/90 mb-2">Do you like us to write the content for you?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="needContentWriting"
                            value="Yes"
                            checked={formData.needContentWriting === 'Yes'}
                            onChange={(e) => handleInputChange('needContentWriting', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="needContentWriting"
                            value="No"
                            checked={formData.needContentWriting === 'No'}
                            onChange={(e) => handleInputChange('needContentWriting', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Any Legal Requirements (Privacy Policy, Disclaimer, Terms)?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasLegalRequirements"
                            value="Yes"
                            checked={formData.hasLegalRequirements === 'Yes'}
                            onChange={(e) => handleInputChange('hasLegalRequirements', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasLegalRequirements"
                            value="No"
                            checked={formData.hasLegalRequirements === 'No'}
                            onChange={(e) => handleInputChange('hasLegalRequirements', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">No</span>
                        </label>
                      </div>
                    </div>

                    {formData.hasLegalRequirements === 'Yes' && (
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.privacyPolicy}
                            onChange={(e) => handleInputChange('privacyPolicy', e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-white">Privacy Policy</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.disclaimer}
                            onChange={(e) => handleInputChange('disclaimer', e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-white">Disclaimer</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.terms}
                            onChange={(e) => handleInputChange('terms', e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-white">Terms</span>
                        </label>
                      </div>
                    )}

                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={formData.agreeToTerms}
                          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                          className="mt-1 mr-3"
                        />
                        <span className="text-white/90 text-sm">
                          By checking this box, I agree to the terms and conditions provided by <strong>Yo Marketing Company</strong>. I authorize the company to contact me via SMS or phone call regarding free website offers, business growth services, and related updates. Message and data rates may apply. I understand that I may opt out at any time by replying <strong>STOP</strong>.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer with Navigation */}
        <div className="sticky bottom-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10 px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-[#7BB9E8] hover:bg-[#6AA8D7] text-white font-semibold rounded-lg transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              form="survey-form"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#7BB9E8] hover:bg-[#6AA8D7] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(WebsiteSurveyModal)

