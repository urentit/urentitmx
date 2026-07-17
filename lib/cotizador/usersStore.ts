import { prisma, hasDatabase } from '@/lib/prisma'
import { parseAllowedSections } from './sections'
import type { QuoteType } from './types'

export const INTERNAL_DOMAIN = '@urentit.mx'

export type LoginMethod = 'google' | 'password'

export interface AuthUser {
  id:              string   // id numérico de BD como string, o el id de COTIZADOR_USERS
  name:            string
  email:           string
  admin:           boolean
  active:          boolean
  comision:        number
  manualServices:  boolean
  allowedSections: QuoteType[] | null   // null = todas las secciones
}

interface EnvUser {
  id:             string
  name:           string
  email:          string
  password?:      string   // hash bcrypt (legado de COTIZADOR_USERS)
  admin:          boolean
  comision:       number
  manualServices: boolean
}

function getEnvUsers(): EnvUser[] {
  const raw = process.env.COTIZADOR_USERS
  if (!raw) return []
  try {
    // El valor puede ser JSON plano o Base64 (para evitar que dotenv corrompa los $ del hash bcrypt)
    const decoded = Buffer.from(raw, 'base64').toString('utf8')
    const isBase64 = decoded.trimStart().startsWith('[') || decoded.trimStart().startsWith('{')
    return JSON.parse(isBase64 ? decoded : raw) as EnvUser[]
  } catch (e) {
    console.error('[usersStore] Error parsing COTIZADOR_USERS:', e)
    return []
  }
}

/**
 * Busca un usuario autorizado por email.
 * Con DATABASE_URL configurado lee de MySQL; si no, de la env var COTIZADOR_USERS.
 */
export async function findUserByEmail(email: string): Promise<AuthUser | null> {
  if (hasDatabase) {
    const u = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!u) return null
    return {
      id:              String(u.id),
      name:            u.name,
      email:           u.email,
      admin:           u.admin,
      active:          u.active,
      comision:        u.comision,
      manualServices:  u.manualServices,
      allowedSections: parseAllowedSections(u.allowedSections),
    }
  }
  const u = getEnvUsers().find(x => x.email.toLowerCase() === email.toLowerCase())
  if (!u) return null
  return { ...u, active: true, allowedSections: null }
}

function toAuthUser(u: {
  id: number; name: string; email: string; admin: boolean; active: boolean
  comision: number; manualServices: boolean; allowedSections: unknown
}): AuthUser {
  return {
    id:              String(u.id),
    name:            u.name,
    email:           u.email,
    admin:           u.admin,
    active:          u.active,
    comision:        u.comision,
    manualServices:  u.manualServices,
    allowedSections: parseAllowedSections(u.allowedSections),
  }
}

/**
 * Resuelve el usuario al iniciar sesión:
 * - Lo busca en BD; si es interno (@urentit.mx) y no existe, lo da de alta
 *   automáticamente (así aparece en /cotizador/usuarios y su actividad se
 *   guarda en el historial).
 * - Registra fecha y método del acceso (google | password).
 */
export async function resolveLoginUser(
  email: string,
  name: string | null | undefined,
  method: LoginMethod,
): Promise<AuthUser | null> {
  const normalized = email.toLowerCase()
  if (!hasDatabase) return findUserByEmail(normalized)

  let u = await prisma.user.findUnique({ where: { email: normalized } })

  if (!u && normalized.endsWith(INTERNAL_DOMAIN)) {
    u = await prisma.user.create({
      data: {
        name:  name?.trim() || normalized.split('@')[0],
        email: normalized,
      },
    })
  }
  if (!u) return null

  // Registrar el acceso; si falla no bloquea el login
  try {
    await prisma.user.update({
      where: { id: u.id },
      data:  { lastLoginAt: new Date(), lastLoginMethod: method },
    })
  } catch (e) {
    console.error('[usersStore] Error registrando último acceso:', e)
  }

  return toAuthUser(u)
}

/**
 * Valida email + contraseña para el login con credenciales.
 * Devuelve el usuario si la contraseña coincide y está activo; null si no.
 * Con BD compara contra User.password; sin BD, contra COTIZADOR_USERS.
 */
export async function verifyCredentials(email: string, password: string): Promise<AuthUser | null> {
  const { compare } = await import('bcryptjs')
  const normalized  = email.toLowerCase()

  if (hasDatabase) {
    const u = await prisma.user.findUnique({ where: { email: normalized } })
    if (!u || !u.active || !u.password) return null
    const ok = await compare(password, u.password)
    if (!ok) return null
    return {
      id:              String(u.id),
      name:            u.name,
      email:           u.email,
      admin:           u.admin,
      active:          u.active,
      comision:        u.comision,
      manualServices:  u.manualServices,
      allowedSections: parseAllowedSections(u.allowedSections),
    }
  }

  const u = getEnvUsers().find(x => x.email.toLowerCase() === normalized)
  if (!u?.password) return null
  const ok = await compare(password, u.password)
  if (!ok) return null
  return { ...u, active: true, allowedSections: null }
}
