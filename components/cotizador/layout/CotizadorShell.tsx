'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { Session } from 'next-auth'
import { SessionProvider } from '@/components/cotizador/SessionProvider'
import { CommissionProvider } from '@/lib/cotizador/commissionContext'
import { Sidebar } from './Sidebar'
import { InternalHeader } from './InternalHeader'
import { DownloadDocs } from '@/components/cotizador/DownloadDocs'

export function CotizadorShell({ children, session }: { children: React.ReactNode; session: Session }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setSidebarOpen(false) }, [pathname])

  return (
    <SessionProvider session={session}>
      <CommissionProvider>
      <div className="flex h-dvh overflow-hidden bg-[#0a0a0a]">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/70 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          <InternalHeader onMenuToggle={() => setSidebarOpen(v => !v)} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
            <DownloadDocs />
          </main>
        </div>
      </div>
      </CommissionProvider>
    </SessionProvider>
  )
}
