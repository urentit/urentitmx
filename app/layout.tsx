import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
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
  title: {
    default: 'Cotizador | U Rent It',
    template: '%s | Cotizador U Rent It',
  },
  description: 'Cotizador interno de arrendamiento vehicular de U Rent It.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/img/ico/apple-icon-180x180.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

/* ─── Layout ─── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
