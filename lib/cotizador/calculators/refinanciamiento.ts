import { VARS } from '../variables'
import { getPlacaName } from '../placas'
import { pmt } from '../engine'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'

const RESIDUAL = { 12: 0.09,             24: 0.03 }
const TASA     = { 12: VARS.TASARENTING, 24: VARS.TASARENTING2 }
const VERI_C   = { 12: 2,               24: 4 }

// En el legacy PHP el estado es numérico (1,2,3); estado 1 = tenencia fija.
// Mapeamos: estos estados string usan tenencia fija, el resto usa 3.5% del precio.
const FIXED_STATES = ['no', 'morelos', 'hidalgo', 'puebla', 'jalisco']

export function calculate(input: QuoteInput, user: QuoteUser, years: 12 | 24): QuoteResult {
  const {
    totalPrice, accessoryValue = 0, accessory = '', state,
    anticipo, servicios = 0, seguro: seguroManual, servicesValue,
  } = input

  const total = totalPrice + accessoryValue
  const yrs   = years / 12   // 1 o 2

  // Seguro: mismos rangos que autos (380k/500k)
  const seguroPct = total <= VARS.RANGO1 ? VARS.PS1
                  : total <= VARS.RANGO2 ? VARS.PS2
                  : VARS.PS3
  const seguro = seguroManual != null ? seguroManual * yrs : Math.round(total * seguroPct * yrs * 100) / 100

  // Servicios: services_value × years (factor 1, no 2); cero si servicios == 0
  const serviciosP = (servicios > 0 && servicesValue) ? servicesValue * yrs : 0

  // GPS refinanciamiento: tarifa mensual especial sin fee base
  const gps = ((VARS.GPS_MONTHLY_REFIN * years) * VARS.IVA) * VARS.GPS_FACTOR

  // Trámites siempre 0 en refinanciamiento
  const tramites = 0

  // Tenencias: fijas para estados equivalentes a state==1 del legacy; 3.5% para el resto
  const tenencias = FIXED_STATES.includes(state)
    ? VARS.TENENCIAS_FIXED * yrs
    : 0.035 * total * yrs

  const veri = VERI_C[years] * VARS.VERI

  const suma = seguro + serviciosP + gps + tramites + tenencias + veri

  const residual    = RESIDUAL[years]
  const tasaMensual = (TASA[years] / 100) / 12

  const anticipoCalc  = Math.round((total * anticipo) / VARS.IVA * 100) / 100
  const comisionAp    = Math.round(((total / VARS.IVA) - anticipoCalc) * user.comision * 100) / 100
  const anticipoTotal = anticipoCalc + comisionAp

  const pago = (pmt(tasaMensual, yrs * 12, total * (1 - anticipo) + suma, total * -1 * residual) * -1) / VARS.IVA

  const mensualidad       = Math.round(pago * 100) / 100
  const finalCost         = Math.round((total * residual) / VARS.IVA * 100) / 100
  const totalRentasMasIva = Math.round(mensualidad * (yrs * 12) * 100) / 100

  // Refinanciamiento usa anticipo_total (no anticipo) y divide por IVA antes de aplicar %
  const valorVehiculo  = anticipoTotal + finalCost + totalRentasMasIva
  const importeDeducir = Math.round(
    ((valorVehiculo / VARS.IVA) * 0.3 + (valorVehiculo / VARS.IVA) * 0.16 + (valorVehiculo / VARS.IVA) * 0.1) * 100
  ) / 100

  return {
    costs: {
      anticipo:        anticipoCalc,
      comisionAp,
      anticipoTotal,
      mensualidad,
      finalCost,
      importeDeducir,
      valorVehiculo:   0,  // valorMercadoFinal = 0 en legacy
      totalRentasMasIva,
    },
    eachMonth: {
      valorTotal:    totalPrice,
      seguro,
      services:      serviciosP,
      gps,
      tramitesL:     tramites,
      tenencias,
      veri,
      placas:        getPlacaName('section_one', state),
      accessory,
      accessoryValue,
    },
  }
}
