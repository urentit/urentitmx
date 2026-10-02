import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function AutoPage() {
  await requireSection('auto')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Autos</h2>
      <QuoteForm quoteType="auto" />
    </div>
  )
}
