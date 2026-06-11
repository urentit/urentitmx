import type { NextAuthOptions } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import { findUserByEmail } from '@/lib/cotizador/usersStore'

const INTERNAL_DOMAIN = '@urentit.mx'

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId:     process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer:       process.env.AUTH0_ISSUER ?? 'https://dev-t6sufitbftarnct7.us.auth0.com',
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/cotizador/login' },
  callbacks: {
    // Control de acceso: correos @urentit.mx entran siempre; externos solo
    // si un admin los dio de alta (BD o COTIZADOR_USERS) y están activos.
    // Si la BD no responde, los internos entran con permisos básicos.
    async signIn({ user }) {
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
          localUser = await findUserByEmail(token.email as string)
        } catch (e) {
          console.error('[auth] BD no disponible en jwt:', e)
        }
        token.id             = localUser?.id ?? token.sub
        token.admin          = localUser?.admin          ?? false
        token.comision       = localUser?.comision       ?? 0.03
        token.manualServices = localUser?.manualServices ?? false
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id             = token.id
        ;(session.user as any).admin          = token.admin
        ;(session.user as any).comision       = token.comision
        ;(session.user as any).manualServices = token.manualServices
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
