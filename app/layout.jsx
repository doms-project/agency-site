/* eslint-disable @next/next/no-css-tags */
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import WebVitals from './components/WebVitals'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['500', '600'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export const metadata = {
  title: 'Yo Marketing | Digital Marketing & Web Design',
  description: 'Yo Marketing helps businesses grow online with expert website design, SEO services, Google Business Profile optimization, and lead generation.',
  author: 'Yo Marketing',
  keywords:
    'Yo Marketing,marketing,website design,SEO services,Google Business Profile,lead generation,digital marketing,web design,SEO,businesses',
  creator: 'Yo Marketing',
  publisher: 'Yo Marketing',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  category: 'Business Services',
  alternates: {
    canonical: 'https://youngstownmarketing.com',
  },
  openGraph: {
    title: 'Yo Marketing | Digital Marketing & Web Design',
    description:
      'Expert website design, SEO services, Google Business Profile optimization, and lead generation for businesses.',
    url: 'https://youngstownmarketing.com',
    siteName: 'Yo Marketing',
    locale: 'en_US',
    images: [
      {
        url: 'https://youngstownmarketing.com/images/logo-hq.png',
        width: 1620,
        height: 1620,
        alt: 'Yo Marketing Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@youngstownmarketing',
    creator: '@youngstownmarketing',
    title: 'Yo Marketing | Digital Marketing & Web Design',
    description:
      'Expert website design, SEO services, Google Business Profile optimization, and lead generation for businesses.',
    images: ['https://youngstownmarketing.com/images/logo-hq.png'],
  },
  icons: {
    icon: '/images/logo-hq.png',
    apple: '/images/logo-hq.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Three.js is loaded via esm.sh CDN which handles module resolution */}
        {/* Preload ONLY critical resources - Logo and GoHighLevel badge only */}
        <link rel="preload" href="/images/logo-hq.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/images/orig.png" as="image" type="image/png" fetchPriority="high" />
        {/* Other images lazy loaded on demand for faster initial load */}
        {/* Note: CSS is automatically bundled by Next.js when imported in layout.jsx */}
        {/* Font preloading is handled automatically by Next.js font optimization */}
        {/* DNS prefetch for faster connection - only on desktop */}
        <link rel="dns-prefetch" href="https://esm.sh" media="(min-width: 768px)" />
        {/* Preconnect for critical third-party resources - only on desktop */}
        <link rel="preconnect" href="https://esm.sh" crossOrigin="anonymous" media="(min-width: 768px)" />
        {/* Google Fonts preconnect - handled by next/font but added for explicit control */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Three.js is loaded dynamically via esm.sh CDN */}
        {/* Viewport meta for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#040507" />
        {/* Mobile web app capable */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={inter.className} suppressHydrationWarning style={{ margin: 0, padding: 0 }}>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `{"@context":"https://schema.org","@type":"Organization","name":"Yo Marketing","url":"https://youngstownmarketing.com","logo":"https://youngstownmarketing.com/images/logo-hq.png","description":"Yo Marketing helps businesses grow online with expert website design, SEO services, Google Business Profile optimization, and lead generation.","foundingDate":"2023","founder":{"@type":"Person","name":"Dom"},"address":{"@type":"PostalAddress","addressCountry":"US"},"contactPoint":{"@type":"ContactPoint","contactType":"Customer Service","telephone":"+1-330-299-5179","email":"youngstownmarketingco@gmail.com","url":"https://youngstownmarketing.com"},"sameAs":["https://www.instagram.com/dbcooper5"],"serviceType":["Website Design","SEO Services","Google Business Profile Optimization","Lead Generation","Digital Marketing"]}`,
          }}
        />
        {/* Logo tilt is handled in page.jsx - removed duplicate handler to prevent conflicts */}
        <WebVitals />
        {children}
      </body>
    </html>
  )
}

