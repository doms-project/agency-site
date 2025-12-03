'use client'

import { useState, useRef, memo, useCallback } from 'react'
import { useRouter } from 'next/navigation'

function WebsiteRevisionModal({ isOpen, onClose }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    websiteUrl: '',
    requestedChanges: '',
    priority: '',
    uploadedFiles: []
  })

  const priorityOptions = [
    'Low - No rush',
    'Medium - Within a week',
    'High - Within 2-3 days',
    'Urgent - ASAP'
  ]

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files]
    }))
  }, [])

  const removeFile = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email || !formData.priority) {
      alert('Please fill in all required fields: Name, Phone, Email, and Priority')
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData for file uploads
      const submitFormData = new FormData()
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'uploadedFiles') {
          submitFormData.append(key, formData[key])
        }
      })

      // Add files
      formData.uploadedFiles.forEach((file, index) => {
        submitFormData.append(`file_${index}`, file)
      })

      const response = await fetch('/api/website-revision', {
        method: 'POST',
        body: submitFormData,
      })

      const result = await response.json()

      if (response.ok) {
        if (process.env.NODE_ENV === 'development') {
        console.log('✅ Website Revision form submitted successfully!')
        console.log('Contact ID:', result.contactId)
        }
        router.push('/thank-you')
        onClose()
      } else {
        if (process.env.NODE_ENV === 'development') {
        console.error('❌ Submission failed:', result.error)
        }
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
              Website Revision Request
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Request updates or edits to your current website
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
          <form onSubmit={handleSubmit} id="website-revision-form">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                  placeholder="Your full name"
                />
              </div>

              {/* Business / Website Name */}
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Business / Website Name
                </label>
                <input
                  type="text"
                  autoComplete="organization"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                  placeholder="Your business or website name"
                />
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

              {/* Website URL */}
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Website (URL)
                </label>
                <input
                  type="url"
                  autoComplete="url"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Priority <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50"
                >
                  <option value="">Select priority</option>
                  {priorityOptions.map(option => (
                    <option key={option} value={option} className="bg-[#0a0a0a]">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Requested Changes */}
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Describe the requested changes
                </label>
                <textarea
                  value={formData.requestedChanges}
                  onChange={(e) => handleInputChange('requestedChanges', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 resize-none"
                  placeholder="Please describe what changes or updates you need on your website..."
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  File Upload (for screenshots or references)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
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
                          Images, PDF, DOC, DOCX (Max 10MB per file)
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
                <p className="text-xs text-white/50 mt-2">
                  Accepted: Images, PDF, Word documents
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-white/50">
            We&apos;ll review your request and respond within 24–48 hours.
          </p>
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
              form="website-revision-form"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#7BB9E8] hover:bg-[#5fa6d6] text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Revision Request'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(WebsiteRevisionModal)

