'use client'

import { useCallback, useEffect, useState } from 'react'
import { Loader2, Check, RotateCcw, Percent } from 'lucide-react'
import { clsx } from 'clsx'
import { ALL_SECTIONS, SECTION_LABELS } from '@/lib/cotizador/sections'
import type { QuoteType } from '@/lib/cotizador/types'

interface RatesData {
  defaults:  Record<QuoteType, Record<number, number>>
  plazos:    Record<QuoteType, number[]>
  overrides: Array<{ quoteType: string; months: number; tasa: number; updatedAt: string }>
  hasDatabase: boolean
}

const keyOf = (quoteType: string, months: number) => `${quoteType}:${months}`

export function RatesAdmin() {
  const [data, setData]       = useState<RatesData | null>(null)
  const [error, setError]     = useState<string | null>(null)
  // Valores de los inputs, editables por celda (string para permitir vacío/decimales a medias)
  const [drafts, setDrafts]   = useState<Record<string, string>>({})
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const [savedKey, setSavedKey] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    try {
      const res  = await fetch('/api/cotizador/tasas')
      const json = await res.json()
      if (!res.ok) throw new Error(json.message ?? 'Error cargando tasas')
      setData(json.data)
      const next: Record<string, string> = {}
      for (const o of json.data.overrides) next[keyOf(o.quoteType, o.months)] = String(o.tasa)
      setDrafts(next)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error cargando tasas')
    }
  }, [])

  useEffect(() => { load() }, [load])

  const overrideOf = (quoteType: string, months: number) =>
    data?.overrides.find(o => o.quoteType === quoteType && o.months === months)

  const save = async (quoteType: QuoteType, months: number, tasa: number | null) => {
    const key = keyOf(quoteType, months)
    setBusyKey(key)
    setError(null)
    try {
      const res  = await fetch('/api/cotizador/tasas', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ quoteType, months, tasa }),
      })
      const json = await res.json()
      if (!res.ok) {
        const zodMsg = json.errors ? Object.values(json.errors).flat()[0] : null
        throw new Error((zodMsg as string) ?? json.message ?? 'No se pudo guardar la tasa')
      }
      await load()
      setSavedKey(key)
      setTimeout(() => setSavedKey(k => (k === key ? null : k)), 2500)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar la tasa')
    } finally {
      setBusyKey(null)
    }
  }

  const onSave = (quoteType: QuoteType, months: number) => {
    const raw = drafts[keyOf(quoteType, months)]?.trim() ?? ''
    if (raw === '') {
      // Campo vacío = quitar la tasa personalizada
      save(quoteType, months, null)
      return
    }
    const value = Number(raw)
    if (!Number.isFinite(value) || value <= 0 || value >= 100) {
      setError('La tasa debe ser un número mayor a 0 y menor a 100')
      return
    }
    save(quoteType, months, value)
  }

  if (!data && !error) {
    return (
      <div className="flex items-center justify-center py-20 text-white/40">
        <Loader2 size={20} className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-xl font-semibold text-white">
          <Percent size={18} className="text-gold" />
          Tasas por cotizador
        </h1>
        <p className="mt-1 text-sm text-white/50">
          La tasa anual capturada aquí aplica a <span className="text-white/80">todos los usuarios</span> al
          cotizar. Deja el campo vacío (o usa restaurar) para volver a la tasa por defecto.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {data && !data.hasDatabase && (
        <div className="mb-4 rounded border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
          Sin base de datos configurada (DATABASE_URL): se muestran las tasas por defecto y no se pueden guardar cambios.
        </div>
      )}

      {data && (
        <div className="space-y-4">
          {ALL_SECTIONS.map(quoteType => (
            <section key={quoteType} className="rounded-lg border border-white/10 bg-[#111111]">
              <h2 className="border-b border-white/10 px-4 py-3 text-sm font-medium text-white">
                {SECTION_LABELS[quoteType]}
              </h2>
              <div className="divide-y divide-white/5">
                {data.plazos[quoteType].map(months => {
                  const key      = keyOf(quoteType, months)
                  const def      = data.defaults[quoteType][months]
                  const override = overrideOf(quoteType, months)
                  const busy     = busyKey === key
                  return (
                    <div key={months} className="flex flex-wrap items-center gap-3 px-4 py-3">
                      <span className="w-20 shrink-0 text-sm text-white/70">{months} meses</span>
                      <span className={clsx(
                        'w-32 shrink-0 text-xs',
                        override ? 'text-white/30 line-through' : 'text-white/60',
                      )}>
                        Defecto: {def}%
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <input
                            type="number"
                            inputMode="decimal"
                            step="0.01"
                            min="0.01"
                            max="99.99"
                            placeholder={String(def)}
                            value={drafts[key] ?? ''}
                            onChange={e => setDrafts(d => ({ ...d, [key]: e.target.value }))}
                            onKeyDown={e => { if (e.key === 'Enter') onSave(quoteType, months) }}
                            disabled={busy || !data.hasDatabase}
                            className="w-24 rounded border border-white/10 bg-white/5 px-3 py-2 pr-7 text-sm text-white placeholder-white/25 focus:border-gold/50 focus:outline-none transition-colors disabled:opacity-50"
                          />
                          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-white/40">%</span>
                        </div>
                        <button
                          onClick={() => onSave(quoteType, months)}
                          disabled={busy || !data.hasDatabase}
                          className="rounded border border-gold/40 bg-gold/10 px-3 py-2 text-xs font-medium text-gold hover:bg-gold/20 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {busy ? <Loader2 size={13} className="animate-spin" /> : 'Guardar'}
                        </button>
                        {override && (
                          <button
                            onClick={() => { setDrafts(d => ({ ...d, [key]: '' })); save(quoteType, months, null) }}
                            disabled={busy || !data.hasDatabase}
                            title="Restaurar tasa por defecto"
                            className="flex items-center gap-1 rounded border border-white/10 px-2.5 py-2 text-xs text-white/50 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <RotateCcw size={12} />
                            Restaurar
                          </button>
                        )}
                      </div>
                      <div className="ml-auto flex items-center gap-2 text-xs">
                        {savedKey === key && (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Check size={13} /> Guardado
                          </span>
                        )}
                        <span className={override ? 'font-medium text-gold' : 'text-white/40'}>
                          Vigente: {override ? override.tasa : def}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
