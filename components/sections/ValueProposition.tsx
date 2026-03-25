'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Badge } from '@/components/ui/Badge'

const OFFERS = [
  {
    icon: 'planes-flexibles.svg',
    label: 'Planes flexibles',
    description: 'Elige el plazo que mejor se adapte a tus necesidades operativas y de flujo de efectivo.',
  },
  {
    icon: 'no-descapitalizar.svg',
    label: 'Sin descapitalizar',
    description: 'Obtén los vehículos que necesitas sin realizar grandes inversiones iniciales.',
  },
  {
    icon: 'deduccion-fiscal.svg',
    label: 'Deducción fiscal',
    description: 'Optimiza tu carga tributaria con los beneficios fiscales del arrendamiento puro.*',
  },
  {
    icon: 'mantenimiento.svg',
    label: 'Mantenimiento incluido',
    description: 'Nos encargamos del servicio preventivo para que no te preocupes por tiempos muertos.',
  },
  {
    icon: 'vehiculo-sustituto.svg',
    label: 'Seguro Premium',
    description: 'Protección real para tu flota.',
  },
  {
    icon: 'gestion-operativa.svg',
    label: 'Gestión operativa',
    description: 'Nos encargamos de verificaciones, GPS, documentación y más.',
  },
  {
    icon: 'seguro.svg',
    label: 'Seguro a valor factura',
    description: 'Cobertura amplia por hasta 2 años con valor factura garantizado.',
  },
  {
    icon: 'tramites.svg',
    label: 'Trámites simplificados',
    description: 'Nosotros gestionamos toda la documentación para que te concentres en tu negocio.',
  },
  {
    icon: 'cumplimiento.svg',
    label: 'Cumplimiento garantizado',
    description: 'Cumplimos con todos los requisitos fiscales, operativos y legales.',
  },
]

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function ValueProposition() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="propuesta-de-valor"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)' }}
      aria-label="Propuesta de valor"
    >
      {/* Decorative glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-96 bg-gold/3 blur-[120px] pointer-events-none" />

      <div className="container-site relative z-10" ref={ref}>

        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold/60" />
            <span className="font-sans text-[11px] tracking-[0.22em] uppercase text-gold/70">Beneficios</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight max-w-xl"
            >
              Todo lo que incluye tu{' '}
              <span className="text-gold italic">arrendamiento</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/45 font-sans text-sm leading-relaxed max-w-xs lg:text-right"
            >
              No solo rentas un vehículo. Obtienes una solución integral que
              elimina preocupaciones y potencia tu operación.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5"
        >
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.label}
              variants={item}
              className="group relative flex flex-col gap-5 p-7 md:p-8 bg-[#0d0d0d] hover:bg-black-secondary transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Large decorative number — editorial element */}
              <span
                className="absolute -bottom-4 -right-2 font-display font-bold select-none pointer-events-none leading-none text-white/[0.04] group-hover:text-gold/[0.07] transition-colors duration-300"
                style={{ fontSize: 'clamp(5rem, 10vw, 8rem)' }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Gold top line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold/0 group-hover:bg-gold/40 transition-all duration-300" />

              {/* Icon */}
              <div className="relative w-10 h-10">
                <Image
                  src={`/img/default/${offer.icon}`}
                  alt=""
                  fill
                  className="object-contain opacity-60 group-hover:opacity-90 transition-opacity duration-300"
                  style={{ filter: 'invert(75%) sepia(50%) saturate(400%) hue-rotate(5deg)' }}
                />
              </div>

              {/* Text */}
              <div className="relative z-10">
                <h3 className="font-sans font-semibold text-white/80 group-hover:text-gold text-base mb-2 transition-colors duration-300">
                  {offer.label}
                </h3>
                <p className="text-white/40 font-sans text-sm leading-relaxed">
                  {offer.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
