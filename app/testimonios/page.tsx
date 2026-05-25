import type { Metadata } from 'next'
import { Testimonials } from '@/components/sections/Testimonials'

export const metadata: Metadata = {
  title: 'Testimonios de Clientes | U Rent It',
  description:
    'Lee las opiniones y testimonios de empresas que ya confían en U Rent It para su arrendamiento vehicular. Casos reales de clientes satisfechos en México.',
  alternates: { canonical: 'https://urentit.mx/testimonios' },
  openGraph: {
    title: 'Testimonios — Clientes que Confían en U Rent It',
    description:
      'Conoce la experiencia de empresas y empresarios que eligieron el arrendamiento puro de U Rent It para su flotilla vehicular.',
    url: 'https://urentit.mx/testimonios',
    images: [{ url: 'https://urentit.mx/img/og-image.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://urentit.mx' },
    { '@type': 'ListItem', position: 2, name: 'Testimonios', item: 'https://urentit.mx/testimonios' },
  ],
}

export default function TestimoniosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-20 [&>section:first-child]:pt-8 [&>section:first-child]:md:pt-12 [&>section:first-child]:lg:pt-16">
        <Testimonials />
      </div>
    </>
  )
}
