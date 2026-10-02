import { QuoteForm } from '@/components/cotizador/QuoteForm'
import { requireSection } from '@/lib/cotizador/sectionGuard'

export default async function VipPage() {
  await requireSection('vip')

  return (
    <div>
      <h2 className="font-sans mb-6 text-lg font-semibold text-white">VIP / Lujo</h2>
      <QuoteForm quoteType="vip" />
    </div>
  )
}
