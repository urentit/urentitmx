import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma, hasDatabase } from '@/lib/prisma'
import { getSessionUser, unauthorized, forbidden } from '@/lib/cotizador/apiHelper'

const updateSchema = z.object({
  name:           z.string().min(2).optional(),
  admin:          z.boolean().optional(),
  active:         z.boolean().optional(),
  comision:       z.number().min(0).max(0.05).optional(),
  manualServices: z.boolean().optional(),
})

function noDatabase() {
  return NextResponse.json(
    { ok: false, message: 'Base de datos no configurada (DATABASE_URL)' },
    { status: 503 },
  )
}

function parseId(raw: string): number | null {
  const id = Number(raw)
  return Number.isInteger(id) && id > 0 ? id : null
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser()
  if (!user) return unauthorized()
  if (!user.admin) return forbidden()
  if (!hasDatabase) return noDatabase()

  const id = parseId(params.id)
  if (!id) return NextResponse.json({ ok: false, message: 'Id no válido' }, { status: 400 })

  try {
    const body = updateSchema.parse(await req.json())

    // Un admin no puede quitarse a sí mismo el rol ni desactivarse
    if (String(id) === user.id && (body.admin === false || body.active === false)) {
      return NextResponse.json(
        { ok: false, message: 'No puedes quitarte permisos ni desactivarte a ti mismo' },
        { status: 400 },
      )
    }

    const updated = await prisma.user.update({ where: { id }, data: body })
    return NextResponse.json({ ok: true, data: updated })
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 422 })
    console.error('[usuarios] Error actualizando usuario:', err)
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser()
  if (!user) return unauthorized()
  if (!user.admin) return forbidden()
  if (!hasDatabase) return noDatabase()

  const id = parseId(params.id)
  if (!id) return NextResponse.json({ ok: false, message: 'Id no válido' }, { status: 400 })

  if (String(id) === user.id) {
    return NextResponse.json(
      { ok: false, message: 'No puedes desactivarte a ti mismo' },
      { status: 400 },
    )
  }

  try {
    // Soft delete: conserva el historial de cotizaciones del usuario
    const updated = await prisma.user.update({ where: { id }, data: { active: false } })
    return NextResponse.json({ ok: true, data: updated })
  } catch (err) {
    console.error('[usuarios] Error desactivando usuario:', err)
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
