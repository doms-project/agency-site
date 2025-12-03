/* eslint-disable @next/next/no-css-tags */
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import WebVitals from './components/WebVitals'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['500', '600'],
  display: 'swap',
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
        {/* Preload critical resources - Hero and above-the-fold images */}
        <link rel="preload" href="/images/logo-hq.png" as="image" type="image/png" fetchPriority="high" />
        {/* Preload partner logos that appear above the fold */}
        <link rel="preload" href="/images/vercel-logotype-dark.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/images/monday.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/images/zapier-logo_white.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/images/ghl.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/images/Celigo.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/images/supabase-logo-wordmark--dark.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/images/Framer_Logo_Dark-Mode_Core.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/images/klaviyo-logo-white.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/images/meta-logo-white.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/images/Full_Logo_Blue_White.png" as="image" type="image/png" fetchPriority="high" />
        {/* Note: CSS is automatically bundled by Next.js when imported in layout.jsx */}
        {/* Font preloading is handled automatically by Next.js font optimization */}
        {/* DNS prefetch for faster connection */}
        <link rel="dns-prefetch" href="https://esm.sh" />
        {/* Preconnect for critical third-party resources */}
        <link rel="preconnect" href="https://esm.sh" crossOrigin="anonymous" />
        {/* Google Fonts preconnect - handled by next/font but added for explicit control */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Three.js is loaded dynamically via esm.sh CDN */}
        {/* Viewport meta for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Script
          id="structured-data"
          type="application/ld+json"
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

