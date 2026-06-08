import { VARS } from '../variables'
import { getPlacaPrice } from '../placas'
import { calcGps, calcSeguroAuto, calcServiciosPreventivos, calcTenencias, calcCore } from '../engine'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'

const TASA = { 24: VARS.TASARENTING, 36: VARS.TASARENTING, 48: VARS.TASARENTING2 }

export function calculate(input: QuoteInput, user: QuoteUser, years: 24 | 36 | 48): QuoteResult {
  const {
    totalPrice, accessoryValue = 0, accessory = '', state,
    anticipo, servicios = 0, seguro: seguroManual, servicesValue,
    residualValue24, residualValue36, residualValue48,
    includeInsurance = true, includeGps = true,
    includeTenencias = true, includeVerificaciones = true,
  } = input

  const total = totalPrice + accessoryValue
  const yrs   = years / 12

  const residualMap: Record<number, number | undefined> = {
    24: residualValue24,
    36: residualValue36,
    48: residualValue48,
  }
  const varData1 = (residualMap[years] ?? 30) / 100

  const seguro     = includeInsurance ? (seguroManual != null ? seguroManual * yrs : calcSeguroAuto(total, yrs)) : 0
  const serviciosP = calcServiciosPreventivos(total, yrs, servicios, user.manualServices ? servicesValue : undefined)
  const gps        = includeGps ? calcGps(yrs) : 0
  const tramites   = getPlacaPrice(total, 'section_one', state)
  const tenencias  = includeTenencias ? calcTenencias(total, yrs, state, 'section_one') : 0
  const veriCount  = years === 24 ? 4 : years === 36 ? 6 : 8
  const veri       = includeVerificaciones ? veriCount * VARS.VERI : 0

  return calcCore(
    totalPrice, accessoryValue, anticipo, state, yrs,
    varData1, TASA[years], seguro, serviciosP, gps, tramites, tenencias, veri,
    user, accessory, 'section_one',
  )
}
