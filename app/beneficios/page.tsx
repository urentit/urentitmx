import type { Metadata } from 'next'
import { Features } from '@/components/sections/Features'
import { ButtonLink } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Beneficios del Arrendamiento Puro | U Rent It',
  description:
    'Descubre por qué el arrendamiento puro es la mejor opción para tu empresa: seguro incluido, mantenimiento preventivo, trámites gestionados y gestión de flotilla completa.',
  alternates: { canonical: 'https://urentit.mx/beneficios' },
  openGraph: {
    title: 'Beneficios del Arrendamiento Puro para Empresas | U Rent It',
    description:
      'Seguro incluido, mantenimiento preventivo, trámites gestionados. Conoce todas las ventajas del arrendamiento puro para empresas en México.',
    url: 'https://urentit.mx/beneficios',
    images: [{ url: 'https://urentit.mx/img/og-image.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://urentit.mx' },
    { '@type': 'ListItem', position: 2, name: 'Beneficios', item: 'https://urentit.mx/beneficios' },
  ],
}

export default function BeneficiosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-24">
        <Features />
        <div className="flex justify-center py-12 bg-black">
          <ButtonLink href="/arrendamiento-puro" variant="outline" size="lg">
            Ver cómo funciona el arrendamiento puro
          </ButtonLink>
        </div>
      </div>
    </>
  )
}
