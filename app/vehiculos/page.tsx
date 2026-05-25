import type { Metadata } from 'next'
import { CarsGallery } from '@/components/sections/CarsGallery'

export const metadata: Metadata = {
  title: 'Vehículos en Arrendamiento | U Rent It',
  description:
    'Explora nuestro catálogo de vehículos en arrendamiento puro: autos premium, utilitarios, carga ligera, carga pesada, eléctricos y blindados para tu empresa en México.',
  alternates: { canonical: 'https://urentit.mx/vehiculos' },
  openGraph: {
    title: 'Catálogo de Vehículos en Arrendamiento | U Rent It',
    description:
      'Autos premium, utilitarios, carga, eléctricos y blindados disponibles en arrendamiento puro. Planes a 36 o 48 meses para empresas en México.',
    url: 'https://urentit.mx/vehiculos',
    images: [{ url: 'https://urentit.mx/img/og-image.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://urentit.mx' },
    { '@type': 'ListItem', position: 2, name: 'Vehículos', item: 'https://urentit.mx/vehiculos' },
  ],
}

export default function VehiculosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-20 [&>section:first-child]:pt-8 [&>section:first-child]:md:pt-12 [&>section:first-child]:lg:pt-16">
        <CarsGallery />
      </div>
    </>
  )
}
