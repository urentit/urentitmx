'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { SECTION_ONE, SECTION_TWO, SECTION_THREE } from '@/lib/cotizador/placas'
import type { QuoteType, QuoteResponse } from '@/lib/cotizador/types'
import { QuoteResult } from './QuoteResult'

const schema = z.object({
  totalPrice:          z.string().min(1, 'Requerido'),
  modelo:              z.string().optional(),
  accessory:           z.string().optional(),
  accessoryValue:      z.string().optional(),
  state:               z.string().min(2, 'Selecciona un estado'),
  anticipo:            z.string().min(1, 'Requerido'),
  servicios:           z.string().optional(),
  seguro:              z.string().optional(),
  servicesValue:       z.string().optional(),
  autometricaValue:    z.string().optional(),
  residualValue24:     z.string().optional(),
  residualValue36:     z.string().optional(),
  residualValue48:     z.string().optional(),
  includeInsurance:    z.boolean().optional(),
  includeGps:          z.boolean().optional(),
  includeTenencias:    z.boolean().optional(),
  includeVerificaciones: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

const ANTICIPO_OPTS = [
  { value: '0.20', label: '20%' },
  { value: '0.25', label: '25%' },
  { value: '0.30', label: '30%' },
  { value: '0.35', label: '35%' },
  { value: '0.40', label: '40%' },
  { value: '0.45', label: '45%' },
]

function getStates(quoteType: QuoteType) {
  if (quoteType === 'electrico') return Object.entries(SECTION_THREE)
  if (quoteType === 'carga' || quoteType === 'carga-pesada' || quoteType === 'foraneo')
    return Object.entries(SECTION_TWO)
  return Object.entries(SECTION_ONE)
}

function getEndpoint(quoteType: QuoteType) {
  return `/api/cotizador/${quoteType}`
}

const QUOTE_TYPE_LABELS: Record<QuoteType, string> = {
  auto:             'Autos',
  vip:              'VIP / Lujo',
  carga:            'Carga',
  'carga-pesada':   'Carga Pesada',
  electrico:        'Eléctrico',
  foraneo:          'Foráneo',
  usado:            'Vehículo Usado',
  flotilla:         'Flotilla',
  refinanciamiento: 'Refinanciamiento',
}

const inputCls  = 'w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none'
const selectCls = 'w-full rounded border border-white/10 bg-[#1c1c1c] px-3 py-2 text-sm text-white focus:border-gold/50 focus:outline-none'
const labelCls = 'mb-1 block text-xs text-white/50'

export function QuoteForm({ quoteType }: { quoteType: QuoteType }) {
  const [result, setResult]   = useState<QuoteResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastInput, setLastInput] = useState<Record<string, unknown>>({})

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      includeInsurance:     true,
      includeGps:           true,
      includeTenencias:     true,
      includeVerificaciones: true,
    },
  })

  const states = getStates(quoteType)
  const isFlotilla = quoteType === 'flotilla'
  const isUsado    = quoteType === 'usado'
  const isRefin    = quoteType === 'refinanciamiento'
  const isCargaPesada = quoteType === 'carga-pesada'

  async function onSubmit(values: FormValues) {
    setLoading(true)
    setResult(null)

    const body: Record<string, unknown> = {
      totalPrice:    parseFloat(values.totalPrice.replace(/,/g, '')),
      modelo:        values.modelo ?? '',
      state:         values.state,
      anticipo:      parseFloat(values.anticipo),
      accessory:     values.accessory ?? '',
      accessoryValue: parseFloat(values.accessoryValue ?? '0') || 0,
    }

    if (!isRefin && !isCargaPesada) {
      body.servicios = parseInt(values.servicios ?? '0') || 0
    }
    if (values.seguro) body.seguro = parseFloat(values.seguro)
    if (values.servicesValue) body.servicesValue = parseFloat(values.servicesValue)
    if (isUsado && values.autometricaValue)
      body.autometricaValue = parseFloat(values.autometricaValue.replace(/,/g, ''))
    if (isFlotilla) {
      body.residualValue24     = parseFloat(values.residualValue24 ?? '20') || 20
      body.residualValue36     = parseFloat(values.residualValue36 ?? '30') || 30
      body.residualValue48     = parseFloat(values.residualValue48 ?? '25') || 25
      body.includeInsurance    = values.includeInsurance
      body.includeGps          = values.includeGps
      body.includeTenencias    = values.includeTenencias
      body.includeVerificaciones = values.includeVerificaciones
      body.plazos              = ['24', '36', '48']
    }

    setLastInput({
      modelo:     values.modelo ?? '',
      totalPrice: body.totalPrice,
      quoteType,
    })

    try {
      const res  = await fetch(getEndpoint(quoteType), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (json.ok) setResult(json.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Precio */}
        <div>
          <label className={labelCls}>Valor del vehículo (con IVA) *</label>
          <input {...register('totalPrice')} placeholder="500000" className={inputCls} />
          {errors.totalPrice && <p className="mt-1 text-xs text-red-400">{errors.totalPrice.message}</p>}
        </div>

        {/* Modelo */}
        <div>
          <label className={labelCls}>Modelo / descripción</label>
          <input {...register('modelo')} placeholder="Honda Civic 2024" className={inputCls} />
        </div>

        {/* Estado / placas */}
        <div>
          <label className={labelCls}>Estado para placas *</label>
          <select {...register('state')} className={selectCls}>
            <option value="">— Seleccionar —</option>
            {states.map(([key, s]) => (
              <option key={key} value={key}>{s.name}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-xs text-red-400">{errors.state.message}</p>}
        </div>

        {/* Anticipo */}
        <div>
          <label className={labelCls}>% Anticipo *</label>
          <select {...register('anticipo')} className={selectCls}>
            <option value="">— Seleccionar —</option>
            {ANTICIPO_OPTS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors.anticipo && <p className="mt-1 text-xs text-red-400">{errors.anticipo.message}</p>}
        </div>

        {/* Servicios incluidos (no carga pesada ni refinanciamiento) */}
        {!isCargaPesada && !isRefin && (
          <div>
            <label className={labelCls}>Servicios incluidos (años)</label>
            <select {...register('servicios')} className={selectCls}>
              <option value="0">Ninguno</option>
              <option value="1">1 año</option>
              <option value="2">2 años</option>
              <option value="3">3 años</option>
              {!isRefin && <option value="4">4 años</option>}
            </select>
          </div>
        )}

        {/* Seguro manual */}
        <div>
          <label className={labelCls}>Seguro por año (dejar vacío = automático)</label>
          <input {...register('seguro')} placeholder="Automático" className={inputCls} />
        </div>

        {/* Accesorio */}
        <div>
          <label className={labelCls}>Accesorio</label>
          <input {...register('accessory')} placeholder="Ej. Navegador GPS" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Valor del accesorio</label>
          <input {...register('accessoryValue')} placeholder="0" className={inputCls} />
        </div>

        {/* Valor Autométrica (vehículo usado) */}
        {isUsado && (
          <div>
            <label className={labelCls}>Valor Autométrica</label>
            <input {...register('autometricaValue')} placeholder="400000" className={inputCls} />
          </div>
        )}

        {/* Flotilla: residuales y opcionales */}
        {isFlotilla && (
          <>
            <div>
              <label className={labelCls}>Residual 24m (%)</label>
              <input {...register('residualValue24')} placeholder="20" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Residual 36m (%)</label>
              <input {...register('residualValue36')} placeholder="30" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Residual 48m (%)</label>
              <input {...register('residualValue48')} placeholder="25" className={inputCls} />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <p className="mb-2 text-xs text-white/50">Opcionales incluidos en renta:</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'includeInsurance',     label: 'Seguro' },
                  { name: 'includeGps',           label: 'GPS' },
                  { name: 'includeTenencias',     label: 'Tenencias' },
                  { name: 'includeVerificaciones', label: 'Verificaciones' },
                ].map(({ name, label }) => (
                  <label key={name} className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register(name as keyof FormValues)}
                      className="accent-gold"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Submit */}
        <div className="flex items-end sm:col-span-2 lg:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-gold px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {loading ? 'Calculando…' : 'Calcular cotización'}
          </button>
        </div>
      </form>

      {result && (
        <QuoteResult
          result={result}
          quoteType={quoteType}
          modelo={String(lastInput.modelo ?? '')}
          totalPrice={Number(lastInput.totalPrice ?? 0)}
        />
      )}
    </div>
  )
}
