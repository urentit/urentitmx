import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { AboutUs } from '@/components/sections/AboutUs'
import { ValueProposition } from '@/components/sections/ValueProposition'
import { CarsGallery } from '@/components/sections/CarsGallery'
import { Brands } from '@/components/sections/Brands'
import { Features } from '@/components/sections/Features'
import { CotizadorPublico } from '@/components/sections/CotizadorPublico'
import { ReferralTeaser } from '@/components/sections/ReferralTeaser'
import { ContactForm } from '@/components/sections/ContactForm'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQs } from '@/components/sections/FAQs'
import { CTAFinal } from '@/components/sections/CTAFinal'

export const metadata: Metadata = {
  title: 'Arrendamiento de Vehículos para Empresas en México',
  description:
    'U Rent It ofrece arrendamiento puro de vehículos premium, gama media, utilitarios, carga y blindados para empresas en México. Sin enganche, deducción fiscal 100% y más de 36 marcas. Cotiza ahora.',
  alternates: {
    canonical: 'https://urentit.mx',
  },
  openGraph: {
    title: 'U Rent It | Arrendamiento de Vehículos para Empresas en México',
    description:
      'Arrendamiento puro de vehículos para empresas. Sin enganche, deducción fiscal 100%, seguro incluido. Más de 36 marcas a 36 o 48 meses.',
    url: 'https://urentit.mx',
    images: [
      {
        url: 'https://urentit.mx/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'U Rent It — Arrendamiento de Vehículos para Empresas en México',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'U Rent It | Arrendamiento de Vehículos para Empresas',
    description:
      'Arrendamiento puro sin enganche. Deducción fiscal 100%, seguro incluido. Más de 36 marcas disponibles en México.',
    images: ['https://urentit.mx/img/og-image.jpg'],
  },
}

/* ─── JSON-LD Service ─── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://urentit.mx/#service',
  name: 'Arrendamiento Puro de Vehículos',
  serviceType: 'Arrendamiento Vehicular',
  provider: {
    '@type': 'Organization',
    '@id': 'https://urentit.mx/#organization',
    name: 'U Rent It',
    url: 'https://urentit.mx',
  },
  areaServed: {
    '@type': 'Country',
    name: 'México',
  },
  description:
    'Arrendamiento puro de vehículos para empresas y empresarios en México. Incluye seguro, trámites, mantenimiento y deducción fiscal del 100%.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'MXN',
    description: 'Planes de 36 y 48 meses adaptados a tu empresa.',
    url: 'https://urentit.mx/#cotizar',
  },
}

/* ─── JSON-LD SiteNavigationElement (árbol del sitio para Google) ─── */
const siteNavSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Navegación del sitio',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: '¿Quiénes somos?',
      description: 'Conoce la historia y valores de U Rent It',
      url: 'https://urentit.mx/#quienes-somos',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
      name: 'Vehículos',
      description: 'Catálogo de vehículos disponibles para arrendamiento',
      url: 'https://urentit.mx/#vehiculos-ejemplo',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 3,
      name: 'Marcas disponibles',
      description: 'Más de 36 marcas de vehículos en arrendamiento puro',
      url: 'https://urentit.mx/#marcas-disponibles',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 4,
      name: 'Beneficios del arrendamiento',
      description: 'Ventajas del arrendamiento puro frente al crédito vehicular',
      url: 'https://urentit.mx/#caracteristicas',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 5,
      name: 'Cotizador de arrendamiento',
      description: 'Calcula tu mensualidad de arrendamiento en segundos',
      url: 'https://urentit.mx/#cotizar',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 6,
      name: 'Programa de referidos',
      description: 'Refiere y obtén hasta una renta mensual sin costo',
      url: 'https://urentit.mx/#referidos',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 7,
      name: 'Testimonios',
      description: 'Opiniones de clientes de U Rent It',
      url: 'https://urentit.mx/#opiniones-clientes',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 8,
      name: 'Preguntas frecuentes',
      description: 'Resuelve tus dudas sobre arrendamiento puro',
      url: 'https://urentit.mx/#preguntas-frecuentes',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 9,
      name: 'Contacto',
      description: 'Solicita una cotización sin costo ni compromiso',
      url: 'https://urentit.mx/#contacto',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 10,
      name: 'Arrendamiento Puro',
      description: 'Cómo funciona el arrendamiento puro en México',
      url: 'https://urentit.mx/arrendamiento-puro',
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavSchema) }}
      />
      <Hero />
      <AboutUs />
      <ValueProposition />
      <CarsGallery />
      <Brands />
      <Features />
      <CotizadorPublico />
      <ReferralTeaser />
      <ContactForm />
      <Testimonials />
      <FAQs />
      <CTAFinal />
    </>
  )
}
