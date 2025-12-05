'use client'

import { useEffect, useRef, useState } from 'react'

// All 4 Service Colors Combined - Multi-Color Palette
export const multiColorPalette = [
  // Website Design - Blue
  { r: 123, g: 185, b: 232 },      // #7BB9E8 - Sky Blue
  { r: 74, g: 144, b: 226 },       // #4A90E2 - Ocean Blue
  
  // Lead Generation - Orange
  { r: 249, g: 115, b: 22 },       // #F97316 - Vibrant Orange
  { r: 251, g: 146, b: 60 },       // Lighter Orange
  
  // Google Business - Green
  { r: 16, g: 185, b: 129 },       // #10B981 - Emerald
  { r: 52, g: 211, b: 153 },       // #34D399 - Mint
  
  // SEO Services - Purple
  { r: 168, g: 85, b: 247 },       // #A855F7 - Purple
  { r: 192, g: 132, b: 252 },      // #C084FC - Light Purple
]

// Single Color Schemes (for fallback/alternative)
export const colorSchemes = {
  websiteDesign: {
    name: 'Website Design Blue',
    primary: { r: 123, g: 185, b: 232 },      // #7BB9E8 - Sky Blue
    secondary: { r: 74, g: 144, b: 226 },     // #4A90E2 - Ocean Blue
    accent: { r: 95, g: 166, b: 214 },        // #5FA6D6 - Cyan
  },
  leadGeneration: {
    name: 'Lead Generation Orange',
    primary: { r: 249, g: 115, b: 22 },       // #F97316 - Vibrant Orange
    secondary: { r: 251, g: 146, b: 60 },     // Lighter Orange
    accent: { r: 234, g: 88, b: 12 },         // Deep Orange
  },
  googleBusiness: {
    name: 'Google Business Green',
    primary: { r: 16, g: 185, b: 129 },       // #10B981 - Emerald
    secondary: { r: 5, g: 150, b: 105 },      // #059669 - Sea Green
    accent: { r: 52, g: 211, b: 153 },        // #34D399 - Mint
  },
  seoServices: {
    name: 'SEO Services Purple',
    primary: { r: 168, g: 85, b: 247 },       // #A855F7 - Purple
    secondary: { r: 147, g: 51, b: 234 },     // #9333EA - Deep Purple
    accent: { r: 192, g: 132, b: 252 },       // #C084FC - Light Purple
  },
  multiColor: {
    name: 'All Services Multi-Color',
    // Will use multiColorPalette for random colors
  }
}

export default function ParticleNetworkBackground({ 
  colorScheme = 'oceanBlue',
  particleCount,
  connectionDistance,
  mouseInteraction = true,
}) {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Get color palette - use multiColorPalette if multiColor, otherwise use scheme colors
  const isMultiColor = colorScheme === 'multiColor'
  const colorPalette = isMultiColor 
    ? multiColorPalette 
    : (() => {
        const scheme = colorSchemes[colorScheme] || colorSchemes.websiteDesign
        return [scheme.primary, scheme.secondary, scheme.accent]
      })()

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      return mobile
    }
    
    const mobile = checkMobile()
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const container = canvas.parentElement
    if (!container) return

    // High DPI support
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
    let lastTime = 0
    const targetFPS = mobile ? 30 : 60
    const frameInterval = 1000 / targetFPS

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()

    // Particle configuration
    const count = particleCount || (mobile ? 100 : 200)
    const maxDistance = connectionDistance || (mobile ? 120 : 150)
    const particles = []

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        const rect = container.getBoundingClientRect()
        this.x = Math.random() * rect.width
        this.y = Math.random() * rect.height
        this.size = Math.random() * 2.5 + 1
        this.speedX = (Math.random() - 0.5) * (mobile ? 0.3 : 0.5)
        this.speedY = (Math.random() - 0.5) * (mobile ? 0.3 : 0.5)
        this.baseOpacity = Math.random() * 0.4 + 0.3
        this.pulseSpeed = Math.random() * 0.015 + 0.008
        this.pulseOffset = Math.random() * Math.PI * 2
        // Randomly select from color palette (all 8 colors for multiColor, or 3 for single scheme)
        const colorIndex = Math.floor(Math.random() * colorPalette.length)
        this.colorRGB = colorPalette[colorIndex]
      }

      update(deltaTime = 1) {
        this.x += this.speedX * deltaTime
        this.y += this.speedY * deltaTime

        // Mouse interaction
        if (mouseInteraction && !mobile) {
          const dx = mouseRef.current.x - this.x
          const dy = mouseRef.current.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150 && distance > 0) {
            const force = (150 - distance) / 150
            this.x -= (dx / distance) * force * 0.5 * deltaTime
            this.y -= (dy / distance) * force * 0.5 * deltaTime
          }
        }

        // Wrap around edges
        const rect = container.getBoundingClientRect()
        if (this.x < 0) this.x = rect.width
        if (this.x > rect.width) this.x = 0
        if (this.y < 0) this.y = rect.height
        if (this.y > rect.height) this.y = 0
      }

      draw(time) {
        const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3 + 0.7
        const opacity = this.baseOpacity * pulse
        const glowSize = this.size * (2 + pulse)

        // Outer glow
        if (!mobile) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, glowSize * 4
          )
          gradient.addColorStop(0, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${opacity})`)
          gradient.addColorStop(0.4, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${opacity * 0.5})`)
          gradient.addColorStop(1, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, 0)`)

          ctx.beginPath()
          ctx.arc(this.x, this.y, glowSize * 4, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Core particle
        if (!mobile) {
          ctx.shadowBlur = 20
          ctx.shadowColor = `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, 0.9)`
        }
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${opacity})`
        ctx.fill()
        if (!mobile) ctx.shadowBlur = 0
      }
    }

    // Initialize particles
    for (let i = 0; i < count; i++) {
      particles.push(new Particle())
    }
    particlesRef.current = particles

    // Mouse tracking
    const rect = container.getBoundingClientRect()
    mouseRef.current.x = rect.width / 2
    mouseRef.current.y = rect.height / 2
    
    const handleMouseMove = (e) => {
      if (!mobile && mouseInteraction) {
        const rect = container.getBoundingClientRect()
        mouseRef.current.x = e.clientX - rect.left
        mouseRef.current.y = e.clientY - rect.top
      }
    }

    if (!mobile && mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    let time = 0
    const animate = (currentTime) => {
      if (lastTime === 0) lastTime = currentTime
      const elapsed = currentTime - lastTime
      
      if (elapsed >= frameInterval) {
        const deltaTime = elapsed / (1000 / 60)
        const rect = container.getBoundingClientRect()
        ctx.clearRect(0, 0, rect.width, rect.height)
        
        time += elapsed * 0.001

        // Draw connections
        const maxConnections = mobile ? 40 : 80
        let connectionCount = 0
        
        for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
          for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < maxDistance) {
              const opacity = 0.35 * (1 - distance / maxDistance)
              
              // Gradient line for depth
              const gradient = ctx.createLinearGradient(
                particles[i].x, particles[i].y,
                particles[j].x, particles[j].y
              )
              gradient.addColorStop(0, `rgba(${particles[i].colorRGB.r}, ${particles[i].colorRGB.g}, ${particles[i].colorRGB.b}, ${opacity})`)
              gradient.addColorStop(1, `rgba(${particles[j].colorRGB.r}, ${particles[j].colorRGB.g}, ${particles[j].colorRGB.b}, ${opacity})`)
              
              if (!mobile) {
                ctx.shadowBlur = 8
                // Use first color from palette for shadow
                const shadowColor = colorPalette[0]
                ctx.shadowColor = `rgba(${shadowColor.r}, ${shadowColor.g}, ${shadowColor.b}, 0.4)`
              }
              ctx.beginPath()
              ctx.strokeStyle = gradient
              ctx.lineWidth = mobile ? 1 : 1.5
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
              if (!mobile) ctx.shadowBlur = 0
              connectionCount++
            }
          }
        }

        // Draw particles
        particles.forEach(particle => {
          particle.update(deltaTime)
          particle.draw(time)
        })

        lastTime = currentTime
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    // Resize handler
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeCanvas()
        checkMobile()
      }, 150)
    }
    
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      if (!mobile && mouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearTimeout(resizeTimeout)
    }
  }, [colorPalette, particleCount, connectionDistance, mouseInteraction, isMultiColor])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* Dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
        aria-hidden="true"
      />
      
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.5) 100%)',
        }}
      />
    </div>
  )
}
