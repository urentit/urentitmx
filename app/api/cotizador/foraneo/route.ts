import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSessionUser, saveQuote, unauthorized } from '@/lib/cotizador/apiHelper'
import { calculate } from '@/lib/cotizador/calculators/foraneo'

const schema = z.object({
  totalPrice:     z.number().positive(),
  accessoryValue: z.number().min(0).default(0),
  accessory:      z.string().default(''),
  state:          z.string().min(2),
  anticipo:       z.number().min(0.2).max(0.45),
  servicios:      z.number().min(0).max(4).default(0),
  seguro:         z.number().positive().optional(),
  servicesValue:  z.number().positive().optional(),
  modelo:         z.string().default(''),
})

export async function POST(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  try {
    const body  = schema.parse(await req.json())
    const input = { ...body, quoteType: 'foraneo' as const }
    const result = { '36': calculate(input, user, 36), '48': calculate(input, user, 48) }
    await saveQuote(user.id, 'foraneo', input, result)
    return NextResponse.json({ ok: true, data: result })
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 422 })
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
