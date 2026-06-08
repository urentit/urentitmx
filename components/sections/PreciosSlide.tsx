'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { clsx } from 'clsx'

const WHATSAPP =
  'https://wa.me/525518062633?text=' +
  encodeURIComponent(
    'Hola, me gustaría obtener una cotización de arrendamiento de vehículos.'
  )

function fmt(n: number) {
  return n.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

const SLIDES = [
  {
    id: 'compacto',
    badge: 'Gama de acceso',
    headline: 'Arrienda un\nauto compacto',
    desde: 9000,
    image: '/img/cars/utilitarios/vento.jpg',
    alt: 'Auto compacto VW Vento en arrendamiento',
    accent: 'Sedán · Hatchback · City car',
  },
  {
    id: 'suv',
    badge: 'Gama media',
    headline: 'Arrienda\nuna SUV',
    desde: 17500,
    image: '/img/cars/valor-medio/tiguan.jpg',
    alt: 'SUV Tiguan en arrendamiento',
    accent: 'Crossover · SUV · Familiar',
  },
  {
    id: 'premium',
    badge: 'Premium',
    headline: 'Arrienda un auto\nde alta gama',
    desde: 27500,
    image: '/img/cars/lujo/range-rover-velar.jpg',
    alt: 'Range Rover Velar en arrendamiento',
    accent: 'Luxury · Ejecutivo · Premium',
  },
  {
    id: 'carga',
    badge: 'Carga especial',
    headline: 'Arrienda un\ncamión refrigerante',
    desde: 15500,
    image: '/img/cars/equipamiento-especial/elf-800k.jpg',
    alt: 'Camión refrigerante en arrendamiento',
    accent: 'Reparto · Frío · Equipado',
  },
]

const INTERVAL = 5000

export function PreciosSlide() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()

  const goTo = useCallback((idx: number, dir: 1 | -1 = 1) => {
    setDirection(dir)
    setCurrent(idx)
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(c => (c + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return
    const t = setInterval(next, INTERVAL)
    return () => clearInterval(t)
  }, [paused, next, reducedMotion])

  const slide = SLIDES[current]

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, x: dir * -60 }),
  }

  return (
    <section
      id="precios-referencia"
      className="relative overflow-hidden border-t border-gold/10 bg-[linear-gradient(180deg,#0a0a0a_0%,#111111_50%,#0a0a0a_100%)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(225,190,74,0.07),transparent)]" />

      <div className="relative container-site section-padding">
        {/* Header */}
        <div className="mb-10 text-center">
          <Badge className="mb-5">Precios de referencia</Badge>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            ¿Cuánto cuesta{' '}
            <span className="text-gold italic">arrendar?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            Mensualidades estimadas a 36 meses con 25&nbsp;% de anticipo. La
            cotización final varía según el plan y condiciones de crédito.
          </p>
        </div>

        {/* Slide */}
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-xl border border-white/10">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={slide.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: 'easeInOut' }}
                className="grid min-h-[420px] sm:min-h-[380px] md:grid-cols-2"
              >
                {/* Imagen */}
                <div className="relative min-h-[220px] md:min-h-0">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={current === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/60" />
                </div>

                {/* Texto */}
                <div className="flex flex-col justify-center gap-5 bg-[#111111] p-8 md:p-10">
                  <span className="inline-block w-fit rounded-sm border border-gold/30 px-3 py-1 text-xs uppercase tracking-widest text-gold/80">
                    {slide.badge}
                  </span>

                  <div>
                    <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl whitespace-pre-line">
                      {slide.headline}
                    </h3>
                    <p className="mt-1 text-sm text-white/40">{slide.accent}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40">
                      Mensualidad estimada desde
                    </p>
                    <p className="mt-1 font-display text-4xl font-bold text-gold">
                      {fmt(slide.desde)}
                      <span className="ml-1 text-lg font-normal text-gold/60">/mes</span>
                    </p>
                    <p className="mt-1 text-xs text-white/30">
                      A 36 meses · 25&nbsp;% de anticipo · sujeto a aprobación
                    </p>
                  </div>

                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-sm bg-gold py-3 text-sm font-semibold text-black transition-all hover:bg-gold-light hover:shadow-gold"
                  >
                    <MessageCircle size={15} />
                    Cotización sin costo
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles */}
          <div className="mt-5 flex items-center justify-between px-1">
            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-gold/40 hover:text-gold"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Siguiente"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-gold/40 hover:text-gold"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  aria-label={`Ir a ${s.badge}`}
                  className={clsx(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === current ? 'w-6 bg-gold' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  )}
                />
              ))}
            </div>

            {/* Contador */}
            <p className="text-xs tabular-nums text-white/25">
              {current + 1} / {SLIDES.length}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-white/25 leading-relaxed">
          Precios de referencia expresados en pesos mexicanos. La mensualidad final depende
          del valor exacto del vehículo, el estado de emplacamiento, el plan seleccionado
          y la evaluación de crédito.
        </p>
      </div>
    </section>
  )
}
