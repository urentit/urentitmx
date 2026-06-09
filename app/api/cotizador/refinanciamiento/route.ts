import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSessionUser, saveQuote, unauthorized, applyComisionOverride } from '@/lib/cotizador/apiHelper'
import { calculate } from '@/lib/cotizador/calculators/refinanciamiento'

const schema = z.object({
  totalPrice:     z.number().positive(),
  accessoryValue: z.number().min(0).default(0),
  accessory:      z.string().default(''),
  state:          z.string().min(2),
  anticipo:       z.number().min(0).max(0.45),
  servicios:      z.number().min(0).max(4).default(0),
  seguro:         z.number().positive().optional(),
  modelo:           z.string().default(''),
  comisionOverride: z.number().min(0).max(0.03).optional(),
})

export async function POST(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const body          = schema.parse(await req.json())
    const effectiveUser = applyComisionOverride(user, body.comisionOverride)
    const input = { ...body, quoteType: 'refinanciamiento' as const }
    const result = { '12': calculate(input, effectiveUser, 12), '24': calculate(input, effectiveUser, 24) }
    await saveQuote(user.id, 'refinanciamiento', input, result)
    return NextResponse.json({ ok: true, data: result })
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 422 })
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
