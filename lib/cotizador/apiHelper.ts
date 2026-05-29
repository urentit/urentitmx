import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { QuoteInput, QuoteResponse, QuoteType } from './types'

export async function getSessionUser() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null
  const u = session.user as any
  return {
    id:             String(u.id ?? ''),
    comision:       Number(u.comision ?? 0.03),
    manualServices: Boolean(u.manualServices),
  }
}

type SessionUser = NonNullable<Awaited<ReturnType<typeof getSessionUser>>>

export function applyComisionOverride(user: SessionUser, override?: number): SessionUser {
  if (override !== undefined && Number.isFinite(override) && override >= 0 && override <= 0.1) {
    return { ...user, comision: override }
  }
  return user
}

// No-op hasta tener base de datos configurada
export async function saveQuote(
  _userId: string,
  _quoteType: QuoteType,
  _input: QuoteInput,
  _response: QuoteResponse,
) {
  // TODO: conectar a Google Sheets o MySQL cuando esté disponible
}

export function unauthorized() {
  return NextResponse.json({ ok: false, message: 'No autorizado' }, { status: 401 })
}
