'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SharedNavbar from '@/components/SharedNavbar'
import { footerSectionHtml } from '@/sections/footerSectionHtml'
import ServiceHeroBackground from '@/components/ServiceHeroBackground'
import WebsiteSurveyModal from '@/components/WebsiteSurveyModal'

export default function WebsiteDesignPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [currentText, setCurrentText] = useState(0)
  const buildTexts = [
    'custom websites',
    'digital experiences',
    'business solutions',
    'online presence',
    'brand experiences',
    'growth engines',
    'modern stores',
    'fast websites',
    'user journeys',
    'Landing Page',
    'Portfolio',
    'Ecommerce Site',
    'web applications',
    'conversion-focused sites',
    'responsive websites',
    'business websites',
    'marketing websites',
    'lead generation sites',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % buildTexts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [buildTexts.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] text-white">
      <SharedNavbar />
      {/* Hero Section */}
      <section id="hero" className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#10151a] to-[#181c22]">
          <ServiceHeroBackground />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-6 mt-8 sm:mt-12 md:mt-16 lg:mt-24 leading-tight px-2" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              We Build
              <br />
              <span className="bg-gradient-to-r from-[#7BB9E8] to-[#4A90E2] bg-clip-text text-transparent">
                {buildTexts[currentText]}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              We craft modern, high-performing websites with sleek design, lightning-fast performance, and mobile-first responsiveness that work hard for your business.
            </p>
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 px-4">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#7BB9E8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white/70 text-xs sm:text-sm md:text-base text-center">Trusted by 80+ businesses to bring their vision online</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#7BB9E8] to-[#4A90E2] text-white text-base sm:text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
                style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
              >
                Start Your Website Project
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-white/60 mt-4 px-4">
              Free assessment • Quick survey • Custom website strategy
            </p>
          </div>
        </div>
      </section>

      {/* Our Goal Section */}
      <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7BB9E8]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4A90E2]/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#7BB9E8]/10 border border-[#7BB9E8]/20 rounded-full mb-6 mt-8 md:mt-12">
              <span className="text-[#7BB9E8] text-sm font-semibold uppercase tracking-wider">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              Our <span className="bg-gradient-to-r from-[#7BB9E8] to-[#4A90E2] bg-clip-text text-transparent">Goal?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              Turn casual visitors into loyal customers through smooth navigation, strategic content, and conversion-focused design.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7BB9E8]/0 to-[#4A90E2]/0 group-hover:from-[#7BB9E8]/5 group-hover:to-[#4A90E2]/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7BB9E8] to-[#4A90E2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#7BB9E8]/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#7BB9E8] transition-colors duration-300" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                  Impress & Engage
                </h3>
                <p className="text-white/70 leading-relaxed text-base">
                  From landing pages to full-scale eCommerce platforms, built to captivate your audience.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7BB9E8]/0 to-[#4A90E2]/0 group-hover:from-[#7BB9E8]/5 group-hover:to-[#4A90E2]/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7BB9E8] to-[#4A90E2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#7BB9E8]/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#7BB9E8] transition-colors duration-300" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                  Rank & Convert
                </h3>
                <p className="text-white/70 leading-relaxed text-base">
                  Reflects your identity, ranks well on Google, and drives real results that matter.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7BB9E8]/0 to-[#4A90E2]/0 group-hover:from-[#7BB9E8]/5 group-hover:to-[#4A90E2]/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7BB9E8] to-[#4A90E2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#7BB9E8]/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#7BB9E8] transition-colors duration-300" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
                  For Every Business
                </h3>
                <p className="text-white/70 leading-relaxed text-base">
                  Whether you&apos;re a small business or established brand, we create a digital space that works.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Section */}
      <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#10151a] to-[#0a0a0a]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(123,185,232,0.1)_0%,_transparent_50%)]"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-[#7BB9E8]/10 border border-[#7BB9E8]/20 rounded-full mb-6 mt-8 md:mt-12">
            <span className="text-[#7BB9E8] text-sm font-semibold uppercase tracking-wider">Get Started</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            So What Are You <span className="bg-gradient-to-r from-[#7BB9E8] to-[#4A90E2] bg-clip-text text-transparent">Waiting For?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Join 80+ businesses growing with no money out of pocket. Sign up and if you qualify, we&apos;ll help transform your business growth.
          </p>
          <div className="mb-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#7BB9E8] to-[#4A90E2] text-white text-lg font-bold shadow-2xl hover:shadow-[0_0_40px_rgba(123,185,232,0.5)] hover:scale-105 transition-all duration-300 group"
              style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}
            >
              Get Your Free Revenue Assessment
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-white/60 mb-12">
            No obligation • Quick survey • Custom growth plan
          </p>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 text-left max-w-3xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-white" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              When you qualify for our business growth study:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 bg-gradient-to-br from-[#7BB9E8] to-[#4A90E2] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90 text-lg leading-relaxed pt-1">Grow your business with no money out of pocket</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 bg-gradient-to-br from-[#7BB9E8] to-[#4A90E2] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90 text-lg leading-relaxed pt-1">Cutting-edge strategies to get more leads and views on Google</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 bg-gradient-to-br from-[#7BB9E8] to-[#4A90E2] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90 text-lg leading-relaxed pt-1">Automation for texts, emails, calls, sales, and fulfillment</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 bg-gradient-to-br from-[#7BB9E8] to-[#4A90E2] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90 text-lg leading-relaxed pt-1">Custom website built to outperform your competitors</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer dangerouslySetInnerHTML={{ __html: footerSectionHtml }} />
      
      <WebsiteSurveyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
