import type { QuoteType } from './types'

// Secciones del cotizador, en el orden del sidebar.
export const ALL_SECTIONS: QuoteType[] = [
  'auto',
  'vip',
  'carga',
  'carga-pesada',
  'electrico',
  'foraneo',
  'usado',
  'flotilla',
  'comision-extra',
  'refinanciamiento',
]

export const SECTION_LABELS: Record<QuoteType, string> = {
  'auto':             'Autos',
  'vip':              'VIP / Lujo',
  'carga':            'Carga',
  'carga-pesada':     'Carga Pesada',
  'electrico':        'Eléctrico',
  'foraneo':          'Foráneo',
  'usado':            'Vehículo Usado',
  'flotilla':         'Flotilla',
  'comision-extra':   'Cotizador especial',
  'refinanciamiento': 'Refinanciamiento',
}

// Normaliza el valor JSON de BD/sesión a una lista de secciones válidas, o
// null si el usuario tiene acceso a todas (valor ausente o inválido).
export function parseAllowedSections(raw: unknown): QuoteType[] | null {
  if (!Array.isArray(raw)) return null
  const valid = raw.filter((s): s is QuoteType => ALL_SECTIONS.includes(s as QuoteType))
  return valid
}

/**
 * ¿Puede el usuario usar esta sección?
 * Los admins siempre pueden; allowedSections null = todas.
 */
export function canAccessSection(
  admin: boolean,
  allowedSections: QuoteType[] | null,
  section: QuoteType,
): boolean {
  if (admin) return true
  if (allowedSections === null) return true
  return allowedSections.includes(section)
}

/** Primera sección visible para el usuario (para redirects); null si ninguna. */
export function firstAllowedSection(
  admin: boolean,
  allowedSections: QuoteType[] | null,
): QuoteType | null {
  return ALL_SECTIONS.find(s => canAccessSection(admin, allowedSections, s)) ?? null
}
