import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function CargaPesadaEspecialPage() {
  await requireSection('carga-pesada-especial')

  return (
    <div>
      <h2 className="font-sans mb-1 text-lg font-semibold text-white">Carga pesada especial</h2>
      <p className="mb-6 text-sm text-white/40">Carga pesada con comisión adicional distribuida en las rentas. Sin servicios preventivos ni tenencias.</p>
      <QuoteForm quoteType="carga-pesada-especial" />
    </div>
  )
}
