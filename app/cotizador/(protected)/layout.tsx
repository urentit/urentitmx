import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Sidebar } from '@/components/cotizador/layout/Sidebar'
import { InternalHeader } from '@/components/cotizador/layout/InternalHeader'
import { SessionProvider } from '@/components/cotizador/SessionProvider'

export const metadata = { title: 'Cotizador | U Rent It', robots: { index: false } }

export default async function CotizadorLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/cotizador/login')

  return (
    <SessionProvider session={session}>
      <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <InternalHeader title="Cotizador de Arrendamiento" />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}
