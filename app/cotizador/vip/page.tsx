import { QuoteForm } from '@/components/cotizador/QuoteForm'

export default function VipPage() {
  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-white">VIP / Lujo</h2>
      <p className="mb-6 text-sm text-white/40">Tasas preferenciales para vehículos premium.</p>
      <QuoteForm quoteType="vip" />
    </div>
  )
}
