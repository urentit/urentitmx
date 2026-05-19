import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { PDFTemplate } from '@/components/cotizador/PDFTemplate'
import { getSessionUser, unauthorized } from '@/lib/cotizador/apiHelper'
import { createElement } from 'react'


export async function POST(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return unauthorized()

  const { result, quoteType, modelo, totalPrice } = await req.json()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = createElement(PDFTemplate, { result, quoteType, modelo, totalPrice }) as any

  const buffer = await renderToBuffer(element)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type':        'application/pdf',
      'Content-Disposition': `attachment; filename="cotizacion-${quoteType}.pdf"`,
    },
  })
}
