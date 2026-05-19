import { VARS } from '../variables'
import { getPlacaPrice } from '../placas'
import { calcGps, calcTenencias, calcCore } from '../engine'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'

const RESIDUAL = { 36: 0.20, 48: 0.15 }
const TASA     = { 36: VARS.TASARENTING, 48: VARS.TASARENTING2 }
const VERI_C   = { 36: 6, 48: 8 }

export function calculate(input: QuoteInput, user: QuoteUser, years: 36 | 48): QuoteResult {
  const { totalPrice, accessoryValue = 0, accessory = '', state,
          anticipo, seguro: seguroManual, autometricaValue } = input

  const total = totalPrice + accessoryValue
  const yrs   = years / 12

  // Anticipo ajustado: diferencia entre precio comercial y Autométrica
  let anticopoAjustado = anticipo
  if (autometricaValue && autometricaValue < total) {
    const diferencia = (total - autometricaValue) / total
    anticopoAjustado = Math.ceil((anticipo + diferencia) * 100) / 100
  }

  // Seguro sobre valor Autométrica al 4%
  const baseSeguro = autometricaValue ?? total
  const seguro     = seguroManual ?? Math.round(baseSeguro * 0.04 * yrs * 100) / 100

  // Sin servicios preventivos
  const serviciosP = 0
  const gps        = calcGps(yrs)
  const tramites   = getPlacaPrice(total, 'section_one', state)
  const tenencias  = calcTenencias(total, yrs, state, 'section_one')
  const veri       = VERI_C[years] * VARS.VERI

  return calcCore(
    totalPrice, accessoryValue, anticopoAjustado, state, yrs,
    RESIDUAL[years], TASA[years], seguro, serviciosP, gps, tramites, tenencias, veri,
    user, accessory, 'section_one',
  )
}
