import type { Metadata } from 'next'
import { FAQs } from '@/components/sections/FAQs'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes sobre Arrendamiento | U Rent It',
  description:
    'Resuelve tus dudas sobre el arrendamiento puro de vehículos: plazos, marcas disponibles, requisitos, trámites, seguros y más. Todo lo que necesitas saber sobre U Rent It.',
  alternates: { canonical: 'https://urentit.mx/preguntas-frecuentes' },
  openGraph: {
    title: 'Preguntas Frecuentes | U Rent It Arrendamiento Puro',
    description:
      '¿Cómo funciona el arrendamiento? ¿Qué marcas hay? ¿Cuáles son los plazos? Resolvemos todas tus dudas sobre arrendamiento puro de vehículos en México.',
    url: 'https://urentit.mx/preguntas-frecuentes',
    images: [{ url: 'https://urentit.mx/img/og-image.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://urentit.mx' },
    { '@type': 'ListItem', position: 2, name: 'Preguntas Frecuentes', item: 'https://urentit.mx/preguntas-frecuentes' },
  ],
}

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-24">
        <FAQs />
      </div>
    </>
  )
}
