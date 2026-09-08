import { VARS } from '../variables'
import { getPlacaPrice } from '../placas'
import { calcGps, calcTenencias, calcCore } from '../engine'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'
import type { TasaMap } from '../rates'

const RESIDUAL = { 36: 0.20, 48: 0.15 }
const TASA     = { 36: VARS.TASARENTING, 48: VARS.TASARENTING2 }
const VERI_C   = { 36: 6, 48: 8 }

export function calculate(input: QuoteInput, user: QuoteUser, years: 36 | 48, tasas?: TasaMap): QuoteResult {
  const { totalPrice, accessoryValue = 0, accessory = '', state,
          anticipo, seguro: seguroManual, autometricaValue } = input

  const total = totalPrice + accessoryValue
  const yrs   = years / 12

  // Anticipo ajustado SOLO hacia arriba: si el precio excede el valor Autométrica,
  // el cliente cubre la brecha en el anticipo (la arrendadora financia hasta el
  // valor libro). Con Autométrica >= precio se respeta el porcentaje elegido —
  // el legacy PHP ajustaba también a la baja (podía dar 0% o negativo), pero
  // ventas espera el porcentaje que captura (validado 2026-09-08).
  let anticopoAjustado = anticipo
  if (autometricaValue && autometricaValue < total) {
    const diferencia = (total - autometricaValue) / total
    anticopoAjustado = Math.ceil((anticipo + diferencia) * 100) / 100
  }

  // Seguro sobre valor Autométrica al 4%
  const baseSeguro = autometricaValue ?? total
  const seguro     = seguroManual != null ? seguroManual * yrs : Math.round(baseSeguro * 0.04 * yrs * 100) / 100

  // Sin servicios preventivos
  const serviciosP = 0
  const gps        = calcGps(yrs)
  const tramites   = getPlacaPrice(total, 'section_one', state)
  const tenencias  = calcTenencias(total, yrs, state, 'section_one')
  const veri       = VERI_C[years] * VARS.VERI

  return calcCore(
    totalPrice, accessoryValue, anticopoAjustado, state, yrs,
    RESIDUAL[years], tasas?.[years] ?? TASA[years], seguro, serviciosP, gps, tramites, tenencias, veri,
    user, accessory, 'section_one',
  )
}
