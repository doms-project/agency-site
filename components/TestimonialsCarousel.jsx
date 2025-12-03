'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'

const testimonials = [
  {
    quote: '"Our Google Business Profile is now bringing in customers daily!"',
    text: 'Working with Yo Marketing completely transformed our online presence. Before, we were barely showing up on Google. Now we\'re getting calls and walk-ins every day from people finding us on Google Maps. Dom and the team optimized our Google Business Profile, and the results speak for themselves. We\'ve seen a 300% increase in inquiries in just two months!',
    author: 'Jennifer',
    role: 'Owner',
    company: 'Mahoning Valley Auto Repair',
    date: 'Date of experience: November 2024',
    logo: null,
    initial: 'J',
  },
  {
    quote: '"Professional website that actually converts visitors into customers"',
    text: 'We needed a website that looked professional and actually worked for our business. Yo Marketing delivered exactly that. The site is beautiful, easy to navigate, and most importantly—it\'s bringing us real customers. The contact form works perfectly, and we\'re getting qualified leads weekly. Couldn\'t be happier with the results!',
    author: 'Michael',
    role: 'Co-Owner',
    company: 'Steel Valley Landscaping',
    date: 'Date of experience: October 2024',
    logo: null,
    initial: 'M',
  },
  {
    quote: '"Finally ranking on Google for our local keywords!"',
    text: 'After months of trying to figure out SEO on our own, we decided to work with Yo Marketing. Best decision we made! They helped us understand what we needed and got us ranking on the first page of Google for our main keywords. Now when people search for our services, we show up. The phone hasn\'t stopped ringing!',
    author: 'Sarah',
    role: 'Manager',
    company: 'Downtown Dental Care',
    date: 'Date of experience: September 2024',
    logo: null,
    initial: 'S',
  },
  {
    quote: '"Lead generation ads that actually work!"',
    text: 'We\'ve tried running ads before with little success. Yo Marketing took a completely different approach. They created targeted campaigns that reached the right people at the right time. We went from getting maybe one or two leads a month to getting 10-15 qualified leads weekly. The ROI has been incredible, and we\'re already planning to scale up!',
    author: 'Robert',
    role: 'Owner',
    company: 'Valley Home Services',
    date: 'Date of experience: August 2024',
    logo: null,
    initial: 'R',
  },
  {
    quote: '"They understand businesses like no one else"',
    text: 'What I love most about working with Yo Marketing is that they actually get it. They understand the market, they know what works, and they\'re genuinely invested in our success. It\'s not just another agency—they\'re marketing experts who care. The personal attention and knowledge make all the difference.',
    author: 'Lisa',
    role: 'Founder',
    company: 'Mill Creek Bakery',
    date: 'Date of experience: July 2024',
    logo: null,
    initial: 'L',
  },
]

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile for performance optimizations
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

  const goToReview = useCallback((index) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 300)
  }, [isAnimating, currentIndex])

  // Auto-rotate reviews - slower on mobile for better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, isMobile ? 6000 : 5000) // 6s on mobile, 5s on desktop
    return () => clearInterval(interval)
  }, [isMobile])

  const currentReview = useMemo(() => testimonials[currentIndex], [currentIndex])

  return (
    <section id="testimonials" className="w-full bg-gradient-to-b from-[#0a0a0a] via-[#10151a] to-[#0a0a0a] relative overflow-hidden section-padding" style={{ scrollMarginTop: '120px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16 pt-4 md:pt-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-2 bg-[#7BB9E8] px-4 py-2 rounded-lg shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                Google Reviews
              </span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 leading-tight px-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Trusted by Businesses
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 px-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Rated <span className="text-[#7BB9E8]">4.9/5</span> by business owners
          </h2>
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 md:w-7 md:h-7 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-white/70 text-lg" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Trusted Reviews
          </p>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto mb-8 px-4">
          <div
            className={`bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden min-h-[380px] md:min-h-[380px] flex flex-col transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7BB9E8]/5 to-transparent rounded-2xl" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[#7BB9E8]" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Verified Review
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#7BB9E8]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-medium" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                    Google
                  </span>
                </div>
              </div>
              <h4 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                {currentReview.quote}
              </h4>
              <blockquote className="text-gray-700 text-sm md:text-lg leading-relaxed mb-4 flex-grow overflow-y-auto" style={{ fontFamily: 'Inter, Satoshi, sans-serif', maxHeight: '200px' }}>
                {currentReview.text}
              </blockquote>
              <div className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                {currentReview.date}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#7BB9E8] to-[#5fa6d6] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {currentReview.initial}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 text-base md:text-lg" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                        {currentReview.author}
                      </span>
                      <svg className="w-4 h-4 text-[#7BB9E8]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                      {currentReview.role}, {currentReview.company}
                    </div>
                  </div>
                </div>
                {currentReview.logo && (
                  <img
                    alt={`${currentReview.company} logo`}
                    className="h-10 w-10 md:h-12 md:w-12 object-contain opacity-70 flex-shrink-0"
                    src={currentReview.logo}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to review ${index + 1}`}
              onClick={() => goToReview(index)}
              className="p-2 touch-manipulation transition-all duration-300"
              style={index === 0 ? { marginTop: '8px' } : {}}
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-150 opacity-100' 
                    : 'bg-white opacity-30 hover:opacity-60'
              }`}
            />
            </button>
          ))}
        </div>

        <div className="text-center mt-20 pt-12 border-t border-white/10 pb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Ready to grow your business?
          </h3>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Join other businesses getting real results with our marketing services
          </p>
          <button
            type="button"
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="inline-flex items-center justify-center gap-2 md:gap-3 px-8 py-4 md:px-10 md:py-5 rounded-xl bg-gradient-to-r from-[#7BB9E8] to-[#5fa6d6] hover:from-[#5fa6d6] hover:to-[#7BB9E8] text-black text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-[#7BB9E8]/25 transform hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#7BB9E8]/30 w-full sm:w-auto max-w-md sm:max-w-none touch-manipulation"
            style={{ fontFamily: 'Inter, Satoshi, sans-serif', minHeight: '56px' }}
          >
            Get Started Today
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(TestimonialsCarousel)

