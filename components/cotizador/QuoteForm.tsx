'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { SECTION_ONE, SECTION_TWO, SECTION_THREE } from '@/lib/cotizador/placas'
import type { QuoteType, QuoteResponse } from '@/lib/cotizador/types'
import { useCommission } from '@/lib/cotizador/commissionContext'
import { QuoteResult } from './QuoteResult'

const schema = z.object({
  totalPrice:            z.string().min(1, 'Requerido'),
  modelo:                z.string().optional(),
  cilindraje:            z.enum(['4', '6', '8']).optional(),
  accessory:             z.string().optional(),
  accessoryValue:        z.string().optional(),
  state:                 z.string().min(2, 'Selecciona un estado'),
  anticipo:              z.string().min(1, 'Requerido'),
  servicios:             z.string().optional(),
  seguro:                z.string().optional(),
  servicesValue:         z.string().optional(),
  autometricaValue:      z.string().optional(),
  residualValue24:       z.string().optional(),
  residualValue36:       z.string().optional(),
  residualValue48:       z.string().optional(),
  includeInsurance:      z.boolean().optional(),
  includeGps:            z.boolean().optional(),
  includeTenencias:      z.boolean().optional(),
  includeVerificaciones: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

const ANTICIPO_OPTS = [
  { value: '0.00', label: '0%' },
  { value: '0.05', label: '5%' },
  { value: '0.10', label: '10%' },
  { value: '0.15', label: '15%' },
  { value: '0.20', label: '20%' },
  { value: '0.25', label: '25%' },
  { value: '0.30', label: '30%' },
  { value: '0.35', label: '35%' },
  { value: '0.40', label: '40%' },
  { value: '0.45', label: '45%' },
]

const CILINDRAJE_OPTS = [
  { value: '4', label: '4 Cilindros' },
  { value: '6', label: '6 Cilindros' },
  { value: '8', label: '8 Cilindros' },
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

// Traduce la respuesta de error de la API a un mensaje útil para el usuario.
function describeError(json: any, status: number): string {
  if (status === 401) return 'Tu sesión expiró. Vuelve a iniciar sesión.'
  if (json?.errors && typeof json.errors === 'object') {
    const campos = Object.keys(json.errors)
    if (campos.length) return `Revisa estos campos: ${campos.join(', ')}.`
  }
  if (typeof json?.message === 'string') return json.message
  return 'No se pudo calcular. Verifica los datos e intenta de nuevo.'
}

const inputCls  = 'w-full rounded border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 focus:border-gold/50 focus:outline-none transition-colors'
const selectCls = 'w-full rounded border border-white/10 bg-[#1c1c1c] px-3 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors cursor-pointer'
const labelCls  = 'mb-1.5 block text-xs font-medium text-white/60 uppercase tracking-wide'

// Tipos que muestran el campo cilindraje
const WITH_CILINDRAJE: QuoteType[] = ['auto', 'vip', 'carga', 'carga-pesada', 'foraneo', 'flotilla', 'comision-extra', 'refinanciamiento']

export function QuoteForm({ quoteType }: { quoteType: QuoteType }) {
  const { data: session } = useSession()
  const manualServices = (session?.user as any)?.manualServices === true
  const { comision }   = useCommission()

  const [result,    setResult]    = useState<QuoteResponse | null>(null)
  const [folio,     setFolio]     = useState<number | null>(null)
  const [loading,   setLoading]   = useState(false)
  const [lastInput, setLastInput] = useState<Record<string, unknown>>({})
  const [apiError,  setApiError]  = useState('')

  const isFlotilla    = quoteType === 'flotilla' || quoteType === 'comision-extra'

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      cilindraje:            '4',
      anticipo:              '0.25',
      servicios:             '0',
      residualValue24:       isFlotilla ? '40' : '20',
      residualValue36:       isFlotilla ? '35' : '30',
      residualValue48:       isFlotilla ? '30' : '25',
      includeInsurance:      true,
      includeGps:            true,
      includeTenencias:      true,
      includeVerificaciones: true,
    },
  })

  const states        = getStates(quoteType)
  const isUsado       = quoteType === 'usado'
  const isRefin       = quoteType === 'refinanciamiento'
  const isCargaPesada = quoteType === 'carga-pesada'
  const hasCilindraje = WITH_CILINDRAJE.includes(quoteType)

  async function onSubmit(values: FormValues) {
    setLoading(true)
    setResult(null)
    setApiError('')

    const body: Record<string, unknown> = {
      totalPrice:        parseFloat(values.totalPrice.replace(/[,$\s]/g, '')),
      modelo:            values.modelo ?? '',
      state:             values.state,
      anticipo:          parseFloat(values.anticipo),
      accessory:         values.accessory ?? '',
      accessoryValue:    parseFloat(values.accessoryValue ?? '0') || 0,
      comisionOverride:  comision,
    }

    if (hasCilindraje && values.cilindraje) body.cilindraje = values.cilindraje
    if (!isRefin && !isCargaPesada)         body.servicios  = parseInt(values.servicios ?? '0') || 0
    if (values.seguro)                      body.seguro        = parseFloat(values.seguro)
    if (values.servicesValue)               body.servicesValue = parseFloat(values.servicesValue)
    if (isUsado && values.autometricaValue)
      body.autometricaValue = parseFloat(values.autometricaValue.replace(/[,$\s]/g, ''))
    if (isFlotilla) {
      body.residualValue24       = parseFloat(values.residualValue24 ?? (isFlotilla ? '40' : '20')) || (isFlotilla ? 40 : 20)
      body.residualValue36       = parseFloat(values.residualValue36 ?? (isFlotilla ? '35' : '30')) || (isFlotilla ? 35 : 30)
      body.residualValue48       = parseFloat(values.residualValue48 ?? (isFlotilla ? '30' : '25')) || (isFlotilla ? 30 : 25)
      body.includeInsurance      = values.includeInsurance
      body.includeGps            = values.includeGps
      body.includeTenencias      = values.includeTenencias
      body.includeVerificaciones = values.includeVerificaciones
      body.plazos                = ['24', '36', '48']
    }

    setLastInput({ modelo: values.modelo ?? '', totalPrice: body.totalPrice, quoteType, anticipo: parseFloat(values.anticipo) })

    try {
      const res  = await fetch(getEndpoint(quoteType), {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      })
      const json = await res.json()
      if (json.ok) {
        setResult(json.data)
        setFolio(typeof json.folio === 'number' ? json.folio : null)
      } else setApiError(describeError(json, res.status))
    } catch {
      setApiError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 rounded border border-white/10 bg-white/[0.03] p-4 sm:p-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* Precio */}
        <div>
          <label className={labelCls}>Valor del vehículo (con IVA) *</label>
          <input
            {...register('totalPrice')}
            inputMode="numeric"
            placeholder="500,000"
            className={inputCls}
          />
          {errors.totalPrice && <p className="mt-1 text-xs text-red-400">{errors.totalPrice.message}</p>}
        </div>

        {/* Modelo */}
        <div>
          <label className={labelCls}>Modelo / descripción</label>
          <input
            {...register('modelo')}
            placeholder="Honda Civic 2024"
            className={inputCls}
          />
        </div>

        {/* Cilindraje */}
        {hasCilindraje && (
          <div>
            <label className={labelCls}>Cilindraje</label>
            <select {...register('cilindraje')} className={selectCls}>
              {CILINDRAJE_OPTS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Estado */}
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
            {ANTICIPO_OPTS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Servicios */}
        {!isCargaPesada && !isRefin && (
          <div>
            <label className={labelCls}>Servicios preventivos (años)</label>
            <select {...register('servicios')} className={selectCls}>
              <option value="0">Ninguno</option>
              <option value="1">1 año</option>
              <option value="2">2 años</option>
              <option value="3">3 años</option>
              <option value="4">4 años</option>
            </select>
          </div>
        )}

        {/* Seguro manual */}
        <div>
          <label className={labelCls}>Seguro por año</label>
          <input
            {...register('seguro')}
            inputMode="numeric"
            placeholder="Automático"
            className={inputCls}
          />
        </div>

        {/* Valor de cada servicio — solo usuarios con manualServices */}
        {manualServices && (
          <div>
            <label className={labelCls}>Valor de cada servicio</label>
            <input
              {...register('servicesValue')}
              inputMode="numeric"
              placeholder="Automático"
              className={inputCls}
            />
          </div>
        )}

        {/* Accesorio */}
        <div>
          <label className={labelCls}>Accesorio</label>
          <input {...register('accessory')} placeholder="Ej. Navegador GPS" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Valor del accesorio</label>
          <input
            {...register('accessoryValue')}
            inputMode="numeric"
            placeholder="0"
            className={inputCls}
          />
        </div>

        {/* Autométrica (usado) */}
        {isUsado && (
          <div>
            <label className={labelCls}>Valor Autométrica</label>
            <input
              {...register('autometricaValue')}
              inputMode="numeric"
              placeholder="400,000"
              className={inputCls}
            />
          </div>
        )}

        {/* Flotilla: residuales y opcionales */}
        {isFlotilla && (
          <>
            <div>
              <label className={labelCls}>Residual 24m (%)</label>
              <input {...register('residualValue24')} inputMode="numeric" placeholder={isFlotilla ? '40' : '20'} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Residual 36m (%)</label>
              <input {...register('residualValue36')} inputMode="numeric" placeholder={isFlotilla ? '35' : '30'} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Residual 48m (%)</label>
              <input {...register('residualValue48')} inputMode="numeric" placeholder={isFlotilla ? '30' : '25'} className={inputCls} />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <p className={labelCls}>Incluir en renta:</p>
              <div className="flex flex-wrap gap-5 mt-1">
                {[
                  { name: 'includeInsurance',      label: 'Seguro' },
                  { name: 'includeGps',            label: 'GPS' },
                  { name: 'includeTenencias',      label: 'Tenencias' },
                  { name: 'includeVerificaciones', label: 'Verificaciones' },
                ].map(({ name, label }) => (
                  <label key={name} className="flex items-center gap-2 text-sm text-white/70 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register(name as keyof FormValues)}
                      className="accent-gold w-4 h-4"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Error de API */}
        {apiError && (
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="rounded border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {apiError}
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="sm:col-span-2 lg:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded bg-gold px-8 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                Calculando…
              </span>
            ) : 'Calcular cotización'}
          </button>
        </div>
      </form>

      {result && (
        <QuoteResult
          result={result}
          quoteType={quoteType}
          modelo={String(lastInput.modelo ?? '')}
          totalPrice={Number(lastInput.totalPrice ?? 0)}
          anticipo={Number(lastInput.anticipo ?? 0.25)}
          folio={folio}
        />
      )}
    </div>
  )
}
