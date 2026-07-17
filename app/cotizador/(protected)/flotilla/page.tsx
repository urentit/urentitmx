import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function FlotillaPage() {
  await requireSection('flotilla')

  return (
    <div>
      <h2 className="font-sans mb-1 text-lg font-semibold text-white">Flotilla</h2>
      <p className="mb-6 text-sm text-white/40">24, 36 y 48 meses. Residual y servicios configurables.</p>
      <QuoteForm quoteType="flotilla" />
    </div>
  )
}
