import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { z } from 'zod'
import { PDFTemplate } from '@/components/cotizador/PDFTemplate'
import { getSessionUser, unauthorized } from '@/lib/cotizador/apiHelper'
import { prisma, hasDatabase } from '@/lib/prisma'
import type { QuoteResponse, QuoteType, TipoMotor } from '@/lib/cotizador/types'
import { createElement } from 'react'
import path from 'path'

// Solo se recibe el folio: montos, plazos y asesor salen de la cotización
// guardada en BD, así el PDF no se puede alterar desde el navegador.
const schema = z.object({ folio: z.number().int().positive() })

export async function POST(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return unauthorized()
  if (!hasDatabase) {
    return NextResponse.json(
      { ok: false, message: 'Base de datos no configurada (DATABASE_URL)' },
      { status: 503 },
    )
  }

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'La cotización no tiene folio; vuelve a calcularla para descargar el PDF' },
      { status: 400 },
    )
  }
  const { folio } = parsed.data

  const quote = await prisma.quote.findUnique({
    where:   { id: folio },
    include: { user: { select: { name: true, email: true } } },
  })
  // Mismo criterio que el historial: cada quien sus cotizaciones, los admins todas.
  // 404 también cuando no es suya, para no revelar qué folios existen.
  if (!quote || (!user.admin && String(quote.userId) !== user.id)) {
    return NextResponse.json({ ok: false, message: 'Cotización no encontrada' }, { status: 404 })
  }

  const input = quote.request as Record<string, unknown>

  const logoPath = path.join(process.cwd(), 'public', 'img', 'logos', 'logo-urentit.png')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = createElement(PDFTemplate, {
    result:     quote.response as unknown as QuoteResponse,
    quoteType:  quote.quoteType as QuoteType,
    modelo:     String(input.modelo ?? ''),
    totalPrice: Number(input.totalPrice ?? 0),
    anticipo:   Number(input.anticipo ?? 0.25),
    tipoMotor:  input.tipoMotor as TipoMotor | undefined,
    folio:      quote.id,
    createdAt:  quote.createdAt,
    logoPath,
    // Asesor: quien hizo la cotización (aunque la descargue un admin)
    asesor: { name: quote.user.name, email: quote.user.email },
  }) as any

  const buffer = await renderToBuffer(element)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type':        'application/pdf',
      'Content-Disposition': `attachment; filename="cotizacion-${String(quote.id).padStart(5, '0')}.pdf"`,
    },
  })
}
