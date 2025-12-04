import bundleAnalyzer from '@next/bundle-analyzer'

const legacyCssFiles = [
  '2bf253bf30ea09a7.css',
  '081a0afca5a9bd20.css',
  '2c4911ffbcbe7797.css',
  '6c1f9ac498836ab6.css',
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.youngstownmarketing.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
    // Performance optimizations
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Optimize production builds
  swcMinify: true,
  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled - requires 'critters' package
    // Removed 'three' from optimizePackageImports to avoid conflicts
    // 'three' works fine without optimization
    optimizePackageImports: ['gsap', 'framer-motion'],
    // Optimize font loading
    optimizeFonts: true,
  },
  // Reduce JavaScript bundle size
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Output configuration
  output: 'standalone',
  async rewrites() {
    return legacyCssFiles.map((file) => ({
      source: `/_next/static/css/${file}`,
      destination: `/legacy-css/${file}`,
    }))
  },
  // Security and caching headers
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      {
        // Cache static images for 1 year (immutable)
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        // Cache logo files for 1 year (immutable)
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        // Cache legacy CSS files for 1 year
        source: '/legacy-css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
    ]
  },
}

// Bundle analyzer configuration
let config = nextConfig

if (process.env.ANALYZE === 'true') {
  try {
    const withBundleAnalyzer = bundleAnalyzer({
      enabled: true,
    })
    config = withBundleAnalyzer(config)
  } catch (error) {
    // If bundle analyzer fails, continue without it
    console.warn('Bundle analyzer not available, continuing build without it')
  }
}

export default config
