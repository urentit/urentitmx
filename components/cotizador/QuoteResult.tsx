'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import type { QuoteResponse, QuoteResult as QR, QuoteType } from '@/lib/cotizador/types'
import { analytics } from '@/lib/analytics'

function fmt(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 })
}

function ResultColumn({ label, result }: { label: string; result: QR }) {
  const { costs: c, eachMonth: e } = result

  const rows: Array<{ label: string; value: string; highlight?: boolean }> = [
    { label: 'Anticipo',                        value: fmt(c.anticipo) },
    { label: 'Comisión apertura',               value: fmt(c.comisionAp) },
    { label: 'Anticipo total',                  value: fmt(c.anticipoTotal) },
    { label: 'Renta mensual',                   value: fmt(c.mensualidad), highlight: true },
    { label: 'Valor residual',                  value: fmt(c.finalCost) },
    { label: 'Total rentas + IVA',              value: fmt(c.totalRentasMasIva) },
    { label: 'Valor comercial al vencimiento',  value: fmt(c.valorVehiculo) },
    { label: 'Importe a deducir',               value: fmt(c.importeDeducir) },
  ]

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-0 rounded-t border border-gold/30 bg-gold/10 px-4 py-2.5 text-center text-sm font-bold text-gold">
        {label}
      </div>
      <div className="rounded-b border border-x border-b border-white/10 bg-white/[0.03]">
        <table className="w-full text-sm">
          <tbody>
            {rows.map(row => (
              <tr
                key={row.label}
                className={row.highlight
                  ? 'border-b border-y border-gold/20 bg-gold/[0.07]'
                  : 'border-b border-white/5 last:border-0'
                }
              >
                <td className={`px-4 py-2 ${row.highlight ? 'text-white/80 font-medium' : 'text-white/55'}`}>
                  {row.label}
                </td>
                <td className={`px-4 py-2 text-right font-semibold tabular-nums ${row.highlight ? 'text-gold text-base' : 'text-white'}`}>
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Desglose mensual */}
      <details className="mt-2 rounded border border-white/10 overflow-hidden">
        <summary className="cursor-pointer select-none px-4 py-2.5 text-xs text-white/45 hover:text-white/70 hover:bg-white/[0.02] transition-colors">
          Ver desglose mensual ▸
        </summary>
        <table className="w-full text-xs border-t border-white/10">
          <tbody>
            {[
              ['Valor del vehículo',       fmt(e.valorTotal)],
              ['Seguro',                   fmt(e.seguro)],
              ['Servicios preventivos',    fmt(e.services)],
              ['GPS',                      fmt(e.gps)],
              ['Trámites iniciales',       fmt(e.tramitesL)],
              ['Tenencias / Refrendos',    fmt(e.tenencias)],
              ['Verificaciones',           fmt(e.veri)],
              ...(e.accessoryValue > 0 ? [[`Accesorio: ${e.accessory}`, fmt(e.accessoryValue)]] : []),
            ].map(([l, v]) => (
              <tr key={l} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-1.5 text-white/45">{l}</td>
                <td className="px-4 py-1.5 text-right text-white/65 tabular-nums">{v}</td>
              </tr>
            ))}
            <tr className="border-t border-white/10">
              <td className="px-4 py-1.5 text-white/45">Estado (placas)</td>
              <td className="px-4 py-1.5 text-right text-white/65">{e.placas}</td>
            </tr>
          </tbody>
        </table>
      </details>
    </div>
  )
}

interface Props {
  result:     QuoteResponse
  quoteType:  QuoteType
  modelo:     string
  totalPrice: number
}

const PERIOD_LABELS: Record<string, string> = {
  '12': '12 meses',
  '24': '24 meses',
  '36': '36 meses',
  '48': '48 meses',
}

export function QuoteResult({ result, quoteType, modelo, totalPrice }: Props) {
  const [downloading, setDownloading] = useState(false)

  const periods = Object.keys(result).sort()

  async function downloadPDF() {
    setDownloading(true)
    try {
      const res = await fetch('/api/cotizador/pdf', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ result, quoteType, modelo, totalPrice }),
      })
      if (!res.ok) return
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `cotizacion-${modelo || quoteType}-urentit.pdf`
      a.click()
      URL.revokeObjectURL(url)
      analytics.cotizadorPDF(quoteType)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="mt-6">
      {/* Encabezado */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-sans text-base font-semibold text-white">
            {modelo || 'Cotización'}
            <span className="ml-2 text-white/40 text-sm font-normal">— {fmt(totalPrice)}</span>
          </h3>
          <p className="text-xs text-white/40 mt-0.5">Resultados comparativos por plazo</p>
        </div>
        <button
          onClick={downloadPDF}
          disabled={downloading}
          className="flex items-center gap-2 rounded border border-gold/30 px-4 py-2 text-xs text-gold transition-colors hover:bg-gold/10 disabled:opacity-50 cursor-pointer"
        >
          <Download size={13} />
          {downloading ? 'Generando…' : 'Descargar PDF'}
        </button>
      </div>

      {/* Columnas por plazo */}
      <div className={`grid grid-cols-1 gap-4 ${periods.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {periods.map(period => {
          const r = result[period as keyof QuoteResponse]
          if (!r) return null
          return (
            <ResultColumn
              key={period}
              label={PERIOD_LABELS[period] ?? `${period} meses`}
              result={r}
            />
          )
        })}
      </div>
    </div>
  )
}
