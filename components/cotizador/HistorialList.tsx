'use client'

import { useCallback, useEffect, useState } from 'react'
import { Loader2, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react'
import type { QuoteType, QuoteResponse } from '@/lib/cotizador/types'
import { SECTION_LABELS } from '@/lib/cotizador/sections'

interface QuoteRow {
  id:        number
  quoteType: QuoteType
  request:   Record<string, any>
  response:  QuoteResponse
  createdAt: string
  user:      { name: string; email: string }
}

interface Meta {
  total:    number
  page:     number
  pageSize: number
  isAdmin:  boolean
}

function fmt(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Extrae la renta mensual por plazo del response guardado
function mensualidades(response: QuoteResponse): string {
  return Object.keys(response)
    .sort()
    .map(plazo => {
      const r = response[plazo as keyof QuoteResponse]
      return r ? `${plazo}m ${fmt(r.costs.mensualidad)}` : null
    })
    .filter(Boolean)
    .join('  ·  ')
}

export function HistorialList() {
  const [rows, setRows]   = useState<QuoteRow[] | null>(null)
  const [meta, setMeta]   = useState<Meta | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage]   = useState(1)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async (p: number) => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch(`/api/cotizador/historial?page=${p}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.message ?? 'Error cargando el historial')
      setRows(json.data)
      setMeta(json.meta)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error cargando el historial')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(page) }, [load, page])

  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.pageSize)) : 1

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-sans text-lg font-semibold text-white">Historial</h2>
        <p className="text-sm text-white/40">
          {meta?.isAdmin
            ? 'Todas las cotizaciones generadas en el cotizador.'
            : 'Las cotizaciones que has generado.'}
          {meta && meta.total > 0 && (
            <span className="text-white/25"> — {meta.total} en total</span>
          )}
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">{error}</p>
      )}

      {rows === null ? (
        <div className="flex items-center justify-center py-16 text-white/30">
          <Loader2 size={22} className="animate-spin" />
        </div>
      ) : rows.length === 0 && !error ? (
        <div className="flex flex-col items-center justify-center rounded border border-dashed border-white/10 py-16 text-center">
          <ClipboardList className="mb-4 text-white/20" size={40} />
          <p className="text-sm font-medium text-white/40">Aún no hay cotizaciones registradas</p>
          <p className="mt-1.5 max-w-sm text-xs text-white/25">
            Cada cotización que generes se guardará aquí automáticamente.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded border border-white/10">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wide text-white/40">
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  {meta?.isAdmin && <th className="px-4 py-3 font-medium">Usuario</th>}
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Modelo</th>
                  <th className="px-4 py-3 font-medium text-right">Valor</th>
                  <th className="px-4 py-3 font-medium text-right">Anticipo</th>
                  <th className="px-4 py-3 font-medium">Renta mensual</th>
                </tr>
              </thead>
              <tbody className={loading ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
                {rows.map(r => (
                  <tr key={r.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap text-white/55">{fmtDate(r.createdAt)}</td>
                    {meta?.isAdmin && (
                      <td className="px-4 py-3">
                        <span className="text-white/70">{r.user?.name ?? '—'}</span>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <span className="inline-block rounded bg-white/5 px-2 py-1 text-xs text-white/60">
                        {SECTION_LABELS[r.quoteType] ?? r.quoteType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/70">{r.request?.modelo || '—'}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-white/70">
                      {typeof r.request?.totalPrice === 'number' ? fmt(r.request.totalPrice) : '—'}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-white/55">
                      {typeof r.request?.anticipo === 'number' ? `${Math.round(r.request.anticipo * 100)}%` : '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs tabular-nums text-gold/90">
                      {mensualidades(r.response)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between text-xs text-white/40">
              <span>Página {meta?.page ?? page} de {totalPages}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={loading || (meta?.page ?? page) <= 1}
                  className="flex items-center gap-1 rounded border border-white/10 px-3 py-1.5 text-white/60 transition-colors hover:border-gold/40 hover:text-gold disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white/60 cursor-pointer"
                >
                  <ChevronLeft size={14} /> Anterior
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={loading || (meta?.page ?? page) >= totalPages}
                  className="flex items-center gap-1 rounded border border-white/10 px-3 py-1.5 text-white/60 transition-colors hover:border-gold/40 hover:text-gold disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white/60 cursor-pointer"
                >
                  Siguiente <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
