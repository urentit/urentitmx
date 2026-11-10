import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function CuantitativoPage() {
  await requireSection('cuantitativo')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Cotizador cuantitativo</h2>
      <QuoteForm quoteType="cuantitativo" />
    </div>
  )
}
