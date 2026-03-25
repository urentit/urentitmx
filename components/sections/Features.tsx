'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'

const COTIZAR = '#cotizar'

const FEATURES = [
  {
    label: 'Servicio a la medida',
    desc: 'Diseñamos planes de arrendamiento que se ajustan a las necesidades operativas y fiscales de tu empresa. Cada solución es única.',
    bullets: [
      'Plazos desde 12 hasta 60 meses',
      'Adaptado a tu flujo de efectivo',
      'Atención ejecutiva dedicada',
    ],
    image: '/img/default/foto-mano-slider.png',
    badge: 'Personalizado',
  },
  {
    label: 'Administración de flotilla',
    desc: 'Nos encargamos de toda la gestión operativa de tu flota: mantenimientos, seguros, trámites y más. Tú solo maneja.',
    bullets: [
      'Gestión de seguros y siniestros',
      'Control de mantenimientos preventivos',
      'Plataforma de seguimiento en tiempo real',
    ],
    image: '/img/default/foto-intro.png',
    badge: 'Operativo',
  },
  {
    label: 'Valor residual con 3 opciones',
    desc: 'Al finalizar el contrato tú decides: compra el vehículo a precio preferencial, renueva con el modelo más nuevo, o simplemente devuélvelo.',
    bullets: [
      'Compra a precio residual pactado',
      'Renovación al modelo más reciente',
      'Devolución sin compromisos',
    ],
    image: '/img/backgrounds/foto-slider.jpg',
    badge: 'Flexible',
  },
]

interface FeatureItemProps {
  feature: typeof FEATURES[0]
  index: number
}

function FeatureItem({ feature, index }: FeatureItemProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center py-16 lg:py-24 border-b border-white/5 last:border-0"
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={isEven ? 'order-1' : 'order-1 lg:order-2'}
      >
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
          <Image
            src={feature.image}
            alt={feature.label}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/50" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/50" />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={isEven ? 'order-2' : 'order-2 lg:order-1'}
      >
        <Badge className="mb-4">{feature.badge}</Badge>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-5 leading-tight">
          {feature.label}
        </h3>
        <p className="text-white/55 font-sans text-base md:text-lg leading-relaxed mb-7">
          {feature.desc}
        </p>

        <ul className="space-y-3 mb-8">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-white/70 font-sans text-sm">
              <CheckCircle2 size={16} className="text-gold mt-0.5 flex-shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>

        <ButtonLink
          href={COTIZAR}
          variant="ghost"
          size="md"
          className="group px-0 hover:text-gold"
        >
          Conocer más
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </ButtonLink>
      </motion.div>
    </div>
  )
}

export function Features() {
  return (
    <section
      id="caracteristicas"
      className="bg-black-secondary relative overflow-hidden"
      aria-label="Características del servicio"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#e1be4a 1px, transparent 1px), linear-gradient(to right, #e1be4a 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container-site relative z-10">
        {/* Section header */}
        <div className="text-center pt-16 md:pt-24 mb-4">
          <Badge className="mb-5">Diferenciadores</Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4">
            ¿Por qué elegir{' '}
            <span className="text-gold italic">U Rent It</span>?
          </h2>
          <p className="text-white/50 font-sans text-base md:text-lg max-w-2xl mx-auto">
            No somos solo una arrendadora. Somos tu socio estratégico de movilidad
            empresarial con soluciones que van más allá del vehículo.
          </p>
        </div>

        {/* Feature items */}
        {FEATURES.map((feature, i) => (
          <FeatureItem key={feature.label} feature={feature} index={i} />
        ))}
      </div>
    </section>
  )
}
