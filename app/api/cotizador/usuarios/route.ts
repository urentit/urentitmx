import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma, hasDatabase } from '@/lib/prisma'
import { getSessionUser, unauthorized, forbidden } from '@/lib/cotizador/apiHelper'
import { getResendClient, getResendConfig } from '@/lib/resend'

const createSchema = z.object({
  name:           z.string().min(2, 'Nombre requerido'),
  email:          z.string().email('Correo no válido').transform(e => e.toLowerCase()),
  admin:          z.boolean().default(false),
  comision:       z.number().min(0).max(0.05).default(0.03),
  manualServices: z.boolean().default(false),
  invitar:        z.boolean().default(true),
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
  if (!hasDatabase) return noDatabase()

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, name: true, email: true, admin: true, active: true,
      comision: true, manualServices: true, createdAt: true,
      _count: { select: { quotes: true } },
    },
  })
  return NextResponse.json({ ok: true, data: users })
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return unauthorized()
  if (!user.admin) return forbidden()
  if (!hasDatabase) return noDatabase()

  try {
    const body = createSchema.parse(await req.json())

    const existing = await prisma.user.findUnique({ where: { email: body.email } })
    if (existing) {
      return NextResponse.json(
        { ok: false, message: 'Ya existe un usuario con ese correo' },
        { status: 409 },
      )
    }

    const created = await prisma.user.create({
      data: {
        name:           body.name,
        email:          body.email,
        admin:          body.admin,
        comision:       body.comision,
        manualServices: body.manualServices,
      },
    })

    let invited = false
    if (body.invitar) {
      try {
        const resend = getResendClient()
        const { from } = getResendConfig()
        await resend.emails.send({
          from,
          to: [created.email],
          subject: 'Acceso al cotizador de U Rent It',
          html: `
            <div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.6; max-width: 520px;">
              <h1 style="color: #0a0a0a;">Bienvenido al cotizador U Rent It</h1>
              <p>Hola ${created.name},</p>
              <p>Se te dio acceso al cotizador interno de U Rent It. Para entrar:</p>
              <ol>
                <li>Abre <a href="https://urentit.mx/cotizador" style="color: #b8962e;">urentit.mx/cotizador</a></li>
                <li>Inicia sesión con Google usando este correo (<strong>${created.email}</strong>)</li>
              </ol>
              <p style="color: #666; font-size: 13px;">Si no esperabas este acceso, ignora este correo.</p>
            </div>
          `,
        })
        invited = true
      } catch (e) {
        console.error('[usuarios] Error enviando invitación:', e)
      }
    }

    return NextResponse.json({ ok: true, data: created, invited }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 422 })
    console.error('[usuarios] Error creando usuario:', err)
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
