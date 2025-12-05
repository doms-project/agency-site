'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { multiColorPalette, colorSchemes } from './ParticleNetworkBackground'

export default function RingParticlesBackground({ 
  colorScheme = 'multiColor',
  particleCount,
  connectionDistance,
  mouseInteraction = true,
}) {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Memoize color palette to prevent unnecessary re-renders
  const colorPalette = useMemo(() => {
    const isMultiColor = colorScheme === 'multiColor'
    if (isMultiColor) {
      return [...multiColorPalette, 
        // Add white color variants for contrast
        { r: 255, g: 255, b: 255 },      // Pure white
        { r: 240, g: 240, b: 255 },      // Slight blue-white tint
        { r: 255, g: 250, b: 240 },     // Slight warm white
      ]
    } else {
      const scheme = colorSchemes[colorScheme] || colorSchemes.websiteDesign
      return [scheme.primary, scheme.secondary, scheme.accent, 
              { r: 255, g: 255, b: 255 }, { r: 240, g: 240, b: 255 }] // Add white variants
    }
  }, [colorScheme])

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
    const count = particleCount || (mobile ? 80 : 150)
    const maxDistance = connectionDistance || (mobile ? 140 : 180)
    const particles = []

    class RingParticle {
      constructor() {
        this.reset()
      }

      reset() {
        const rect = container.getBoundingClientRect()
        this.x = Math.random() * rect.width
        this.y = Math.random() * rect.height
        this.baseRadius = Math.random() * 3 + 2 // Ring radius: 2-5px
        this.ringWidth = Math.random() * 1.5 + 0.5 // Ring stroke width: 0.5-2px
        this.speedX = (Math.random() - 0.5) * (mobile ? 0.2 : 0.4)
        this.speedY = (Math.random() - 0.5) * (mobile ? 0.2 : 0.4)
        this.rotationSpeed = (Math.random() - 0.5) * 0.02 // Slow rotation
        this.rotation = Math.random() * Math.PI * 2
        this.baseOpacity = Math.random() * 0.3 + 0.2
        this.pulseSpeed = Math.random() * 0.01 + 0.005
        this.pulseOffset = Math.random() * Math.PI * 2
        // Randomly select from color palette
        const colorIndex = Math.floor(Math.random() * colorPalette.length)
        this.colorRGB = colorPalette[colorIndex]
        // Ring segments (for animated ring effect)
        this.segments = Math.floor(Math.random() * 3) + 6 // 6-8 segments
        this.segmentGap = Math.random() * 0.3 + 0.1 // Gap between segments
        // Determine if particle has glow (fixed at creation, not random per frame)
        this.hasGlow = Math.random() > 0.7
      }

      update(deltaTime = 1) {
        this.x += this.speedX * deltaTime
        this.y += this.speedY * deltaTime
        this.rotation += this.rotationSpeed * deltaTime

        // Mouse interaction
        if (mouseInteraction && !mobile) {
          const dx = mouseRef.current.x - this.x
          const dy = mouseRef.current.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 200 && distance > 0) {
            const force = (200 - distance) / 200
            this.x -= (dx / distance) * force * 0.3 * deltaTime
            this.y -= (dy / distance) * force * 0.3 * deltaTime
          }
        }

        // Wrap around edges
        const rect = container.getBoundingClientRect()
        if (this.x < -50) this.x = rect.width + 50
        if (this.x > rect.width + 50) this.x = -50
        if (this.y < -50) this.y = rect.height + 50
        if (this.y > rect.height + 50) this.y = -50
      }

      draw(time) {
        const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.2 + 0.8
        const opacity = this.baseOpacity * pulse
        const radius = this.baseRadius * (0.9 + pulse * 0.1)

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        // Draw ring with segments (Google Antigravity style)
        const segmentAngle = (Math.PI * 2) / this.segments
        const gapAngle = this.segmentGap

        for (let i = 0; i < this.segments; i++) {
          const startAngle = i * segmentAngle + gapAngle / 2
          const endAngle = (i + 1) * segmentAngle - gapAngle / 2

          ctx.beginPath()
          ctx.arc(0, 0, radius, startAngle, endAngle)
          ctx.strokeStyle = `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${opacity})`
          ctx.lineWidth = this.ringWidth
          ctx.lineCap = 'round'
          
          if (!mobile) {
            ctx.shadowBlur = 8
            ctx.shadowColor = `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, 0.6)`
          }
          
          ctx.stroke()
          if (!mobile) ctx.shadowBlur = 0
        }

        // Optional: Draw subtle center glow (only for some particles, determined at creation)
        if (!mobile && this.hasGlow) {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 2)
          gradient.addColorStop(0, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${opacity * 0.3})`)
          gradient.addColorStop(1, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, 0)`)
          
          ctx.beginPath()
          ctx.arc(0, 0, radius * 2, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        ctx.restore()
      }
    }

    // Initialize particles
    for (let i = 0; i < count; i++) {
      particles.push(new RingParticle())
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
    let isAnimating = true
    const animate = (currentTime) => {
      if (!isAnimating) return
      
      if (lastTime === 0) lastTime = currentTime
      const elapsed = currentTime - lastTime
      
      if (elapsed >= frameInterval) {
        const deltaTime = elapsed / (1000 / 60)
        const rect = container.getBoundingClientRect()
        // Clear with full alpha to prevent ghosting
        ctx.clearRect(0, 0, rect.width, rect.height)
        
        time += elapsed * 0.001

        // Draw connections between nearby particles
        const maxConnections = mobile ? 50 : 100
        let connectionCount = 0
        
        for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
          for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < maxDistance) {
              const opacity = 0.25 * (1 - distance / maxDistance)
              
              // Gradient line connecting two particles
              const gradient = ctx.createLinearGradient(
                particles[i].x, particles[i].y,
                particles[j].x, particles[j].y
              )
              gradient.addColorStop(0, `rgba(${particles[i].colorRGB.r}, ${particles[i].colorRGB.g}, ${particles[i].colorRGB.b}, ${opacity})`)
              gradient.addColorStop(1, `rgba(${particles[j].colorRGB.r}, ${particles[j].colorRGB.g}, ${particles[j].colorRGB.b}, ${opacity})`)
              
              if (!mobile) {
                ctx.shadowBlur = 6
                const shadowColor = colorPalette[0]
                ctx.shadowColor = `rgba(${shadowColor.r}, ${shadowColor.g}, ${shadowColor.b}, 0.3)`
              }
              
              ctx.beginPath()
              ctx.strokeStyle = gradient
              ctx.lineWidth = mobile ? 0.8 : 1
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
      isAnimating = false
      window.removeEventListener('resize', handleResize)
      if (!mobile && mouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      clearTimeout(resizeTimeout)
    }
  }, [colorPalette, particleCount, connectionDistance, mouseInteraction])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* Dark gradient base with subtle color tints */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0d1117] to-[#08090d]" />
      
      {/* Subtle radial color accents */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at 20% 30%, rgba(123, 185, 232, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 600px 800px at 80% 70%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 700px 700px at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Ring particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
        aria-hidden="true"
      />
      
      {/* Enhanced vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.5) 100%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.2) 100%)
          `,
        }}
      />
    </div>
  )
}
