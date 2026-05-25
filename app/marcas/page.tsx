import type { Metadata } from 'next'
import { Brands } from '@/components/sections/Brands'

export const metadata: Metadata = {
  title: 'Marcas Disponibles en Arrendamiento | U Rent It',
  description:
    'Más de 36 marcas de vehículos disponibles en arrendamiento puro: Audi, BMW, Mercedes-Benz, Toyota, Ford, Chevrolet y muchas más para tu empresa en México.',
  alternates: { canonical: 'https://urentit.mx/marcas' },
  openGraph: {
    title: 'Más de 36 Marcas en Arrendamiento Puro | U Rent It',
    description:
      'Elige entre más de 36 marcas disponibles: premium, gama media, utilitarios y comerciales. Arrendamiento puro para empresas en México.',
    url: 'https://urentit.mx/marcas',
    images: [{ url: 'https://urentit.mx/img/og-image.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://urentit.mx' },
    { '@type': 'ListItem', position: 2, name: 'Marcas', item: 'https://urentit.mx/marcas' },
  ],
}

export default function MarcasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-20 [&>section:first-child]:pt-8 [&>section:first-child]:md:pt-12 [&>section:first-child]:lg:pt-16">
        <Brands />
      </div>
    </>
  )
}
