'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'

export default function WebVitals() {
  useEffect(() => {
    // Report Web Vitals to console in development, or to analytics in production
    const reportMetric = (metric) => {
      // In development, log to console
      if (process.env.NODE_ENV === 'development') {
        console.log(metric)
      }
      
      // In production, you can send to analytics service
      // Example: send to Google Analytics, Vercel Analytics, etc.
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to analytics endpoint
        // fetch('/api/analytics', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(metric),
        // })
      }
    }

    // Measure Core Web Vitals
    onCLS(reportMetric) // Cumulative Layout Shift
    onFCP(reportMetric) // First Contentful Paint
    onLCP(reportMetric) // Largest Contentful Paint
    onTTFB(reportMetric) // Time to First Byte
    onINP(reportMetric) // Interaction to Next Paint (replaces FID - deprecated)
  }, [])

  return null // This component doesn't render anything
}

