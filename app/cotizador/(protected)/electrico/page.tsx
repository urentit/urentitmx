import { QuoteForm } from '@/components/cotizador/QuoteForm'

export default function ElectricoPage() {
  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-white">Eléctrico</h2>
      <p className="mb-6 text-sm text-white/40">Seguro 4% fijo. Servicios preventivos especializados.</p>
      <QuoteForm quoteType="electrico" />
    </div>
  )
}
