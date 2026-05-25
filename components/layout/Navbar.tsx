'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, Home } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { clsx } from 'clsx'

const NAV_LINKS = [
  { label: '¿Quiénes somos?', href: '/quienes-somos' },
  { label: 'Vehículos',       href: '/vehiculos' },
  { label: 'Marcas',          href: '/marcas' },
  { label: 'Reseñas',         href: '/testimonios' },
  { label: "FAQ'S",           href: '/preguntas-frecuentes' },
  { label: 'Contacto',        href: '/contacto' },
]

const WHATSAPP = 'https://wa.me/525518062633'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname                = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ─── Desktop / Mobile Header ─── */}
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-black/88 backdrop-blur-2xl border-b border-gold/10 py-3'
            : 'bg-transparent py-6'
        )}
      >
        <div className="container-site flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group" aria-label="U Rent It - Inicio">
            <motion.div
              animate={{ scale: scrolled ? 1 : 1.35 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:block flex-shrink-0 origin-left"
            >
              <Image src="/img/logos/logo-urentit.svg" alt="U Rent It" width={56} height={56} className="object-contain w-14 h-14" priority />
            </motion.div>
            <div className="flex-shrink-0 lg:hidden">
              <Image src="/img/logos/logo-urentit.svg" alt="U Rent It" width={56} height={56} className="object-contain w-14 h-14" priority />
            </div>
            <motion.span
              animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : -8 }}
              transition={{ duration: 0.35 }}
              className="font-sans text-white text-xl font-light tracking-[0.12em] uppercase hidden lg:block"
            >
              U Rent It
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            <Link
              href="/"
              className={clsx(
                'relative px-3 py-2 text-sm font-sans font-medium transition-colors duration-200 rounded-sm',
                pathname === '/' ? 'text-gold' : 'text-white/70 hover:text-white'
              )}
              aria-label="Inicio"
            >
              <Home size={16} />
              {pathname === '/' && (
                <motion.span layoutId="nav-indicator" className="absolute bottom-0 left-3 right-3 h-px bg-gold" />
              )}
            </Link>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'relative px-4 py-2 text-sm font-sans font-medium transition-colors duration-200 rounded-sm',
                    isActive ? 'text-gold' : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-px bg-gold"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <ButtonLink href={WHATSAPP} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" aria-label="Contactar por WhatsApp">
              WhatsApp
            </ButtonLink>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-black font-sans font-semibold text-sm rounded-sm hover:bg-gold-light transition-colors duration-200"
            >
              Cotiza ahora
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white hover:text-gold transition-colors"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-black-secondary border-l border-white/10 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="font-display text-gold font-semibold text-lg">Menú</span>
                <button onClick={() => setOpen(false)} className="p-1 text-white/50 hover:text-white transition-colors" aria-label="Cerrar menú">
                  <X size={22} />
                </button>
              </div>

              <nav className="flex-1 py-6 px-4" aria-label="Navegación móvil">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className={clsx(
                      'w-full flex items-center gap-3 px-4 py-4 hover:text-gold hover:bg-white/5 rounded-sm transition-all font-sans font-medium text-base border-b border-white/5',
                      pathname === '/' ? 'text-gold' : 'text-white/80'
                    )}
                  >
                    <Home size={16} className="flex-shrink-0" />
                    Inicio
                    <ChevronRight size={16} className="text-gold/50 ml-auto" />
                  </Link>
                </motion.div>
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        'w-full flex items-center justify-between px-4 py-4 hover:text-gold hover:bg-white/5 rounded-sm transition-all font-sans font-medium text-base border-b border-white/5',
                        pathname === link.href ? 'text-gold' : 'text-white/80'
                      )}
                    >
                      {link.label}
                      <ChevronRight size={16} className="text-gold/50" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-6 pb-8 flex flex-col gap-3">
                <ButtonLink href={WHATSAPP} target="_blank" rel="noopener noreferrer" variant="outline" size="md" className="w-full justify-center">
                  Contactar por WhatsApp
                </ButtonLink>
                <Link
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gold text-black font-sans font-semibold text-sm rounded-sm hover:bg-gold-light transition-colors duration-200"
                >
                  Cotiza ahora
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
