'use client'

import { useEffect, useRef, useState } from 'react'

// Card data with glassmorphism design - Real Estate Business
const portfolioCards = [
  {
    id: 1,
    title: 'Real Estate Success',
    backgroundImage: '/images/johnson-U6Q6zVDgmSs-unsplash.jpg',
    logo: '/images/ChatGPT Image Sep 18, 2025, 11_14_48 PM.png',
    description: 'Transforming real estate businesses with cutting-edge digital strategies and proven growth systems.',
    stats: [
      { label: 'Leads Generated', value: '250+' },
      { label: 'Properties Sold', value: '150+' },
      { label: 'Revenue Growth', value: '300%' },
    ],
    link: 'https://mahoninghomebuyer.com/',
    design: {
      brightness: 1.2,
      contrast: 1.3,
      overlay: { from: '40', via: '50', to: '75' },
      logoSize: 'h-32 sm:h-40 md:h-48 lg:h-56',
      logoPosition: 'center', // 'center' or 'top-left'
      padding: 'p-6 sm:p-8 md:p-10',
      logoPadding: 'pt-2 sm:pt-2 md:pt-3',
      statsMargin: '-mt-12 sm:-mt-16 md:-mt-20',
    },
  },
  {
    id: 3,
    title: 'Rent a Scooter Tulum',
    backgroundImage: null, // No background image, using solid color
    logo: '/images/Logo Rent a scooter tulum.png',
    description: 'Rental business running on our CRM with website, automation, and wider business expansion.',
    stats: [
      { label: 'CRM Integration', value: '100%' },
      { label: 'Website Traffic', value: '50K+' },
      { label: 'Automation Rate', value: '85%' },
    ],
    link: 'https://rentscootertulum.com/',
    design: {
      brightness: 1.3,
      contrast: 1.3,
      overlay: { from: '35', via: '45', to: '70' },
      logoSize: 'h-24 sm:h-28 md:h-32 lg:h-36',
      logoPosition: 'center', // 'center' or 'top-left'
      padding: 'p-6 sm:p-8 md:p-10',
      logoPadding: 'pt-6 sm:pt-8 md:pt-10',
      statsMargin: '-mt-16 sm:-mt-20 md:-mt-24',
      statsLayout: 'grid', // 'grid' or 'vertical'
      statsWidth: 'w-full max-w-full', // Wider stats
      cardColor: '#E6E6E6', // Background color
    },
  },
  {
    id: 2,
    title: 'Dirt Bike Stunter',
    backgroundImage: '/images/instasave.website_476927403_18482611003022000_5756383078473439164_n.jpg',
    logo: '/images/Black White Modern Grunge Typographic Brand Logo (Website) (1).png',
    description: 'Dirt bike stunter showing the world via social media sponsoring to companies related to his stunt.',
    stats: [
      { label: 'Monthly Views', value: '3M+' },
      { label: 'Sponsor Campaigns', value: '20+' },
      { label: 'Social Growth', value: '250%' },
    ],
    link: 'https://choppinthrottles.com/',
    design: {
      brightness: 1.5,
      contrast: 1.4,
      overlay: { from: '30', via: '40', to: '65' },
      logoSize: 'h-20 sm:h-24 md:h-28 lg:h-32',
      logoPosition: 'center', // 'center' or 'top-left'
      padding: 'p-4 sm:p-6 md:p-8',
      logoPadding: 'pt-4 sm:pt-5 md:pt-6',
      statsMargin: '-mt-8 sm:-mt-10 md:-mt-12',
      statsLayout: 'vertical', // 'grid' or 'vertical'
    },
  },
  {
    id: 5,
    title: 'Tuckers Cleaning Service',
    backgroundImage: null, // No background image, using solid color
    logo: '/images/TUCK.png',
    description: 'Tuckers Cleaning Service delivers reliable residential and commercial cleaning with attention to detail, friendly teams, and flexible scheduling. Book a one-time deep clean or set up regular visits — we make your space shine',
    stats: [
      { label: 'Properties Cleaned', value: '500+' },
      { label: 'Customer Satisfaction', value: '98%' },
      { label: 'Service Coverage', value: '100%' },
    ],
    link: 'https://tuckerscleaningservices.com/',
    design: {
      brightness: 1.3,
      contrast: 1.3,
      overlay: { from: '35', via: '45', to: '70' },
      logoSize: 'h-48 sm:h-56 md:h-64 lg:h-72',
      logoPosition: 'center', // 'center' or 'top-left'
      padding: 'p-6 sm:p-8 md:p-10',
      logoPadding: '-mt-8 sm:-mt-8 md:-mt-6',
      statsMargin: '-mt-8 sm:-mt-10 md:-mt-12',
      statsLayout: 'grid', // 'grid' or 'vertical'
      statsWidth: 'w-full max-w-full', // Wider stats
      cardColor: '#F6EFE6', // Background color - light beige/cream
    },
  },
  {
    id: 6,
    title: "Blough's Window Cleaning",
    backgroundImage: '/logo/man-cleaning-window.jpg',
    logo: '/logo/background_removal%23TUFHNWM3WTd1c3MjMSM2Y2FmMjhhNTNhMzRiYzBiNTFlMTQ3ZGQxNmEyZTRmMCM1MDAjI1RSQU5TRk9STUFUSU9OX1JFUVVFU1Q.png',
    description: "Blough's Window Cleaning and Property Maintenance delivers professional window cleaning, power washing, gutter services and full exterior & interior property care — fast, reliable, and made for homeowners, contractors, and property managers",
    stats: [
      { label: 'Properties Serviced', value: '800+' },
      { label: 'Customer Rating', value: '5-Star' },
      { label: 'Repeat Customers', value: '92%' },
    ],
    link: 'https://bloughswindowcleaningpropertymaintenance.com/',
    design: {
      brightness: 1.1,
      contrast: 1.2,
      overlay: { from: '45', via: '55', to: '75' },
      logoSize: 'h-32 sm:h-40 md:h-48 lg:h-56',
      logoPosition: 'center',
      padding: 'p-6 sm:p-8 md:p-10',
      logoPadding: 'pt-4 sm:pt-6 md:pt-8',
      statsMargin: '-mt-12 sm:-mt-16 md:-mt-20',
      statsLayout: 'grid',
      statsWidth: 'w-full max-w-full',
    },
  },
]

// Duplicate cards for seamless infinite loop - reduced for performance
const duplicatedCards = [...portfolioCards, ...portfolioCards]

export default function SuccessStoriesCarousel() {
  const containerRef = useRef(null)
  const carouselRef = useRef(null)
  const cardsRef = useRef([])
  const animationRef = useRef(null)
  const rafRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const swipeStateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    startTime: 0,
    velocity: 0,
    animationPaused: false,
    isSwipe: false, // Track if this is a swipe gesture
    rafId: null, // RAF ID for smooth updates
  })
  
  // Use fewer card duplicates on mobile for better performance
  // Keep 2 sets for smooth infinite loop
  const cardsToRender = isMobile 
    ? [...portfolioCards, ...portfolioCards] // 2 sets on mobile (10 cards) for smooth loop
    : duplicatedCards // 2 sets on desktop (10 cards total) - reduced from 3 for performance

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    // Throttle resize listener for better performance
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkMobile, 150)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !carouselRef.current) return

    const container = containerRef.current
    const carousel = carouselRef.current
    const cards = cardsRef.current.filter(Boolean)
    // Capture ref value for cleanup to avoid React warning
    const currentRaf = rafRef.current

    if (cards.length === 0) return

    // Detect mobile device once for performance optimizations
    const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // Store cleanup function for GSAP resources
    let gsapCleanup = null
    
    // Dynamically import GSAP with error handling
    import('gsap').then(({ gsap }) => {
      // Disable 3D perspective for better performance - use simple 2D scrolling
      // 3D effects removed to eliminate lag

    // Get carousel dimensions for infinite loop
    const cardWidth = cards[0]?.offsetWidth || 320
    const gap = 12 // gap-3 = 12px
    const cardTotalWidth = cardWidth + gap
    const halfWidth = (cards.length * cardTotalWidth) / 2

    // Set initial position via CSS for better performance
      carousel.style.transform = 'translateX(0)'

    // Create infinite scrolling animation (right to left)
    // Use CSS animation for both mobile and desktop for best performance
    carousel.style.setProperty('--scroll-distance', `-${halfWidth}px`)
    // Much slower animation for better viewing experience - especially mobile
    const animationDuration = isMobileDevice ? 70 : 100 // Faster on mobile for better experience
    carousel.style.animation = `portfolio-scroll-mobile ${animationDuration}s linear infinite`
    carousel.style.animationDuration = `${animationDuration}s`
      carousel.style.willChange = 'transform'

      // Force slow animation on mobile with inline style
      if (isMobileDevice) {
        carousel.setAttribute('data-mobile-carousel', 'true')
      }

    // Add swipe functionality for manual control on mobile
    if (isMobileDevice && carousel) {
      const swipeState = swipeStateRef.current
      
      const handleTouchStart = (e) => {
        swipeState.isDragging = true
        swipeState.startX = e.touches[0].clientX
        swipeState.startY = e.touches[0].clientY
        swipeState.currentX = e.touches[0].clientX
        swipeState.startTime = Date.now()
        swipeState.isSwipe = false // Reset swipe flag
        
        // Get current transform position
        const transform = window.getComputedStyle(carousel).transform
        if (transform !== 'none') {
          const matrix = new DOMMatrix(transform)
          swipeState.currentTranslateX = matrix.m41
        } else {
          swipeState.currentTranslateX = 0
        }
      }
      
      const handleTouchMove = (e) => {
        if (!swipeState.isDragging) return
        
        const currentX = e.touches[0].clientX
        const currentY = e.touches[0].clientY
        const deltaX = Math.abs(currentX - swipeState.startX)
        const deltaY = Math.abs(currentY - swipeState.startY)
        
        // Determine if this is a swipe gesture (more horizontal than vertical movement)
        // and if movement exceeds threshold (10px)
        if (!swipeState.isSwipe && (deltaX > 10 || deltaY > 10)) {
          swipeState.isSwipe = deltaX > deltaY // Horizontal movement = swipe
          
          if (swipeState.isSwipe) {
            // Pause auto-scroll animation only when confirmed swipe
            carousel.style.animationPlayState = 'paused'
            swipeState.animationPaused = true
            carousel.style.willChange = 'transform'
          }
        }
        
        // Only update carousel position if this is confirmed as a swipe
        if (swipeState.isSwipe) {
          const delta = currentX - swipeState.startX
          const newTranslateX = (swipeState.currentTranslateX || 0) + delta
          
          // Use requestAnimationFrame for smooth updates
          if (!swipeState.rafId) {
            swipeState.rafId = requestAnimationFrame(() => {
              carousel.style.animation = 'none'
              carousel.style.transform = `translate3d(${newTranslateX}px, 0, 0)`
              swipeState.rafId = null
            })
          }
          
          e.preventDefault() // Prevent scrolling when swiping
        }
        
        swipeState.currentX = currentX
      }
      
      const handleTouchEnd = (e) => {
        if (!swipeState.isDragging) return
        
        // Cancel any pending RAF
        if (swipeState.rafId) {
          cancelAnimationFrame(swipeState.rafId)
          swipeState.rafId = null
        }
        
        const wasSwiping = swipeState.isSwipe
        swipeState.isDragging = false
        swipeState.isSwipe = false
        
        // Only apply momentum if this was a swipe gesture
        if (wasSwiping) {
          const deltaX = swipeState.currentX - swipeState.startX
          const deltaTime = Date.now() - swipeState.startTime
          const velocity = deltaX / deltaTime // pixels per ms
          
          // Calculate momentum
          const momentum = velocity * 150 // Reduced for smoother feel
          
          // Get current position
          const currentTransform = window.getComputedStyle(carousel).transform
          let currentTranslateX = 0
          if (currentTransform !== 'none') {
            const matrix = new DOMMatrix(currentTransform)
            currentTranslateX = matrix.m41
          }
          
          // Apply momentum with smooth animation using translate3d for GPU acceleration
          const newTranslateX = currentTranslateX + momentum
          carousel.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          carousel.style.transform = `translate3d(${newTranslateX}px, 0, 0)`
          
          // Resume auto-scroll after momentum animation
          setTimeout(() => {
            carousel.style.transition = ''
            carousel.style.willChange = 'auto'
            const animationDuration = isMobileDevice ? 70 : 100
            carousel.style.animation = `portfolio-scroll-mobile ${animationDuration}s linear infinite`
            carousel.style.animationPlayState = 'running'
            
            // Calculate current position as percentage for seamless resume
            const progress = Math.abs(newTranslateX) / (halfWidth || 1)
            carousel.style.animationDelay = `-${progress * animationDuration}s`
          }, 400)
        } else {
          // If not swiping, just resume animation immediately
          if (swipeState.animationPaused) {
            carousel.style.animationPlayState = 'running'
            swipeState.animationPaused = false
            carousel.style.willChange = 'auto'
          }
        }
      }
      
      // Optimize touch event listeners for smooth performance
      carousel.addEventListener('touchstart', handleTouchStart, { passive: true })
      carousel.addEventListener('touchmove', handleTouchMove, { passive: false }) // passive: false to allow preventDefault
      carousel.addEventListener('touchend', handleTouchEnd, { passive: true })
      carousel.addEventListener('touchcancel', handleTouchEnd, { passive: true })
      
      // Ensure GPU acceleration
      carousel.style.transform = carousel.style.transform || 'translateZ(0)'
      carousel.style.WebkitTransform = carousel.style.WebkitTransform || 'translateZ(0)'
      
      carousel._swipeTouchStart = handleTouchStart
      carousel._swipeTouchMove = handleTouchMove
      carousel._swipeTouchEnd = handleTouchEnd
    }
    
    // Add 3D tilt effects for cards (on individual cards, not carousel)
      cards.forEach((card) => {
        if (!card) return
        
        // Touch events for mobile 3D tilt (only when not swiping carousel)
        let tiltStartX = 0
        let tiltStartY = 0
        let hasMoved = false
        
        const handleCardTouchStart = (e) => {
          if (!isMobileDevice) return
          card._tiltActive = true
          card._tiltStartTime = Date.now()
          tiltStartX = e.touches[0].clientX
          tiltStartY = e.touches[0].clientY
          hasMoved = false
        }
        
        const handleCardTouchMove = (e) => {
          if (!isMobileDevice || !card._tiltActive) return
          
          const currentX = e.touches[0].clientX
          const currentY = e.touches[0].clientY
          const moveX = Math.abs(currentX - tiltStartX)
          const moveY = Math.abs(currentY - tiltStartY)
          
          // If moved more than 5px in any direction, it's likely a swipe
          if (moveX > 5 || moveY > 5) {
            hasMoved = true
          }
          
          // Disable tilt if carousel is being swiped OR if significant movement detected
          if (swipeStateRef.current.isSwipe || hasMoved) {
            card._tiltActive = false
            card.classList.remove('tilt-enabled')
            // Reset to flat immediately when swiping
            card.style.transition = 'none'
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0) scale(1)'
            card.style.boxShadow = ''
            return
          }
          
          // Only apply tilt if staying relatively still (< 5px movement)
          if (!hasMoved) {
            card.classList.add('tilt-enabled')
            const touch = e.touches[0]
            const rect = card.getBoundingClientRect()
            const x = touch.clientX - rect.left
            const y = touch.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const rotateX = ((y - centerY) / centerY) * 8 // Reduced to 8 degrees
            const rotateY = ((centerX - x) / centerX) * 8
            
            // Very minimal lift - almost flat
            card.style.transition = 'none'
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px) translateZ(10px) scale(1.01)`
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.5)'
          }
        }
        
        const handleCardTouchEnd = () => {
          if (!isMobileDevice) return
          card._tiltActive = false
          hasMoved = false
          card.classList.remove('tilt-enabled')
          
          // Smooth return to normal state
          card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0) scale(1)'
          card.style.boxShadow = ''
          
          // Remove transition after animation completes
          setTimeout(() => {
            card.style.transition = ''
          }, 300)
        }
        
        if (isMobileDevice) {
          card.addEventListener('touchstart', handleCardTouchStart, { passive: true })
          card.addEventListener('touchmove', handleCardTouchMove, { passive: true })
          card.addEventListener('touchend', handleCardTouchEnd, { passive: true })
          card._cardTouchStart = handleCardTouchStart
          card._cardTouchMove = handleCardTouchMove
          card._cardTouchEnd = handleCardTouchEnd
        }
    })

    // Pause animation when not visible (IntersectionObserver) - especially important for mobile
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Resume animation when visible
            if (isMobileDevice && carousel) {
              carousel.style.animationPlayState = 'running'
            } else if (animationRef.current) {
              animationRef.current.resume()
            }
          } else {
            // Pause animation when not visible to save resources
            if (isMobileDevice && carousel) {
              carousel.style.animationPlayState = 'paused'
            } else if (animationRef.current) {
              animationRef.current.pause()
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    if (container) {
      observer.observe(container)
    }

      // Store cleanup function for GSAP resources
      gsapCleanup = () => {
        observer.disconnect()
        if (container && !isMobileDevice) {
          // Clean up tilt observer if it exists
          const tiltObserver = container._tiltObserver
          if (tiltObserver) {
            tiltObserver.disconnect()
          }
        }
        if (animationRef.current) {
          animationRef.current.kill()
          animationRef.current = null
        }
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
        if (carousel && isMobileDevice) {
          // Clean up CSS animation on mobile
          carousel.style.animation = ''
          carousel.style.willChange = ''
        }
        // Clean up swipe handlers on carousel
        if (carousel) {
          if (carousel._swipeTouchStart) {
            carousel.removeEventListener('touchstart', carousel._swipeTouchStart)
          }
          if (carousel._swipeTouchMove) {
            carousel.removeEventListener('touchmove', carousel._swipeTouchMove)
          }
          if (carousel._swipeTouchEnd) {
            carousel.removeEventListener('touchend', carousel._swipeTouchEnd)
          }
        }
        
        // Clean up hover handlers and animations
        cards.forEach((card) => {
          if (card) {
            // Remove hover event listeners
            if (card._hoverEnter) {
              card.removeEventListener('mouseenter', card._hoverEnter)
            }
            if (card._hoverLeave) {
              card.removeEventListener('mouseleave', card._hoverLeave)
            }
            // Remove card tilt touch event listeners
            if (card._cardTouchStart) {
              card.removeEventListener('touchstart', card._cardTouchStart)
            }
            if (card._cardTouchMove) {
              card.removeEventListener('touchmove', card._cardTouchMove)
            }
            if (card._cardTouchEnd) {
              card.removeEventListener('touchend', card._cardTouchEnd)
            }
            // Kill GSAP animations
            gsap.killTweensOf(card)
            // Kill hover timelines on card images
            const cardImages = card.querySelectorAll('img')
            if (cardImages) {
              cardImages.forEach((img) => gsap.killTweensOf(img))
            }
          }
        })
        
        // Clean up button hover handlers
        const hoverTargets = container?.querySelectorAll('[data-gsap-hover-target="true"]')
        hoverTargets?.forEach((target) => {
          if (target._gsapHoverEnter) {
            target.removeEventListener('mouseenter', target._gsapHoverEnter)
          }
          if (target._gsapHoverLeave) {
            target.removeEventListener('mouseleave', target._gsapHoverLeave)
          }
          gsap.killTweensOf(target)
        })
      }
    }).catch((error) => {
      if (process.env.NODE_ENV === 'development') {
      console.error('Failed to load GSAP for SuccessStoriesCarousel:', error)
      }
      // Fallback: Use CSS animations only on mobile, disable 3D effects on desktop
      if (isMobileDevice && carousel) {
        const cardWidth = cards[0]?.offsetWidth || 320
        const gap = 12
        const cardTotalWidth = cardWidth + gap
        const mobileHalfWidth = (cards.length * cardTotalWidth) / 2
        carousel.style.setProperty('--scroll-distance', `-${mobileHalfWidth}px`)
        // Much slower animation for better viewing on mobile
        carousel.style.animation = `portfolio-scroll-mobile ${70}s linear infinite`
      }
    })

    // Cleanup function for useEffect
    return () => {
      // Call GSAP cleanup if it was set
      if (gsapCleanup) {
        gsapCleanup()
      }
      // Also clean up non-GSAP resources
      if (currentRaf) {
        cancelAnimationFrame(currentRaf)
      }
      if (carousel && isMobileDevice) {
        carousel.style.animation = ''
        carousel.style.willChange = ''
      }
    }
  }, [])

  return (
    <section
      className="section-padding bg-gradient-to-b from-[#0a0a0a] via-[#10151a] to-[#181c22] overflow-hidden relative"
      id="portfolio"
      style={{ 
        scrollMarginTop: '120px', 
        maxHeight: isMobile ? '1300px' : 'none'
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12 mt-8 md:mt-16">
          <span className="block uppercase tracking-[0.25em] text-xs text-neutral-400 font-semibold mb-4">
            OUR WORK
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Real Results. Real Businesses.{' '}
            <span className="text-[#7BB9E8]">Real Growth.</span>
          </h2>
          <div className="w-20 h-1 rounded-full bg-[#7BB9E8] mb-6 mt-2 mx-auto"></div>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
            See how we&apos;ve transformed businesses across industries with proven strategies and measurable outcomes.
          </p>
        </div>
        </div>
        <div className="relative mb-16" ref={containerRef} style={{ height: 'auto', maxHeight: '650px' }}>
          <div className="overflow-hidden">
            <div className="flex gap-3 w-fit" ref={carouselRef}>
              {cardsToRender.map((card, index) => (
                <a
                  key={`${card.id}-${index}`}
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[400px] flex-shrink-0 block"
                  style={{ 
                    pointerEvents: 'auto', 
                    position: 'relative', 
                    zIndex: 1, 
                    marginTop: '20px', 
                    marginBottom: '20px',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                  }}
                >
                  <div
                    ref={(el) => {
                      cardsRef.current[index] = el
                    }}
                    className="card-content relative rounded-3xl overflow-hidden cursor-pointer group"
                    style={{ 
                      willChange: isMobile ? 'auto' : 'transform, box-shadow', 
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      boxShadow: isMobile ? '0 8px 16px rgba(0, 0, 0, 0.4)' : '0 10px 20px 5px rgba(0, 0, 0, 0.4)',
                      maxHeight: isMobile ? '360px' : 'none',
                      touchAction: 'pan-x pan-y', // Allow both horizontal and vertical panning
                      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0) scale(1)',
                      WebkitTransform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0) scale(1)',
                    }}
                  >
                    {/* Background Layer - Image or Solid Color */}
                    <div className="absolute inset-0 w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[600px] overflow-hidden">
                      {card.backgroundImage && card.design?.imagePosition ? (
                        <>
                          {/* Solid Color Background */}
                          <div 
                            className="absolute inset-0 transition-all duration-500"
                            style={{
                              background: card.design?.cardColor || '#01010F',
                            }}
                          />
                          {/* Image positioned at bottom center */}
                          <img
                            alt={card.title}
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-auto h-[60%] sm:h-[65%] md:h-[70%] object-contain opacity-80 group-hover:opacity-90 transition-opacity duration-700 ease-out"
                            src={card.backgroundImage}
                            loading="lazy"
                            decoding="async"
                            fetchPriority={index < 3 ? 'high' : 'low'}
                            style={{ 
                              willChange: 'auto',
                              transform: 'translateZ(0) translateX(-50%)',
                              contentVisibility: 'auto',
                              filter: `brightness(${card.design?.brightness || 0.6}) contrast(${card.design?.contrast || 0.9})`,
                            }}
                          />
                        </>
                      ) : card.backgroundImage ? (
                        <>
                      <img
                        alt={card.title}
                            className="w-full h-full object-cover"
                            src={card.backgroundImage}
                        loading="lazy"
                        decoding="async"
                        fetchPriority={index < 3 ? 'high' : 'low'}
                        style={{ 
                          transform: 'translateZ(0)',
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'hidden',
                          contentVisibility: 'auto',
                              filter: `brightness(${card.design?.brightness || 1.2}) contrast(${card.design?.contrast || 1.3})`,
                            }}
                      />
                          {/* Dark Overlay - Card specific */}
                          <div 
                            className="absolute inset-0 transition-all duration-500 group-hover:opacity-90"
                            style={{
                              background: `linear-gradient(to bottom, rgba(0,0,0,${(parseInt(card.design?.overlay?.from || '40')) / 100}), rgba(0,0,0,${(parseInt(card.design?.overlay?.via || '50')) / 100}), rgba(0,0,0,${(parseInt(card.design?.overlay?.to || '75')) / 100}))`,
                            }}
                          />
                        </>
                      ) : (
                        /* Solid Color Background */
                        <div 
                          className="absolute inset-0 transition-all duration-500"
                          style={{
                            background: card.design?.cardColor || '#F5F5F5',
                          }}
                        />
                      )}
                    </div>

                    {/* Glassmorphism Container */}
                    <div className={`relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[600px] flex flex-col justify-between ${card.design?.padding || 'p-6 sm:p-8 md:p-10'} z-30`}>
                      {/* Top Section - Logo */}
                      <div className={`flex flex-col ${card.design?.logoPosition === 'top-left' ? 'items-start' : 'items-center'} justify-start ${card.design?.logoPadding || 'pt-2 sm:pt-2 md:pt-3'}`}>
                        <img
                          alt={`${card.title} Logo`}
                          src={card.logo}
                          className={`${card.design?.logoSize || 'h-32 sm:h-40 md:h-48 lg:h-56'} w-auto object-contain`}
                        />
                      </div>

                      {/* Bottom Section - Stats and CTA */}
                      <div className={`flex flex-col gap-4 ${card.design?.statsMargin || '-mt-12 sm:-mt-16 md:-mt-20'}`}>
                        {/* Stats Section - Enhanced with icons and gradients */}
                        {card.stats && (
                          <div className={`${card.design?.statsLayout === 'vertical' ? 'flex flex-col gap-3 sm:gap-4' : 'grid grid-cols-3 gap-3 sm:gap-4 text-center'} ${card.design?.statsWidth || ''} ${card.id === 3 || card.id === 4 ? 'mb-[60px]' : ''} ${card.id === 5 ? 'mb-4' : ''}`}>
                            {card.stats.map((stat, statIndex) => {
                              // Get icon based on stat label
                              const getIcon = (label) => {
                                if (label.toLowerCase().includes('lead')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('property') || label.toLowerCase().includes('sold') || label.toLowerCase().includes('properties cleaned')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('satisfaction') || label.toLowerCase().includes('customer satisfaction')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('coverage') || label.toLowerCase().includes('service coverage')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('growth') || label.toLowerCase().includes('revenue') || label.toLowerCase().includes('business growth')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('customer') || label.toLowerCase().includes('more customer')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('popularity') || label.toLowerCase().includes('more popularity')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('view')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('sponsor') || label.toLowerCase().includes('campaign')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('social')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('crm') || label.toLowerCase().includes('integration')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('website') || label.toLowerCase().includes('traffic')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                  )
                                }
                                if (label.toLowerCase().includes('automation') || label.toLowerCase().includes('rate')) {
                                  return (
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                  )
                                }
                                return (
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                )
                              }

                              // Determine if background is light or dark
                              const isLightBackground = card.design?.cardColor && !card.backgroundImage && !card.design?.isDarkBackground
                              const textColorClass = isLightBackground ? 'text-gray-900' : 'text-white'
                              const textColorSecondaryClass = isLightBackground ? 'text-gray-700' : 'text-white/70'
                              const iconColorClass = isLightBackground ? 'text-gray-800' : 'text-white'
                              const textShadow = isLightBackground ? 'none' : '0 2px 10px rgba(0,0,0,0.5)'

                              return (
                                <div
                                  key={statIndex}
                                  className={card.design?.statsLayout === 'vertical' ? 'flex items-center gap-3 sm:gap-4 group/stat' : 'text-center group/stat'}
                                  style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
                                >
                                  <div className={`flex items-center ${card.design?.statsLayout === 'vertical' ? 'gap-2 sm:gap-3' : 'justify-center gap-1.5 sm:gap-2 mb-1'} opacity-80 group-hover/stat:opacity-100 transition-opacity duration-300`}>
                                    <div className={`${iconColorClass} group-hover/stat:${isLightBackground ? 'text-gray-900' : 'text-white/80'} transition-colors duration-300`}>
                                      {getIcon(stat.label)}
                                    </div>
                                    {card.design?.statsLayout === 'vertical' && (
                                      <div className="flex flex-col">
                                        <div 
                                          className={`${textColorClass} text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300`}
                                          style={{ 
                                            textShadow: textShadow
                                          }}
                                        >
                                          {stat.value}
                                        </div>
                                        <div className={`${textColorSecondaryClass} text-xs sm:text-sm font-medium mt-0.5 group-hover/stat:${isLightBackground ? 'text-gray-900' : 'text-white/90'} transition-colors duration-300`}>
                                          {stat.label}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  {card.design?.statsLayout !== 'vertical' && (
                                    <>
                                      <div 
                                        className={`${textColorClass} text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-300`}
                                        style={{ 
                                          textShadow: textShadow
                                        }}
                                      >
                                        {stat.value}
                                      </div>
                                      <div className={`${textColorSecondaryClass} text-xs sm:text-sm font-medium mt-0.5 group-hover/stat:${isLightBackground ? 'text-gray-900' : 'text-white/90'} transition-colors duration-300`}>
                                        {stat.label}
                                      </div>
                                    </>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {/* CTA Button */}
                        <div className={`flex justify-center ${card.design?.cardColor && !card.backgroundImage ? 'relative z-30' : ''}`}>
                          <div
                            className={`${card.design?.cardColor && !card.backgroundImage ? 'bg-white text-black hover:bg-gray-100' : 'bg-white text-black hover:bg-gray-100'} px-5 py-3 sm:px-7 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-xl inline-flex items-center gap-2`}
                            style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
                            data-gsap-hover-target="true"
                      >
                        See Case Study
                        <svg
                              className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                          </div>
                        </div>
                      </div>

                      {/* Vintage Decorative Element at Bottom */}
                      {card.design?.cardColor && !card.backgroundImage && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 overflow-hidden z-20">
                          {/* Vintage Pattern */}
                          <div 
                            className="absolute inset-0 opacity-20"
                            style={{
                              backgroundImage: `repeating-linear-gradient(
                                45deg,
                                transparent,
                                transparent 10px,
                                rgba(0,0,0,0.1) 10px,
                                rgba(0,0,0,0.1) 20px
                              )`,
                            }}
                          />
                          {/* Vintage Border */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-40" />
                          {/* Vintage Texture Overlay */}
                          <div 
                            className="absolute inset-0"
                            style={{
                              background: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                              backgroundSize: '8px 8px',
                            }}
                          />
                        </div>
                      )}

                      {/* Glassmorphism Border */}
                      <div className="absolute inset-0 rounded-3xl border border-white/15 pointer-events-none" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-20 max-w-4xl mx-auto pb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Ready to be our next success story?
          </h3>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Join the businesses that chose growth over stagnation.
          </p>
          <button
            type="button"
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="inline-flex items-center justify-center gap-2 h-11 bg-[#7BB9E8] hover:bg-[#5fa6d6] text-white px-6 py-3 md:px-10 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-xl border border-[#7BB9E8]/30 w-full sm:w-auto"
            data-gsap-hover-target="true"
            style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
            suppressHydrationWarning
          >
            Schedule Your Call
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

