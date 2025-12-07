'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { multiColorPalette, colorSchemes } from './ParticleNetworkBackground'

export default function RingParticlesBackground({ 
  colorScheme = 'multiColor',
  particleCount,
  connectionDistance,
  mouseInteraction = false, // Disabled for better performance
}) {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const [isMobile, setIsMobile] = useState(false)
  const isVisibleRef = useRef(true)

  // Memoize color palette to prevent unnecessary re-renders
  const colorPalette = useMemo(() => {
    const isMultiColor = colorScheme === 'multiColor'
    if (isMultiColor) {
      return [...multiColorPalette, 
        { r: 255, g: 255, b: 255 },
        { r: 240, g: 240, b: 255 },
        { r: 255, g: 250, b: 240 },
      ]
    } else {
      const scheme = colorSchemes[colorScheme] || colorSchemes.websiteDesign
      return [scheme.primary, scheme.secondary, scheme.accent, 
              { r: 255, g: 255, b: 255 }, { r: 240, g: 240, b: 255 }]
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

    // OPTIMIZATION 1: Lower DPR - cap at 1.5 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5)
    let lastTime = 0
    // OPTIMIZATION 2: Lower FPS - 24fps is smooth enough for background effects
    const targetFPS = mobile ? 20 : 24
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

    // OPTIMIZATION 3: Balanced particle count for visual appeal + performance (+10%)
    const count = particleCount || (mobile ? 50 : 94)
    // OPTIMIZATION 4: Connection distance for visual network effect
    const maxDistance = connectionDistance || (mobile ? 110 : 140)
    const particles = []

    class RingParticle {
      constructor() {
        this.reset()
      }

      reset() {
        const rect = container.getBoundingClientRect()
        this.x = Math.random() * rect.width
        this.y = Math.random() * rect.height
        this.baseRadius = Math.random() * 2.5 + 1.5 // Slightly smaller rings
        this.ringWidth = Math.random() * 1 + 0.5
        this.speedX = (Math.random() - 0.5) * (mobile ? 0.15 : 0.25)
        this.speedY = (Math.random() - 0.5) * (mobile ? 0.15 : 0.25)
        this.rotationSpeed = (Math.random() - 0.5) * 0.015
        this.rotation = Math.random() * Math.PI * 2
        this.baseOpacity = Math.random() * 0.35 + 0.25 // Increased for more visibility
        this.pulseSpeed = Math.random() * 0.008 + 0.004
        this.pulseOffset = Math.random() * Math.PI * 2
        const colorIndex = Math.floor(Math.random() * colorPalette.length)
        this.colorRGB = colorPalette[colorIndex]
        this.segments = Math.floor(Math.random() * 2) + 5 // Fewer segments (was 6-8)
        this.segmentGap = Math.random() * 0.2 + 0.1
        this.hasGlow = Math.random() > 0.33 // More glowing particles (67% have glow, +10%)
      }

      update(deltaTime = 1) {
        this.x += this.speedX * deltaTime
        this.y += this.speedY * deltaTime
        this.rotation += this.rotationSpeed * deltaTime

        // OPTIMIZATION 5: Simplified mouse interaction - only when active
        if (mouseInteraction && !mobile && mouseRef.current.active) {
          const dx = mouseRef.current.x - this.x
          const dy = mouseRef.current.y - this.y
          const distSq = dx * dx + dy * dy // Avoid sqrt when possible
          
          if (distSq < 40000 && distSq > 0) { // 200^2 = 40000
            const distance = Math.sqrt(distSq)
            const force = (200 - distance) / 200
            this.x -= (dx / distance) * force * 0.2 * deltaTime
            this.y -= (dy / distance) * force * 0.2 * deltaTime
          }
        }

        const rect = container.getBoundingClientRect()
        if (this.x < -30) this.x = rect.width + 30
        if (this.x > rect.width + 30) this.x = -30
        if (this.y < -30) this.y = rect.height + 30
        if (this.y > rect.height + 30) this.y = -30
      }

      draw(time) {
        const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.15 + 0.85
        const opacity = this.baseOpacity * pulse
        const radius = this.baseRadius * (0.95 + pulse * 0.05)

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        // Enhanced glow effect - more visible and vibrant
        if (this.hasGlow) {
          const outerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 5)
          outerGlow.addColorStop(0, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${opacity * 0.5})`)
          outerGlow.addColorStop(0.4, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${opacity * 0.2})`)
          outerGlow.addColorStop(1, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, 0)`)
          
          ctx.beginPath()
          ctx.arc(0, 0, radius * 5, 0, Math.PI * 2)
          ctx.fillStyle = outerGlow
          ctx.fill()
        }

        // OPTIMIZATION 7: Reduced shadow blur - major performance gain
        const segmentAngle = (Math.PI * 2) / this.segments
        const gapAngle = this.segmentGap

        // Enhanced shadow glow on desktop
        if (!mobile && this.hasGlow) {
          ctx.shadowBlur = 15 // Increased for more glow
          ctx.shadowColor = `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${opacity * 1.0})`
        }

        for (let i = 0; i < this.segments; i++) {
          const startAngle = i * segmentAngle + gapAngle / 2
          const endAngle = (i + 1) * segmentAngle - gapAngle / 2

          ctx.beginPath()
          ctx.arc(0, 0, radius, startAngle, endAngle)
          ctx.strokeStyle = `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${opacity})`
          ctx.lineWidth = this.ringWidth
          ctx.lineCap = 'round'
          ctx.stroke()
        }
        
        ctx.shadowBlur = 0
        ctx.restore()
      }
    }

    // Initialize particles
    for (let i = 0; i < count; i++) {
      particles.push(new RingParticle())
    }
    particlesRef.current = particles

    // Mouse tracking with activity detection
    const rect = container.getBoundingClientRect()
    mouseRef.current = { x: rect.width / 2, y: rect.height / 2, active: false }
    
    let mouseTimeout
    const handleMouseMove = (e) => {
      if (!mobile && mouseInteraction) {
        const rect = container.getBoundingClientRect()
        mouseRef.current.x = e.clientX - rect.left
        mouseRef.current.y = e.clientY - rect.top
        mouseRef.current.active = true
        
        clearTimeout(mouseTimeout)
        mouseTimeout = setTimeout(() => {
          mouseRef.current.active = false
        }, 100)
      }
    }

    if (!mobile && mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    let time = 0
    let isAnimating = true
    
    // Function to start the animation loop
    const startAnimation = () => {
      if (animationFrameRef.current) return // Already running
      lastTime = 0 // Reset lastTime to avoid big jumps
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    // Function to stop the animation loop
    const stopAnimation = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
    
    const animate = (currentTime) => {
      if (!isAnimating || !isVisibleRef.current) {
        animationFrameRef.current = null
        return // Completely stop when not visible
      }
      
      if (lastTime === 0) lastTime = currentTime
      const elapsed = currentTime - lastTime
      
      if (elapsed >= frameInterval) {
        const deltaTime = elapsed / (1000 / 60)
        const rect = container.getBoundingClientRect()
        ctx.clearRect(0, 0, rect.width, rect.height)
        
        time += elapsed * 0.001

        // OPTIMIZATION 9: Drastically reduce max connections (was 100/50, now 30/15)
        const maxConnections = mobile ? 15 : 30
        let connectionCount = 0
        
        // OPTIMIZATION 10: Quick rejection before expensive sqrt
        for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
          for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            
            // Quick reject - skip if obviously too far
            if (Math.abs(dx) > maxDistance || Math.abs(dy) > maxDistance) continue
            
            const distSq = dx * dx + dy * dy
            if (distSq > maxDistance * maxDistance) continue
            
            const distance = Math.sqrt(distSq)
            const opacity = 0.25 * (1 - distance / maxDistance)
            
            // OPTIMIZATION 11: Simple line instead of gradient for connections
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${particles[i].colorRGB.r}, ${particles[i].colorRGB.g}, ${particles[i].colorRGB.b}, ${opacity})`
            ctx.lineWidth = mobile ? 0.5 : 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            connectionCount++
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

    // Start animation initially
    startAnimation()

    // OPTIMIZATION 12: Completely pause/resume animation based on visibility
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
          if (entry.isIntersecting) {
            // Resume animation when hero section becomes visible
            startAnimation()
          } else {
            // Completely stop animation when scrolled past
            stopAnimation()
          }
        })
      },
      { threshold: 0.01 } // Trigger when even 1% is visible
    )
    visibilityObserver.observe(container)

    // Resize handler with debounce
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeCanvas()
        checkMobile()
      }, 200)
    }
    
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      isAnimating = false
      visibilityObserver.disconnect()
      window.removeEventListener('resize', handleResize)
      if (!mobile && mouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
      stopAnimation() // Use the stop function for cleanup
      clearTimeout(resizeTimeout)
      clearTimeout(mouseTimeout)
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

