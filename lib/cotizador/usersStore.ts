export interface StoredUser {
  id:             string
  name:           string
  email:          string
  password:       string   // bcrypt hash
  admin:          boolean
  comision:       number
  manualServices: boolean
}

export function getUsers(): StoredUser[] {
  const raw = process.env.COTIZADOR_USERS
  if (!raw) return []
  try { return JSON.parse(raw) as StoredUser[] }
  catch (e) {
    console.error('[usersStore] Error parsing COTIZADOR_USERS:', e)
    return []
  }
}

export function findUserByEmail(email: string): StoredUser | null {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) ?? null
}

export function findUserById(id: string): StoredUser | null {
  return getUsers().find(u => u.id === id) ?? null
}
