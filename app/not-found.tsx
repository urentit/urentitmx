import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        {/* Número decorativo */}
        <p className="font-display text-[8rem] sm:text-[12rem] font-bold leading-none text-white/5 select-none mb-0">
          404
        </p>

        <div className="-mt-8 relative z-10">
          <h1 className="font-display text-3xl sm:text-4xl text-white font-bold mb-4">
            Página no{' '}
            <span className="text-gold italic">encontrada</span>
          </h1>
          <p className="text-white/50 font-sans text-base max-w-sm mx-auto mb-8">
            La página que buscas no existe o fue movida. Regresa al inicio y encuentra lo que necesitas.
          </p>

          <ButtonLink href="/" variant="primary" size="lg" className="inline-flex group">
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
            Volver al inicio
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
