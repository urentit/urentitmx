import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { UsersAdmin } from '@/components/cotizador/UsersAdmin'

export default async function UsuariosPage() {
  const session = await getServerSession(authOptions)
  if (!(session?.user as any)?.admin) redirect('/cotizador/auto')

  return <UsersAdmin />
}
