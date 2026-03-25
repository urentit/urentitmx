'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Copy,
  Gift,
  Loader2,
  Mail,
  Phone,
  Send,
  Share2,
  UserRoundPlus,
} from 'lucide-react'
import { clsx } from 'clsx'
import { Badge } from '@/components/ui/Badge'

const schema = z.object({
  nombreCompleto: z.string().min(2, 'Ingresa tu nombre completo'),
  email: z.string().email('Ingresa un correo válido'),
  telefono: z.string().regex(/^[0-9]{10}$/, 'Ingresa 10 dígitos sin espacios'),
  empresa: z.string().min(2, 'Ingresa la empresa o razón social'),
  referidoNombre: z.string().min(2, 'Ingresa el nombre del referido'),
  referidoEmail: z.string().email('Ingresa un correo válido del referido'),
  referidoTelefono: z.string().regex(/^[0-9]{10}$/, 'Ingresa 10 dígitos sin espacios'),
  referidoEnterado: z.enum(['si', 'no'], {
    required_error: 'Indica si tu referido sabe de la recomendación',
  }),
  aceptaTerminos: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar los términos del programa' }),
  }),
})

type ReferralFormValues = z.infer<typeof schema>

function Field({
  label,
  error,
  required = false,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
        {label}
        {required ? <span className="ml-1 text-gold">*</span> : null}
      </label>
      {children}
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </div>
  )
}

const inputBase =
  'w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 transition-all duration-200 focus:border-gold/60 focus:bg-white/8 focus:outline-none'

export function ReferralForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const shareUrl = 'https://urentit.mx/referidos'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReferralFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      referidoEnterado: undefined,
    },
  })

  const onSubmit = async (data: ReferralFormValues) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()

      setStatus('success')
      reset()

      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        ;(window as any).dataLayer.push({ event: 'form_submit', form_type: 'referrals' })
      }
    } catch {
      setStatus('error')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 2200)
    } catch {
      setCopyState('error')
      window.setTimeout(() => setCopyState('idle'), 2200)
    }
  }

  return (
    <section className="relative overflow-hidden bg-black pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(225,190,74,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(225,190,74,0.12),_transparent_22%)]" />
      <div className="relative container-site space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-[1fr_0.92fr]"
        >
          <div className="space-y-6">
            <Badge>Formulario de referidos</Badge>
            <div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Comparte el programa de{' '}
                <span className="text-gold italic">referidos U Rent It</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
                Registra tus datos, agrega a la persona que recomiendas y compártele esta
                página con una miniatura optimizada para WhatsApp, LinkedIn y redes sociales.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Share2, title: 'Página compartible', copy: 'URL limpia y miniatura social propia' },
                { icon: UserRoundPlus, title: 'Captura doble', copy: 'Tus datos y los del referido en un flujo' },
                { icon: Gift, title: 'Términos visibles', copy: 'Aviso y aceptación dentro del formulario' },
              ].map((item) => (
                <div key={item.title} className="rounded-sm border border-white/10 bg-white/[0.04] p-5">
                  <item.icon size={18} className="mb-3 text-gold" />
                  <h2 className="font-sans text-sm font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-gold/20 bg-[radial-gradient(circle_at_top_right,_rgba(225,190,74,0.22),_transparent_38%),linear-gradient(145deg,#151515_0%,#0a0a0a_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-gold/70">Compartir</p>
                <p className="mt-2 text-xl font-semibold text-white">Miniatura y enlace del programa</p>
              </div>
              <div className="rounded-full border border-gold/20 px-3 py-1 text-xs text-gold">
                Social ready
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-black/35 p-6">
              <div className="inline-flex rounded-full border border-gold/20 px-4 py-2 text-xs uppercase tracking-[0.28em] text-gold/80">
                U Rent It
              </div>
              <h2 className="mt-6 max-w-md text-3xl font-bold leading-tight text-white">
                Recomienda hoy a la persona indicada para arrendar con U Rent It.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60">
                Comparte esta liga para que la campaña de referidos tenga una presentación clara
                desde el primer vistazo.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Mail size={16} className="text-gold" />
                  <span>{shareUrl}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-gold-light"
                >
                  <Copy size={16} />
                  {copyState === 'copied'
                    ? 'Enlace copiado'
                    : copyState === 'error'
                      ? 'No se pudo copiar'
                      : 'Copiar enlace'}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Te comparto el formulario de referidos de U Rent It: ${shareUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-gold/30 px-5 py-3 text-sm font-semibold text-gold transition-colors duration-300 hover:bg-gold hover:text-black"
                >
                  <Share2 size={16} />
                  Compartir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="glass rounded-[2rem] p-6 md:p-8 lg:p-10"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                  <CheckCircle2 size={28} className="text-gold" />
                </div>
                <h2 className="text-3xl font-bold text-white">Referencia enviada</h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                  El registro quedó capturado. El equipo de U Rent It podrá revisar la información
                  del referido y continuar el seguimiento comercial.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                >
                  Registrar otro referido
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-10"
                noValidate
              >
                <div className="grid gap-10 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-gold/70">Sección 1</p>
                      <h2 className="mt-3 text-2xl font-bold text-white">Tus datos</h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">
                        Solicita tu código de referido y registra la información para validar la recomendación.
                      </p>
                    </div>

                    <Field label="Nombre completo" required error={errors.nombreCompleto?.message}>
                      <input
                        {...register('nombreCompleto')}
                        placeholder="Nombre y apellido"
                        className={clsx(inputBase, errors.nombreCompleto && 'border-red-400/60')}
                      />
                    </Field>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Correo electrónico" required error={errors.email?.message}>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="correo@empresa.com"
                          className={clsx(inputBase, errors.email && 'border-red-400/60')}
                        />
                      </Field>

                      <Field label="Número de teléfono" required error={errors.telefono?.message}>
                        <div className="relative">
                          <Phone size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70" />
                          <input
                            {...register('telefono')}
                            type="tel"
                            maxLength={10}
                            placeholder="5512345678"
                            className={clsx(inputBase, 'pl-11', errors.telefono && 'border-red-400/60')}
                          />
                        </div>
                      </Field>
                    </div>

                    <Field label="Empresa o razón social" required error={errors.empresa?.message}>
                      <input
                        {...register('empresa')}
                        placeholder="Nombre de la empresa"
                        className={clsx(inputBase, errors.empresa && 'border-red-400/60')}
                      />
                    </Field>
                  </div>

                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-gold/70">Sección 2</p>
                      <h2 className="mt-3 text-2xl font-bold text-white">Datos del referido</h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">
                        Ayúdanos ingresando los datos de la persona a la que deseas recomendar.
                      </p>
                    </div>

                    <Field label="Nombre del referido" required error={errors.referidoNombre?.message}>
                      <input
                        {...register('referidoNombre')}
                        placeholder="Nombre completo"
                        className={clsx(inputBase, errors.referidoNombre && 'border-red-400/60')}
                      />
                    </Field>

                    <Field label="Correo electrónico del referido" required error={errors.referidoEmail?.message}>
                      <input
                        {...register('referidoEmail')}
                        type="email"
                        placeholder="correo@empresa.com"
                        className={clsx(inputBase, errors.referidoEmail && 'border-red-400/60')}
                      />
                    </Field>

                    <Field label="Teléfono del referido" required error={errors.referidoTelefono?.message}>
                      <div className="relative">
                        <Phone size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70" />
                        <input
                          {...register('referidoTelefono')}
                          type="tel"
                          maxLength={10}
                          placeholder="5512345678"
                          className={clsx(inputBase, 'pl-11', errors.referidoTelefono && 'border-red-400/60')}
                        />
                      </div>
                    </Field>

                    <Field
                      label="¿Tu referido está enterado de que lo estás recomendando?"
                      required
                      error={errors.referidoEnterado?.message}
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { value: 'si', label: 'Sí' },
                          { value: 'no', label: 'No' },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-3 rounded-sm border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-colors hover:border-gold/30"
                          >
                            <input
                              {...register('referidoEnterado')}
                              type="radio"
                              value={option.value}
                              className="h-4 w-4 border-white/20 bg-transparent text-gold focus:ring-gold"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </Field>
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm font-semibold text-white">Aviso</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Puedes llenar el formulario varias veces para múltiples referidos. Al enviar este
                    formulario, aceptas los términos y condiciones de la campaña de referidos de U Rent It.
                    El beneficio se otorgará solo si el referido firma contrato dentro del periodo vigente.
                    Consulta más información en{' '}
                    <Link href="/aviso-de-privacidad" className="text-gold underline decoration-gold/60 underline-offset-4">
                      Aviso de Privacidad
                    </Link>
                    .
                  </p>

                  <label className="mt-4 flex items-start gap-3 text-sm text-white/75">
                    <input
                      {...register('aceptaTerminos')}
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-gold focus:ring-gold"
                    />
                    <span>Acepto los términos del programa de referidos y confirmo que la información es correcta.</span>
                  </label>
                  {errors.aceptaTerminos ? (
                    <p className="mt-2 text-xs text-red-400">{errors.aceptaTerminos.message}</p>
                  ) : null}
                </div>

                {status === 'error' ? (
                  <p className="text-center text-xs text-red-400">
                    Ocurrió un error al enviar el referido. Intenta de nuevo en unos momentos.
                  </p>
                ) : null}

                <div className="flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                    U Rent It · Programa de referidos
                  </p>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-gold-light hover:shadow-gold-lg disabled:pointer-events-none disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Enviar referido
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
