'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// Clean Logo Loading Animation Component
function ModernLogoLoader() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent'
    }}>
      {/* Logo */}
      <svg
        width="180"
        height="180"
        viewBox="0 0 512 512"
      >
          <defs>
            <mask id="sweep-mask">
              <rect width="512" height="512" fill="black" />
              <rect
                width="180"
                height="512"
                fill="white"
                style={{
                  animation: 'sweep 3s ease-in-out infinite'
                }}
              />
            </mask>
          </defs>

          {/* Base logo with gentle breathing */}
          <image
            href="/logo-hq.png"
            width="512"
            height="512"
            style={{
              animation: 'breathe 4s ease-in-out infinite'
            }}
          />

          {/* Subtle sweep overlay */}
          <image
            href="/logo-hq.png"
            width="512"
            height="512"
            mask="url(#sweep-mask)"
            style={{
              opacity: '0.6'
            }}
          />
      </svg>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            opacity: 0.8;
            transform: scale(0.99);
          }
          50% {
            opacity: 1;
            transform: scale(1.01);
          }
        }

        @keyframes sweep {
          0% {
            transform: translateX(-180px);
          }
          50% {
            transform: translateX(0px);
          }
          100% {
            transform: translateX(692px);
          }
        }

      `}</style>
    </div>
  );
}

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
  return <ModernLogoLoader />
}