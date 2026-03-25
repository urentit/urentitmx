import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  nombreCompleto: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().regex(/^[0-9]{10}$/),
  empresa: z.string().min(2),
  referidoNombre: z.string().min(2),
  referidoEmail: z.string().email(),
  referidoTelefono: z.string().regex(/^[0-9]{10}$/),
  referidoEnterado: z.enum(['si', 'no']),
  aceptaTerminos: z.literal(true),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    if (process.env.NODE_ENV === 'development') {
      console.log('📨 Nuevo referido:', data)
    }

    return NextResponse.json(
      { ok: true, message: 'Referencia recibida correctamente' },
      { status: 200 }
    )
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, errors: err.flatten().fieldErrors },
        { status: 422 }
      )
    }

    return NextResponse.json(
      { ok: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
