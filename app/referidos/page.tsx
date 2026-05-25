import type { Metadata } from 'next'
import { ReferralForm } from '@/components/sections/ReferralForm'

const faqReferidosSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿En qué consiste el programa de referidos de U Rent It?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El programa de referidos de U Rent It te permite recibir un beneficio si presentas a una persona o empresa que firme un contrato de arrendamiento con nosotros. Puedes recibir hasta una renta mensual sin costo en tu contrato vigente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Quién puede participar en el programa de referidos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puede participar cualquier cliente activo de U Rent It con un contrato de arrendamiento vigente. Solo necesitas referir a una persona o empresa que cumpla con los requisitos para arrendar.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto gano por referir a alguien?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si la persona o empresa que refieres firma un contrato de arrendamiento con U Rent It, puedes recibir hasta una renta mensual sin costo en tu contrato vigente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo registro a mi referido?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Llena el formulario de referidos en esta página con tus datos y los de la persona o empresa que deseas referir. Un ejecutivo de U Rent It se pondrá en contacto para dar seguimiento.',
      },
    },
  ],
}

export const metadata: Metadata = {
  title: 'Referidos',
  description:
    'Refiere a una persona o empresa a U Rent It. Si firma contrato, podrás recibir hasta una renta mensual sin costo en tu contrato vigente.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://urentit.mx/referidos',
  },
  openGraph: {
    title: 'Referidos U Rent It',
    description:
      'Refiere a una persona o empresa. Si firma contrato con U Rent It, podrás recibir hasta una renta mensual sin costo.',
    url: 'https://referidos.urentit.mx/referidos',
    images: [
      {
        url: 'https://referidos.urentit.mx/img/v1.jpg',
        width: 1200,
        height: 630,
        alt: 'Programa de referidos U Rent It',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Referidos U Rent It',
    description:
      'Refiere a una persona o empresa y obtén hasta una renta mensual sin costo si la operación se formaliza.',
    images: ['https://referidos.urentit.mx/img/v1.jpg'],
  },
}

export default function ReferralPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqReferidosSchema) }}
      />
      <ReferralForm />
    </>
  )
}
