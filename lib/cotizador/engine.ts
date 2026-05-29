import { VARS } from './variables'
import { getPlacaPrice, getPlacaName, getSection } from './placas'
import type { QuoteUser, QuoteResult } from './types'

// Port de FinancialClass::PMT — idéntico al cálculo de Excel/PHP
export function pmt(rate: number, nper: number, pv: number, fv = 0): number {
  if (rate === 0) return -(pv + fv) / nper
  const pvif  = Math.pow(1 + rate, nper)
  const fvifa = (pvif - 1) / rate
  return (-pv * pvif - fv) / ((1 + rate * 0) * fvifa)
}

export function calcGps(years: number): number {
  return ((VARS.GPS_BASE + VARS.GPS_MONTHLY * (years * 12)) * VARS.IVA) * VARS.GPS_FACTOR
}

export function calcSeguroAuto(totalPrice: number, years: number): number {
  const p = totalPrice <= VARS.RANGO1 ? VARS.PS1
           : totalPrice <= VARS.RANGO2 ? VARS.PS2
           : VARS.PS3
  return Math.round((totalPrice * p) * years * 100) / 100
}

export function calcSeguroCarga(totalPrice: number, years: number): number {
  const p = totalPrice <= VARS.RANGO1_CARGA ? VARS.PS1_CARGA
           : totalPrice <= VARS.RANGO2_CARGA ? VARS.PS2_CARGA
           : VARS.PS3_CARGA
  return Math.round((totalPrice * p) * years * 100) / 100
}

export function calcServiciosPreventivos(
  totalPrice: number,
  years: number,
  serviciosIncluidos: number,
  servicesValue?: number,
): number {
  if (servicesValue) return servicesValue * 2 * years
  const efectivos = Math.max(0, years - serviciosIncluidos)
  return (VARS.SERVICES_BASE + VARS.VAR_DATA * totalPrice) * 2 * efectivos
}

export function calcTenencias(
  totalPrice: number,
  years: number,
  state: string,
  section: 'section_one' | 'section_two' | 'section_three' = 'section_one',
): number {
  if (VARS.TENENCIA_FIXED_STATES.includes(state)) {
    return VARS.TENENCIAS_FIXED * years
  }
  // Jalisco usa tenencia fija solo en autos (section_one); en carga/foráneo usa porcentaje
  if (section === 'section_one' && state === 'jalisco') {
    return VARS.TENENCIAS_FIXED * years
  }
  const placa = getSection(section)[state]
  if (!placa || placa.tenencia_percentage === 0) return VARS.TENENCIAS_FIXED * years
  return placa.tenencia_percentage * totalPrice * years
}

export function calcCore(
  totalPrice: number,
  accessoryValue: number,
  anticipo: number,
  state: string,
  years: number,
  varData1: number,
  tasa: number,
  seguro: number,
  servicios: number,
  gps: number,
  tramitesLibres: number,
  tenencias: number,
  veriCost: number,
  user: QuoteUser,
  accessory: string,
  section: 'section_one' | 'section_two' | 'section_three',
): QuoteResult {
  const totalCar   = totalPrice
  const total      = totalPrice + accessoryValue

  const anticipoCalc  = Math.round((total * anticipo) / VARS.IVA * 100) / 100
  const comisionAp    = Math.round(((total / VARS.IVA) - anticipoCalc) * user.comision * 100) / 100
  const anticipoTotal = anticipoCalc + comisionAp

  const suma = seguro + servicios + gps + tramitesLibres + tenencias + veriCost

  const tasa_mensual = (tasa / 100) / 12
  const pago = (pmt(
    tasa_mensual,
    years * 12,
    total * (1 - anticipo) + suma,
    total * -1 * varData1,
  ) * -1) / VARS.IVA

  const mensualidad       = Math.round(pago * 100) / 100
  const finalCost         = Math.round((total * varData1) / VARS.IVA * 100) / 100
  const totalRentasMasIva = Math.round(mensualidad * (years * 12) * 100) / 100

  const valorMercadoFinal = 0.78 - years * 0.08
  const valorComercial    = Math.round(total * valorMercadoFinal * 100) / 100

  const valorVehiculo  = anticipoCalc + finalCost + totalRentasMasIva
  const importeDeducir = Math.round((valorVehiculo * 0.3 + valorVehiculo * 0.16 + valorVehiculo * 0.1) * 100) / 100

  return {
    costs: {
      anticipo:        anticipoCalc,
      comisionAp,
      anticipoTotal,
      mensualidad,
      finalCost,
      importeDeducir,
      valorVehiculo:   valorComercial,
      totalRentasMasIva,
    },
    eachMonth: {
      valorTotal:    totalCar,
      seguro,
      services:      servicios,
      gps,
      tramitesL:     tramitesLibres,
      tenencias,
      veri:          veriCost,
      placas:        getPlacaName(section, state),
      accessory,
      accessoryValue,
    },
  }
}
