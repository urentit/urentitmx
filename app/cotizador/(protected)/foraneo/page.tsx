import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function ForaneoPage() {
  await requireSection('foraneo')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Foráneo</h2>
      <QuoteForm quoteType="foraneo" />
    </div>
  )
}
