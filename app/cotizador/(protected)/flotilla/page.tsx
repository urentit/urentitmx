import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function FlotillaPage() {
  await requireSection('flotilla')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Flotilla</h2>
      <QuoteForm quoteType="flotilla" />
    </div>
  )
}
