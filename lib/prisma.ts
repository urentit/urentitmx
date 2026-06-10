import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/** true cuando hay base de datos configurada; si no, el cotizador opera con COTIZADOR_USERS */
export const hasDatabase = Boolean(process.env.DATABASE_URL)
