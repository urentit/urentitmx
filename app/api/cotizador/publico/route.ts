import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { calculate } from '@/lib/cotizador/calculators/auto'

// Endpoint público (sin auth) — solo autos estándar, parámetros simplificados
const schema = z.object({
  totalPrice: z.number().positive(),
  state:      z.string().min(2),
  anticipo:   z.number().min(0.2).max(0.45),
})

const PUBLIC_USER = { comision: 0.03, manualServices: false }

export async function POST(req: NextRequest) {
  try {
    const body  = schema.parse(await req.json())
    const input = { ...body, quoteType: 'auto' as const }

    const result = {
      '36': calculate(input, PUBLIC_USER, 36),
      '48': calculate(input, PUBLIC_USER, 48),
    }

    return NextResponse.json({
      ok: true,
      mensualidad36: result['36'].costs.mensualidad,
      mensualidad48: result['48'].costs.mensualidad,
      anticipo36:    result['36'].costs.anticipoTotal,
      anticipo48:    result['48'].costs.anticipoTotal,
      finalCost36:   result['36'].costs.finalCost,
      finalCost48:   result['48'].costs.finalCost,
    })
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 422 })
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
