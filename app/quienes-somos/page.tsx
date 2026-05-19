import type { Metadata } from 'next'
import { AboutUs } from '@/components/sections/AboutUs'
import { ValueProposition } from '@/components/sections/ValueProposition'

export const metadata: Metadata = {
  title: '¿Quiénes somos? | U Rent It',
  description:
    'Conoce a U Rent It: empresa mexicana especializada en arrendamiento puro de vehículos para empresas y empresarios. Nuestra misión, valores y propuesta de valor.',
  alternates: { canonical: 'https://urentit.mx/quienes-somos' },
  openGraph: {
    title: '¿Quiénes somos? | U Rent It — Arrendamiento Puro de Vehículos',
    description:
      'Empresa mexicana de arrendamiento puro. Conoce cómo ayudamos a empresas a crecer con flotillas vehiculares con seguro, mantenimiento y gestión operativa incluida.',
    url: 'https://urentit.mx/quienes-somos',
    images: [{ url: 'https://urentit.mx/img/og-image.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://urentit.mx' },
    { '@type': 'ListItem', position: 2, name: '¿Quiénes somos?', item: 'https://urentit.mx/quienes-somos' },
  ],
}

export default function QuienesSomosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-24">
        <AboutUs />
        <ValueProposition />
      </div>
    </>
  )
}
