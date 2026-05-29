import { QuoteForm } from '@/components/cotizador/QuoteForm'

export default function ComisionExtraPage() {
  return (
    <div>
      <h2 className="font-sans mb-1 text-lg font-semibold text-white">Comisión Extra</h2>
      <p className="mb-6 text-sm text-white/40">24, 36 y 48 meses. Incluye comisión extra del 2% sobre valor a financiar.</p>
      <QuoteForm quoteType="comision-extra" />
    </div>
  )
}
