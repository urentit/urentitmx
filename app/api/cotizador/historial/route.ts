import { NextRequest, NextResponse } from 'next/server'
import { prisma, hasDatabase } from '@/lib/prisma'
import { getSessionUser, unauthorized } from '@/lib/cotizador/apiHelper'

const PAGE_SIZE = 25

function noDatabase() {
  return NextResponse.json(
    { ok: false, message: 'Base de datos no configurada (DATABASE_URL)' },
    { status: 503 },
  )
}

export async function GET(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return unauthorized()
  if (!hasDatabase) return noDatabase()

  const url  = new URL(req.url)
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1)

  // Los admins ven todo el historial; el resto solo sus propias cotizaciones.
  const userId = Number(user.id)
  const where  = user.admin ? {} : { userId: Number.isInteger(userId) ? userId : -1 }

  try {
    const [total, quotes] = await Promise.all([
      prisma.quote.count({ where }),
      prisma.quote.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip:    (page - 1) * PAGE_SIZE,
        take:    PAGE_SIZE,
        select: {
          id:        true,
          quoteType: true,
          request:   true,
          response:  true,
          createdAt: true,
          user:      { select: { name: true, email: true } },
        },
      }),
    ])

    return NextResponse.json({
      ok: true,
      data: quotes,
      meta: { total, page, pageSize: PAGE_SIZE, isAdmin: user.admin },
    })
  } catch (e) {
    console.error('[historial] Error consultando cotizaciones:', e)
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
