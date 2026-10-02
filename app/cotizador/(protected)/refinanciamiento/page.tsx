import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function RefinanciamientoPage() {
  await requireSection('refinanciamiento')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Refinanciamiento</h2>
      <QuoteForm quoteType="refinanciamiento" />
    </div>
  )
}
