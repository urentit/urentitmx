import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: '¿Quiénes somos?', hash: 'quienes-somos' },
  { label: 'Vehículos', hash: 'vehiculos-ejemplo' },
  { label: 'Marcas', hash: 'marcas-disponibles' },
  { label: 'Reseñas', hash: 'opiniones-clientes' },
  { label: "FAQ'S", hash: 'preguntas-frecuentes' },
]

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/Urentit.mx/',
    icon: Facebook,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/urent.it/',
    icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/urentit',
    icon: Linkedin,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@urentit',
    /* Lucide no tiene TikTok; usamos SVG inline */
    icon: null,
  },
]

const COTIZAR = '/#cotizar'
const WHATSAPP = 'https://wa.me/525518062633'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black-secondary border-t border-gold/20" aria-label="Pie de página">

      {/* ─── Main grid ─── */}
      <div className="container-site py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Col 1 — Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="group inline-flex" aria-label="U Rent It - Inicio">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src="/img/logos/logo-urentit.svg"
                  alt="U Rent It"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-sans text-white text-xl font-light tracking-[0.12em] uppercase">
                U Rent It
              </span>
            </div>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Arrendamiento puro de vehículos para empresas y empresarios en México.
            Planes flexibles, deducción fiscal y más de 36 marcas disponibles.
          </p>
          <p className="mt-4 font-display text-gold italic text-sm">¡Aspira a más!</p>
        </div>

        {/* Col 2 — Navegación */}
        <div>
          <h3 className="text-white font-sans font-semibold text-sm tracking-widest uppercase mb-5">
            Navegación
          </h3>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.hash}>
                <a
                  href={`/#${link.hash}`}
                  className="text-white/50 hover:text-gold text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/arrendamiento-puro"
                className="text-white/50 hover:text-gold text-sm transition-colors duration-200"
              >
                Arrendamiento Puro
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 — Contacto */}
        <div>
          <h3 className="text-white font-sans font-semibold text-sm tracking-widest uppercase mb-5">
            Contacto
          </h3>
          <ul className="space-y-4">
            <li>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-gold text-sm transition-colors duration-200"
                aria-label="Contactar por WhatsApp"
              >
                {/* WhatsApp icon SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                55 1806 2633
              </a>
            </li>
            <li>
              <a
                href={COTIZAR}
                className="flex items-center gap-2 text-white/50 hover:text-gold text-sm transition-colors duration-200"
              >
                <ArrowRight size={16} aria-hidden="true" />
                Cotiza ahora
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4 — Redes sociales */}
        <div>
          <h3 className="text-white font-sans font-semibold text-sm tracking-widest uppercase mb-5">
            Síguenos
          </h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 flex items-center justify-center rounded-sm border border-white/10 text-white/50 hover:text-gold hover:border-gold/40 transition-all duration-200"
              >
                {s.icon ? (
                  <s.icon size={18} />
                ) : (
                  /* TikTok SVG */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
          <Link
            href="/aviso-de-privacidad"
            className="text-white/40 hover:text-gold text-xs transition-colors duration-200"
          >
            Aviso de Privacidad
          </Link>
        </div>
      </div>

      {/* ─── Bottom bar ─── */}
      <div className="border-t border-white/5">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {year} U Rent It. Todos los derechos reservados.
          </p>
          <p className="text-white/20 text-xs">
            Arrendamiento puro de vehículos · México
          </p>
        </div>
      </div>
    </footer>
  )
}
