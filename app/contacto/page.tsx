import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Cotiza tu Arrendamiento | U Rent It',
  description:
    'Solicita tu cotización de arrendamiento puro sin costo ni compromiso. Un ejecutivo de U Rent It se pondrá en contacto contigo en menos de 24 horas.',
  alternates: { canonical: 'https://urentit.mx/contacto' },
  openGraph: {
    title: 'Solicita tu Cotización de Arrendamiento | U Rent It',
    description:
      'Completa el formulario y recibe tu cotización personalizada sin compromiso. Arrendamiento puro de vehículos para empresas en México.',
    url: 'https://urentit.mx/contacto',
    images: [{ url: 'https://urentit.mx/img/og-image.jpg', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://urentit.mx' },
    { '@type': 'ListItem', position: 2, name: 'Contacto', item: 'https://urentit.mx/contacto' },
  ],
}

export default function ContactoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-24">
        <ContactForm />
      </div>
    </>
  )
}
