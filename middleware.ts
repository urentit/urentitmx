import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: { signIn: '/cotizador/login' },
})

export const config = {
  matcher: ['/cotizador/:path((?!login).*)'],
}
