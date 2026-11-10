import { calculate as calcEspecialPremium } from './especialPremium'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'
import type { TasaMap } from '../rates'

// Residual forzoso (%) por plazo: el cliente no compra el auto al final,
// lo regresa y recibe uno nuevo del mismo valor sin volver a dar pago inicial.
export const RESIDUAL_RENOVACION: Record<24 | 36 | 48, number> = { 24: 1, 36: 1, 48: 1 }

// Idéntico al Cotizador especial premium, pero ignora los residuales capturados.
export function calculate(input: QuoteInput, user: QuoteUser, years: 24 | 36 | 48, tasas?: TasaMap): QuoteResult {
  return calcEspecialPremium(
    {
      ...input,
      residualValue24: RESIDUAL_RENOVACION[24],
      residualValue36: RESIDUAL_RENOVACION[36],
      residualValue48: RESIDUAL_RENOVACION[48],
    },
    user,
    years,
    tasas,
  )
}
