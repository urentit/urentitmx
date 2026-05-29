import { VARS } from '../variables'
import { calcGps, calcCore } from '../engine'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'

const RESIDUAL = { 36: 0.15, 48: 0.10 }
const TASA     = { 36: VARS.TASARENTING, 48: VARS.TASARENTING2 }

export function calculate(input: QuoteInput, user: QuoteUser, years: 36 | 48): QuoteResult {
  const { totalPrice, accessoryValue = 0, accessory = '', state,
          anticipo, seguro: seguroManual } = input

  const total = totalPrice + accessoryValue
  const yrs   = years / 12

  // Carga pesada: seguro especial 4.5% < $2M, 6.5% >= $2M
  const seguroPct = total < 2000000 ? 0.045 : 0.065
  const seguro    = seguroManual ?? Math.round(total * seguroPct * yrs * 100) / 100

  // Sin servicios preventivos, sin tenencias, trámites fijos $4,000
  const serviciosP = 0
  const tenencias  = 0
  const tramites   = VARS.TRAMITES_LIBRES
  const gps        = calcGps(yrs)
  const veri       = 0  // legacy no incluye veri en carga pesada

  return calcCore(
    totalPrice, accessoryValue, anticipo, state, yrs,
    RESIDUAL[years], TASA[years], seguro, serviciosP, gps, tramites, tenencias, veri,
    user, accessory, 'section_two',
  )
}
