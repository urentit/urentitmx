import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { calculate } from '@/lib/cotizador/calculators/auto'
import { calcCore, calcSeguroAuto, calcTenencias } from '@/lib/cotizador/engine'
import { getPlacaPrice } from '@/lib/cotizador/placas'
import { VARS } from '@/lib/cotizador/variables'

// Endpoint público (sin auth) — solo autos estándar, parámetros simplificados
const schema = z.object({
  totalPrice: z.number().positive(),
  state:      z.string().min(2),
  anticipo:   z.number().min(0.2).max(0.45),
})

const PUBLIC_USER = { comision: 0.03, manualServices: false }
const RESIDUAL    = { 36: 0.35, 48: 0.30 }
const TASA        = { 36: VARS.TASARENTING, 48: VARS.TASARENTING2 }
const VERI_C      = { 36: 6, 48: 8 }

// Escenario mínimo: seguro + trámites + tenencias + verificaciones (sin GPS ni mantenimiento preventivo)
function calcMin(totalPrice: number, state: string, anticipo: number, years: 36 | 48) {
  const yrs = years / 12
  return calcCore(
    totalPrice, 0, anticipo, state, yrs,
    RESIDUAL[years], TASA[years],
    calcSeguroAuto(totalPrice, yrs),
    0,  // sin mantenimiento preventivo
    0,  // sin GPS
    getPlacaPrice(totalPrice, 'section_one', state),
    calcTenencias(totalPrice, yrs, state, 'section_one'),
    VERI_C[years] * VARS.VERI,
    PUBLIC_USER, '', 'section_one',
  )
}

export async function POST(req: NextRequest) {
  try {
    const body  = schema.parse(await req.json())
    const input = { ...body, quoteType: 'auto' as const }

    // Escenario máximo: todos los servicios incluidos
    const max36 = calculate(input, PUBLIC_USER, 36)
    const max48 = calculate(input, PUBLIC_USER, 48)

    // Escenario mínimo: solo seguro, trámites, tenencias y verificaciones
    const min36 = calcMin(body.totalPrice, body.state, body.anticipo, 36)
    const min48 = calcMin(body.totalPrice, body.state, body.anticipo, 48)

    return NextResponse.json({
      ok: true,
      // Rango 36 meses
      mensualidadMin36: min36.costs.mensualidad,
      mensualidadMax36: max36.costs.mensualidad,
      anticipo36:       max36.costs.anticipoTotal,
      finalCost36:      max36.costs.finalCost,
      // Rango 48 meses
      mensualidadMin48: min48.costs.mensualidad,
      mensualidadMax48: max48.costs.mensualidad,
      anticipo48:       max48.costs.anticipoTotal,
      finalCost48:      max48.costs.finalCost,
    })
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 422 })
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
