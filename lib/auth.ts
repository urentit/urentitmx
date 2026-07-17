import type { NextAuthOptions } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import CredentialsProvider from 'next-auth/providers/credentials'
import { findUserByEmail, verifyCredentials, resolveLoginUser, INTERNAL_DOMAIN } from '@/lib/cotizador/usersStore'

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
  session: { strategy: 'jwt' },
  pages: { signIn: '/cotizador/login' },
  callbacks: {
    // Control de acceso: correos @urentit.mx entran siempre; externos solo
    // si un admin los dio de alta (BD o COTIZADOR_USERS) y están activos.
    // Si la BD no responde, los internos entran con permisos básicos.
    async signIn({ user, account }) {
      // Credenciales: authorize() ya validó contraseña y estado activo
      if (account?.provider === 'credentials') return true
      const email = user.email?.toLowerCase()
      if (!email) return false
      if (email.endsWith(INTERNAL_DOMAIN)) return true
      try {
        const localUser = await findUserByEmail(email)
        return Boolean(localUser?.active)
      } catch (e) {
        console.error('[auth] BD no disponible en signIn:', e)
        return false
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
      }
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
