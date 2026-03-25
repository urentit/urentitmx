'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { clsx } from 'clsx'

const FAQS = [
  {
    question: '¿Cuál es el procedimiento para arrendar un vehículo?',
    answer: 'Da click en nuestra sección COTIZA AHORA en donde se te harán una serie de preguntas clave, dale ENVIAR y de inmediato un ejecutivo se pondrá en contacto contigo.',
  },
  {
    question: '¿Cómo funciona el arrendamiento que ofrecen?',
    answer: 'Incluimos en cómodas rentas mensuales el vehículo de tu elección, seguros, trámites y servicios varios.',
  },
  {
    question: '¿Puedo arrendar cualquier marca?',
    answer: 'Trabajamos con cualquier tipo de vehículo ya sea para uso particular, utilitarios, blindados, carga, carga con caja seca, caja refrigerada o congelación e incluso con lanchas, ATV y montacargas.',
  },
  {
    question: '¿Ofrecen arrendamiento para aplicaciones como Uber, Didi o Beat?',
    answer: 'No ofrecemos este tipo de arrendamiento.',
  },
  {
    question: '¿Ofrecen arrendamiento a seminuevos?',
    answer: 'Sí, arrendamos vehículos hasta 4 modelos de antigüedad y con un máximo de 68,000 kms.',
  },
  {
    question: '¿Se maneja algún tipo de tasa?',
    answer: 'Nuestro producto no tiene tasa, considerando que es Arrendamiento y no un crédito.',
  },
  {
    question: '¿Ustedes tramitan las placas?',
    answer: 'Tramitamos placas en CDMX, EDOMEX, Morelos, Puebla, Hidalgo, Aguascalientes y resto de la República.',
  },
  {
    question: '¿Qué plazos de arrendamiento manejan?',
    answer: 'Nuestro servicio únicamente maneja plazos a 36 y 48 meses. No manejamos arrendamientos cortos de 30, 60 o 90 días.',
  },
  {
    question: '¿Qué tipos de arrendamiento ofrecen?',
    answer: 'Contamos con arrendamiento para personas físicas con actividad empresarial y personas morales.',
  },
  {
    question: '¿Tienen servicio de arrendamiento de flotillas?',
    answer: 'Sí, contamos con atención especializada para clientes flotilleros.',
  },
  {
    question: '¿Qué garantías tengo en caso de un percance?',
    answer: 'Tu vehículo está asegurado ampliamente durante toda la vigencia del contrato, para tu seguridad y tranquilidad.',
  },
]

/* JSON-LD FAQPage schema */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={clsx(
        'border rounded-sm overflow-hidden transition-all duration-200',
        open ? 'border-gold/30 bg-black-light' : 'border-white/5 bg-black-secondary hover:border-white/10'
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left"
        aria-expanded={open}
      >
        <span className={clsx(
          'font-sans font-medium text-sm md:text-base transition-colors duration-200 leading-snug',
          open ? 'text-gold' : 'text-white/80'
        )}>
          {faq.question}
        </span>
        <span className={clsx(
          'flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-200',
          open ? 'border-gold/40 text-gold' : 'border-white/15 text-white/40'
        )}>
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-white/55 font-sans text-sm leading-relaxed border-t border-white/5 pt-4">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQs() {
  const half = Math.ceil(FAQS.length / 2)
  const col1 = FAQS.slice(0, half)
  const col2 = FAQS.slice(half)

  return (
    <section
      id="preguntas-frecuentes"
      className="section-padding bg-black-secondary relative overflow-hidden"
      aria-label="Preguntas frecuentes"
    >
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Decorative top line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-site">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-5">FAQ&apos;s</Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4"
          >
            Preguntas{' '}
            <span className="text-gold italic">frecuentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 font-sans text-base md:text-lg max-w-2xl mx-auto"
          >
            Todo lo que necesitas saber sobre el arrendamiento puro de vehículos.
          </motion.p>
        </div>

        {/* Two-column grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4"
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {col1.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            {col2.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i + half} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
