'use client'

import { useEffect, useMemo, useState, useRef, useCallback, Suspense, lazy } from 'react'
import { clientSectionHtml } from '@/sections/clientSectionHtml'
import { cpgSectionHtml } from '@/sections/cpgSectionHtml'
import { partnerSectionHtml } from '@/sections/partnerSectionHtml'
import { servicesSectionHtml } from '@/sections/servicesSectionHtml'
import { aboutSectionHtml } from '@/sections/aboutSectionHtml'
import { approachSectionHtml } from '@/sections/approachSectionHtml'
import { contactSectionHtml } from '@/sections/contactSectionHtml'
import { pricingSectionHtml } from '@/sections/pricingSectionHtml'
import { footerSectionHtml } from '@/sections/footerSectionHtml'
import ErrorBoundary from '@/components/ErrorBoundary'
// Lazy load heavy components - but preload hero background for faster initial render
const SuccessStoriesCarousel = lazy(() => import('@/components/SuccessStoriesCarousel'))
const TestimonialsCarousel = lazy(() => import('@/components/TestimonialsCarousel'))
// Preload BlackHoleBackground for hero section - critical for above-the-fold
const BlackHoleBackground = lazy(() => {
  // Preload the component module
  if (typeof window !== 'undefined') {
    import('@/components/BlackHoleBackground').catch(() => {})
  }
  return import('@/components/BlackHoleBackground')
})
// Lazy load modals - only load when needed
const WebsiteSurveyModal = lazy(() => import('@/components/WebsiteSurveyModal'))
const WebsiteRevisionModal = lazy(() => import('@/components/WebsiteRevisionModal'))
const GetStartedModal = lazy(() => import('@/components/GetStartedModal'))

const heroPhrases = [
  'Drive Traffic, automate leads, & grow Businesses Fast',
  'We build websites, run automations, and grow businesses.',
  'Our system helps businesses rank higher on Google and get more views guaranteed.',
  'We give you cutting edge, proven winning strategies to get more leads and views on Google',
  'We can automate your texts, emails, calls, sales, fulfillment; any process in your business',
  'We currently are helping over 50+ businesses grow their business with no money out of pocket',
  'If you don\'t have a website, we will make you one for free if you qualify',
  'Empowering businesses with expert website design, optimized Google profiles, and targeted lead generation',
]

const heroStats = [
  { 
    label: 'Texts Sent', 
    value: '150,000',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  { 
    label: 'Calls Made', 
    value: '50,000+',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  { 
    label: 'Leads Generated', 
    value: '1,250+',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
]

const socialLinks = [
  {
    href: 'https://www.instagram.com/dbcooper5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    label: 'Instagram',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/dbcooper5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    label: 'LinkedIn',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564V20.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729c0-.955-.8-1.729-1.775-1.729z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/dbcooper5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    label: 'TikTok',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
]

const mobileNavLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About us', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact us', href: '#contact' },
]

const supportOptions = [
  {
    label: '24/7 Shopify Support',
    href: 'tel:3302995179',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
  },
]

const connectLinks = [
  {
    href: 'https://www.instagram.com/dbcooper5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    label: 'Instagram',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43-.058-1.266-.07-1.65-.07-4.85s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41 1.266-.058 1.65-.07 4.85-.07z" />
        <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.163a4.001 4.001 0 1 1 0-8.002 4.001 4.001 0 0 1 0 8.002zm6.406-11.846a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/dbcooper5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    label: 'LinkedIn',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/dbcooper5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    label: 'TikTok',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    href: 'mailto:youngstownmarketingco@gmail.com',
    label: 'Email',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0v.01L12 13l8-8.99V4H4zm16 2.41l-7.29 7.3a1 1 0 01-1.42 0L4 6.41V20h16V6.41z" />
      </svg>
    ),
  },
]

export default function Page() {
  const [navSolid, setNavSolid] = useState(false)
  const navInitialTopRef = useRef(0)
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false)
  const [isWebsiteRevisionModalOpen, setIsWebsiteRevisionModalOpen] = useState(false)
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const currentPhrase = useMemo(() => heroPhrases[phraseIndex], [phraseIndex])

  useEffect(() => {
    document.body.classList.add('homepage')
    
    // Preload critical images programmatically for better control
    if (typeof window !== 'undefined') {
      const criticalImages = [
        '/images/logo-hq.png',
        '/images/orig.png',
        '/images/vercel-icon-light.png',
        '/images/monday.png',
        '/images/Celigo.png'
      ]
      
      criticalImages.forEach((src) => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        link.setAttribute('fetchPriority', 'high')
        document.head.appendChild(link)
      })
    }
    
    return () => {
      document.body.classList.remove('homepage')
    }
  }, [])

  // Defer non-critical animations until after initial render
  useEffect(() => {
    // Wait for page to be interactive before starting heavy animations
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Trigger any deferred animations here if needed
      }, { timeout: 2000 })
    }
  }, [])

  // Ensure carousel animations start correctly after hydration/refresh
  // Use CSS classes instead of inline styles to avoid hydration mismatches
  // NOTE: Removed portfolio-carousel-scroll from this check - it's handled purely by CSS
  useEffect(() => {
    const ensureAnimations = () => {
      // Use specific selectors to target each carousel independently
      // EXCLUDE portfolio-carousel-scroll - it's handled purely by CSS animation
      const carousels = [
        { selector: '.partner-carousel .animate-scroll' },
        { selector: '.client-logos-section .animate-scroll-left' },
        { selector: '#cpg-brands .ecom-marquee' }, // CPG brands - scoped to #cpg-brands
        // Portfolio carousel is handled purely by CSS - don't touch it here
      ]
      
      carousels.forEach(({ selector }) => {
        const element = document.querySelector(selector)
        if (element) {
          const computed = getComputedStyle(element)
          const playState = computed.animationPlayState
          
          // Only unpause if paused - use class manipulation instead of inline styles
          // This prevents hydration mismatches
          if (playState === 'paused') {
            // Remove any paused class and ensure animation runs via CSS
            element.classList.remove('animation-paused')
            // DO NOT force reflow - it resets animation state and causes flickering
            // CSS should handle animation-play-state via :hover rules
          }
        }
      })
    }
    
    // Run once after a short delay to allow React hydration to complete
    const timer = setTimeout(ensureAnimations, 100)
    return () => clearTimeout(timer)
  }, [])

  // Scroll animations for sections
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          // Optional: unobserve after animation to improve performance
          // observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
    
    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up')
    animatedElements.forEach((el) => observer.observe(el))
    
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  useEffect(() => {
    // Optimized scroll handler - updates nav state only
    // Removed opacity manipulation that was causing content to disappear
    const isMobileDevice = window.innerWidth < 768
    let ticking = false
    let lastScrollY = 0
    const scrollThreshold = isMobileDevice ? 80 : 50 // Increased threshold for better performance
    
    // Store initial navbar position on first load
    const nav = document.querySelector('nav.hidden.lg\\:block')
    if (nav && navInitialTopRef.current === 0) {
      navInitialTopRef.current = nav.offsetTop || 0
    }
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Skip if scroll change is too small (reduces updates)
      if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold && ticking) {
        return
      }
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setNavSolid(currentScrollY > 40)
          
          // Check if navbar sticky is working and apply fixed fallback if needed
          // Only check occasionally to prevent flickering
          if (currentScrollY > 150 && currentScrollY % 10 === 0) { // Only check every 10th scroll
            const nav = document.querySelector('nav.hidden.lg\\:block')
            if (nav) {
              const rect = nav.getBoundingClientRect()
              const computed = window.getComputedStyle(nav)
              const initialTop = navInitialTopRef.current || 0
              
              // If navbar is scrolled off top and position is sticky, switch to fixed
              if (rect.top < -20 && computed.position === 'sticky') {
                // Sticky isn't working, use fixed as fallback
                nav.style.setProperty('position', 'fixed', 'important')
                nav.style.setProperty('top', '0', 'important')
                nav.style.setProperty('left', '0', 'important')
                nav.style.setProperty('right', '0', 'important')
                nav.style.setProperty('width', '100%', 'important')
                nav.style.setProperty('z-index', '50', 'important')
              }
            }
          } else if (currentScrollY <= 50) {
            // Back at top, ensure sticky is set
            const nav = document.querySelector('nav.hidden.lg\\:block')
            if (nav) {
              const computed = window.getComputedStyle(nav)
              if (computed.position !== 'sticky') {
                nav.style.setProperty('position', 'sticky', 'important')
                nav.style.setProperty('top', '0', 'important')
                nav.style.setProperty('z-index', '50', 'important')
                nav.style.removeProperty('left')
                nav.style.removeProperty('right')
                nav.style.removeProperty('width')
              }
            }
          }
          
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Logo tilt effect - only target logo images, not carousel elements
    // Disable on mobile for better performance
    const isMobileDevice = window.innerWidth < 768
    if (isMobileDevice) return // Skip on mobile
    
    const logos = document.querySelectorAll('img.tilt-logo, .logo.tilt-logo')
    if (logos.length === 0) return
    
    let rafId = null
    let lastX = 0
    let lastY = 0
    let lastUpdateTime = 0
    const throttleMs = 16 // ~60fps max
    
    const handleMove = (event) => {
      const now = Date.now()
      if (now - lastUpdateTime < throttleMs) return
      lastUpdateTime = now
      
      // Throttle updates using requestAnimationFrame
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5
        const y = event.clientY / window.innerHeight - 0.5
        
        // Only update if position changed significantly
        if (Math.abs(x - lastX) < 0.01 && Math.abs(y - lastY) < 0.01) {
          rafId = null
          return
        }
        
        lastX = x
        lastY = y
        
        logos.forEach((logo) => {
          // Double-check it's not inside a carousel container - check all carousel sections
          const isInCarousel = logo.closest('.animate-scroll, .animate-scroll-left, .ecom-marquee, .portfolio-carousel-scroll, .partner-carousel, .client-logos-section, #cpg-brands, #portfolio')
          if (!isInCarousel && logo.tagName === 'IMG') {
            logo.style.transform = `rotateX(${y * 20}deg) rotateY(${x * 20}deg)`
            logo.style.transition = 'transform 0.1s ease-out'
            logo.style.willChange = 'transform'
          }
        })
        
        rafId = null
      })
    }
    
    document.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      document.removeEventListener('mousemove', handleMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    let timer
    if (!isDeleting && typedText.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1))
      }, 80)
    } else if (!isDeleting && typedText.length === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && typedText.length > 0) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length - 1))
      }, 45)
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % heroPhrases.length)
    }
    return () => clearTimeout(timer)
  }, [typedText, isDeleting, currentPhrase])

  // Portfolio carousel animation removed - now handled by SuccessStoriesCarousel component

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileNavOpen])

  // Attach event listener to contact section button to open survey modal
  useEffect(() => {
    const handleOpenModal = () => {
      setIsSurveyModalOpen(true)
    }

    // Find the button by ID and attach event listener
    const attachListener = () => {
      const button = document.getElementById('open-survey-modal')
      if (button && !button.hasAttribute('data-listener-attached')) {
        button.setAttribute('data-listener-attached', 'true')
        button.addEventListener('click', handleOpenModal)
      }
    }

    // Try immediately
    attachListener()

    // Also check periodically in case the button is added dynamically
    const checkInterval = setInterval(attachListener, 500)

    return () => {
      const button = document.getElementById('open-survey-modal')
      if (button) {
        button.removeEventListener('click', handleOpenModal)
      }
      clearInterval(checkInterval)
    }
  }, [])

  // Attach event listener to website revision button to open modal
  useEffect(() => {
    const handleOpenRevisionModal = () => {
      setIsWebsiteRevisionModalOpen(true)
    }

    // Find the button by ID and attach event listener
    const attachListener = () => {
      const button = document.getElementById('open-website-revision-modal')
      if (button && !button.hasAttribute('data-listener-attached')) {
        button.setAttribute('data-listener-attached', 'true')
        button.addEventListener('click', handleOpenRevisionModal)
      }
    }

    // Try immediately
    attachListener()

    // Also check periodically in case the button is added dynamically
    const checkInterval = setInterval(attachListener, 500)

    return () => {
      const button = document.getElementById('open-website-revision-modal')
      if (button) {
        button.removeEventListener('click', handleOpenRevisionModal)
      }
      clearInterval(checkInterval)
    }
  }, [])

  // Attach event listener to get started button to open modal
  useEffect(() => {
    const handleOpenGetStartedModal = () => {
      setIsGetStartedModalOpen(true)
    }

    // Find the button by ID and attach event listener
    const attachListener = () => {
      const button = document.getElementById('open-get-started-modal')
      if (button && !button.hasAttribute('data-listener-attached')) {
        button.setAttribute('data-listener-attached', 'true')
        button.addEventListener('click', handleOpenGetStartedModal)
      }
    }

    // Try immediately
    attachListener()

    // Also check periodically in case the button is added dynamically
    const checkInterval = setInterval(attachListener, 500)

    return () => {
      const button = document.getElementById('open-get-started-modal')
      if (button) {
        button.removeEventListener('click', handleOpenGetStartedModal)
      }
      clearInterval(checkInterval)
    }
  }, [])

  // Scroll reveal for Services section - make visible immediately on mount
  // Completely isolated from all carousel/marquee sections
  useEffect(() => {
    const isMarqueeElement = (el) => {
      if (!el) return true
      // Check if element or any parent has marquee classes
      const hasMarqueeClass = el.classList.contains('animate-scroll') || 
                            el.classList.contains('animate-scroll-left') ||
                            el.classList.contains('ecom-marquee') ||
                            el.classList.contains('portfolio-carousel-scroll') ||
                            el.classList.contains('partner-carousel') ||
                            el.classList.contains('client-logos-section') ||
                            el.classList.contains('card-content') // Exclude portfolio cards from scroll reveal
      
      if (hasMarqueeClass) return true
      
      // Check parent containers
      const parent = el.closest('.animate-scroll, .animate-scroll-left, .ecom-marquee, .portfolio-carousel-scroll, .partner-carousel, .client-logos-section, #portfolio')
      return !!parent
    }

    const revealOnLoad = () => {
      // Reveal elements that are already in viewport on initial load
      const sections = ['services', 'about', 'approach', 'contact']
      
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId)
        if (!section) return
        
        // Check if section is in viewport
        const rect = section.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
        
        if (isInViewport) {
          const allHidden = section.querySelectorAll('.opacity-0, .reveal-on-scroll')
          allHidden.forEach((el) => {
            // Skip nested hover states
            const isHoverState = el.closest('.group') && (
              el.classList.toString().includes('group-hover') ||
              el.parentElement?.classList.toString().includes('group-hover')
            )
            
            // Skip marquee elements completely
            if (isHoverState || isMarqueeElement(el)) return
            
            // Add transition for smooth animation
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
            
            // Remove hidden classes
            el.classList.remove('opacity-0')
            el.classList.remove('translate-y-8')
            el.classList.remove('translate-y-12')
            el.classList.remove('translate-y-16')
            el.classList.add('revealed')
            
            // Force a reflow to ensure transition starts
            void el.offsetHeight
          })
        }
      })
    }

    // Reveal elements already in viewport on initial load
    revealOnLoad()
    
    // Set up scroll observer for future elements with optimized settings
    // More aggressive settings on mobile for better performance
    const isMobileDevice = window.innerWidth < 768
    const observerOptions = {
      threshold: isMobileDevice ? 0.15 : 0.1, // Higher threshold for better performance
      rootMargin: isMobileDevice ? '0px 0px -30px 0px' : '0px 0px -80px 0px', // Smaller margin for earlier trigger
    }

    const observer = new IntersectionObserver((entries) => {
      // Batch DOM updates for better performance
      const updates = []
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target
          
          // Completely skip marquee elements
          if (isMarqueeElement(element)) {
            observer.unobserve(element)
            return
          }
          
          updates.push({
            element,
            action: () => {
              // Add transition for smooth animation
              element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
              element.style.willChange = 'opacity, transform'
              
              // Remove hidden classes
              element.classList.remove('opacity-0')
              element.classList.remove('translate-y-8')
              element.classList.remove('translate-y-12')
              element.classList.remove('translate-y-16')
              
              // Add 'revealed' class for elements with 'reveal-on-scroll' class
              if (element.classList.contains('reveal-on-scroll')) {
                element.classList.add('revealed')
              }
              
              // Clean up will-change after animation
              setTimeout(() => {
                if (element instanceof HTMLElement) {
                  element.style.willChange = 'auto'
                }
              }, 600)
            }
          })
          
          observer.unobserve(element)
        }
      })
      
      // Batch all updates in a single RAF
      if (updates.length > 0) {
        requestAnimationFrame(() => {
          updates.forEach(({ action }) => action())
        })
      }
    }, observerOptions)

    // Observe all sections with scroll reveal elements (not just services)
    const observerTimer = setTimeout(() => {
      // Target all sections that might have scroll reveal animations
      const sections = ['services', 'about', 'approach', 'contact']
      const observed = new Set()
      
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId)
        if (!section) return
        
        // Find all elements with opacity-0 that should be revealed
        const allHidden = section.querySelectorAll('.opacity-0, .reveal-on-scroll')
        
        allHidden.forEach((el) => {
          const isHoverState = el.closest('.group') && (
            el.classList.toString().includes('group-hover') ||
            el.parentElement?.classList.toString().includes('group-hover')
          )
          
          // Skip marquee elements completely
          if (isHoverState || isMarqueeElement(el) || observed.has(el)) return
          
          observer.observe(el)
          observed.add(el)
        })
      })
    }, 100)

    return () => {
      clearTimeout(observerTimer)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      <DesktopNav navSolid={navSolid} />
      <main>
        <ErrorBoundary>
          <Suspense fallback={<HeroSectionSkeleton onOpenMobileNav={() => setMobileNavOpen(true)} typedText={typedText} isMobileNavOpen={isMobileNavOpen} />}>
            <HeroSection onOpenMobileNav={() => setMobileNavOpen(true)} typedText={typedText} isMobileNavOpen={isMobileNavOpen} />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="scroll-fade-in section-overlap bg-gradient-to-b from-black via-[#0a0a0a] to-black" style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-1rem' }}>
            <RawHtml html={partnerSectionHtml} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="scroll-slide-up section-overlap-next" style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-1rem' }}>
            <Suspense fallback={<CarouselSkeleton />}>
              <SuccessStoriesCarousel />
            </Suspense>
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="scroll-fade-in section-overlap bg-gradient-to-b from-black via-[#0a0a0a] to-black" style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-1rem' }}>
            <RawHtml html={servicesSectionHtml} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="scroll-fade-in section-overlap-next" style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-1rem' }}>
            <RawHtml html={clientSectionHtml} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="scroll-fade-in section-overlap bg-gradient-to-b from-black via-[#0a0a0a] to-black" style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-1rem' }}>
            <RawHtml html={cpgSectionHtml} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="scroll-slide-up section-overlap-next" style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-1rem' }}>
            <Suspense fallback={<CarouselSkeleton />}>
              <TestimonialsCarousel />
            </Suspense>
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="scroll-fade-in section-overlap bg-gradient-to-b from-[#0a0a0a] via-[#10151a] to-[#0a0a0a]" style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-1rem', marginBottom: '-1rem' }}>
            <RawHtml html={pricingSectionHtml} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="scroll-fade-in section-overlap bg-gradient-to-b from-black via-[#0a0a0a] to-black" style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-1rem' }}>
            <RawHtml html={aboutSectionHtml} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="scroll-fade-in section-overlap-next" style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-1rem', marginBottom: '-1rem' }}>
            <RawHtml html={approachSectionHtml} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div className="scroll-fade-in section-overlap bg-gradient-to-b from-black via-[#0a0a0a] to-black" style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-1rem', marginBottom: '-1rem' }}>
            <RawHtml html={contactSectionHtml} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div style={{ marginTop: '-1rem' }}>
            <RawHtml html={footerSectionHtml} />
          </div>
        </ErrorBoundary>
      </main>
      {isMobileNavOpen && <MobileDrawer onClose={() => setMobileNavOpen(false)} />}
      {isSurveyModalOpen && (
        <Suspense fallback={null}>
          <WebsiteSurveyModal isOpen={isSurveyModalOpen} onClose={() => setIsSurveyModalOpen(false)} />
        </Suspense>
      )}
      {isWebsiteRevisionModalOpen && (
        <Suspense fallback={null}>
          <WebsiteRevisionModal isOpen={isWebsiteRevisionModalOpen} onClose={() => setIsWebsiteRevisionModalOpen(false)} />
        </Suspense>
      )}
      {isGetStartedModalOpen && (
        <Suspense fallback={null}>
          <GetStartedModal isOpen={isGetStartedModalOpen} onClose={() => setIsGetStartedModalOpen(false)} />
        </Suspense>
      )}
    </div>
  )
}

function DesktopNav({ navSolid }) {
  // Use ref to ensure sticky is applied
  const navRef = useRef(null)
  const navInitialTopRef = useRef(0) // Local ref for this component
  
  useEffect(() => {
    if (navRef.current && typeof window !== 'undefined') {
      const nav = navRef.current
      navInitialTopRef.current = nav.offsetTop || 0
      
      // Set sticky positioning on mount and ensure it's applied
      const setInitialSticky = () => {
        // Always set sticky on mount
        nav.style.setProperty('position', 'sticky', 'important')
        nav.style.setProperty('top', '0', 'important')
        nav.style.setProperty('z-index', '50', 'important')
        nav.style.removeProperty('left')
        nav.style.removeProperty('right')
        nav.style.removeProperty('width')
        navInitialTopRef.current = nav.offsetTop || 0
      }
      
      // Apply immediately and after a short delay
      setInitialSticky()
      const timeoutId = setTimeout(setInitialSticky, 100)
      
      // Re-check on resize
      const handleResize = () => {
        setInitialSticky()
        navInitialTopRef.current = nav.offsetTop || 0
      }
      window.addEventListener('resize', handleResize, { passive: true })
      
      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  
  return (
    <nav
      ref={navRef}
      className={`hidden lg:block w-full z-50 sticky top-0 transition-all duration-300 ease-out ${
        navSolid 
          ? 'nav-scrolled-modern' 
          : 'nav-transparent'
      }`}
      style={{ 
        position: 'sticky', 
        top: '0px', 
        zIndex: 50, 
        left: 'auto', 
        right: 'auto',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)'
      }}
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Glassmorphism overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="flex items-center justify-center h-20 relative z-10">
          {/* Logo - Absolute positioned on left */}
          <a 
            aria-label="Yo Marketing Home" 
            className="absolute left-6 lg:left-8 flex items-center group z-10" 
            href="#hero"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#7BB9E8]/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <img 
              src="/images/logo-hq.png" 
              alt="Yo Marketing" 
              width={80}
              height={80}
              className="logo tilt-logo h-20 w-auto group-hover:scale-110 transition-all duration-300 drop-shadow-lg" 
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              style={{ willChange: 'transform' }}
            />
          </a>

          {/* Navigation Links - Centered */}
          <div className="flex items-center justify-center space-x-1">
            <NavTextLink href="#hero" label="Home" />
            <div className="group relative">
              <NavTextLink href="#services" label="Services" />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <a href="/services/website-design" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Website Design & Build
                  </a>
                  <a href="/services/google-business-profile" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Google Business Profile
                  </a>
                  <a href="/services/seo-services" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    SEO Services
                  </a>
                  <a href="/services/lead-generation" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Lead Generation & Ads
                  </a>
                </div>
              </div>
            </div>
            <NavTextLink href="#pricing" label="Pricing" />
            <NavTextLink href="#about" label="About us" />
            <NavTextLink href="#testimonials" label="Testimonials" />
            <NavTextLink href="#contact" label="Contact us" />
          </div>

          {/* CTA Button - Absolute positioned on right */}
          <div className="absolute right-6 lg:right-8 flex items-center">
            <button
              type="button"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const offset = 80; // Account for sticky navbar height
                  const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="group relative px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] text-white font-bold text-xs md:text-sm tracking-wide transition-all duration-300 rounded-xl overflow-hidden shadow-lg shadow-[#7BB9E8]/30 hover:shadow-xl hover:shadow-[#7BB9E8]/50 hover:scale-105 active:scale-95"
              style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                GET STARTED
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#9BC5E8] via-[#7BB9E8] to-[#6ba8d8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavTextLink({ href, label }) {
  const [isActive, setIsActive] = useState(false)
  
  useEffect(() => {
    if (!href.startsWith('#')) return
    
    const checkActive = () => {
      const targetId = href.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        const rect = element.getBoundingClientRect()
        const isInView = rect.top <= 120 && rect.bottom >= 120
        setIsActive(isInView)
      }
    }
    
    checkActive()
    window.addEventListener('scroll', checkActive, { passive: true })
    return () => window.removeEventListener('scroll', checkActive)
  }, [href])
  
  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Account for sticky navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`group relative px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer rounded-lg ${
        isActive 
          ? 'text-[#7BB9E8] bg-white/5' 
          : 'text-white/80 hover:text-white hover:bg-white/5'
      }`}
      style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
    >
      <span className="relative z-10">{label}</span>
      {/* Animated underline */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] transition-all duration-500 rounded-full ${
        isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'
      }`} />
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7BB9E8]/0 via-[#7BB9E8]/10 to-[#7BB9E8]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-lg -z-10" />
    </a>
  )
}

function HeroSection({ onOpenMobileNav, typedText, isMobileNavOpen = false }) {

  return (
    <section
      id="hero"
      className="hero w-full relative font-sans pb-12 md:pb-16"
      style={{ backgroundColor: 'transparent', paddingTop: '40px' }}
      role="region"
      aria-label="Homepage Hero Banner"
    >
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />}>
        <BlackHoleBackground />
      </Suspense>
      <header 
        className={`lg:hidden sticky top-0 z-50 w-full border-b backdrop-blur-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)_inset] transition-all duration-300 ${
          isMobileNavOpen 
            ? 'border-white/5 bg-gradient-to-b from-[rgba(4,5,7,0.3)] to-[rgba(4,5,7,0.2)]' 
            : 'border-white/15 bg-gradient-to-b from-[rgba(4,5,7,0.85)] to-[rgba(4,5,7,0.6)]'
        }`} 
        style={{ position: 'sticky', top: 0, zIndex: 50, marginTop: 0, WebkitBackdropFilter: 'blur(24px) saturate(180%)' }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">
          <a aria-label="Yo Marketing Home" href="#hero" className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#7BB9E8]/20 via-[#7BB9E8]/10 to-transparent rounded-xl blur-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 -z-10" />
            <img 
              src="/images/logo-hq.png" 
              alt="Yo Marketing" 
              width={56}
              height={56}
              className="logo tilt-logo h-14 w-auto transition-all duration-300 cursor-pointer group-hover:scale-105 group-active:scale-95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              style={{ willChange: 'transform' }}
            />
          </a>
          <button 
            suppressHydrationWarning 
            className="group relative p-3 text-white/90 hover:text-white transition-all duration-200 focus:outline-none rounded-2xl active:scale-95" 
            aria-label="Open navigation menu" 
            onClick={onOpenMobileNav}
            type="button"
          >
            {/* Button background glow */}
            <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#7BB9E8]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm" />
            
            {/* Hamburger icon */}
            <div className="relative flex flex-col gap-1.5 w-5 h-5 justify-center items-center">
              <span className="block w-5 h-0.5 bg-current rounded-full transition-all duration-300 group-hover:bg-[#7BB9E8] group-hover:shadow-[0_0_8px_rgba(123,185,232,0.4)]" />
              <span className="block w-5 h-0.5 bg-current rounded-full transition-all duration-300 group-hover:bg-[#7BB9E8] group-hover:shadow-[0_0_8px_rgba(123,185,232,0.4)]" />
              <span className="block w-5 h-0.5 bg-current rounded-full transition-all duration-300 group-hover:bg-[#7BB9E8] group-hover:shadow-[0_0_8px_rgba(123,185,232,0.4)]" />
            </div>
          </button>
        </div>
      </header>
      <section className="hero relative z-10 w-full flex flex-col justify-center items-center pb-16 mb-0 overflow-hidden" style={{ paddingTop: '2.5rem' }}>
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-5 mt-0 md:mt-1">
            <div className="flex items-center space-x-1.5 md:space-x-2.5 bg-white/10 px-1.5 py-0.5 md:px-2.5 md:py-1.5 rounded-full border-2 border-white/30 overflow-visible shadow-md shadow-white/5 backdrop-blur-sm ring-1 ring-white/10">
              <img
                src="/images/orig.png"
                alt="GoHighLevel"
                width={32}
                height={32}
                className="h-6 sm:h-7 md:h-8 w-auto object-contain -mt-1 md:-mt-2.5 scale-105 transition-all duration-300 hover:scale-110"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                style={{
                  filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.1))',
                  willChange: 'transform'
                }}
              />
              <div className="h-3 md:h-5 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent mx-0.5 md:mx-1 animate-pulse" />
              <span className="text-[#7BB9E8] font-medium text-[8px] md:text-xs tracking-widest uppercase transition-all duration-300 hover:text-[#7BB9E8] hover:scale-105" style={{ textShadow: '0 0 4px rgba(123, 185, 232, 0.2)' }}>
                GoHighLevel Plus Partner
              </span>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 md:mb-6 relative text-center break-words overflow-hidden" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)', fontFamily: 'Inter, Satoshi, sans-serif' }}>
            <span className="block break-words">We Make</span>
            <span className="block text-white break-words">Websites</span>
          </h1>
          <div className="mb-6 md:mb-8 h-[5rem] md:h-[4rem] flex items-center justify-center">
            <span className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-4xl leading-relaxed break-words line-clamp-4 sm:line-clamp-none" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              {typedText}
              <span className="typewriter-cursor text-[#7BB9E8] animate-pulse">|</span>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8 text-center w-full max-w-2xl justify-center">
            <button
              type="button"
              onClick={() => {
                const element = document.getElementById('services')
                if (element) {
                  const offset = 80
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - offset
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                }
              }}
              className="group relative px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] text-white font-semibold text-base md:text-lg lg:text-xl rounded-xl border border-[#7BB9E8]/30 shadow-lg shadow-[#7BB9E8]/20 hover:shadow-xl hover:shadow-[#7BB9E8]/30 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto text-center overflow-hidden touch-manipulation"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#9BC5E8] via-[#7BB9E8] to-[#6ba8d8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              type="button"
              onClick={() => {
                const element = document.getElementById('portfolio') || document.getElementById('success-stories')
                if (element) {
                  const offset = 80
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - offset
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                }
              }}
              className="group relative px-8 py-4 md:px-12 md:py-5 bg-white/5 backdrop-blur-md border-2 border-white/30 text-white font-semibold text-base md:text-lg lg:text-xl rounded-xl hover:bg-white/10 hover:border-[#7BB9E8]/50 hover:text-[#7BB9E8] transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto text-center shadow-lg hover:shadow-xl hover:shadow-[#7BB9E8]/10 touch-manipulation"
            >
              <span className="relative z-10">View Our Work</span>
            </button>
          </div>
          {/* Stats - Horizontal Layout */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 mt-4 mb-6 md:mb-8 pb-4 md:pb-6">
            {heroStats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-2.5 md:gap-3">
                {index > 0 && (
                  <div className="h-6 md:h-8 w-px bg-white/20" />
                )}
                <div className="flex items-center gap-2 md:gap-2.5">
                  <div className="text-[#7BB9E8] opacity-80">
                    {stat.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base md:text-lg lg:text-xl font-bold text-[#7BB9E8] leading-none">{stat.value}</span>
                    <span className="text-white/60 text-[9px] md:text-[10px] font-medium uppercase tracking-wide">{stat.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}

function MobileDrawer({ onClose }) {
  return (
    <>
      {/* Refined transparent overlay */}
      <div className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-md md:hidden transition-opacity duration-300" onClick={onClose} />
      
      {/* Transparent glassmorphism drawer - Better approach */}
      <div className="fixed inset-y-0 right-0 z-[999] w-full max-w-sm bg-gradient-to-b from-[rgba(4,5,7,0.85)] via-[rgba(4,5,7,0.75)] to-[rgba(4,5,7,0.85)] backdrop-blur-[20px] border-l border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.6)] flex flex-col md:hidden animate-slide-in-drawer overflow-y-auto" style={{ WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />
        
        {/* Header - Transparent with better contrast */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <a aria-label="Yo Marketing Home" href="#hero" onClick={onClose} className="group">
            <img 
              src="/images/logo-hq.png" 
              alt="Yo Marketing" 
              width={56}
              height={56}
              className="logo tilt-logo h-14 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-lg" 
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              style={{ willChange: 'transform' }}
            />
          </a>
          <button 
            suppressHydrationWarning 
            onClick={onClose} 
            className="p-2.5 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-xl active:scale-95" 
            aria-label="Close menu"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation - Transparent with better visual hierarchy */}
        <div className="relative px-6 pt-8 pb-4 flex flex-col gap-2">
          <nav className="flex flex-col gap-1">
            {mobileNavLinks.map((link, index) => {
              const handleClick = (e) => {
                if (link.href.startsWith('#')) {
                  e.preventDefault();
                  onClose();
                  const targetId = link.href.replace('#', '');
                  const element = document.getElementById(targetId);
                  if (element) {
                    setTimeout(() => {
                      const offset = 80;
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }, 150);
                  }
                } else {
                  onClose();
                }
              };
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleClick}
                  className="group relative px-4 py-3.5 text-white/95 hover:text-white text-base font-medium transition-all duration-300 rounded-xl"
                  style={{ 
                    fontFamily: 'Inter, Satoshi, sans-serif'
                  }}
                >
                  <span className="relative flex items-center justify-between z-10">
                    {link.label}
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-[#7BB9E8] to-[#5fa6d6] group-hover:h-8 transition-all duration-300 rounded-r-full" />
                </a>
              );
            })}
            {/* Service Pages */}
            <div className="mt-2 pl-4 border-l-2 border-white/10 flex flex-col gap-1">
              <a
                href="/services/website-design"
                onClick={onClose}
                className="group relative px-4 py-2.5 text-white/80 hover:text-white text-sm font-medium transition-all duration-300 rounded-lg"
                style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
              >
                <span className="relative flex items-center justify-between z-10">
                  Website Design & Build
                  <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a
                href="/services/google-business-profile"
                onClick={onClose}
                className="group relative px-4 py-2.5 text-white/80 hover:text-white text-sm font-medium transition-all duration-300 rounded-lg"
                style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
              >
                <span className="relative flex items-center justify-between z-10">
                  Google Business Profile
                  <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a
                href="/services/seo-services"
                onClick={onClose}
                className="group relative px-4 py-2.5 text-white/80 hover:text-white text-sm font-medium transition-all duration-300 rounded-lg"
                style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
              >
                <span className="relative flex items-center justify-between z-10">
                  SEO Services
                  <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a
                href="/services/lead-generation"
                onClick={onClose}
                className="group relative px-4 py-2.5 text-white/80 hover:text-white text-sm font-medium transition-all duration-300 rounded-lg"
                style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
              >
                <span className="relative flex items-center justify-between z-10">
                  Lead Generation & Ads
                  <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </nav>
        </div>

        {/* CTA Button - Smaller */}
        <div className="relative px-6 pt-4 pb-6 mt-auto border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => {
              onClose();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                setTimeout(() => {
                  const offset = 80;
                  const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }, 150);
              }
            }}
            className="group relative w-full text-center px-5 py-3 rounded-full bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] text-black font-bold text-sm shadow-[0_4px_20px_rgba(123,185,232,0.4)] hover:shadow-[0_6px_30px_rgba(123,185,232,0.6)] hover:scale-105 transition-all duration-300 active:scale-95"
            style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
          >
            <span className="relative flex items-center justify-center gap-2 z-10">
              GET STARTED
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

function RawHtml({ html, onInjected }) {
  const containerRef = useRef(null)
  const stableHtml = useMemo(() => html, [html])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {
    // Inject HTML directly after mount to avoid hydration issues
    // Use requestIdleCallback to prevent blocking the main thread
    const injectHtml = () => {
      if (containerRef.current && stableHtml) {
        try {
          containerRef.current.innerHTML = stableHtml
          setIsLoading(false)
          // Notify parent that HTML has been injected
          if (onInjected) {
            // Use setTimeout to ensure DOM is ready
            setTimeout(() => {
              onInjected(containerRef.current)
            }, 0)
          }
        } catch (error) {
          console.error('Error injecting HTML:', error)
          setHasError(true)
          setIsLoading(false)
        }
      }
    }

    // Use requestIdleCallback if available, otherwise use setTimeout
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(injectHtml, { timeout: 100 })
    } else {
      setTimeout(injectHtml, 0)
    }
  }, [stableHtml, onInjected])
  
  // Return empty div on server, will be filled on client
  if (hasError) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-white/50">Content failed to load</p>
      </div>
    )
  }
  
  return (
    <>
      {isLoading && (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-pulse text-white/30">Loading...</div>
        </div>
      )}
      <div 
        ref={containerRef} 
        suppressHydrationWarning 
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </>
  )
}

function HeroSectionSkeleton({ onOpenMobileNav, typedText, isMobileNavOpen = false }) {
  return (
    <section
      id="hero"
      className="hero w-full relative font-sans pb-12 md:pb-16"
      style={{ backgroundColor: 'transparent', paddingTop: 0 }}
      role="region"
      aria-label="Homepage Hero Banner"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black animate-pulse" />
      <header 
        className={`lg:hidden sticky top-0 z-50 w-full border-b backdrop-blur-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)_inset] transition-all duration-300 ${
          isMobileNavOpen 
            ? 'border-white/5 bg-gradient-to-b from-[rgba(4,5,7,0.3)] to-[rgba(4,5,7,0.2)]' 
            : 'border-white/15 bg-gradient-to-b from-[rgba(4,5,7,0.85)] to-[rgba(4,5,7,0.6)]'
        }`} 
        style={{ position: 'sticky', top: 0, zIndex: 50, marginTop: 0, WebkitBackdropFilter: 'blur(24px) saturate(180%)' }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">
          <div className="h-14 w-40 bg-white/10 rounded-lg animate-pulse" />
          <button suppressHydrationWarning className="p-3 text-white/90 hover:text-white transition-all duration-200 focus:outline-none rounded-2xl active:scale-95" aria-label="Open navigation menu" onClick={onOpenMobileNav} type="button">
            <div className="flex flex-col gap-1.5 w-5 h-5 justify-center items-center">
              <div className="w-5 h-0.5 bg-current rounded-full" />
              <div className="w-5 h-0.5 bg-current rounded-full" />
              <div className="w-5 h-0.5 bg-current rounded-full" />
            </div>
          </button>
        </div>
      </header>
      <section className="hero relative z-10 w-full flex flex-col justify-center items-center pt-16 lg:pt-24 pb-20 md:pb-24 mb-0 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full px-4 md:px-8 flex flex-col items-center justify-center text-center pt-0 pb-0 mb-0 overflow-hidden">
          <div className="h-8 w-48 bg-white/10 rounded-full animate-pulse mb-10 mt-0" />
          <div className="h-32 w-full bg-white/5 rounded animate-pulse mb-6" />
          <div className="h-12 w-64 bg-white/10 rounded-full animate-pulse mb-8" />
          
          {/* Desktop Stats Skeleton */}
          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12 mt-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 1 && <div className="h-8 w-px bg-white/10" />}
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-white/10 rounded animate-pulse" />
                  <div className="flex flex-col gap-1">
                    <div className="h-5 lg:h-6 w-20 bg-white/10 rounded animate-pulse" />
                    <div className="h-2.5 w-24 bg-white/10 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Stats Skeleton */}
          <div className="md:hidden flex flex-col gap-3 mt-6 mb-8 w-full max-w-sm mx-auto px-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-5 h-5 bg-white/10 rounded animate-pulse" />
                <div className="flex flex-col gap-1">
                  <div className="h-5 w-20 bg-white/10 rounded animate-pulse" />
                  <div className="h-2.5 w-24 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}

function CarouselSkeleton() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#0a0a0a] via-[#10151a] to-[#181c22] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-8 w-48 bg-white/10 rounded animate-pulse mx-auto mb-4" />
          <div className="h-16 w-96 bg-white/10 rounded animate-pulse mx-auto mb-6" />
        </div>
        <div className="flex gap-4 justify-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[320px] h-[480px] bg-white/5 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  )
}

