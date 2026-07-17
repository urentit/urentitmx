import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function CargaPage() {
  await requireSection('carga')

  return (
    <div>
      <h2 className="font-sans mb-1 text-lg font-semibold text-white">Carga</h2>
      <p className="mb-6 text-sm text-white/40">Vehículos de carga ligera y media. Residual 15%/10%.</p>
      <QuoteForm quoteType="carga" />
    </div>
  )
}
