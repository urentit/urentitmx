import { VARS } from './variables'
import type { QuoteType } from './types'

// Módulo compartido cliente/servidor: NO importar prisma aquí.
// La lectura de overrides de BD vive en ratesStore.ts (solo servidor).

/** Mapa plazo (meses) → tasa anual en %. */
export type TasaMap = Record<number, number>

/** Plazos en meses que ofrece cada cotizador, en el orden en que se muestran. */
export const RATE_PLAZOS: Record<QuoteType, number[]> = {
  'auto':             [36, 48],
  'vip':              [36, 48],
  'carga':            [36, 48, 60],
  'carga-pesada':     [36, 48, 60],
  'carga-pesada-especial': [36, 48, 60],
  'electrico':        [24, 36, 48],
  'foraneo':          [36, 48],
  'usado':            [36, 48],
  'flotilla':         [24, 36, 48],
  'comision-extra':   [24, 36, 48],
  'refinanciamiento': [12, 24],
}

/**
 * Tasas anuales (%) por defecto por cotizador y plazo. Son las constantes
 * históricas de variables.ts; se usan cuando un admin no ha capturado una
 * tasa personalizada para ese cotizador/plazo.
 */
export const DEFAULT_RATES: Record<QuoteType, TasaMap> = {
  'auto':             { 36: VARS.TASARENTING, 48: VARS.TASARENTING2 },
  'vip':              { 36: VARS.TASARENTINGVIP, 48: VARS.TASARENTINGVIP2 },
  'carga':            { 36: VARS.TASARENTING, 48: VARS.TASARENTING2, 60: VARS.TASARENTING3 },
  'carga-pesada':     { 36: VARS.TASARENTING, 48: VARS.TASARENTING2, 60: VARS.TASARENTING3 },
  'carga-pesada-especial': { 36: VARS.TASARENTING, 48: VARS.TASARENTING2, 60: VARS.TASARENTING3 },
  'electrico':        { 24: VARS.TASARENTING, 36: VARS.TASARENTING, 48: VARS.TASARENTING2 },
  'foraneo':          { 36: VARS.TASARENTING, 48: VARS.TASARENTING2 },
  'usado':            { 36: VARS.TASARENTING, 48: VARS.TASARENTING2 },
  'flotilla':         { 24: VARS.TASARENTING, 36: VARS.TASARENTING, 48: VARS.TASARENTING2 },
  'comision-extra':   { 24: VARS.TASARENTING, 36: VARS.TASARENTING, 48: VARS.TASARENTING2 },
  'refinanciamiento': { 12: VARS.TASARENTING, 24: VARS.TASARENTING2 },
}
