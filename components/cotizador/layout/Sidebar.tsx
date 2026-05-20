'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Car, Truck, Package, Zap, Map, History, RotateCcw,
  Star, Users, ClipboardList
} from 'lucide-react'
import { clsx } from 'clsx'

const nav = [
  { href: '/cotizador/auto',             label: 'Autos',             icon: Car },
  { href: '/cotizador/vip',              label: 'VIP / Lujo',        icon: Star },
  { href: '/cotizador/carga',            label: 'Carga',             icon: Truck },
  { href: '/cotizador/carga-pesada',     label: 'Carga Pesada',      icon: Package },
  { href: '/cotizador/electrico',        label: 'Eléctrico',         icon: Zap },
  { href: '/cotizador/foraneo',          label: 'Foráneo',           icon: Map },
  { href: '/cotizador/usado',            label: 'Vehículo Usado',    icon: RotateCcw },
  { href: '/cotizador/flotilla',         label: 'Flotilla',          icon: Users },
  { href: '/cotizador/refinanciamiento', label: 'Refinanciamiento',  icon: ClipboardList },
  { href: '/cotizador/historial',        label: 'Historial',         icon: History },
]

export function Sidebar() {
  const path = usePathname()

  return (
    <aside className="flex h-full w-56 flex-col border-r border-white/10 bg-[#111111]">
      {/* Logo */}
      <div className="border-b border-white/10 px-5 py-4 flex flex-col gap-2">
        <div className="relative w-28 h-10">
          <Image
            src="/img/logos/logo-urentit.svg"
            alt="U Rent It"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-widest">Cotizador interno</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = path === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-5 py-2.5 text-sm transition-colors',
                active
                  ? 'bg-gold/10 text-gold font-medium border-r-2 border-gold'
                  : 'text-white/50 hover:text-white hover:bg-white/5',
              )}
            >
              <Icon size={15} className={active ? 'text-gold' : ''} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Sitio público */}
      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="block text-center text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          ← Volver al sitio
        </Link>
      </div>
    </aside>
  )
}
