import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { AboutUs } from '@/components/sections/AboutUs'
import { ValueProposition } from '@/components/sections/ValueProposition'
import { CarsGallery } from '@/components/sections/CarsGallery'
import { Brands } from '@/components/sections/Brands'
import { Features } from '@/components/sections/Features'
import { ReferralTeaser } from '@/components/sections/ReferralTeaser'
import { ContactForm } from '@/components/sections/ContactForm'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQs } from '@/components/sections/FAQs'
import { CTAFinal } from '@/components/sections/CTAFinal'

export const metadata: Metadata = {
  title: 'Arrendamiento de Vehículos para Empresas en México',
  description:
    'U Rent It ofrece arrendamiento puro de vehículos premium, gama media, utilitarios, carga y blindados para empresas en México. Cotiza ahora — sin costo ni compromiso.',
  alternates: {
    canonical: 'https://urentit.mx',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Arrendamiento Puro de Vehículos',
  serviceType: 'Arrendamiento Vehicular',
  provider: {
    '@type': 'Organization',
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Hero />
      <AboutUs />
      <ValueProposition />
      <CarsGallery />
      <Brands />
      <Features />
      <ReferralTeaser />
      <ContactForm />
      <Testimonials />
      <FAQs />
      <CTAFinal />
    </>
  )
}
