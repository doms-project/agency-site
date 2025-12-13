'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function SectionPage() {
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Get the section from the URL slug
    const slug = params.slug
    const section = Array.isArray(slug) ? slug[0] : slug

    // Valid sections that exist on the homepage
    const validSections = [
      'hero',
      'services',
      'about',
      'testimonials',
      'contact',
      'pricing',
      'approach',
      'team',
      'home'
    ]

    // If it's a valid section, redirect to homepage with hash
    if (validSections.includes(section)) {
      // Redirect to homepage with the section hash
      let targetSection = section

      // Special mappings
      if (section === 'home') {
        targetSection = 'hero'
      } else if (section === 'team') {
        targetSection = 'about'  // Team section is actually the "about" section
      }

      router.replace(`/#${targetSection}`)
    } else {
      // If invalid section, redirect to homepage
      router.replace('/')
    }
  }, [params.slug, router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#7BB9E8]/20 rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#7BB9E8]/30 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '2.5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#7BB9E8]/25 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-[#7BB9E8]/20 rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
      </div>

      {/* Main loading animation */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Modern SVG Logo Animation */}
        <div className="relative">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="animate-spin"
            style={{ animationDuration: '4s' }}
          >
            {/* Outer ring */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#7BB9E8"
              strokeWidth="2"
              strokeDasharray="20 5"
              className="animate-pulse"
              style={{ animationDuration: '2s' }}
            />

            {/* Inner geometric shape */}
            <polygon
              points="60,20 85,45 60,70 35,45"
              fill="none"
              stroke="#7BB9E8"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: '0.5s', animationDuration: '2s' }}
            />

            {/* Central dot */}
            <circle
              cx="60"
              cy="60"
              r="8"
              fill="#7BB9E8"
              className="animate-ping"
              style={{ animationDuration: '1.5s' }}
            />

            {/* Orbiting dots */}
            <circle cx="60" cy="15" r="3" fill="#7BB9E8" opacity="0.7">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="105" cy="60" r="2" fill="#7BB9E8" opacity="0.5">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="60" cy="105" r="2.5" fill="#7BB9E8" opacity="0.6">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="15" cy="60" r="2" fill="#7BB9E8" opacity="0.8">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Glowing effect */}
          <div className="absolute inset-0 bg-[#7BB9E8]/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '3s' }} />
        </div>

        {/* Loading text with fade animation */}
        <div className="text-center">
          <div className="text-white/80 text-sm font-medium tracking-wider uppercase animate-pulse" style={{ animationDuration: '2s' }}>
            Redirecting
          </div>
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-1 h-1 bg-[#7BB9E8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 bg-[#7BB9E8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 bg-[#7BB9E8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-[#7BB9E8]/5 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}