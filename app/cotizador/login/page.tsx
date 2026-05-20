'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email, password, redirect: false,
    })

    if (res?.error) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
    } else {
      router.push('/cotizador/auto')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center flex flex-col items-center gap-3">
          <div className="relative w-36 h-12">
            <Image
              src="/img/logos/logo-urentit.svg"
              alt="U Rent It"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
          <p className="font-sans text-xs font-bold text-gold tracking-widest uppercase">
            Cotizador interno
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded border border-white/10 bg-white/[0.03] p-8"
        >
          <div className="mb-4">
            <label className="mb-1.5 block text-xs text-white/50">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full rounded border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none"
              placeholder="usuario@urentit.mx"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-xs text-white/50">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full rounded border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="mb-4 rounded border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-gold py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
