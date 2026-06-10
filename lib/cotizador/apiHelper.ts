import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma, hasDatabase } from '@/lib/prisma'
import type { QuoteInput, QuoteResponse, QuoteType } from './types'

export async function getSessionUser() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null
  const u = session.user as any
  return {
    id:             String(u.id ?? ''),
    admin:          Boolean(u.admin),
    comision:       Number(u.comision ?? 0.03),
    manualServices: Boolean(u.manualServices),
  }
}

type SessionUser = NonNullable<Awaited<ReturnType<typeof getSessionUser>>>

export function applyComisionOverride(user: SessionUser, override?: number): SessionUser {
  if (override !== undefined && Number.isFinite(override) && override >= 0 && override <= 0.03) {
    return { ...user, comision: override }
  }
  return user
}

// Guarda la cotización en MySQL. Sin DATABASE_URL (o con usuarios legacy de
// env var sin id numérico) no hace nada: el cotizador sigue funcionando igual.
export async function saveQuote(
  userId: string,
  quoteType: QuoteType,
  input: QuoteInput,
  response: QuoteResponse,
) {
  if (!hasDatabase) return
  const id = Number(userId)
  if (!Number.isInteger(id) || id <= 0) return
  try {
    await prisma.quote.create({
      data: {
        userId:   id,
        quoteType,
        request:  input as object,
        response: response as object,
      },
    })
  } catch (e) {
    // La cotización ya se calculó; no rompemos la respuesta por un fallo de BD
    console.error('[saveQuote] Error guardando cotización:', e)
  }
}

export function unauthorized() {
  return NextResponse.json({ ok: false, message: 'No autorizado' }, { status: 401 })
}

export function forbidden() {
  return NextResponse.json({ ok: false, message: 'Requiere permisos de administrador' }, { status: 403 })
}
