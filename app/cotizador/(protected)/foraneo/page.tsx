import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function ForaneoPage() {
  await requireSection('foraneo')

  return (
    <div>
      <h2 className="font-sans mb-1 text-lg font-semibold text-white">Foráneo</h2>
      <p className="mb-6 text-sm text-white/40">Verificaciones con tarifa foránea ($3,200 c/u).</p>
      <QuoteForm quoteType="foraneo" />
    </div>
  )
}
