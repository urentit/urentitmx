import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppWidget } from '@/components/layout/WhatsAppWidget'
import { MotionProvider } from '@/components/providers/MotionProvider'
import './globals.css'

/* ─── Fuentes ─── */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

/* ─── Metadata ─── */
export const metadata: Metadata = {
  metadataBase: new URL('https://urentit.mx'),
  title: {
    default: 'U Rent It | Arrendamiento de Vehículos para Empresas',
    template: '%s | U Rent It',
  },
  description:
    'Arrendamiento puro de vehículos premium, gama media, utilitarios, comerciales, carga y blindados para empresas y empresarios en México. Planes flexibles, deducción fiscal y mantenimiento incluido.',
  keywords: [
    'arrendamiento de vehículos',
    'arrendamiento puro México',
    'renta de autos para empresas',
    'flotilla vehicular',
    'leasing vehicular México',
    'arrendamiento puro CDMX',
    'vehículos premium empresa',
    'deducción fiscal vehículos',
    'U Rent It',
  ],
  authors: [{ name: 'U Rent It', url: 'https://urentit.mx' }],
  creator: 'U Rent It',
  publisher: 'U Rent It',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://urentit.mx',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://urentit.mx',
    siteName: 'U Rent It',
    title: 'U Rent It | Arrendamiento de Vehículos para Empresas',
    description:
      'Arrendamiento puro de vehículos para empresas en México. Planes flexibles, deducción fiscal y más de 36 marcas disponibles.',
    images: [
      {
        url: '/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'U Rent It — Arrendamiento de Vehículos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'U Rent It | Arrendamiento de Vehículos para Empresas',
    description:
      'Arrendamiento puro de vehículos para empresas en México. Planes flexibles y más de 36 marcas.',
    images: ['/img/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/img/ico/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

/* ─── GTM ─── */
const GTM_ID = 'GTM-T7CFMMR8'

/* ─── JSON-LD Organization ─── */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'U Rent It',
  url: 'https://urentit.mx',
  logo: 'https://urentit.mx/img/logos/logo-urentit.png',
  sameAs: [
    'https://www.facebook.com/Urentit.mx/',
    'https://www.instagram.com/urent.it/',
    'https://www.linkedin.com/company/urentit',
    'https://www.tiktok.com/@urentit',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+52-55-1806-2633',
    contactType: 'customer service',
    availableLanguage: 'Spanish',
  },
  description:
    'Empresa mexicana de arrendamiento puro de vehículos para empresas y empresarios.',
}

/* ─── JSON-LD LocalBusiness ─── */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://urentit.mx/#localbusiness',
  name: 'U Rent It',
  description:
    'Arrendamiento puro de vehículos para empresas en México. Más de 36 marcas disponibles, planes flexibles con deducción fiscal y mantenimiento incluido.',
  url: 'https://urentit.mx',
  telephone: '+52-55-1806-2633',
  image: 'https://urentit.mx/img/og-image.jpg',
  logo: 'https://urentit.mx/img/logos/logo-urentit.png',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad de México',
    addressRegion: 'CDMX',
    addressCountry: 'MX',
  },
  areaServed: [
    { '@type': 'State', name: 'Ciudad de México' },
    { '@type': 'State', name: 'Estado de México' },
    { '@type': 'State', name: 'Morelos' },
    { '@type': 'State', name: 'Puebla' },
    { '@type': 'State', name: 'Hidalgo' },
    { '@type': 'State', name: 'Aguascalientes' },
    { '@type': 'Country', name: 'México' },
  ],
  sameAs: [
    'https://www.facebook.com/Urentit.mx/',
    'https://www.instagram.com/urent.it/',
    'https://www.linkedin.com/company/urentit',
    'https://www.tiktok.com/@urentit',
  ],
}

/* ─── Layout ─── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-black text-white font-sans antialiased">
        {/* GTM noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppWidget />
        </MotionProvider>
      </body>
    </html>
  )
}
