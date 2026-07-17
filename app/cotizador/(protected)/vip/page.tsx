import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function VipPage() {
  await requireSection('vip')

  return (
    <div>
      <h2 className="font-sans mb-1 text-lg font-semibold text-white">VIP / Lujo</h2>
      <p className="mb-6 text-sm text-white/40">Tasas preferenciales para vehículos premium.</p>
      <QuoteForm quoteType="vip" />
    </div>
  )
}
