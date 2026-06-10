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
    async signIn({ user }) {
      const email = user.email?.toLowerCase()
      if (!email) return false
      if (email.endsWith(INTERNAL_DOMAIN)) return true
      const localUser = await findUserByEmail(email)
      return Boolean(localUser?.active)
    },
    async jwt({ token, account }) {
      if (account) {
        const localUser = await findUserByEmail(token.email as string)
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
