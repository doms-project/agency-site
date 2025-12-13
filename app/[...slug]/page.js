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
      const targetSection = section === 'home' ? 'hero' : section
      router.replace(`/#${targetSection}`)
    } else {
      // If invalid section, redirect to homepage
      router.replace('/')
    }
  }, [params.slug, router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Redirecting...</div>
    </div>
  )
}