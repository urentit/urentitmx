import { VARS } from '../variables'
import { getPlacaPrice } from '../placas'
import { calcGps, calcTenencias, calcCore } from '../engine'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'

const RESIDUAL = { 36: 0.35, 48: 0.30 }
const TASA     = { 36: VARS.TASARENTING, 48: VARS.TASARENTING2 }

export function calculate(input: QuoteInput, user: QuoteUser, years: 36 | 48): QuoteResult {
  const { totalPrice, accessoryValue = 0, accessory = '', state,
          anticipo, servicios = 0, seguro: seguroManual } = input

  const total = totalPrice + accessoryValue
  const yrs   = years / 12

  // Seguro eléctrico: 4% fijo
  const seguro = seguroManual ?? Math.round(total * 0.04 * yrs * 100) / 100

  // Servicios eléctricos especiales
  const serviciosP = VARS.ELECTRIC_SERVICES * Math.max(0, yrs - servicios)

  const gps      = calcGps(yrs)
  const tramites = getPlacaPrice(total, 'section_three', state)
  // Eléctricos sí pagan tenencia fija; veri no incluida en legacy
  const tenencias = calcTenencias(total, yrs, state, 'section_three')
  const veri      = 0

  return calcCore(
    totalPrice, accessoryValue, anticipo, state, yrs,
    RESIDUAL[years], TASA[years], seguro, serviciosP, gps, tramites, tenencias, veri,
    user, accessory, 'section_three',
  )
}
