import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { parseAllowedSections, canAccessSection, firstAllowedSection } from './sections'
import type { QuoteType } from './types'

/**
 * Guard server-side para las páginas de sección del cotizador.
 * Si el usuario no tiene acceso, lo redirige a su primera sección
 * permitida (o al historial si no tiene ninguna).
 */
export async function requireSection(section: QuoteType): Promise<void> {
  const session = await getServerSession(authOptions)
  const u = session?.user as any
  const admin   = Boolean(u?.admin)
  const allowed = parseAllowedSections(u?.allowedSections)

  if (canAccessSection(admin, allowed, section)) return

  const first = firstAllowedSection(admin, allowed)
  redirect(first ? `/cotizador/${first}` : '/cotizador/historial')
}

/** Ruta inicial del cotizador según permisos (para la página raíz). */
export async function defaultSectionPath(): Promise<string> {
  const session = await getServerSession(authOptions)
  const u = session?.user as any
  const first = firstAllowedSection(Boolean(u?.admin), parseAllowedSections(u?.allowedSections))
  return first ? `/cotizador/${first}` : '/cotizador/historial'
}
