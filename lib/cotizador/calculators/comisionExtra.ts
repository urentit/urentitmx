import { calculate as calcFlotilla } from './flotilla'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'

const COMISION_EXTRA_PCT = 0.02

export function calculate(input: QuoteInput, user: QuoteUser, years: 24 | 36 | 48): QuoteResult {
  const base = calcFlotilla(input, user, years)

  const total           = input.totalPrice + (input.accessoryValue ?? 0)
  const valorAFinanciar = total * (1 - input.anticipo)
  const comisionTotal   = valorAFinanciar * COMISION_EXTRA_PCT
  const rentaExtra      = comisionTotal / years  // años = meses (24 | 36 | 48)

  const mensualidad       = Math.round((base.costs.mensualidad + rentaExtra) * 100) / 100
  const totalRentasMasIva = Math.round(mensualidad * years * 100) / 100

  const valorVehiculoInterno = base.costs.anticipo + base.costs.finalCost + totalRentasMasIva
  const importeDeducir       = Math.round(
    (valorVehiculoInterno * 0.3 + valorVehiculoInterno * 0.16 + valorVehiculoInterno * 0.1) * 100,
  ) / 100

  return {
    ...base,
    costs: {
      ...base.costs,
      mensualidad,
      totalRentasMasIva,
      importeDeducir,
    },
  }
}
