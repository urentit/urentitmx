import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function ComisionExtraPage() {
  await requireSection('comision-extra')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Cotizador especial</h2>
      <QuoteForm quoteType="comision-extra" />
    </div>
  )
}
