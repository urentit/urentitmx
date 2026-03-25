'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'

const COTIZAR = '#cotizar'

const HIGHLIGHTS = [
  'Servicio a nivel nacional',
  'Soluciones turnkey para empresas',
  'Más de 36 marcas disponibles',
  'Atención personalizada 24/7',
]

const METRICS = [
  { value: '500+', label: 'Empresas atendidas' },
  { value: '10+', label: 'Años de experiencia' },
  { value: '36+', label: 'Marcas disponibles' },
]

export function AboutUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="quienes-somos"
      className="section-padding bg-black relative overflow-hidden"
      aria-label="Quiénes somos"
      ref={ref}
    >
      {/* Decorative gold accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ─── Image side ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main image */}
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-sm overflow-hidden">
              <Image
                src="/img/default/foto-intro.png"
                alt="U Rent It — Arrendamiento de vehículos empresariales"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gold overlay border */}
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-sm" />
            </div>

            {/* Floating metric card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 lg:-right-8 glass rounded-sm px-6 py-5 shadow-gold"
            >
              <div className="font-display text-3xl font-bold text-gold">10+</div>
              <div className="text-white/60 text-xs font-sans mt-1 tracking-wide">
                Años de<br />experiencia
              </div>
            </motion.div>

            {/* Decorative corner lines */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-gold/40" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-gold/40 lg:right-0" />
          </motion.div>

          {/* ─── Text side ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <Badge className="mb-5">
              🇲🇽 Empresa Mexicana
            </Badge>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
              Conoce{' '}
              <span className="text-gold italic">U Rent It</span>
            </h2>

            <p className="text-white/60 font-sans text-base md:text-lg leading-relaxed mb-6">
              Somos una empresa mexicana especializada en soluciones integrales
              de arrendamiento puro de vehículos. Ayudamos a empresas,
              ejecutivos y emprendedores a optimizar su movilidad sin comprometer
              su capital.
            </p>

            <p className="text-white/60 font-sans text-base leading-relaxed mb-8">
              Desde vehículos de lujo hasta flotillas comerciales, ofrecemos
              planes a la medida con deducción fiscal, mantenimiento incluido y
              gestión operativa completa a nivel nacional.
            </p>

            {/* Highlights list */}
            <ul className="space-y-3 mb-10">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/70 font-sans text-sm">
                  <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-white/10">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-gold">{m.value}</div>
                  <div className="text-white/40 text-xs font-sans mt-1 leading-snug">{m.label}</div>
                </div>
              ))}
            </div>

            <ButtonLink
              href={COTIZAR}
              variant="primary"
              size="md"
            >
              Solicitar cotización
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
