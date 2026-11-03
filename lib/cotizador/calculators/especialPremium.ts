import { calculate as calcComisionExtra } from './comisionExtra'
import { getAutoSustitutoCuota } from '../autoSustituto'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'
import type { TasaMap } from '../rates'

export function calculate(input: QuoteInput, user: QuoteUser, years: 24 | 36 | 48, tasas?: TasaMap): QuoteResult {
  const base = calcComisionExtra(input, user, years, tasas)

  const autoSustituto = input.includeAutoSustituto ? (getAutoSustitutoCuota(input.totalPrice) ?? 0) : 0
  if (!autoSustituto) return base

  // La cuota se suma directo a la renta (no se financia)
  const mensualidad       = Math.round((base.costs.mensualidad + autoSustituto) * 100) / 100
  const totalRentasMasIva = Math.round(mensualidad * years * 100) / 100

  const valorVehiculoInterno = base.costs.anticipo + base.costs.finalCost + totalRentasMasIva
  const importeDeducir       = Math.round(
    (valorVehiculoInterno * 0.3 + valorVehiculoInterno * 0.16 + valorVehiculoInterno * 0.1) * 100,
  ) / 100

  return {
    costs: {
      ...base.costs,
      mensualidad,
      totalRentasMasIva,
      importeDeducir,
    },
    eachMonth: {
      ...base.eachMonth,
      autoSustituto,
    },
  }
}
