import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { calculate } from '@/lib/cotizador/calculators/auto'
import { calcCore, calcSeguroAuto, calcTenencias } from '@/lib/cotizador/engine'
import { getPlacaPrice } from '@/lib/cotizador/placas'
import { VARS } from '@/lib/cotizador/variables'
import { getResendClient, getResendConfig } from '@/lib/resend'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function fmt(n: number) {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

// Endpoint público (sin auth) — solo autos estándar, parámetros simplificados
const schema = z.object({
  totalPrice: z.number().positive(),
  state:      z.string().min(2),
  anticipo:   z.number().min(0.2).max(0.45),
  email:      z.string().email(),
})

const PUBLIC_USER = { comision: 0.03, manualServices: false }
const RESIDUAL    = { 36: 0.35, 48: 0.30 }
const TASA        = { 36: VARS.TASARENTING, 48: VARS.TASARENTING2 }
const VERI_C      = { 36: 6, 48: 8 }

// Escenario mínimo: seguro + trámites + tenencias + verificaciones (sin GPS ni mantenimiento preventivo)
function calcMin(totalPrice: number, state: string, anticipo: number, years: 36 | 48) {
  const yrs = years / 12
  return calcCore(
    totalPrice, 0, anticipo, state, yrs,
    RESIDUAL[years], TASA[years],
    calcSeguroAuto(totalPrice, yrs),
    0,  // sin mantenimiento preventivo
    0,  // sin GPS
    getPlacaPrice(totalPrice, 'section_one', state),
    calcTenencias(totalPrice, yrs, state, 'section_one'),
    VERI_C[years] * VARS.VERI,
    PUBLIC_USER, '', 'section_one',
  )
}

async function notifyLead(
  email: string,
  totalPrice: number,
  state: string,
  anticipo: number,
  min36: number, max36: number,
  min48: number, max48: number,
) {
  try {
    const resend = getResendClient()
    const config = getResendConfig()

    // Notificación interna
    await resend.emails.send({
      from:    config.from,
      to:      ['contacto@urentit.mx'],
      subject: `Nuevo lead cotizador público — ${esc(email)}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.6;">
          <h1 style="margin-bottom: 16px;">Nuevo lead — Cotizador Público</h1>
          <p>Una persona calculó su estimación de arrendamiento.</p>
          <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; margin-top: 16px;">
            <tr><td><strong>Correo</strong></td><td>${esc(email)}</td></tr>
            <tr><td><strong>Valor del vehículo</strong></td><td>${fmt(totalPrice)}</td></tr>
            <tr><td><strong>Estado para placas</strong></td><td>${esc(state)}</td></tr>
            <tr><td><strong>Anticipo</strong></td><td>${Math.round(anticipo * 100)}%</td></tr>
          </table>
          <h2 style="margin-top: 24px;">Estimación calculada</h2>
          <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; margin-top: 12px;">
            <tr>
              <th style="text-align:left">Plazo</th>
              <th style="text-align:left">Plan básico</th>
              <th style="text-align:left">Plan completo</th>
            </tr>
            <tr><td>36 meses</td><td>${fmt(min36)}/mes</td><td>${fmt(max36)}/mes</td></tr>
            <tr><td>48 meses</td><td>${fmt(min48)}/mes</td><td>${fmt(max48)}/mes</td></tr>
          </table>
        </div>
      `,
    })

    // Alta en lista de distribución (solo si está configurada la audiencia)
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      await resend.contacts.create({ email, audienceId, unsubscribed: false })
    }
  } catch (err) {
    // No bloquear la respuesta si falla el email
    console.error('Lead notification error:', err)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body  = schema.parse(await req.json())
    const input = { ...body, quoteType: 'auto' as const }

    // Escenario máximo: todos los servicios incluidos
    const max36 = calculate(input, PUBLIC_USER, 36)
    const max48 = calculate(input, PUBLIC_USER, 48)

    // Escenario mínimo: solo seguro, trámites, tenencias y verificaciones
    const min36 = calcMin(body.totalPrice, body.state, body.anticipo, 36)
    const min48 = calcMin(body.totalPrice, body.state, body.anticipo, 48)

    // Notificar lead en background (no bloqueante)
    void notifyLead(
      body.email,
      body.totalPrice, body.state, body.anticipo,
      min36.costs.mensualidad, max36.costs.mensualidad,
      min48.costs.mensualidad, max48.costs.mensualidad,
    )

    return NextResponse.json({
      ok: true,
      // Rango 36 meses
      mensualidadMin36: min36.costs.mensualidad,
      mensualidadMax36: max36.costs.mensualidad,
      anticipo36:       max36.costs.anticipoTotal,
      finalCost36:      max36.costs.finalCost,
      // Rango 48 meses
      mensualidadMin48: min48.costs.mensualidad,
      mensualidadMax48: max48.costs.mensualidad,
      anticipo48:       max48.costs.anticipoTotal,
      finalCost48:      max48.costs.finalCost,
    })
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 422 })
    return NextResponse.json({ ok: false, message: 'Error interno' }, { status: 500 })
  }
}
