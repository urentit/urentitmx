import { VARS } from '../variables'
import { calculate as calcComisionExtra } from './comisionExtra'
import { getAutoSustitutoCuota } from '../autoSustituto'
import type { QuoteInput, QuoteUser, QuoteResult } from '../types'
import type { TasaMap } from '../rates'

export function calculate(input: QuoteInput, user: QuoteUser, years: 24 | 36 | 48, tasas?: TasaMap): QuoteResult {
  // Cuota mensual + IVA por todo el plazo; entra a la suma financiada (PMT) como el GPS
  const cuota         = input.includeAutoSustituto ? (getAutoSustitutoCuota(input.totalPrice) ?? 0) : 0
  const autoSustituto = Math.round(cuota * VARS.IVA * years * 100) / 100

  return calcComisionExtra(input, user, years, tasas, autoSustituto)
}
