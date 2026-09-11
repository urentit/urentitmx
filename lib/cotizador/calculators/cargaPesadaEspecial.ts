import { VARS } from '../variables'
import { calculate as calcCargaPesada } from './cargaPesada'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'
import type { TasaMap } from '../rates'

// Carga Pesada + la misma comisión adicional del Cotizador especial:
// VARS.COMISION_EXTRA_PCT sobre el valor a financiar, distribuida en las rentas.
export function calculate(input: QuoteInput, user: QuoteUser, years: 36 | 48 | 60, tasas?: TasaMap): QuoteResult {
  const base = calcCargaPesada(input, user, years, tasas)

  const total           = input.totalPrice + (input.accessoryValue ?? 0)
  const valorAFinanciar = total * (1 - input.anticipo)
  const comisionTotal   = valorAFinanciar * VARS.COMISION_EXTRA_PCT
  const rentaExtra      = comisionTotal / years  // years = meses (36 | 48 | 60)

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
