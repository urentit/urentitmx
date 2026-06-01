import { QuoteForm } from '@/components/cotizador/QuoteForm'

export default function ComisionExtraPage() {
  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Cotizador especial</h2>
      <QuoteForm quoteType="comision-extra" />
    </div>
  )
}
