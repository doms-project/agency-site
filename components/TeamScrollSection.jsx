'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Team member data
const teamMembers = [
  {
    id: 1,
    name: 'Dom',
    role: 'Founder & CEO',
    greeting: "Hey, I'm Dom.",
    image: '/images/dom photo.jpeg',
    bio: [
      "I'm the founder of Yo Marketing, and over the years I've worked hands-on with 100+ small businesses, dozens of creators, and several political campaigns. I've been part of some incredible marketing wins—and have personally led campaigns that doubled client revenue through strategic ads and smart digital execution.",
      "I have a genuine passion for helping businesses grow and sharing the strategies that actually work. At Yo Marketing, we don't just create beautiful websites—we build websites that convert, backed by systems that keep your business growing on autopilot.",
      "From automation setups and CRM optimization to high-impact advertising campaigns, we help you get more customers, streamline operations, and scale effectively."
    ],
    instagram: 'https://www.instagram.com/dbcooper5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
  },
  {
    id: 2,
    name: 'Cristina',
    role: 'Brand Strategist & Designer',
    greeting: "Hey, I'm Cristina.",
    image: '/images/cristina.jpeg?v=2',
    bio: [
      "I bring brands to life through strategic design and visual storytelling. With a keen eye for aesthetics and user experience, I create designs that not only look stunning but also drive results.",
      "From logo design to complete brand identities, I ensure every visual element aligns with your business goals and resonates with your target audience."
    ]
  },
  {
    id: 3,
    name: 'Evan',
    role: 'Sales Manager',
    greeting: "Hey, I'm Evan.",
    image: '/images/Evan new.jpg',
    bio: [
      "I lead our sales efforts and help businesses discover how Yo Marketing can transform their digital presence. With a consultative approach, I work closely with clients to understand their unique challenges.",
      "My goal is to build lasting partnerships and ensure every client gets the personalized attention they deserve."
    ]
  },
  {
    id: 4,
    name: 'Andrianne',
    role: 'Lead Generation',
    greeting: "Hey, I'm Andrianne.",
    image: '/images/andrianne.jpg',
    bio: [
      "I specialize in finding and nurturing high-quality leads for our clients. Through strategic outreach and data-driven targeting, I help businesses connect with their ideal customers.",
      "My focus is on building sustainable lead pipelines that drive consistent growth."
    ]
  },
  {
    id: 5,
    name: 'Muzaid',
    role: 'Front End Developer',
    greeting: "Hey, I'm Muzaid.",
    image: '/images/Muzaib.jpeg',
    bio: [
      "I craft pixel-perfect, responsive interfaces that users love. With expertise in modern frameworks and a passion for clean code, I bring designs to life with smooth animations and intuitive interactions.",
      "Performance and accessibility are at the core of everything I build."
    ]
  },
  {
    id: 6,
    name: 'Musaraf',
    role: 'Backend Developer',
    greeting: "Hey, I'm Musaraf.",
    image: '/images/musaraf.webp',
    bio: [
      "I architect robust backend systems that power seamless user experiences. From database optimization to API development, I ensure our solutions are scalable, secure, and lightning-fast.",
      "I love solving complex technical challenges and building systems that just work."
    ]
  }
]

export default function TeamScrollSection() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [activeBioMember, setActiveBioMember] = useState(null)
  const lastIndexRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const section = sectionRef.current
    const trigger = triggerRef.current
    if (!section || !trigger) return

    // Kill any existing ScrollTriggers for this element
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === trigger) st.kill()
    })

    const totalMembers = teamMembers.length

    // Create the ScrollTrigger - SLOWER scroll (2x viewport height per member)
    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger,
      start: 'top top',
      end: () => `+=${window.innerHeight * totalMembers * 2}`,  // 2x slower
      pin: section,
      pinSpacing: true,
      scrub: 1,  // Smoother scrub
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Calculate which member to show based on progress
        const progress = self.progress
        const newIndex = Math.min(
          Math.floor(progress * totalMembers),
          totalMembers - 1
        )
        
        // Only update if changed
        if (newIndex !== lastIndexRef.current) {
          setDirection(newIndex > lastIndexRef.current ? 1 : -1)
          lastIndexRef.current = newIndex
          setCurrentIndex(newIndex)
        }
      }
    })

    // Refresh after a small delay
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 300)

    return () => {
      clearTimeout(timeout)
      scrollTrigger.kill()
    }
  }, []) // Empty dependency array - only run once!

  const currentMember = teamMembers[currentIndex]

  return (
    <div ref={triggerRef} id="about" style={{ scrollMarginTop: '120px' }}>
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#10151a] to-[#0a0a0a] overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,185,232,0.1),transparent_50%)]" />
        </div>

        {/* Main container */}
        <div className="relative z-10 min-h-screen flex flex-col justify-start px-4 md:px-8 lg:px-16 pt-16 pb-12 md:pt-20 md:pb-16 lg:justify-center lg:py-16">
          {/* Header */}
          <div className="text-center mb-3 md:mb-8 lg:mb-12">
            <h2 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Meet the Team
            </h2>
            <div className="w-16 md:w-20 h-1 rounded-full bg-gradient-to-r from-[#7BB9E8] to-[#5fa6db] mb-2 md:mb-4 mx-auto shadow-lg shadow-[#7BB9E8]/50" />
            <p 
              className="text-sm md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto px-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Helping businesses grow, scale, and win online.
            </p>
          </div>

          {/* Progress indicator - positioned better on mobile */}
          <div className="absolute top-4 right-4 md:top-8 md:left-8 md:right-auto lg:left-16 z-20">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 border border-white/20">
              <span className="text-white font-bold text-sm md:text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/50 mx-1 md:mx-2">/</span>
              <span className="text-white/50 text-sm md:text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {String(teamMembers.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Team member content */}
          <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full">
            {/* Desktop Layout - Side by Side */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-center w-full">
              {/* Photo */}
              <div 
                className="relative"
                key={`photo-${currentMember.id}`}
                style={{
                  animation: direction === 1 ? 'slideInFromRight 0.5s ease-out' : 'slideInFromLeft 0.5s ease-out'
                }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#7BB9E8]/20 to-[#5fa6db]/20 rounded-2xl blur-xl opacity-60" />
                <div className="relative aspect-[3/4] max-w-[260px] mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-[#7BB9E8]/10 to-transparent">
                  <img
                    src={currentMember.image}
                    alt={`${currentMember.name} - ${currentMember.role}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Card */}
              <div 
                className="relative"
                key={`card-${currentMember.id}`}
                style={{
                  animation: direction === 1 ? 'fadeSlideUp 0.5s ease-out' : 'fadeSlideDown 0.5s ease-out'
                }}
              >
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10 shadow-xl">
                  {/* Badge */}
                  <div className="inline-block bg-[#7BB9E8]/20 rounded-lg px-3 py-1 mb-4">
                    <span className="text-[#7BB9E8] font-semibold text-sm tracking-wider">
                      YO MARKETING
                    </span>
                  </div>

                  {/* Name & Role */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 
                      className="text-2xl lg:text-3xl font-bold text-white"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {currentMember.greeting}
                    </h3>
                    {currentMember.instagram && (
                      <a
                        href={currentMember.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/60 hover:text-[#7BB9E8] transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-[#7BB9E8] font-semibold text-base lg:text-lg mb-4">
                    {currentMember.role}
                  </p>

                  {/* Bio */}
                  <div className="space-y-3">
                    {currentMember.bio.map((paragraph, idx) => (
                      <p 
                        key={idx}
                        className="text-white/80 leading-relaxed text-sm lg:text-base"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Layout - Horizontal with smaller elements */}
            <div className="lg:hidden w-full px-2">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                {/* Photo - Bigger on mobile but stacked so text fits */}
                <div 
                  className="relative flex-shrink-0"
                  key={`mobile-photo-${currentMember.id}`}
                  style={{
                    animation: direction === 1 ? 'slideInFromRight 0.4s ease-out' : 'slideInFromLeft 0.4s ease-out'
                  }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#7BB9E8]/20 to-[#5fa6db]/20 rounded-xl blur-lg opacity-50" />
                  <div className="relative w-[120px] sm:w-[140px] md:w-[160px] max-w-[44vw] aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-b from-[#7BB9E8]/10 to-transparent">
                    <img
                      src={currentMember.image}
                      alt={`${currentMember.name} - ${currentMember.role}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Card - Compact on mobile */}
                <div 
                  className="relative flex-1 min-w-0"
                  key={`mobile-card-${currentMember.id}`}
                  style={{
                    animation: direction === 1 ? 'fadeSlideUp 0.4s ease-out 0.1s both' : 'fadeSlideDown 0.4s ease-out 0.1s both'
                  }}
                >
                  <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10 shadow-xl">
                    {/* Badge */}
                    <div className="inline-block bg-[#7BB9E8]/20 rounded px-2 py-0.5 mb-2">
                      <span className="text-[#7BB9E8] font-semibold text-[10px] tracking-wider">
                        YO MARKETING
                      </span>
                    </div>

                    {/* Name & Role */}
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 
                        className="text-base sm:text-lg font-bold text-white truncate"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {currentMember.greeting}
                      </h3>
                      {currentMember.instagram && (
                        <a
                          href={currentMember.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-5 h-5 flex-shrink-0 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/60 hover:text-[#7BB9E8] transition-all duration-300"
                        >
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <p className="text-[#7BB9E8] font-semibold text-xs sm:text-sm mb-2">
                      {currentMember.role}
                    </p>

                    {/* Bio - Slightly less clamped on mobile; full on sm+ */}
                    <p 
                      className="text-white/70 leading-snug text-xs sm:text-sm line-clamp-6 sm:line-clamp-none"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {currentMember.bio[0]}
                    </p>
                    {currentMember.bio.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveBioMember(currentMember)}
                        className="mt-2 inline-flex items-center gap-1 text-[#7BB9E8] text-xs sm:text-sm font-semibold hover:text-white transition-colors duration-200"
                        aria-label={`Read more about ${currentMember.name}`}
                      >
                        Read more
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14" strokeLinecap="round" />
                          <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress dots - show only on mobile/tablet */}
          <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-4 md:mt-8 lg:hidden">
            {teamMembers.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-[#7BB9E8] scale-150' 
                    : idx < currentIndex 
                      ? 'bg-[#7BB9E8]/50' 
                      : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Scroll hint - hidden on mobile; text only, no arrow */}
          <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest">
            Scroll through the team
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeSlideDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        {activeBioMember && (
          <div className="fixed inset-0 z-[11000] flex items-center justify-center px-4">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setActiveBioMember(null)}
              aria-label="Close bio overlay"
            />
            <div className="relative w-full max-w-lg bg-[#0f1319] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-start justify-between px-5 py-4 border-b border-white/10 bg-white/5">
                <div>
                  <p className="text-[#7BB9E8] text-xs font-semibold">{activeBioMember.role}</p>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {activeBioMember.greeting}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveBioMember(null)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="px-5 py-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {activeBioMember.bio.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-white/80 leading-relaxed text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
