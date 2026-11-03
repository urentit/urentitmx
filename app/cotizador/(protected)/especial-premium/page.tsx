import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function EspecialPremiumPage() {
  await requireSection('especial-premium')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Cotizador especial premium</h2>
      <QuoteForm quoteType="especial-premium" />
    </div>
  )
}
