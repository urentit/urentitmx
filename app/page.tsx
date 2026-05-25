import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ProblemStatement } from '@/components/sections/ProblemStatement'
import { AboutUs } from '@/components/sections/AboutUs'
import { CarsGallery } from '@/components/sections/CarsGallery'
import { Brands } from '@/components/sections/Brands'
import { ValueProposition } from '@/components/sections/ValueProposition'
import { Features } from '@/components/sections/Features'
import { CotizadorPublico } from '@/components/sections/CotizadorPublico'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQs } from '@/components/sections/FAQs'
import { ContactForm } from '@/components/sections/ContactForm'
import { CTAFinal } from '@/components/sections/CTAFinal'

export const metadata: Metadata = {
  title: 'Arrendamiento de Vehículos para Empresas en México',
  description:
    'U Rent It ofrece arrendamiento puro de vehículos premium, gama media, utilitarios, carga y blindados para empresas en México. Seguro incluido, mantenimiento preventivo y más de 36 marcas. Cotiza ahora.',
  alternates: {
    canonical: 'https://urentit.mx',
  },
  openGraph: {
    title: 'U Rent It | Arrendamiento de Vehículos para Empresas en México',
    description:
      'Arrendamiento puro de vehículos para empresas. Seguro incluido, mantenimiento preventivo y trámites gestionados. Más de 36 marcas a 36 o 48 meses.',
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
      'Arrendamiento puro con seguro incluido, mantenimiento preventivo y trámites gestionados. Más de 36 marcas disponibles en México.',
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
    'Arrendamiento puro de vehículos para empresas y empresarios en México. Incluye seguro, trámites, mantenimiento y gestión operativa completa.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'MXN',
    description: 'Planes de 36 y 48 meses adaptados a tu empresa.',
    url: 'https://urentit.mx/#cotizar',
  },
}

/* ─── JSON-LD VideoObject ─── */
const videoObjectSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'U Rent It — Video Corporativo',
  description:
    'Conoce a U Rent It, empresa mexicana especializada en arrendamiento puro de vehículos para empresas, ejecutivos y emprendedores en México.',
  thumbnailUrl: 'https://img.youtube.com/vi/Ff7xsHFkxhQ/maxresdefault.jpg',
  uploadDate: '2025-01-01',
  embedUrl: 'https://www.youtube-nocookie.com/embed/Ff7xsHFkxhQ',
  url: 'https://youtu.be/Ff7xsHFkxhQ',
  publisher: {
    '@type': 'Organization',
    name: 'U Rent It',
    url: 'https://urentit.mx',
    logo: {
      '@type': 'ImageObject',
      url: 'https://urentit.mx/img/logo/logo-white.png',
    },
  },
}

/* ─── JSON-LD Speakable (marca texto clave para motores AI/voice) ─── */
const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://urentit.mx/#webpage',
  url: 'https://urentit.mx',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '[data-speakable]'],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <Hero />
      <ProblemStatement />
      <AboutUs />
      <CarsGallery />
      <Brands />
      <ValueProposition />
      <Features />
      <CotizadorPublico />
      <Testimonials />
      <FAQs />
      <ContactForm />
      <CTAFinal />
    </>
  )
}
