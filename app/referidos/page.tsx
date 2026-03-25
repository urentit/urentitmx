import type { Metadata } from 'next'
import { ReferralForm } from '@/components/sections/ReferralForm'

export const metadata: Metadata = {
  title: 'Referidos',
  description:
    'Comparte el programa de referidos de U Rent It y registra en un solo formulario tus datos y los de la persona recomendada.',
  alternates: {
    canonical: 'https://urentit.mx/referidos',
  },
  openGraph: {
    title: 'Referidos U Rent It',
    description:
      'Comparte el formulario de referidos de U Rent It y registra fácilmente a la persona que recomiendas.',
    url: 'https://urentit.mx/referidos',
    images: [
      {
        url: '/referidos/opengraph-image',
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
      'Página compartible para registrar referidos y compartir el programa de U Rent It.',
    images: ['/referidos/opengraph-image'],
  },
}

export default function ReferralPage() {
  return <ReferralForm />
}
