import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { Prisma } from '@prisma/client'
import { prisma, hasDatabase } from '@/lib/prisma'
import { getSessionUser, unauthorized, forbidden } from '@/lib/cotizador/apiHelper'
import { VARS } from '@/lib/cotizador/variables'
import { ALL_SECTIONS } from '@/lib/cotizador/sections'
import type { QuoteType } from '@/lib/cotizador/types'

const updateSchema = z.object({
  name:           z.string().min(2).optional(),
  admin:          z.boolean().optional(),
  active:         z.boolean().optional(),
  comision:       z.number().min(0).max(VARS.MAX_COMISION).optional(),
  manualServices: z.boolean().optional(),
  // Asignar/cambiar contraseña de login (se guarda como hash bcrypt)
  password:       z.string().min(8, 'Mínimo 8 caracteres').optional(),
  // null = acceso a todas las secciones; [] = ninguna; lista = solo esas
  allowedSections: z
    .array(z.enum(ALL_SECTIONS as [QuoteType, ...QuoteType[]]))
    .nullable()
    .optional(),
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

    // Prisma exige DbNull explícito para limpiar una columna Json
    const { allowedSections, password, ...rest } = body
    const data = {
      ...rest,
      ...(password ? { password: await hash(password, 12) } : {}),
      ...(allowedSections !== undefined
        ? { allowedSections: allowedSections ?? Prisma.DbNull }
        : {}),
    }

    const updated = await prisma.user.update({ where: { id }, data })
    // El hash nunca sale de la API
    const { password: _pw, ...updatedSafe } = updated
    return NextResponse.json({ ok: true, data: updatedSafe })
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
    const { password: _pw, ...updatedSafe } = updated
    return NextResponse.json({ ok: true, data: updatedSafe })
  } catch (err) {
    console.error('[usuarios] Error desactivando usuario:', err)
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
