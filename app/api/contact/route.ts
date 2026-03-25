import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  empresa: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().regex(/^[0-9]{10}$/),
  vehiculo: z.string().optional(),
  mensaje: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    /* ─────────────────────────────────────────────────────
       Aquí va la integración de envío de correo.
       Opciones recomendadas:
         - Resend (resend.com) — más fácil con Next.js
         - Nodemailer con SMTP (Gmail, Mailgun, SendGrid)
         - Cualquier servicio de email via API

       Ejemplo con Resend:
       ─────────────────────────────────────────────────────
       import { Resend } from 'resend'
       const resend = new Resend(process.env.RESEND_API_KEY)
       await resend.emails.send({
         from: 'cotizaciones@urentit.mx',
         to: 'ventas@urentit.mx',
         subject: `Nueva cotización de ${data.nombre} ${data.apellido}`,
         html: `...`,
       })
       ───────────────────────────────────────────────────── */

    // Log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('📩 Nuevo contacto:', data)
    }

    return NextResponse.json(
      { ok: true, message: 'Mensaje recibido correctamente' },
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
