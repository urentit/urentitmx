import type { NextAuthOptions } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import CredentialsProvider from 'next-auth/providers/credentials'
import { findUserByEmail, verifyCredentials, resolveLoginUser, INTERNAL_DOMAIN } from '@/lib/cotizador/usersStore'

const REFRESH_MS = 5 * 60 * 1000

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId:     process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer:       process.env.AUTH0_ISSUER ?? 'https://dev-t6sufitbftarnct7.us.auth0.com',
    }),
    // Login con contraseña para usuarios externos; el admin la asigna en /cotizador/usuarios
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        email:    { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null
        try {
          const user = await verifyCredentials(credentials.email, credentials.password)
          if (!user) return null
          return { id: user.id, name: user.name, email: user.email }
        } catch (e) {
          console.error('[auth] Error validando credenciales:', e)
          return null
        }
      },
    }),
  ],
  // Sesión de 7 días; además se revalida contra la BD cada REFRESH_MS (ver jwt)
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
  pages: { signIn: '/cotizador/login' },
  callbacks: {
    // Control de acceso: correos @urentit.mx entran salvo que un admin los
    // haya desactivado; externos solo si un admin los dio de alta (BD o
    // COTIZADOR_USERS) y están activos. Si la BD no responde, los internos
    // entran con permisos básicos.
    async signIn({ user, account, profile }) {
      // Credenciales: authorize() ya validó contraseña y estado activo
      if (account?.provider === 'credentials') return true
      // Sin correo verificado cualquiera podría registrarse en Auth0 con un
      // correo ajeno (p. ej. alguien@urentit.mx) y entrar como interno
      if ((profile as { email_verified?: boolean } | undefined)?.email_verified !== true) return false
      const email = user.email?.toLowerCase()
      if (!email) return false
      try {
        const localUser = await findUserByEmail(email)
        if (email.endsWith(INTERNAL_DOMAIN)) return localUser?.active !== false
        return Boolean(localUser?.active)
      } catch (e) {
        console.error('[auth] BD no disponible en signIn:', e)
        return email.endsWith(INTERNAL_DOMAIN)
      }
    },
    async jwt({ token, account }) {
      if (account) {
        let localUser = null
        try {
          // Da de alta automáticamente a los internos y registra método/fecha del acceso
          const method = account.provider === 'credentials' ? 'password' as const : 'google' as const
          localUser = await resolveLoginUser(token.email as string, token.name as string | null, method)
        } catch (e) {
          console.error('[auth] BD no disponible en jwt:', e)
        }
        token.id              = localUser?.id ?? token.sub
        token.admin           = localUser?.admin          ?? false
        token.comision        = localUser?.comision       ?? 0.03
        token.manualServices  = localUser?.manualServices ?? false
        token.allowedSections = localUser?.allowedSections ?? null
        token.checkedAt       = Date.now()
        return token
      }

      // Revalida periódicamente: si un admin desactiva al usuario o cambia sus
      // permisos, aplica en minutos y no hasta que expire la sesión.
      if (Date.now() - Number(token.checkedAt ?? 0) < REFRESH_MS) return token
      let localUser
      try {
        localUser = await findUserByEmail(token.email as string)
      } catch (e) {
        // BD caída: se conserva la sesión con los permisos que ya tenía
        console.error('[auth] BD no disponible al revalidar sesión:', e)
        return token
      }
      // Misma regla que signIn. Lanzar invalida la sesión: next-auth borra la
      // cookie y getServerSession devuelve null
      const internal = String(token.email ?? '').toLowerCase().endsWith(INTERNAL_DOMAIN)
      const allowed  = internal ? localUser?.active !== false : Boolean(localUser?.active)
      if (!allowed) throw new Error(`Sesión revocada para ${token.email}`)
      token.checkedAt = Date.now()
      if (!localUser) return token
      token.admin           = localUser.admin
      token.comision        = localUser.comision
      token.manualServices  = localUser.manualServices
      token.allowedSections = localUser.allowedSections
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id              = token.id
        ;(session.user as any).admin           = token.admin
        ;(session.user as any).comision        = token.comision
        ;(session.user as any).manualServices  = token.manualServices
        ;(session.user as any).allowedSections = token.allowedSections ?? null
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
