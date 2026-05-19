import { VARS } from '../variables'
import { getPlacaPrice } from '../placas'
import { calcGps, calcSeguroAuto, calcServiciosPreventivos, calcTenencias, calcCore } from '../engine'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'

const RESIDUAL = { 12: 0.20, 24: 0.25 }
const TASA     = { 12: VARS.TASARENTING, 24: VARS.TASARENTING }
const VERI_C   = { 12: 2, 24: 4 }

export function calculate(input: QuoteInput, user: QuoteUser, years: 12 | 24): QuoteResult {
  const { totalPrice, accessoryValue = 0, accessory = '', state,
          anticipo, servicios = 0, seguro: seguroManual, servicesValue } = input

  const total = totalPrice + accessoryValue
  const yrs   = years / 12

  const seguro     = seguroManual ?? calcSeguroAuto(total, yrs)
  const serviciosP = calcServiciosPreventivos(total, yrs, servicios, user.manualServices ? servicesValue : undefined)
  const gps        = calcGps(yrs)
  const tramites   = getPlacaPrice(total, 'section_one', state)
  const tenencias  = calcTenencias(total, yrs, state, 'section_one')
  const veri       = VERI_C[years] * VARS.VERI

  return calcCore(
    totalPrice, accessoryValue, anticipo, state, yrs,
    RESIDUAL[years], TASA[years], seguro, serviciosP, gps, tramites, tenencias, veri,
    user, accessory, 'section_one',
  )
}
