import type { Metadata } from 'next'
import { ReferralForm } from '@/components/sections/ReferralForm'

export const metadata: Metadata = {
  title: 'Referidos',
  description:
    'Refiere a una persona o empresa a U Rent It. Si firma contrato, podrás recibir hasta una renta mensual sin costo en tu contrato vigente.',
  alternates: {
    canonical: 'https://referidos.urentit.mx/referidos',
  },
  openGraph: {
    title: 'Referidos U Rent It',
    description:
      'Refiere a una persona o empresa. Si firma contrato con U Rent It, podrás recibir hasta una renta mensual sin costo.',
    url: 'https://referidos.urentit.mx/referidos',
    images: [
      {
        url: 'https://referidos.urentit.mx/img/v1.png',
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
    images: ['https://referidos.urentit.mx/img/v1.png'],
  },
}

export default function ReferralPage() {
  return <ReferralForm />
}
