'use client'

import { useState } from 'react'
import type { QuoteResponse, QuoteResult as QR, QuoteType } from '@/lib/cotizador/types'

function fmt(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 })
}

function ResultColumn({ label, result }: { label: string; result: QR }) {
  const { costs: c, eachMonth: e } = result

  return (
    <div className="flex-1 min-w-[260px]">
      <div className="mb-3 rounded-t border border-gold/30 bg-gold/10 px-4 py-2 text-center text-sm font-bold text-gold">
        {label}
      </div>
      <div className="rounded-b border border-white/10 bg-white/[0.03]">
        <table className="w-full text-sm">
          <tbody>
            {[
              ['Anticipo', fmt(c.anticipo)],
              ['Comisión apertura', fmt(c.comisionAp)],
              ['Anticipo total', fmt(c.anticipoTotal)],
              ['Renta mensual', fmt(c.mensualidad)],
              ['Valor residual / Compra final', fmt(c.finalCost)],
              ['Total rentas + IVA', fmt(c.totalRentasMasIva)],
              ['Valor comercial al vencimiento', fmt(c.valorVehiculo)],
              ['Importe a deducir (ISR+IVA+PTU)', fmt(c.importeDeducir)],
            ].map(([label, value]) => (
              <tr key={label} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-2 text-white/60">{label}</td>
                <td className="px-4 py-2 text-right font-medium text-white">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Desglose mensual */}
      <details className="mt-3 rounded border border-white/10">
        <summary className="cursor-pointer px-4 py-2 text-xs text-white/50 hover:text-white/80">
          Ver desglose de la renta mensual
        </summary>
        <table className="w-full text-xs">
          <tbody>
            {[
              ['Valor del vehículo', fmt(e.valorTotal)],
              ['Seguro', fmt(e.seguro)],
              ['Servicios preventivos', fmt(e.services)],
              ['GPS', fmt(e.gps)],
              ['Trámites iniciales', fmt(e.tramitesL)],
              ['Tenencias / Refrendos', fmt(e.tenencias)],
              ['Verificaciones', fmt(e.veri)],
              ...(e.accessoryValue > 0 ? [[`Accesorio: ${e.accessory}`, fmt(e.accessoryValue)]] : []),
            ].map(([label, value]) => (
              <tr key={label} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-1.5 text-white/50">{label}</td>
                <td className="px-4 py-1.5 text-right text-white/70">{value}</td>
              </tr>
            ))}
            <tr className="border-t border-white/10">
              <td className="px-4 py-1.5 text-white/50">Estado (placas)</td>
              <td className="px-4 py-1.5 text-right text-white/70">{e.placas}</td>
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result, quoteType, modelo, totalPrice }),
      })
      if (!res.ok) return
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `cotizacion-${modelo || quoteType}-urentit.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="mt-6">
      {/* Encabezado */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            {modelo || 'Cotización'}{' '}
            <span className="text-white/40 text-sm font-normal">— {fmt(totalPrice)}</span>
          </h3>
          <p className="text-xs text-white/40">Resultados comparativos por plazo</p>
        </div>
        <button
          onClick={downloadPDF}
          disabled={downloading}
          className="rounded border border-gold/30 px-4 py-2 text-xs text-gold transition-colors hover:bg-gold/10 disabled:opacity-50"
        >
          {downloading ? 'Generando…' : '↓ Descargar PDF'}
        </button>
      </div>

      {/* Columnas por plazo */}
      <div className="flex flex-wrap gap-4">
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
