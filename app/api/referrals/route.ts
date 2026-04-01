import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getResendClient, getResendConfig } from '@/lib/resend'

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
    const resend = getResendClient()
    const resendConfig = getResendConfig()

    const { error } = await resend.emails.send({
      from: resendConfig.from,
      to: [resendConfig.to],
      replyTo: data.email,
      subject: `Nuevo referido de ${data.nombreCompleto}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.6;">
          <h1 style="margin-bottom: 16px;">Nuevo referido U Rent It</h1>
          <p>Se recibio un nuevo registro desde el formulario de referidos.</p>
          <h2 style="margin-top: 24px;">Datos del promotor</h2>
          <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; margin-top: 12px;">
            <tr><td><strong>Nombre</strong></td><td>${data.nombreCompleto}</td></tr>
            <tr><td><strong>Correo</strong></td><td>${data.email}</td></tr>
            <tr><td><strong>Telefono</strong></td><td>${data.telefono}</td></tr>
            <tr><td><strong>Empresa</strong></td><td>${data.empresa}</td></tr>
          </table>
          <h2 style="margin-top: 24px;">Datos del referido</h2>
          <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; margin-top: 12px;">
            <tr><td><strong>Nombre</strong></td><td>${data.referidoNombre}</td></tr>
            <tr><td><strong>Correo</strong></td><td>${data.referidoEmail}</td></tr>
            <tr><td><strong>Telefono</strong></td><td>${data.referidoTelefono}</td></tr>
            <tr><td><strong>Enterado</strong></td><td>${data.referidoEnterado === 'si' ? 'Si' : 'No'}</td></tr>
          </table>
        </div>
      `,
    })

    if (error) {
      throw new Error(error.message)
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

    console.error('Error sending referral email:', err)

    const message =
      err instanceof Error ? err.message : 'Error interno del servidor'

    return NextResponse.json(
      {
        ok: false,
        message: 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' ? { debug: message } : {}),
      },
      { status: 500 }
    )
  }
}
