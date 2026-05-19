'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ChevronDown, ArrowRight, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { SECTION_ONE } from '@/lib/cotizador/placas'
import { clsx } from 'clsx'

const WHATSAPP = 'https://wa.me/525518062633?text=' + encodeURIComponent('Hola, me gustaría obtener una cotización de arrendamiento de vehículos.')

const ANTICIPO_OPTS = [
  { value: 0.20, label: '20%' },
  { value: 0.25, label: '25%' },
  { value: 0.30, label: '30%' },
  { value: 0.35, label: '35%' },
  { value: 0.40, label: '40%' },
  { value: 0.45, label: '45%' },
]

function fmt(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

interface ResultData {
  mensualidad36: number
  mensualidad48: number
  anticipo36:    number
  anticipo48:    number
  finalCost36:   number
  finalCost48:   number
}

const inputCls = 'w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors'
const labelCls = 'mb-1.5 block text-xs uppercase tracking-widest text-white/40'

export function CotizadorPublico() {
  const [price,    setPrice]    = useState('')
  const [state,    setState]    = useState('')
  const [anticipo, setAnticipo] = useState(0.25)
  const [result,   setResult]   = useState<ResultData | null>(null)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleCalcular(e: React.FormEvent) {
    e.preventDefault()
    const p = parseFloat(price.replace(/[,$\s]/g, ''))
    if (!p || !state) { setError('Completa todos los campos.'); return }
    setError('')
    setLoading(true)
    setResult(null)

    try {
      const res  = await fetch('/api/cotizador/publico', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ totalPrice: p, state, anticipo }),
      })
      const json = await res.json()
      if (json.ok) setResult(json)
      else setError('No se pudo calcular. Intenta de nuevo.')
    } catch {
      setError('Error de conexión.')
    } finally {
      setLoading(false)
    }
  }

  const states = Object.entries(SECTION_ONE)

  return (
    <section
      id="cotizar"
      className="relative overflow-hidden border-t border-gold/10 bg-[linear-gradient(180deg,#0a0a0a_0%,#111111_50%,#0a0a0a_100%)]"
    >
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(225,190,74,0.07),transparent)]" />

      <div className="relative container-site section-padding">
        {/* Encabezado */}
        <div className="mb-12 text-center">
          <Badge className="mb-5">Cotización estimada</Badge>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            ¿Cuánto pagarías al mes{' '}
            <span className="text-gold italic">por tu vehículo?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            Ingresa el valor del vehículo y obtén una estimación de tu renta mensual para arrendamiento puro a 36 y 48 meses.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Formulario */}
          <form
            onSubmit={handleCalcular}
            className="glass rounded-xl border border-white/10 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-3">
              {/* Precio */}
              <div className="sm:col-span-3">
                <label className={labelCls}>Valor del vehículo (con IVA)</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/40">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="500,000"
                    className={clsx(inputCls, 'pl-7')}
                    required
                  />
                </div>
              </div>

              {/* Estado */}
              <div className="sm:col-span-2">
                <label className={labelCls}>Estado para placas</label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className={clsx(inputCls, 'appearance-none pr-10')}
                    required
                  >
                    <option value="">— Seleccionar —</option>
                    {states.map(([key, s]) => (
                      <option key={key} value={key}>{s.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                </div>
              </div>

              {/* Anticipo */}
              <div>
                <label className={labelCls}>% Anticipo</label>
                <div className="relative">
                  <select
                    value={anticipo}
                    onChange={e => setAnticipo(parseFloat(e.target.value))}
                    className={clsx(inputCls, 'appearance-none pr-10')}
                  >
                    {ANTICIPO_OPTS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-gold py-3.5 text-sm font-semibold text-black transition-all hover:bg-gold-light hover:shadow-gold disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Calculando…
                </>
              ) : (
                <>
                  <Calculator size={16} />
                  Calcular estimación
                </>
              )}
            </button>

            <p className="mt-3 text-center text-xs text-white/25">
              Estimación referencial. La cotización definitiva incluye evaluación crediticia.
            </p>
          </form>

          {/* Resultados */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4 }}
                className="mt-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: '36 meses', mensualidad: result.mensualidad36, anticipo: result.anticipo36, finalCost: result.finalCost36 },
                    { label: '48 meses', mensualidad: result.mensualidad48, anticipo: result.anticipo48, finalCost: result.finalCost48 },
                  ].map(col => (
                    <div
                      key={col.label}
                      className="rounded-xl border border-gold/20 bg-gold/5 p-6"
                    >
                      <p className="mb-4 text-xs uppercase tracking-widest text-gold/70">{col.label}</p>
                      <p className="mb-1 font-display text-4xl font-bold text-white">
                        {fmt(col.mensualidad)}
                        <span className="ml-1 text-base font-normal text-white/40">/mes</span>
                      </p>
                      <div className="mt-4 space-y-1.5 text-sm text-white/50">
                        <div className="flex justify-between">
                          <span>Anticipo inicial</span>
                          <span className="text-white/80">{fmt(col.anticipo)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Valor residual</span>
                          <span className="text-white/80">{fmt(col.finalCost)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        ;(window as any).gtag('event', 'cotizador_publico_whatsapp', { event_category: 'cotizador' })
                      }
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-semibold text-black transition-all hover:bg-gold-light"
                  >
                    <MessageCircle size={16} />
                    Hablar con un ejecutivo
                  </a>
                  <a
                    href="#contacto"
                    className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-gold/30 px-6 py-3.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
                  >
                    Cotización detallada
                    <ArrowRight size={16} />
                  </a>
                </div>

                <p className="mt-4 text-center text-xs text-white/25">
                  Precios estimados basados en arrendamiento puro estándar · Tasa referencial 28% / 27% anual · No incluye evaluación de crédito
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
