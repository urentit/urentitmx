import { prisma, hasDatabase } from '@/lib/prisma'
import { DEFAULT_RATES, RATE_PLAZOS, type TasaMap } from './rates'
import type { QuoteType } from './types'

/**
 * Tasas efectivas de un cotizador: las capturadas por un admin en BD
 * sobrescriben las tasas por defecto plazo por plazo.
 *
 * Nunca lanza: sin DATABASE_URL, con la tabla ausente o ante cualquier error
 * de BD devuelve las tasas por defecto y el cotizador sigue funcionando.
 */
export async function getEffectiveTasas(quoteType: QuoteType): Promise<TasaMap> {
  const tasas: TasaMap = { ...DEFAULT_RATES[quoteType] }
  if (!hasDatabase) return tasas
  try {
    const rows = await prisma.rateSetting.findMany({ where: { quoteType } })
    for (const row of rows) {
      if (RATE_PLAZOS[quoteType].includes(row.months) && row.tasa > 0 && row.tasa < 100) {
        tasas[row.months] = row.tasa
      }
    }
  } catch (e) {
    console.error(`[ratesStore] Error leyendo tasas de "${quoteType}", usando defaults:`, e)
  }
  return tasas
}

export interface RateOverrideRow {
  quoteType: string
  months:    number
  tasa:      number
  updatedAt: Date
}

/** Todos los overrides guardados (para la pantalla de administración). */
export async function getAllRateOverrides(): Promise<RateOverrideRow[]> {
  if (!hasDatabase) return []
  try {
    return await prisma.rateSetting.findMany({
      select: { quoteType: true, months: true, tasa: true, updatedAt: true },
    })
  } catch (e) {
    console.error('[ratesStore] Error listando tasas:', e)
    return []
  }
}
