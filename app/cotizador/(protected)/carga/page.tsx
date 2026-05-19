import { QuoteForm } from '@/components/cotizador/QuoteForm'

export default function CargaPage() {
  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-white">Carga</h2>
      <p className="mb-6 text-sm text-white/40">Vehículos de carga ligera y media. Residual 15%/10%.</p>
      <QuoteForm quoteType="carga" />
    </div>
  )
}
