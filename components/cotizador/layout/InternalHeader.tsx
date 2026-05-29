'use client'

import { signOut, useSession } from 'next-auth/react'
import { LogOut, User, Menu } from 'lucide-react'
import { useCommission, COMISION_OPTS } from '@/lib/cotizador/commissionContext'

interface Props {
  onMenuToggle: () => void
}

export function InternalHeader({ onMenuToggle }: Props) {
  const { data: session }    = useSession()
  const { comision, setComision } = useCommission()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#0a0a0a] px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden rounded p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
        <span className="font-sans text-sm font-semibold text-white">Cotizador</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Selector global de comisión */}
        <div className="flex items-center gap-1.5">
          <label className="hidden sm:block text-xs text-white/40 whitespace-nowrap">
            Comisión:
          </label>
          <select
            value={comision}
            onChange={e => setComision(parseFloat(e.target.value))}
            className="rounded border border-white/10 bg-[#1a1a1a] px-2 py-1 text-xs text-gold focus:border-gold/40 focus:outline-none cursor-pointer"
          >
            {COMISION_OPTS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/50">
          <User size={13} />
          {session?.user?.name ?? '—'}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: '/cotizador/login' })}
          className="flex items-center gap-1.5 rounded border border-white/10 px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-gold/30 hover:text-gold cursor-pointer"
        >
          <LogOut size={12} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  )
}
