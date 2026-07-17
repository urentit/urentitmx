'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function onCredentials(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.ok) {
      router.push('/cotizador')
      router.refresh()
    } else {
      setError('Correo o contraseña incorrectos.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-sm">

        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="relative h-12 w-36">
            <Image
              src="/img/logos/logo-urentit.svg"
              alt="U Rent It"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
          <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">
            Cotizador interno
          </p>
        </div>

        <div className="rounded border border-white/10 bg-white/[0.03] p-8">
          <p className="mb-6 text-center text-sm text-white/50">
            Inicia sesión con tu cuenta corporativa
          </p>
          <button
            onClick={() => signIn('auth0', { callbackUrl: '/cotizador' })}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded border border-white/10 bg-white/5 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
          >
            <GoogleIcon />
            Continuar con Google
          </button>

          {/* Separador */}
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-widest text-white/30">o con contraseña</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Login con credenciales (usuarios externos) */}
          <form onSubmit={onCredentials} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
              autoComplete="email"
              className="w-full rounded border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 focus:border-gold/50 focus:outline-none transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              autoComplete="current-password"
              className="w-full rounded border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 focus:border-gold/50 focus:outline-none transition-colors"
            />
            {error && (
              <p className="rounded border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-gold py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-60"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : null}
              {loading ? 'Entrando…' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C18.659 12.238 17.64 9.2 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
