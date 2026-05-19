import { QuoteForm } from '@/components/cotizador/QuoteForm'

export default function ForaneoPage() {
  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-white">Foráneo</h2>
      <p className="mb-6 text-sm text-white/40">Verificaciones con tarifa foránea ($3,200 c/u).</p>
      <QuoteForm quoteType="foraneo" />
    </div>
  )
}
