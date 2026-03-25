'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

const COTIZAR = '#cotizar'
const WHATSAPP = 'https://wa.me/525518062633?text=' + encodeURIComponent('Hola, me gustaría información sobre arrendamiento de vehículos.')

export function CTAFinal() {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({ event: 'cotizador_click', source: 'cta_final' })
    }
  }

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden bg-black"
      aria-label="Llamada a la acción"
    >
      {/* Fondo dorado con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Decorative circles */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 border border-gold/10 rounded-full pointer-events-none" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 border border-gold/15 rounded-full pointer-events-none" />
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-64 h-64 border border-gold/10 rounded-full pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-40 border border-gold/15 rounded-full pointer-events-none" />

      <div className="container-site relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-sans text-gold text-sm font-semibold tracking-widest uppercase mb-4"
        >
          ¿Listo para comenzar?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6"
        >
          Aspira a{' '}
          <span className="text-gold italic">más</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/50 font-sans text-base md:text-xl max-w-2xl mx-auto mb-10"
        >
          Obtén una cotización personalizada en menos de 24 horas.
          Sin costo, sin compromiso. Solo la mejor solución de movilidad para tu empresa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <ButtonLink
            href={COTIZAR}
            variant="primary"
            size="lg"
            onClick={handleClick}
            className="group min-w-[220px] justify-center"
          >
            Cotiza ahora — es gratis
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </ButtonLink>
          <ButtonLink
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            className="min-w-[220px] justify-center"
          >
            <Phone size={16} />
            55 1806 2633
          </ButtonLink>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-white/25 font-sans text-xs tracking-wide"
        >
          {['Sin pagos iniciales', 'Deducción fiscal*', 'Mantenimiento incluido', 'Respuesta en 24 hrs'].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold/40" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
