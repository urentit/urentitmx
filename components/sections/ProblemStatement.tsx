'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { X, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

const PROBLEMS = [
  'Inmovilizas capital que necesitas para operar',
  'La depreciación afecta directamente tu balance',
  'Tú asumes los costos de mantenimiento y siniestros',
  'Gestión de trámites, placas y seguros por tu cuenta',
  'Sin flexibilidad para actualizar tu flotilla',
]

const SOLUTIONS = [
  'Renta mensual fija — capital de trabajo libre',
  'Sin depreciación en tu balance general',
  'Mantenimiento preventivo y seguro incluidos',
  'Trámites, placas y refrendos gestionados por U Rent It',
  'Renueva, compra o devuelve al vencimiento',
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const row = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export function ProblemStatement() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="por-que-arrendar"
      className="section-padding bg-black-secondary relative overflow-hidden"
      aria-label="Por qué arrendar"
      ref={ref}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <Badge className="mb-5">¿Por qué arrendar?</Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight"
          >
            Deja de{' '}
            <span className="text-white/40 italic">inmovilizar capital</span>{' '}
            en vehículos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-white/45 font-sans text-base md:text-lg mt-4 max-w-xl mx-auto"
          >
            Comprar un vehículo empresarial tiene costos ocultos que afectan
            tu operación. El arrendamiento puro los elimina.
          </motion.p>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 max-w-4xl mx-auto">
          {/* Problems column */}
          <div className="lg:pr-10 lg:border-r lg:border-white/8">
            <p className="font-sans text-xs tracking-[0.18em] uppercase text-white/30 mb-6 flex items-center gap-2">
              <X size={12} className="text-red-400/60" />
              Al comprar o usar crédito
            </p>
            <motion.ul
              variants={container}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="space-y-4"
            >
              {PROBLEMS.map((p) => (
                <motion.li
                  key={p}
                  variants={row}
                  className="flex items-start gap-3 text-white/50 font-sans text-sm leading-relaxed"
                >
                  <X size={15} className="text-red-400/50 mt-0.5 flex-shrink-0" />
                  {p}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Solutions column */}
          <div className="lg:pl-10 bg-gold/[0.03] lg:bg-transparent lg:border-l-0 rounded-sm lg:rounded-none p-6 lg:p-0">
            <p className="font-sans text-xs tracking-[0.18em] uppercase text-gold/60 mb-6 flex items-center gap-2">
              <CheckCircle2 size={12} className="text-gold" />
              Con arrendamiento puro U Rent It
            </p>
            <motion.ul
              variants={container}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="space-y-4"
            >
              {SOLUTIONS.map((s) => (
                <motion.li
                  key={s}
                  variants={row}
                  className="flex items-start gap-3 text-white/70 font-sans text-sm leading-relaxed"
                >
                  <CheckCircle2 size={15} className="text-gold mt-0.5 flex-shrink-0" />
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center text-white/25 font-sans text-xs mt-12"
        >
          * Consulta con tu contador los beneficios aplicables a tu régimen fiscal.
        </motion.p>
      </div>
    </section>
  )
}
