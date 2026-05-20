'use client'

import { signOut, useSession } from 'next-auth/react'
import { LogOut, User } from 'lucide-react'

export function InternalHeader({ title }: { title: string }) {
  const { data: session } = useSession()

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 bg-[#0a0a0a] px-6">
      <h1 className="font-sans text-sm font-semibold text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-xs text-white/50">
          <User size={13} />
          {session?.user?.name ?? '—'}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: '/cotizador/login' })}
          className="flex items-center gap-1.5 rounded border border-white/10 px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-gold/30 hover:text-gold"
        >
          <LogOut size={12} />
          Salir
        </button>
      </div>
    </header>
  )
}
