import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { RatesAdmin } from '@/components/cotizador/RatesAdmin'

export default async function TasasPage() {
  const session = await getServerSession(authOptions)
  if (!(session?.user as any)?.admin) redirect('/cotizador')

  return <RatesAdmin />
}
