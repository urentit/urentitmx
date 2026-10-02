import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function CargaPage() {
  await requireSection('carga')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Carga</h2>
      <QuoteForm quoteType="carga" />
    </div>
  )
}
