'use client'

import { useEffect, useRef, useState, memo } from 'react'

function ServiceHeroBackground({ color = { r: 123, g: 185, b: 232 }, colorPalette }) {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile device for performance optimization
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
      return isMobileDevice
    }
    
    const mobile = checkMobile()
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = canvas.parentElement
    if (!container) return

    // Optimize canvas for performance
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
    let animationId = null
    let lastTime = 0
    const targetFPS = mobile ? 30 : 60
    const frameInterval = 1000 / targetFPS

    const resizeCanvas = () => {
      const oldRect = container.getBoundingClientRect()
      const oldWidth = oldRect.width || canvas.width / dpr
      const oldHeight = oldRect.height || canvas.height / dpr
      
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)
      
      // Smoothly scale particle positions on resize instead of resetting
      if (oldWidth > 0 && oldHeight > 0 && particlesRef.current.length > 0) {
        const scaleX = rect.width / oldWidth
        const scaleY = rect.height / oldHeight
        particlesRef.current.forEach(particle => {
          particle.x = particle.x * scaleX
          particle.y = particle.y * scaleY
          // Keep particles within bounds
          if (particle.x < 0) particle.x = 0
          if (particle.x > rect.width) particle.x = rect.width
          if (particle.y < 0) particle.y = 0
          if (particle.y > rect.height) particle.y = rect.height
        })
      }
    }

    resizeCanvas()
    
    // Throttle resize for better performance
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeCanvas()
        checkMobile()
      }, 150)
    }
    
    window.addEventListener('resize', handleResize, { passive: true })

    // Particle system - reduce count on mobile for better performance
    const particleCount = mobile ? 36 : 68
    const particles = []

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        const rect = container.getBoundingClientRect()
        this.x = Math.random() * rect.width
        this.y = Math.random() * rect.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.55
        this.speedY = (Math.random() - 0.5) * 0.55
        this.opacity = Math.random() * 0.5 + 0.2
        const chosen = Array.isArray(colorPalette) && colorPalette.length
          ? colorPalette[Math.floor(Math.random() * colorPalette.length)]
          : color
        this.colorRGB = chosen
        this.color = `rgba(${chosen.r}, ${chosen.g}, ${chosen.b}, ${this.opacity})`
        this.pulseSpeed = Math.random() * 0.02 + 0.012
        this.pulseOffset = Math.random() * Math.PI * 2
      }

      update(deltaTime = 1) {
        // Use deltaTime for frame-rate independent movement
        const speedMultiplier = deltaTime
        this.x += this.speedX * speedMultiplier
        this.y += this.speedY * speedMultiplier

        // Mouse interaction - only on desktop for better mobile performance
        if (!mobile) {
          const dx = mouseRef.current.x - this.x
          const dy = mouseRef.current.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100 && distance > 0) {
            const force = (100 - distance) / 100
            // Smooth mouse interaction with easing
            this.x -= (dx / distance) * force * 0.3 * speedMultiplier
            this.y -= (dy / distance) * force * 0.3 * speedMultiplier
          }
        }

        // Smooth wrap around edges - use container dimensions
        const rect = container.getBoundingClientRect()
        // Wrap horizontally with smooth transition
        if (this.x < 0) {
          this.x = rect.width + this.x // Smooth wrap
        } else if (this.x > rect.width) {
          this.x = this.x - rect.width // Smooth wrap
        }
        // Wrap vertically with smooth transition
        if (this.y < 0) {
          this.y = rect.height + this.y // Smooth wrap
        } else if (this.y > rect.height) {
          this.y = this.y - rect.height // Smooth wrap
        }
      }

      draw(time) {
        // Pulsing glow effect
        const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3 + 0.7
        const glowSize = this.size * (mobile ? 1.4 : 1.8 + pulse * 0.6)
        const glowOpacity = this.opacity * (mobile ? 0.8 * pulse : 0.65 * pulse)

        // Outer glow - simplified on mobile
        if (!mobile) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, glowSize * 3
          )
          gradient.addColorStop(0, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${glowOpacity})`)
          gradient.addColorStop(0.5, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, ${glowOpacity * 0.45})`)
          gradient.addColorStop(1, `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, 0)`)

          // Draw glow
          ctx.beginPath()
          ctx.arc(this.x, this.y, glowSize * 3, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Core particle with shadow - reduced on mobile
        if (!mobile) {
          ctx.shadowBlur = 10
          ctx.shadowColor = `rgba(${this.colorRGB.r}, ${this.colorRGB.g}, ${this.colorRGB.b}, 0.6)`
        }
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        if (!mobile) ctx.shadowBlur = 0
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
    particlesRef.current = particles

    // Mouse tracking - only on desktop with smooth interpolation
    const rect = container.getBoundingClientRect()
    let targetMouseX = rect.width / 2
    let targetMouseY = rect.height / 2
    // Initialize mouse position to center to prevent sudden jumps
    mouseRef.current.x = targetMouseX
    mouseRef.current.y = targetMouseY
    
    const handleMouseMove = (e) => {
      if (!mobile) {
        const rect = container.getBoundingClientRect()
        targetMouseX = e.clientX - rect.left
        targetMouseY = e.clientY - rect.top
      }
    }
    
    // Smooth mouse position interpolation
    const updateMousePosition = () => {
      if (!mobile) {
        const lerp = 0.1 // Smooth interpolation factor
        mouseRef.current.x += (targetMouseX - mouseRef.current.x) * lerp
        mouseRef.current.y += (targetMouseY - mouseRef.current.y) * lerp
      }
    }

    if (!mobile) {
      canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    // Optimized animation loop with FPS control and smooth movement
    let time = 0
    const animate = (currentTime) => {
      if (lastTime === 0) lastTime = currentTime
      const elapsed = currentTime - lastTime
      
      if (elapsed >= frameInterval) {
        // Calculate deltaTime for frame-rate independent movement (normalized to 60fps)
        const deltaTime = elapsed / (1000 / 60)
        
        // Update mouse position smoothly
        updateMousePosition()
        
        // Clear with proper scaling
        const rect = container.getBoundingClientRect()
        ctx.clearRect(0, 0, rect.width, rect.height)
        
        // Update time smoothly based on actual elapsed time
        time += elapsed * 0.001

        // Draw connections - reduced on mobile for performance
        const maxConnections = mobile ? 30 : 60
        let connectionCount = 0
        
        for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
          for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < (mobile ? 100 : 120)) {
              const opacity = 0.3 * (1 - distance / (mobile ? 100 : 120))
              
              // Glow effect for connections - simplified on mobile
              if (!mobile) {
                ctx.shadowBlur = 10
                ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`
              }
              ctx.beginPath()
              ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
              ctx.lineWidth = mobile ? 1 : 1.5
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
              if (!mobile) ctx.shadowBlur = 0
              connectionCount++
            }
          }
        }

        // Update and draw particles with smooth deltaTime
        particles.forEach(particle => {
          particle.update(deltaTime)
          particle.draw(time)
        })

        lastTime = currentTime
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (!mobile) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearTimeout(resizeTimeout)
    }
  }, [color, colorPalette])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* Base gradient aligned with site colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#10151a] to-[#0a0a0a]" />
      {/* Subtle multicolor + white accents */}
      <div
        className="absolute inset-0 opacity-18"
        style={{
          background: `
            radial-gradient(ellipse 780px 580px at 20% 30%, rgba(123, 185, 232, 0.14) 0%, transparent 50%),
            radial-gradient(ellipse 620px 740px at 80% 70%, rgba(74, 144, 226, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 680px 680px at 50% 50%, rgba(255, 255, 255, 0.06) 0%, transparent 50%)
          `,
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(ServiceHeroBackground)


