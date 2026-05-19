import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email    = process.env.SEED_EMAIL    ?? 'admin@urentit.mx'
  const name     = process.env.SEED_NAME     ?? 'Admin'
  const password = process.env.SEED_PASSWORD ?? 'CambiarEsta123!'
  const comision = parseFloat(process.env.SEED_COMISION ?? '0.03')

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log(`Usuario ${email} ya existe — no se creó de nuevo.`)
    return
  }

  const hash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password:       hash,
      admin:          true,
      comision,
      manualServices: true,
    },
  })

  console.log(`✓ Usuario creado: ${user.email} (id: ${user.id})`)
  console.log(`  Contraseña inicial: ${password}`)
  console.log(`  ¡Cámbiala después del primer login!`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
