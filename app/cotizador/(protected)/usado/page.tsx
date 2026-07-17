import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function UsadoPage() {
  await requireSection('usado')

  return (
    <div>
      <h2 className="font-sans mb-1 text-lg font-semibold text-white">Vehículo Usado</h2>
      <p className="mb-6 text-sm text-white/40">Anticipo ajustado por delta Autométrica. Sin servicios preventivos.</p>
      <QuoteForm quoteType="usado" />
    </div>
  )
}
