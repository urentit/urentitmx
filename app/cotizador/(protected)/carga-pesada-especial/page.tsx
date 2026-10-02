import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function CargaPesadaEspecialPage() {
  await requireSection('carga-pesada-especial')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">Carga pesada especial</h2>
      <QuoteForm quoteType="carga-pesada-especial" />
    </div>
  )
}
