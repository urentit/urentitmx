import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma, hasDatabase } from '@/lib/prisma'
import { VARS } from './variables'
import { parseAllowedSections, canAccessSection } from './sections'
import type { QuoteInput, QuoteResponse, QuoteType } from './types'

export async function getSessionUser() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null
  const u = session.user as any
  return {
    id:              String(u.id ?? ''),
    admin:           Boolean(u.admin),
    comision:        Number(u.comision ?? 0.03),
    manualServices:  Boolean(u.manualServices),
    allowedSections: parseAllowedSections(u.allowedSections),
  }
}

type SessionUser = NonNullable<Awaited<ReturnType<typeof getSessionUser>>>

export function applyComisionOverride(user: SessionUser, override?: number): SessionUser {
  if (override !== undefined && Number.isFinite(override) && override >= 0 && override <= VARS.MAX_COMISION) {
    return { ...user, comision: override }
  }
  return user
}

// Guarda la cotización en MySQL y devuelve su id (folio). Sin DATABASE_URL
// (o con usuarios legacy sin id numérico) devuelve null: el cotizador sigue
// funcionando igual, solo sin folio de BD.
export async function saveQuote(
  userId: string,
  quoteType: QuoteType,
  input: QuoteInput,
  response: QuoteResponse,
): Promise<number | null> {
  if (!hasDatabase) return null
  const id = Number(userId)
  if (!Number.isInteger(id) || id <= 0) return null
  try {
    const quote = await prisma.quote.create({
      data: {
        userId:   id,
        quoteType,
        request:  input as object,
        response: response as object,
      },
    })
    return quote.id
  } catch (e) {
    // La cotización ya se calculó; no rompemos la respuesta por un fallo de BD
    console.error('[saveQuote] Error guardando cotización:', e)
    return null
  }
}

/** ¿Puede el usuario de sesión cotizar en esta sección? */
export function sectionAllowed(user: SessionUser, section: QuoteType): boolean {
  return canAccessSection(user.admin, user.allowedSections, section)
}

export function sectionForbidden() {
  return NextResponse.json(
    { ok: false, message: 'No tienes acceso a esta sección del cotizador' },
    { status: 403 },
  )
}

export function unauthorized() {
  return NextResponse.json({ ok: false, message: 'No autorizado' }, { status: 401 })
}

export function forbidden() {
  return NextResponse.json({ ok: false, message: 'Requiere permisos de administrador' }, { status: 403 })
}
