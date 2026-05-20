'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppWidget } from './WhatsAppWidget'

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isInternal = pathname.startsWith('/cotizador')

  if (isInternal) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
