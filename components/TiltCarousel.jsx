'use client'

import { useEffect, useRef, useState, memo } from 'react'
import Image from 'next/image'
import styles from './TiltCarousel.module.css'

/**
 * TiltCarousel - Production-ready tilt card loop component for Yo Marketing
 * 
 * Tweak guide:
 * - Animation speed: Change `DURATION` constant (default: 2.0)
 * - Stagger delay: Change `STAGGER` constant (default: 0.45)
 * - Tilt angle: Change `TILT_ANGLE` constant (default: 10)
 * - Distance: Change `DISTANCE` constant (default: 520)
 * - Breathing pulse: Change `BREATH_DURATION` constant (default: 3.6)
 * - Card dimensions: Modify CSS variables in TiltCarousel.module.css
 */
const DURATION = 2.0 // seconds per card movement cycle
const STAGGER = 0.45 // seconds between cards entering
const TILT_ANGLE = 10 // degrees for enter/exit tilt
const DISTANCE = 520 // pixels for horizontal movement (desktop)
const BREATH_DURATION = 3.6 // seconds for breathing pulse cycle

function TiltCarousel({ cards = [] }) {
  const containerRef = useRef(null)
  const carouselRef = useRef(null)
  const timelineRef = useRef(null)
  const breathTimelineRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const dragCurrentX = useRef(0)

  // Calculate responsive distance
  const getDistance = () => {
    if (typeof window === 'undefined') return DISTANCE
    return window.innerWidth <= 720 ? 400 : DISTANCE
  }

  // Initialize GSAP timeline and animations
  useEffect(() => {
    if (typeof window === 'undefined' || !carouselRef.current || cards.length === 0) return

    // Dynamically import GSAP only when needed
    import('gsap').then(({ gsap }) => {
      const carousel = carouselRef.current
      if (!carousel) return
      
      const cardElements = carousel.querySelectorAll(`.${styles.card}`)
      
      if (cardElements.length === 0) return

      const distance = getDistance()
      
      // Kill existing timelines
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (breathTimelineRef.current) {
        breathTimelineRef.current.kill()
      }

      // Create main timeline for card movement
      const tl = gsap.timeline({ repeat: -1, paused: isPaused })
      timelineRef.current = tl

      // Animate each card
      cardElements.forEach((card, index) => {
        // Set initial position (off-screen right)
        gsap.set(card, {
          x: distance,
          rotationY: TILT_ANGLE,
          scale: 0.98,
          opacity: 0.8,
          zIndex: 1,
        })

        // Create animation for this card
        const cardTl = gsap.timeline()
        
        // Enter: move to center
        cardTl.to(card, {
          x: 0,
          rotationY: 0,
          scale: 1.03,
          opacity: 1,
          zIndex: 10,
          duration: DURATION,
          ease: 'power2.inOut',
        })
        
        // Exit: move to left
        cardTl.to(card, {
          x: -distance,
          rotationY: -TILT_ANGLE,
          scale: 0.96,
          opacity: 0.8,
          zIndex: 1,
          duration: DURATION,
          ease: 'power2.inOut',
        })
        
        // Reset: instantly jump back to right (seamless loop)
        cardTl.set(card, {
          x: distance,
          rotationY: TILT_ANGLE,
          scale: 0.98,
          opacity: 0.8,
          zIndex: 1,
        })

        // Add to main timeline with stagger
        tl.add(cardTl, index * STAGGER)
      })
      
      // Calculate total timeline duration for seamless loop
      const totalDuration = (cardElements.length * STAGGER) + (DURATION * 2)
      
      // Set timeline to repeat seamlessly
      tl.repeat(-1)

      // Create breathing pulse animation
      const breathTl = gsap.timeline({ repeat: -1, yoyo: true, paused: isPaused })
      breathTimelineRef.current = breathTl
      
      breathTl.to(carousel, {
        scale: 1.005,
        duration: BREATH_DURATION / 2,
        ease: 'sine.inOut',
      })

      // Start animations
      if (!isPaused) {
        tl.play()
        breathTl.play()
      }
    }).catch((error) => {
      console.error('Failed to load GSAP:', error)
    })

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (breathTimelineRef.current) {
        breathTimelineRef.current.kill()
      }
    }
  }, [cards, isPaused])

  // Handle pause on hover
  const handleMouseEnter = () => {
    if (isDragging) return
    setIsPaused(true)
    if (timelineRef.current) timelineRef.current.pause()
    if (breathTimelineRef.current) breathTimelineRef.current.pause()
  }

  const handleMouseLeave = () => {
    if (isDragging) return
    setIsPaused(false)
    if (timelineRef.current) timelineRef.current.play()
    if (breathTimelineRef.current) breathTimelineRef.current.play()
  }

  // Handle swipe/drag on touch
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return
    setIsDragging(true)
    dragStartX.current = e.touches[0].clientX
    dragCurrentX.current = dragStartX.current
    
    if (timelineRef.current) timelineRef.current.pause()
    if (breathTimelineRef.current) breathTimelineRef.current.pause()
  }

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return
    e.preventDefault()
    
    dragCurrentX.current = e.touches[0].clientX
    const deltaX = dragCurrentX.current - dragStartX.current
    
    // Nudge cards based on drag
    if (carouselRef.current) {
      const cardElements = carouselRef.current.querySelectorAll(`.${styles.card}`)
      cardElements.forEach((card) => {
        const currentX = gsap.getProperty(card, 'x') || 0
        gsap.set(card, { x: currentX + deltaX * 0.1 })
      })
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    dragStartX.current = 0
    dragCurrentX.current = 0
    
    // Resume or restart animation
    setIsPaused(false)
    if (timelineRef.current) timelineRef.current.play()
    if (breathTimelineRef.current) breathTimelineRef.current.play()
  }

  // Default cards if none provided
  const displayCards = cards.length > 0 ? cards : [
    { id: '1', title: 'Success Story 1', subtitle: 'Client Name', tag: 'E-commerce', image: 'https://via.placeholder.com/320x420/1a1a1a/7BB9E8?text=Card+1' },
    { id: '2', title: 'Success Story 2', subtitle: 'Client Name', tag: 'CPG', image: 'https://via.placeholder.com/320x420/1a1a1a/7BB9E8?text=Card+2' },
    { id: '3', title: 'Success Story 3', subtitle: 'Client Name', tag: 'Retail', image: 'https://via.placeholder.com/320x420/1a1a1a/7BB9E8?text=Card+3' },
    { id: '4', title: 'Success Story 4', subtitle: 'Client Name', tag: 'B2B', image: 'https://via.placeholder.com/320x420/1a1a1a/7BB9E8?text=Card+4' },
    { id: '5', title: 'Success Story 5', subtitle: 'Client Name', tag: 'SaaS', image: 'https://via.placeholder.com/320x420/1a1a1a/7BB9E8?text=Card+5' },
  ]

  return (
    <section 
      className={styles.container}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.perspectiveWrapper}>
        <div className={styles.carousel} ref={carouselRef}>
          {displayCards.map((card, index) => (
            <article
              key={card.id || index}
              className={styles.card}
              aria-label={`${card.title} - ${card.subtitle}`}
            >
              <div className={styles.cardGlow} />
              <div className={styles.cardImage}>
                <Image 
                  src={card.image} 
                  alt={card.title}
                  width={320}
                  height={420}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                {card.tag && (
                  <span className={styles.cardTag}>{card.tag}</span>
                )}
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardSubtitle}>{card.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(TiltCarousel)

