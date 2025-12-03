'use client'

import { useEffect, useState } from 'react'
import SharedNavbar from '@/components/SharedNavbar'
import { footerSectionHtml } from '@/sections/footerSectionHtml'
import ServiceHeroBackground from '@/components/ServiceHeroBackground'
import GoogleBusinessProfileModal from '@/components/GoogleBusinessProfileModal'

export default function GoogleBusinessProfilePage() {
  const [isGBPModalOpen, setIsGBPModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [currentText, setCurrentText] = useState(0)
  const gbpTexts = [
    'Google visibility',
    'local rankings',
    'search presence',
    'business discovery',
    'customer reach',
    'online presence',
    'map listings',
    'search results',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % gbpTexts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [gbpTexts.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] text-white">
      <SharedNavbar />
      {/* Hero Section */}
      <section id="hero" className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#10151a] to-[#181c22]">
          <ServiceHeroBackground color={{ r: 16, g: 185, b: 129 }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-6 mt-8 sm:mt-12 md:mt-16 lg:mt-24 leading-tight px-2" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              Google Business Profile
              <br />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                {gbpTexts[currentText]}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              We optimize your Google Business Profile to make sure your business shows up right where your customers are looking — on Google Search and Maps.
            </p>
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 px-4">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white/70 text-xs sm:text-sm md:text-base text-center">More calls, visits, and customers — no ads needed</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button
                onClick={() => setIsGBPModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-base sm:text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
                style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <a
                href="tel:3302995179"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white text-lg font-bold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
                style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (330) 299-5179
              </a>
            </div>
            <p className="text-sm text-white/60 mt-4">
              Free assessment • Quick survey • Custom optimization strategy
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 mt-8 md:mt-12">
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Our Approach</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              Complete <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Optimization</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              From accurate business info to eye-catching photos, keywords, and regular updates, we fine-tune every detail to boost visibility, trust, and engagement.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10">
              <p className="text-lg text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                Our goal is simple: when someone searches for what you offer, you&apos;re the first name they see and the one they click.
              </p>
              <p className="text-lg text-white/80 leading-relaxed" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                A fully optimized profile means more calls, more visits, and more customers — without spending a cent on ads. Let&apos;s turn your Google listing into a 24/7 digital magnet that drives real, local results.
              </p>
            </div>
          </div>

          {/* Packages Section */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Setup Package */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-600/0 group-hover:from-emerald-500/5 group-hover:to-teal-600/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-emerald-500/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-emerald-400 transition-colors duration-300" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                  Setup Package
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80 leading-relaxed">Full Google Business Profile setup</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80 leading-relaxed">Optimize name, description, and categories</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80 leading-relaxed">Add keywords for better ranking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80 leading-relaxed">Upload high-quality photos and business info</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80 leading-relaxed">Verify your business on Google</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Monthly Management */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-600/0 group-hover:from-emerald-500/5 group-hover:to-teal-600/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-emerald-500/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-emerald-400 transition-colors duration-300" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                  Monthly Management
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80 leading-relaxed">Post weekly updates and offers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80 leading-relaxed">Respond to reviews professionally</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80 leading-relaxed">Monitor analytics and ranking performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80 leading-relaxed">Keep your profile active and competitive</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#10151a] to-[#0a0a0a]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.1)_0%,_transparent_50%)]"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 mt-8 md:mt-12">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Get Started</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Ready to Boost Your <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Visibility?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Turn your Google listing into a 24/7 digital magnet that drives real, local results — without spending a cent on ads.
          </p>
          <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsGBPModalOpen(true)}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-bold shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-105 transition-all duration-300 group"
              style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
            >
              Get Your Free Assessment
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <a
              href="tel:3302995179"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white/10 text-white text-lg font-bold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
              style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (330) 299-5179
            </a>
          </div>
          <p className="text-sm text-white/60 mb-12">
            No obligation • Quick survey • Custom optimization plan
          </p>
        </div>
      </section>

      <footer dangerouslySetInnerHTML={{ __html: footerSectionHtml }} />
      
      <GoogleBusinessProfileModal isOpen={isGBPModalOpen} onClose={() => setIsGBPModalOpen(false)} />
    </div>
  )
}
