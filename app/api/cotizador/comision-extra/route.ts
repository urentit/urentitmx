import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSessionUser, saveQuote, unauthorized, applyComisionOverride, sectionAllowed, sectionForbidden } from '@/lib/cotizador/apiHelper'
import { calculate } from '@/lib/cotizador/calculators/comisionExtra'

const schema = z.object({
  totalPrice:            z.number().positive(),
  accessoryValue:        z.number().min(0).default(0),
  accessory:             z.string().default(''),
  state:                 z.string().min(2),
  anticipo:              z.number().min(0).max(0.45),
  servicios:             z.number().min(0).max(4).default(0),
  seguro:                z.number().positive().optional(),
  servicesValue:         z.number().positive().optional(),
  modelo:                z.string().default(''),
  residualValue24:       z.number().min(0).max(100).optional(),
  residualValue36:       z.number().min(0).max(100).optional(),
  residualValue48:       z.number().min(0).max(100).optional(),
  includeInsurance:      z.boolean().default(true),
  includeGps:            z.boolean().default(true),
  includeTenencias:      z.boolean().default(true),
  includeVerificaciones: z.boolean().default(true),
  plazos:                z.array(z.enum(['24', '36', '48'])).default(['24', '36', '48']),
  comisionOverride:      z.number().min(0).max(0.03).optional(),
})

export async function POST(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return unauthorized()
  if (!sectionAllowed(user, 'comision-extra')) return sectionForbidden()

  try {
    const body          = schema.parse(await req.json())
    const effectiveUser = applyComisionOverride(user, body.comisionOverride)
    const input = { ...body, quoteType: 'comision-extra' as const }

    const result: Record<string, unknown> = {}
    for (const p of body.plazos) {
      const years = Number(p) as 24 | 36 | 48
      result[p] = calculate(input, effectiveUser, years)
    }

    const folio = await saveQuote(user.id, 'comision-extra', input, result as any)
    return NextResponse.json({ ok: true, data: result, folio })
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 422 })
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
