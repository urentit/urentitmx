import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { findUserByEmail, findUserById } from '@/lib/cotizador/usersStore'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Correo',     type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = findUserByEmail(credentials.email)
        if (!user) return null

        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) return null

        return {
          id:             user.id,
          name:           user.name,
          email:          user.email,
          admin:          user.admin,
          comision:       user.comision,
          manualServices: user.manualServices,
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/cotizador/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id             = user.id
        token.admin          = (user as any).admin
        token.comision       = (user as any).comision
        token.manualServices = (user as any).manualServices
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
