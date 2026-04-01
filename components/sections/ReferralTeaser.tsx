'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Gift, Share2, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

const perks = [
  'Refiere a una persona o empresa desde un formulario simple',
  'Si el referido firma contrato, puedes recibir hasta una renta mensual sin costo',
  'El beneficio se aplica cuando la operación referida queda formalizada',
]

export function ReferralTeaser() {
  return (
    <section
      id="referidos"
      className="relative overflow-hidden border-y border-gold/10 bg-[radial-gradient(circle_at_top_left,_rgba(225,190,74,0.18),_transparent_32%),linear-gradient(135deg,#0b0b0b_0%,#141414_48%,#090909_100%)]"
      aria-label="Programa de referidos"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_30%,transparent_60%)]" />
      <div className="relative container-site section-padding">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <Badge className="mb-5">Programa de referidos</Badge>
            <h2 className="mb-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              En U Rent It queremos reconocer{' '}
              <span className="text-gold italic">tu confianza</span>
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Si nos refieres a una persona o empresa y esa persona firma contrato con
              nosotros, podrás recibir hasta una renta mensual sin costo en tu contrato
              vigente. Tu recomendación puede convertirse en un ahorro real para ti.
            </p>

            <div className="mb-9 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Gift, label: 'Hasta una renta sin costo' },
                { icon: Share2, label: 'Página lista para compartir' },
                { icon: ShieldCheck, label: 'Beneficio al formalizar la operación' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-sm border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                >
                  <item.icon className="mb-3 text-gold" size={18} />
                  <p className="text-sm font-medium text-white/85">{item.label}</p>
                </div>
              ))}
            </div>

            <ul className="mb-8 space-y-3">
              {perks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/65 md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/referidos"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-gold-light hover:shadow-gold-lg"
              >
                Abrir formulario de referidos
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/referidos"
                className="inline-flex items-center justify-center rounded-sm border border-gold/30 px-6 py-4 text-sm font-semibold text-gold transition-colors duration-300 hover:bg-gold hover:text-black"
              >
                Ver miniatura compartible
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gold/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/20 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Vista previa</p>
                  <p className="mt-2 text-xl font-semibold text-white">Miniatura para compartir</p>
                </div>
                <div className="rounded-full border border-gold/25 px-3 py-1 text-xs text-gold">
                  1200 x 630
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-black">
                <div className="relative aspect-[1200/630] w-full">
                  <Image
                    src="/img/referidos/miniatura-referidos-og.jpg"
                    alt="Miniatura del programa de referidos U Rent It"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
