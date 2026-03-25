import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Arrendamiento Puro de Vehículos',
  description:
    'Conoce cómo funciona el arrendamiento puro de U Rent It: sin enganche, con deducción fiscal del 100%, seguro incluido y planes a 36 o 48 meses para empresas en México.',
  alternates: {
    canonical: 'https://urentit.mx/arrendamiento-puro',
  },
  openGraph: {
    title: 'Arrendamiento Puro de Vehículos | U Rent It',
    description:
      'Sin enganche, deducción fiscal 100%, seguro incluido. Planes a 36 o 48 meses para personas físicas con actividad empresarial y personas morales.',
    url: 'https://urentit.mx/arrendamiento-puro',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://urentit.mx',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Arrendamiento Puro',
      item: 'https://urentit.mx/arrendamiento-puro',
    },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Arrendamiento Puro de Vehículos',
  serviceType: 'Arrendamiento Vehicular Puro',
  provider: {
    '@type': 'Organization',
    name: 'U Rent It',
    url: 'https://urentit.mx',
  },
  areaServed: { '@type': 'Country', name: 'México' },
  description:
    'Arrendamiento puro de vehículos para empresas: sin pago inicial, deducción fiscal del 100%, seguro amplio, gestión de trámites y mantenimiento. Plazos de 36 y 48 meses.',
}

const BENEFITS = [
  { title: 'Sin enganche ni pago inicial', desc: 'Conserva tu capital de trabajo y desvíalo a lo que realmente impulsa tu negocio.' },
  { title: 'Beneficios fiscales*', desc: 'Las rentas mensuales pueden ser deducibles de impuestos para personas morales y físicas con actividad empresarial. Consulta a tu contador.' },
  { title: 'Seguro Premium disponible', desc: 'Nuestros planes son flexibles y pueden incluir seguro, mantenimiento y trámites en tu renta mensual.' },
  { title: 'Gestión de trámites completa', desc: 'Tramitamos placas, refrendos, tenencias y verificaciones en CDMX, EDOMEX, Morelos, Puebla, Hidalgo, Aguascalientes y más.' },
  { title: 'Mantenimiento preventivo', desc: 'El programa de mantenimiento preventivo está incluido para mantener tu flota siempre operativa.' },
  { title: 'Vehículo sustituto', desc: 'En caso de siniestro o taller, cuentas con un vehículo sustituto para no parar operaciones.' },
  { title: 'Plazos flexibles', desc: 'Contratos a 36 o 48 meses con 3 opciones al vencimiento: compra, renovación o devolución.' },
  { title: '+36 marcas disponibles', desc: 'Desde utilitarios y gama media hasta lujo, carga, blindados y equipamiento especial.' },
]

const COTIZAR = '/#cotizar'
const WHATSAPP = 'https://wa.me/525518062633?text=' + encodeURIComponent('Hola, me gustaría información sobre arrendamiento puro de vehículos.')

export default function ArrendamientoPuroPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero de página */}
      <section className="relative pt-32 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="container-site relative z-10">
          <nav className="flex items-center gap-2 text-white/30 font-sans text-xs mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors duration-150">Inicio</Link>
            <span>/</span>
            <span className="text-white/60">Arrendamiento Puro</span>
          </nav>

          <Badge className="mb-5">Nuestro Servicio</Badge>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-6 max-w-3xl">
            Arrendamiento{' '}
            <span className="text-gold italic">Puro</span>{' '}
            de Vehículos
          </h1>

          <p className="text-white/55 font-sans text-lg md:text-xl max-w-2xl mb-10">
            La solución más eficiente para que tu empresa cuente con los vehículos que necesita,
            sin descapitalizarse y con beneficios fiscales inmediatos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonLink
              href={COTIZAR}
              variant="primary"
              size="lg"
              className="group"
            >
              Cotiza ahora — es gratis
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
            >
              <Phone size={16} />
              55 1806 2633
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ¿Qué es el arrendamiento puro? */}
      <section className="section-padding bg-black-secondary">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mb-4">
              ¿Qué es el{' '}
              <span className="text-gold italic">arrendamiento puro</span>?
            </h2>
            <p className="text-white/55 font-sans text-base md:text-lg leading-relaxed">
              Es un contrato mediante el cual U Rent It te cede el uso y goce de un vehículo por un plazo determinado
              a cambio de una renta mensual fija. A diferencia de un crédito, <strong className="text-white/80">no pagas
              tasas de interés</strong> y las rentas pueden generar beneficios fiscales.* Al término del contrato
              puedes comprar el vehículo, renovar o simplemente devolverlo.
            </p>
          </div>

          {/* Beneficios grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-black border border-white/5 hover:border-gold/20 rounded-sm p-5 transition-all duration-300"
              >
                <CheckCircle2 size={20} className="text-gold mb-3 flex-shrink-0" />
                <h3 className="font-sans font-semibold text-white text-sm mb-2">{b.title}</h3>
                <p className="font-sans text-white/45 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Cómo funciona? */}
      <section className="section-padding bg-black">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mb-4">
              ¿Cómo{' '}
              <span className="text-gold italic">funciona</span>?
            </h2>
          </div>

          <ol className="max-w-2xl mx-auto space-y-6">
            {[
              { step: '01', title: 'Cotiza en línea', desc: 'Llena nuestro formulario de contacto o escríbenos por WhatsApp.' },
              { step: '02', title: 'Elige tu vehículo', desc: 'Selecciona la marca, modelo y plazo que mejor se adapte a tu empresa.' },
              { step: '03', title: 'Firma el contrato', desc: 'Proceso 100% digital con revisión de documentos empresariales.' },
              { step: '04', title: 'Recibe tu vehículo', desc: 'Entrega a domicilio o en nuestras oficinas, con placas y seguro listos.' },
            ].map(({ step, title, desc }) => (
              <li key={step} className="flex gap-5 items-start">
                <span className="flex-shrink-0 w-10 h-10 bg-gold/10 border border-gold/20 rounded-sm flex items-center justify-center font-display text-gold font-bold text-sm">
                  {step}
                </span>
                <div>
                  <h3 className="font-sans font-semibold text-white mb-1">{title}</h3>
                  <p className="font-sans text-white/45 text-sm leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black-secondary border-t border-gold/10">
        <div className="container-site text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mb-4">
            ¿Listo para{' '}
            <span className="text-gold italic">comenzar</span>?
          </h2>
          <p className="text-white/50 font-sans text-base mb-8 max-w-xl mx-auto">
            Obtén una cotización personalizada en menos de 24 horas. Sin costo, sin compromiso.
          </p>
          <ButtonLink
            href={COTIZAR}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="group mx-auto"
          >
            Cotiza ahora — es gratis
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
