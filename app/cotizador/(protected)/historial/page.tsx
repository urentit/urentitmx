import { ClipboardList } from 'lucide-react'

export default function HistorialPage() {
  return (
    <div>
      <h2 className="font-sans mb-1 text-lg font-semibold text-white">Historial</h2>
      <p className="mb-6 text-sm text-white/40">Registro de cotizaciones generadas.</p>

      <div className="flex flex-col items-center justify-center rounded border border-dashed border-white/10 py-16 text-center">
        <ClipboardList className="mb-4 text-white/20" size={40} />
        <p className="text-sm font-medium text-white/40">Historial pendiente de configurar</p>
        <p className="mt-1.5 max-w-sm text-xs text-white/25">
          El guardado automático de cotizaciones estará disponible cuando se conecte la base de datos.
          Por ahora las cotizaciones se generan correctamente pero no se almacenan.
        </p>
      </div>
    </div>
  )
}
