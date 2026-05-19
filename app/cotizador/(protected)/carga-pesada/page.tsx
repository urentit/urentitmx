import { QuoteForm } from '@/components/cotizador/QuoteForm'

export default function CargaPesadaPage() {
  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-white">Carga Pesada</h2>
      <p className="mb-6 text-sm text-white/40">Sin servicios preventivos ni tenencias. Seguro especial.</p>
      <QuoteForm quoteType="carga-pesada" />
    </div>
  )
}
