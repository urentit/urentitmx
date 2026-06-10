import { prisma, hasDatabase } from '@/lib/prisma'

export interface AuthUser {
  id:             string   // id numérico de BD como string, o el id de COTIZADOR_USERS
  name:           string
  email:          string
  admin:          boolean
  active:         boolean
  comision:       number
  manualServices: boolean
}

interface EnvUser {
  id:             string
  name:           string
  email:          string
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
      id:             String(u.id),
      name:           u.name,
      email:          u.email,
      admin:          u.admin,
      active:         u.active,
      comision:       u.comision,
      manualServices: u.manualServices,
    }
  }
  const u = getEnvUsers().find(x => x.email.toLowerCase() === email.toLowerCase())
  if (!u) return null
  return { ...u, active: true }
}
