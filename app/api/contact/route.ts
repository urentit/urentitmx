import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, resendConfig } from '@/lib/resend'

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
    const fullName = `${data.nombre} ${data.apellido}`

    const { error } = await resend.emails.send({
      from: resendConfig.from,
      to: [resendConfig.to],
      replyTo: data.email,
      subject: `Nueva cotizacion de ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.6;">
          <h1 style="margin-bottom: 16px;">Nueva solicitud de cotizacion</h1>
          <p>Se recibio una nueva solicitud desde el formulario principal de U Rent It.</p>
          <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; margin-top: 16px;">
            <tr><td><strong>Nombre</strong></td><td>${fullName}</td></tr>
            <tr><td><strong>Empresa</strong></td><td>${data.empresa}</td></tr>
            <tr><td><strong>Correo</strong></td><td>${data.email}</td></tr>
            <tr><td><strong>Telefono</strong></td><td>${data.telefono}</td></tr>
            <tr><td><strong>Vehiculo</strong></td><td>${data.vehiculo || 'No especificado'}</td></tr>
            <tr><td><strong>Mensaje</strong></td><td>${data.mensaje}</td></tr>
          </table>
        </div>
      `,
    })

    if (error) {
      throw new Error(error.message)
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

    console.error('Error sending contact email:', err)

    return NextResponse.json(
      { ok: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
