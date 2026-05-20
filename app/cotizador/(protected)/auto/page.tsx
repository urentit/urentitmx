import { QuoteForm } from '@/components/cotizador/QuoteForm'

export default function AutoPage() {
  return (
    <div>
      <h2 className="font-sans mb-1 text-lg font-semibold text-white">Autos</h2>
      <p className="mb-6 text-sm text-white/40">Arrendamiento estándar 36 y 48 meses.</p>
      <QuoteForm quoteType="auto" />
    </div>
  )
}
