import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Crea el primer usuario admin. Login es via Auth0 (Google SSO), no hay password.
async function main() {
  const email    = process.env.SEED_EMAIL    ?? 'ti@urentit.mx'
  const name     = process.env.SEED_NAME     ?? 'TI U Rent It'
  const comision = parseFloat(process.env.SEED_COMISION ?? '0.03')

  const user = await prisma.user.upsert({
    where:  { email },
    update: { admin: true, active: true },
    create: {
      name,
      email,
      admin:          true,
      active:         true,
      comision,
      manualServices: true,
    },
  })

  console.log(`✓ Admin listo: ${user.email} (id: ${user.id})`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
