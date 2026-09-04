import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma, hasDatabase } from '@/lib/prisma'
import { getSessionUser, unauthorized, forbidden } from '@/lib/cotizador/apiHelper'
import { getAllRateOverrides } from '@/lib/cotizador/ratesStore'
import { DEFAULT_RATES, RATE_PLAZOS } from '@/lib/cotizador/rates'
import { ALL_SECTIONS } from '@/lib/cotizador/sections'
import type { QuoteType } from '@/lib/cotizador/types'

const upsertSchema = z
  .object({
    quoteType: z.enum(ALL_SECTIONS as [QuoteType, ...QuoteType[]]),
    months:    z.number().int(),
    // null = eliminar la tasa personalizada y volver a la tasa por defecto
    tasa:      z.number().gt(0, 'La tasa debe ser mayor a 0').lt(100, 'La tasa debe ser menor a 100').nullable(),
  })
  .refine(b => RATE_PLAZOS[b.quoteType].includes(b.months), {
    message: 'Plazo no válido para este cotizador',
    path: ['months'],
  })

function noDatabase() {
  return NextResponse.json(
    { ok: false, message: 'Base de datos no configurada (DATABASE_URL)' },
    { status: 503 },
  )
}

export async function GET() {
  const user = await getSessionUser()
  if (!user) return unauthorized()
  if (!user.admin) return forbidden()

  const overrides = await getAllRateOverrides()
  return NextResponse.json({
    ok: true,
    data: {
      defaults:  DEFAULT_RATES,
      plazos:    RATE_PLAZOS,
      overrides: overrides.map(o => ({
        quoteType: o.quoteType,
        months:    o.months,
        tasa:      o.tasa,
        updatedAt: o.updatedAt.toISOString(),
      })),
      hasDatabase,
    },
  })
}

export async function PUT(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return unauthorized()
  if (!user.admin) return forbidden()
  if (!hasDatabase) return noDatabase()

  try {
    const { quoteType, months, tasa } = upsertSchema.parse(await req.json())

    if (tasa === null) {
      // Volver a la tasa por defecto: se borra el override si existe
      await prisma.rateSetting.deleteMany({ where: { quoteType, months } })
      return NextResponse.json({ ok: true, data: { quoteType, months, tasa: null } })
    }

    const saved = await prisma.rateSetting.upsert({
      where:  { quoteType_months: { quoteType, months } },
      create: { quoteType, months, tasa },
      update: { tasa },
    })
    return NextResponse.json({ ok: true, data: { quoteType, months, tasa: saved.tasa } })
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 422 })
    console.error('[tasas] Error guardando tasa:', err)
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
