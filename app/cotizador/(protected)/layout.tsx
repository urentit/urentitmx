import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { CotizadorShell } from '@/components/cotizador/layout/CotizadorShell'

export const metadata = { title: 'Cotizador | U Rent It', robots: { index: false } }

export default async function CotizadorLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/cotizador/login')

  return (
    <CotizadorShell session={session}>
      {children}
    </CotizadorShell>
  )
}
