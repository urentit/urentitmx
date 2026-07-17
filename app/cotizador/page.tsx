import { redirect } from 'next/navigation'
import { defaultSectionPath } from '@/lib/cotizador/sectionGuard'

export default async function CotizadorIndex() {
  redirect(await defaultSectionPath())
}
