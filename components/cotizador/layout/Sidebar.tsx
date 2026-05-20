'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Car, Truck, Package, Zap, Map, History, RotateCcw,
  Star, Users, ClipboardList, X,
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

interface SidebarProps {
  isOpen:  boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const path = usePathname()

  return (
    <aside className={clsx(
      'flex flex-col border-r border-white/10 bg-[#111111] z-30',
      'fixed inset-y-0 left-0 h-full w-56 transition-transform duration-200 ease-in-out',
      'lg:static lg:translate-x-0 lg:shrink-0',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    )}>
      {/* Logo */}
      <div className="border-b border-white/10 px-5 py-4 flex items-center justify-between">
        <div className="flex flex-1 flex-col items-center gap-1.5">
          <div className="relative w-28 h-9">
            <Image
              src="/img/logos/logo-urentit.svg"
              alt="U Rent It"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
          <span className="font-sans text-[10px] font-bold text-gold tracking-widest uppercase">
            Cotizador
          </span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden ml-2 shrink-0 rounded p-1.5 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          aria-label="Cerrar menú"
        >
          <X size={17} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
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
