import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function CargaPesadaPage() {
  await requireSection('carga-pesada')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Carga Pesada</h2>
      <QuoteForm quoteType="carga-pesada" />
    </div>
  )
}
