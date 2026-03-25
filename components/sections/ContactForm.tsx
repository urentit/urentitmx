'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { clsx } from 'clsx'

const WHATSAPP = 'https://wa.me/525518062633?text=' + encodeURIComponent('Hola, me gustaría obtener información sobre arrendamiento de vehículos.')

/* ─── Schema ─── */
const schema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  apellido: z.string().min(2, 'Ingresa tu apellido'),
  empresa: z.string().min(2, 'Ingresa el nombre de tu empresa'),
  email: z.string().email('Correo electrónico no válido'),
  telefono: z.string().regex(/^[0-9]{10}$/, 'Ingresa 10 dígitos sin espacios'),
  vehiculo: z.string().optional(),
  mensaje: z.string().min(10, 'Escríbenos un mensaje de al menos 10 caracteres'),
})

type FormValues = z.infer<typeof schema>

/* ─── Field component ─── */
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/60 font-sans text-xs tracking-wide uppercase">{label}</label>
      {children}
      {error && (
        <span className="text-red-400 text-xs font-sans">{error}</span>
      )}
    </div>
  )
}

const inputBase =
  'w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white font-sans text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/60 focus:bg-white/8 transition-all duration-200'

/* ─── Main ─── */
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()

      setStatus('success')
      reset()

      // GA4 event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        ;(window as any).dataLayer.push({ event: 'form_submit', form_type: 'contact' })
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="cotizar"
      className="relative section-padding overflow-hidden"
      aria-label="Solicitar cotización"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/backgrounds/fondo-cotiza.jpg"
          alt="Fondo cotización"
          fill
          className="object-cover object-center"
          quality={80}
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Gold top line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent z-10" />

      <div className="relative z-10 container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-5">Cotización gratuita</Badge>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
              Da el primer paso hacia{' '}
              <span className="text-gold italic">tu flota ideal</span>
            </h2>
            <p className="text-white/55 font-sans text-base md:text-lg leading-relaxed mb-8">
              Cuéntanos qué necesitas y en menos de 24 horas un ejecutivo se
              pondrá en contacto contigo con una propuesta personalizada.
            </p>

            {/* Benefits list */}
            <ul className="space-y-4 mb-10">
              {[
                'Sin costo ni compromiso',
                'Respuesta en menos de 24 hrs',
                'Asesoría fiscal incluida',
                'Más de 36 marcas disponibles',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/65 font-sans text-sm">
                  <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* WhatsApp alternative */}
            <div className="border border-white/10 rounded-sm p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#25D366]/15 border border-[#25D366]/30 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={18} className="text-[#25D366]" />
              </div>
              <div>
                <p className="text-white/50 font-sans text-xs mb-1">¿Prefieres escribirnos directo?</p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-sans font-semibold text-sm hover:underline"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      ;(window as any).dataLayer.push({ event: 'whatsapp_click', source: 'contact_section' })
                    }
                  }}
                >
                  Contactar por WhatsApp →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="glass rounded-sm p-6 md:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  /* ─── Success state ─── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-gold/15 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={28} className="text-gold" />
                    </div>
                    <h3 className="font-display text-2xl text-white font-bold mb-3">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-white/55 font-sans text-sm leading-relaxed mb-6">
                      Un ejecutivo se pondrá en contacto contigo en menos de 24 horas.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-gold font-sans text-sm hover:underline"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  /* ─── Form ─── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Nombre" error={errors.nombre?.message}>
                        <input
                          {...register('nombre')}
                          placeholder="Juan"
                          className={clsx(inputBase, errors.nombre && 'border-red-400/60')}
                        />
                      </Field>
                      <Field label="Apellido" error={errors.apellido?.message}>
                        <input
                          {...register('apellido')}
                          placeholder="García"
                          className={clsx(inputBase, errors.apellido && 'border-red-400/60')}
                        />
                      </Field>
                    </div>

                    <Field label="Empresa" error={errors.empresa?.message}>
                      <input
                        {...register('empresa')}
                        placeholder="Nombre de tu empresa"
                        className={clsx(inputBase, errors.empresa && 'border-red-400/60')}
                      />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Correo electrónico" error={errors.email?.message}>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="correo@empresa.com"
                          className={clsx(inputBase, errors.email && 'border-red-400/60')}
                        />
                      </Field>
                      <Field label="Teléfono" error={errors.telefono?.message}>
                        <input
                          {...register('telefono')}
                          type="tel"
                          placeholder="5512345678"
                          maxLength={10}
                          className={clsx(inputBase, errors.telefono && 'border-red-400/60')}
                        />
                      </Field>
                    </div>

                    <Field label="Vehículo de interés (opcional)" error={errors.vehiculo?.message}>
                      <input
                        {...register('vehiculo')}
                        placeholder="ej. Toyota Prius, Flota de 5 unidades..."
                        className={inputBase}
                      />
                    </Field>

                    <Field label="Mensaje" error={errors.mensaje?.message}>
                      <textarea
                        {...register('mensaje')}
                        placeholder="Cuéntanos sobre tus necesidades..."
                        rows={3}
                        className={clsx(inputBase, 'resize-none', errors.mensaje && 'border-red-400/60')}
                      />
                    </Field>

                    {status === 'error' && (
                      <p className="text-red-400 font-sans text-xs text-center">
                        Ocurrió un error. Por favor intenta de nuevo o contáctanos por WhatsApp.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-sans font-semibold text-sm px-6 py-4 rounded-sm transition-all duration-300 shadow-gold hover:shadow-gold-lg disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Solicitar cotización gratuita
                        </>
                      )}
                    </button>

                    <p className="text-white/25 font-sans text-xs text-center">
                      Al enviar aceptas nuestro{' '}
                      <a href="/aviso-de-privacidad" className="underline hover:text-white/50 transition-colors">
                        Aviso de Privacidad
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
