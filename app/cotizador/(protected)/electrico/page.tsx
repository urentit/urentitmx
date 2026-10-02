import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function ElectricoPage() {
  await requireSection('electrico')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Eléctrico</h2>
      <QuoteForm quoteType="electrico" />
    </div>
  )
}
