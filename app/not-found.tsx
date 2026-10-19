import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="text-center">
        <p className="font-display text-[8rem] font-bold leading-none text-white/5 select-none sm:text-[12rem]">
          404
        </p>
        <div className="relative z-10 -mt-8">
          <h1 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Página no <span className="italic text-gold">encontrada</span>
          </h1>
          <p className="mx-auto mb-8 max-w-sm font-sans text-base text-white/50">
            La página que buscas no existe o fue movida.
          </p>
          <Link
            href="/cotizador"
            className="inline-flex items-center rounded bg-gold px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
          >
            Ir al cotizador
          </Link>
        </div>
      </div>
    </div>
  )
}
