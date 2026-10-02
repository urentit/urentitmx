import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function UsadoPage() {
  await requireSection('usado')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Vehículo Usado</h2>
      <QuoteForm quoteType="usado" />
    </div>
  )
}
