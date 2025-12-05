'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const mobileNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About us', href: '/#about' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact us', href: '/#contact' },
]

function NavTextLink({ href, label }) {
  const handleClick = (e) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group relative px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-all duration-300 cursor-pointer rounded-lg hover:bg-white/5"
      style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
    >
      <span className="relative z-10">{label}</span>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] group-hover:w-3/4 transition-all duration-500 rounded-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#7BB9E8]/0 via-[#7BB9E8]/10 to-[#7BB9E8]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-lg -z-10" />
    </a>
  )
}

export default function SharedNavbar() {
  const [navSolid, setNavSolid] = useState(false)
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const navRef = useRef(null)
  const navInitialTopRef = useRef(0)

  useEffect(() => {
    if (navRef.current && typeof window !== 'undefined') {
      const nav = navRef.current
      const mobileNav = document.querySelector('.lg\\:hidden.w-full.z-50')
      
      const setSticky = () => {
        // Desktop navbar
        nav.style.setProperty('position', 'sticky', 'important')
        nav.style.setProperty('top', '0', 'important')
        nav.style.setProperty('z-index', '9999', 'important')
        nav.style.setProperty('left', '0', 'important')
        nav.style.setProperty('right', '0', 'important')
        nav.style.setProperty('width', '100%', 'important')
        
        // Mobile navbar
        if (mobileNav) {
          mobileNav.style.setProperty('position', 'sticky', 'important')
          mobileNav.style.setProperty('top', '0', 'important')
          mobileNav.style.setProperty('z-index', '9999', 'important')
        }
      }
      
      setSticky()
      const timeoutId = setTimeout(setSticky, 100)
      const timeoutId2 = setTimeout(setSticky, 300)
      
      const handleResize = () => {
        setSticky()
      }
      window.addEventListener('resize', handleResize, { passive: true })
      
      return () => {
        clearTimeout(timeoutId)
        clearTimeout(timeoutId2)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  // Memoize scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset
    setNavSolid(scrollY > 50)
  }, [])

  useEffect(() => {
    let ticking = false
    let lastScrollY = 0
    
    const throttledScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      
      // Throttle scroll updates - only update if scroll changed significantly
      if (Math.abs(scrollY - lastScrollY) < 30 && ticking) {
        return
      }
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          lastScrollY = scrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

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

  return (
    <>
      <nav
        ref={navRef}
        className={`hidden lg:block w-full z-[9999] sticky top-0 transition-all duration-300 ease-out ${
          navSolid 
            ? 'nav-scrolled-modern' 
            : 'nav-transparent'
        }`}
        style={{ 
          position: 'sticky', 
          top: '0px', 
          zIndex: 9999, 
          left: '0', 
          right: '0', 
          width: '100%',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)'
        }}
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Glassmorphism overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
          <div className="flex items-center justify-center h-20 relative z-10">
            <a 
              aria-label="Yo Marketing Home" 
              className="absolute left-6 lg:left-8 flex items-center group z-10" 
              href="/"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#7BB9E8]/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <img 
              src="/images/logo-hq.png" 
              alt="Yo Marketing" 
              width={100}
              height={100}
              className="logo tilt-logo h-24 w-auto group-hover:scale-110 transition-all duration-300 drop-shadow-lg" 
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ minHeight: '96px', minWidth: '96px' }}
            />
            </a>

            <div className="flex items-center justify-center space-x-1">
              <NavTextLink href="/" label="Home" />
              <div className="group relative">
                <NavTextLink href="/#services" label="Services" />
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
              <NavTextLink href="/#pricing" label="Pricing" />
              <NavTextLink href="/#about" label="About us" />
              <NavTextLink href="/#testimonials" label="Testimonials" />
              <NavTextLink href="/#contact" label="Contact us" />
            </div>

            <div className="absolute right-6 lg:right-8 flex items-center">
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/#contact'
                }}
                className="group relative px-8 py-3 bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] text-black font-bold text-sm tracking-wide transition-all duration-300 rounded-full overflow-hidden shadow-[0_4px_20px_rgba(123,185,232,0.3)] hover:shadow-[0_6px_30px_rgba(123,185,232,0.5)] hover:scale-105 active:scale-95"
                style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  GET STARTED
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden w-full z-[9999] sticky top-0 nav-transparent" style={{ position: 'sticky', top: '0px', zIndex: 9999 }}>
        <div className="flex items-center justify-between px-4 py-2 h-24">
          <a aria-label="Yo Marketing Home" href="/" className="flex items-center group">
            <img 
              src="/images/logo-hq.png" 
              alt="Yo Marketing" 
              width={72}
              height={72}
              className="logo tilt-logo h-18 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-lg" 
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ minHeight: '72px', minWidth: '72px' }}
            />
          </a>
          <button 
            suppressHydrationWarning 
            onClick={() => setMobileNavOpen(true)} 
            className="p-2 text-white/90 hover:text-white transition-all duration-200 focus:outline-none rounded-xl active:scale-95" 
            aria-label="Open navigation menu" 
            type="button"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileNavOpen && (
        <>
          <div className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-md lg:hidden transition-opacity duration-300" onClick={() => setMobileNavOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-[999] w-full max-w-sm bg-gradient-to-b from-[rgba(4,5,7,0.85)] via-[rgba(4,5,7,0.75)] to-[rgba(4,5,7,0.85)] backdrop-blur-[20px] border-l border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.6)] flex flex-col lg:hidden animate-slide-in-drawer overflow-y-auto" style={{ WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />
            <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5 backdrop-blur-sm">
              <a aria-label="Yo Marketing Home" href="/" onClick={() => setMobileNavOpen(false)} className="group">
            <img 
              src="/images/logo-hq.png" 
              alt="Yo Marketing" 
              width={80}
              height={80}
              className="logo tilt-logo h-20 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-lg" 
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ height: '80px', width: 'auto', minHeight: '80px', minWidth: '80px' }}
            />
              </a>
              <button 
                suppressHydrationWarning 
                onClick={() => setMobileNavOpen(false)} 
                className="p-2.5 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-xl active:scale-95" 
                aria-label="Close menu"
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="relative px-6 pt-8 pb-4 flex flex-col gap-2">
              <nav className="flex flex-col gap-1">
                {mobileNavLinks.map((link) => {
                  const handleClick = (e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      setMobileNavOpen(false);
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
                      setMobileNavOpen(false);
                    }
                  };
                  
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleClick}
                      className="group relative px-4 py-3.5 text-white/95 hover:text-white text-base font-medium transition-all duration-300 rounded-xl"
                      style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
                    >
                      <span className="relative flex items-center justify-between z-10">
                        {link.label}
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-[#7BB9E8] to-[#5fa6d6] group-hover:h-8 transition-all duration-300 rounded-r-full" />
                    </a>
                  );
                })}
                <div className="mt-2 pl-4 border-l-2 border-white/10 flex flex-col gap-1">
                  <a
                    href="/services/website-design"
                    onClick={() => setMobileNavOpen(false)}
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
                    onClick={() => setMobileNavOpen(false)}
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
                    onClick={() => setMobileNavOpen(false)}
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
                    onClick={() => setMobileNavOpen(false)}
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
            <div className="relative px-6 pt-4 pb-6 mt-auto border-t border-white/10 bg-white/5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  window.location.href = '/#contact';
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#7BB9E8] to-[#5fa6d6] text-white font-bold text-base rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
                style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
              >
                GET STARTED
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

