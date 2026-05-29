import type { NextAuthOptions } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import { findUserByEmail } from '@/lib/cotizador/usersStore'

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId:     process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer:       process.env.AUTH0_ISSUER,
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/cotizador/login' },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const localUser = findUserByEmail(token.email as string)
        token.id             = token.sub
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
