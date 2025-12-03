'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-[#7BB9E8]/20 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            Thank You!
          </h1>
          
          <p className="text-xl text-white/70 mb-8">
            Your survey has been submitted successfully.
          </p>

          <p className="text-white/50 mb-8">
            We&apos;ll review your information and get back to you soon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-[#7BB9E8] hover:bg-[#5fa6d6] text-black font-bold rounded-lg transition-colors"
            >
              Return to Home
            </button>
          </div>

          <p className="text-white/40 text-sm mt-8">
            You will be redirected automatically in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  )
}
