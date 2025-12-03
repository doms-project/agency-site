'use client'

import { useState, useRef, useEffect, memo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

// Pastel color palette
const colors = {
  pink: '#FF8AB6',
  orange: '#FF7A2D',
  yellow: '#FFD66B',
  cyan: '#7EE7F7',
  purple: '#B692FF',
}

// Gummy avatar placeholder component
function GummyAvatar({ color, delay = 0 }) {
  return (
    <motion.div
      className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17, delay }}
    >
      <div className="w-8 h-8 rounded-full bg-white/30" />
    </motion.div>
  )
}

// Upload button component
function UploadButton({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onUpload(files[0])
    }
  }

  return (
    <motion.button
      type="button"
      className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        outline: isDragging ? `2px solid ${colors.pink}` : 'none',
        outlineOffset: '2px',
      }}
    >
      <motion.span
        className="flex items-center gap-1.5"
        animate={{ x: isHovered ? [0, 2, 0] : 0 }}
        transition={{ duration: 0.3 }}
      >
        Upload
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </motion.svg>
      </motion.span>
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  )
}

function SocialPlatformCard() {
  const cardRef = useRef(null)
  const [username, setUsername] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (e.clientX - centerX) / (rect.width / 2)
    const distanceY = (e.clientY - centerY) / (rect.height / 2)
    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Hero parallax animation
  const heroY = useMotionValue(0)
  const heroBlur = useMotionValue(0)
  const blurFilter = useTransform(heroBlur, (v) => `blur(${v}px)`)
  
  useEffect(() => {
    const interval = setInterval(() => {
      heroY.set(Math.sin(Date.now() / 2000) * 6)
      heroBlur.set(Math.sin(Date.now() / 800) * 2)
    }, 16)
    return () => clearInterval(interval)
  }, [heroY, heroBlur])

  // Custom cursor (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isDesktop = window.innerWidth >= 768

    if (isDesktop) {
      const cursor = document.createElement('div')
      cursor.className = 'custom-cursor'
      cursor.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s;
      `
      document.body.appendChild(cursor)

      const cursorHalo = document.createElement('div')
      cursorHalo.className = 'custom-cursor-halo'
      cursorHalo.style.cssText = `
        position: fixed;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.2);
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
      `
      document.body.appendChild(cursorHalo)

      const updateCursor = (e) => {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
        cursorHalo.style.left = e.clientX + 'px'
        cursorHalo.style.top = e.clientY + 'px'
      }

      const handleMouseMove = (e) => {
        updateCursor(e)
        const target = e.target
        if (target && target.closest && target.closest('.hero-artwork')) {
          cursor.style.width = '12px'
          cursor.style.height = '12px'
          cursorHalo.style.width = '32px'
          cursorHalo.style.height = '32px'
        } else {
          cursor.style.width = '8px'
          cursor.style.height = '8px'
          cursorHalo.style.width = '24px'
          cursorHalo.style.height = '24px'
        }
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.body.style.cursor = 'none'

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.body.style.cursor = 'auto'
        cursor.remove()
        cursorHalo.remove()
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#E0F2FE] to-white">
      <motion.div
        ref={cardRef}
        className="w-full max-w-[340px] bg-white rounded-2xl shadow-[0_24px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          scale: 1,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Hero Artwork Section */}
        <div className="relative h-48 overflow-hidden hero-artwork">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${colors.cyan} 0%, ${colors.purple} 25%, ${colors.pink} 50%, ${colors.orange} 75%, ${colors.yellow} 100%)`,
              y: heroY,
              filter: blurFilter,
            }}
          >
            {/* Pastel cloud shapes */}
            <motion.div
              className="absolute top-10 left-10 w-24 h-24 rounded-full opacity-60"
              style={{
                background: colors.pink,
                filter: 'blur(20px)',
                y: useTransform(heroY, (v) => v * 0.5),
              }}
            />
            <motion.div
              className="absolute top-20 right-16 w-32 h-32 rounded-full opacity-50"
              style={{
                background: colors.orange,
                filter: 'blur(25px)',
                y: useTransform(heroY, (v) => v * 0.7),
              }}
            />
            <motion.div
              className="absolute bottom-16 left-20 w-28 h-28 rounded-full opacity-55"
              style={{
                background: colors.yellow,
                filter: 'blur(22px)',
                y: useTransform(heroY, (v) => v * 0.6),
              }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-20 h-20 rounded-full opacity-65"
              style={{
                background: colors.cyan,
                filter: 'blur(18px)',
                y: useTransform(heroY, (v) => v * 0.4),
              }}
            />
          </motion.div>

          {/* Soft reflection at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3))',
              backdropFilter: 'blur(6px)',
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Tagline */}
          <div className="text-center space-y-1">
            <h2 className="text-lg font-medium text-gray-900" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
              Social Platform for Playful Personalities
            </h2>
            <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
              Where personalities come alive!
            </p>
          </div>

          {/* Gummy Avatars Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {[colors.pink, colors.orange, colors.yellow, colors.cyan, colors.purple].map((color, index) => (
                <GummyAvatar key={index} color={color} delay={index * 0.05} />
              ))}
            </div>
            <UploadButton onUpload={(file) => console.log('Upload:', file)} />
          </div>

          {/* Form Section */}
          <div className="space-y-4 pt-2">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
                Username
              </label>
              <motion.div
                className="relative"
                animate={{ y: isFocused ? -2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="yourname"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-[15px] focus:outline-none focus:border-[#FF8AB6] focus:ring-2 focus:ring-[#FF8AB6]/20 transition-all"
                  style={{
                    fontFamily: 'Inter, Poppins, sans-serif',
                    boxShadow: isFocused ? 'inset 0 2px 4px rgba(0,0,0,0.06)' : 'inset 0 1px 2px rgba(0,0,0,0.05)',
                  }}
                  aria-label="Username"
                />
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              type="button"
              className="w-full py-4 rounded-xl text-white font-semibold text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              style={{
                fontFamily: 'Inter, Poppins, sans-serif',
                background: 'linear-gradient(to bottom, #1a1a1a, #2d2d2d)',
              }}
              whileHover={{ y: -2, boxShadow: '0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              Join the Fun
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
// This component uses Framer Motion, so it should be lazy loaded when used
export default memo(SocialPlatformCard)
