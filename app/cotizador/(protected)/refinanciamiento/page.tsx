import { QuoteForm } from '@/components/cotizador/QuoteForm'

export default function RefinanciamientoPage() {
  return (
    <div>
      <h2 className="font-sans mb-1 text-lg font-semibold text-white">Refinanciamiento</h2>
      <p className="mb-6 text-sm text-white/40">Plazos cortos: 12 y 24 meses.</p>
      <QuoteForm quoteType="refinanciamiento" />
    </div>
  )
}
