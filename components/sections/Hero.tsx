'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

const COTIZAR = '#cotizar'

const STATS = [
  { value: 36, suffix: '+', label: 'Marcas disponibles' },
  { value: 7, suffix: '', label: 'Categorías' },
  { value: 48, suffix: '', label: 'Meses de plazo' },
]

/* ─── Animated counter ─── */
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCounter(value, 1800, inView)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="font-display text-5xl md:text-6xl font-bold text-white leading-none tabular-nums">
        {count}<span className="text-gold">{suffix}</span>
      </div>
      <div className="text-white/40 text-[11px] font-sans tracking-[0.15em] uppercase">{label}</div>
    </div>
  )
}

/* ─── Hero ─── */
export function Hero() {
  const scrollToContent = () => {
    const el = document.getElementById('quienes-somos')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleCotizarClick = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({ event: 'cta_hero_click', cta: 'cotiza_ahora' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Inicio"
    >
      {/* ─── Background ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/backgrounds/foto-slider.jpg"
          alt="Flota de vehículos U Rent It"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={90}
        />
        {/* Layered overlays for editorial depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/50" />
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, transparent 30%, rgba(10,10,10,0.6) 100%)' }} />
      </div>

      {/* ─── Left gold bar ─── */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #e1be4a 30%, #e1be4a 70%, transparent)' }}
      />

      {/* ─── Top label strip ─── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-10 container-site pt-32 md:pt-40"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-gold/60" />
          <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-gold/70">
            Arrendamiento Puro · México
          </span>
        </div>
      </motion.div>

      {/* ─── Main content ─── */}
      <div className="relative z-10 container-site flex-1 flex flex-col justify-center pb-0 pt-8 md:pt-12">

        {/* Headline — editorial scale */}
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-bold leading-[0.95] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
          >
            <span className="block text-white">Vehículos que</span>
            <span className="block text-gold italic" style={{ textShadow: '0 0 80px rgba(225,190,74,0.3)' }}>
              impulsan
            </span>
            <span className="block text-white">tu empresa</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-white/55 font-sans text-base md:text-lg leading-relaxed max-w-lg mb-10"
          >
            Premium, gama media, utilitarios, comerciales, carga y blindados.
            Planes con beneficios fiscales y mantenimiento incluido.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <ButtonLink
              href={COTIZAR}
              variant="primary"
              size="lg"
              onClick={handleCotizarClick}
              className="group"
            >
              Cotiza ahora — es gratis
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </ButtonLink>
            <button
              onClick={scrollToContent}
              className="inline-flex items-center gap-2 px-6 py-4 text-sm font-sans text-white/70 border border-white/15 rounded-sm hover:border-gold/40 hover:text-gold transition-all duration-300"
            >
              Ver vehículos
            </button>
          </motion.div>
        </div>
      </div>

      {/* ─── Stats — glass panel at bottom ─── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="relative z-10 container-site pb-16 pt-12"
      >
        <div
          className="inline-flex flex-wrap gap-10 md:gap-16 px-8 py-6 rounded-sm border border-white/8"
          style={{
            background: 'rgba(10,10,10,0.55)',
            backdropFilter: 'blur(20px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          }}
        >
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </motion.div>

      {/* ─── Vertical decorative text ─── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-6">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold/30" />
        <p
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/20 font-medium"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Premium · Lujo · Flotillas · Blindados
        </p>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-gold/30" />
      </div>

      {/* ─── Scroll indicator ─── */}
      <button
        onClick={scrollToContent}
        aria-label="Explorar"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/25 hover:text-gold/60 transition-colors duration-300"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} strokeWidth={1.5} />
        </motion.div>
      </button>
    </section>
  )
}
