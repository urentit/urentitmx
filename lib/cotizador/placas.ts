export interface PlacaEntry {
  name: string
  price: number
  tenencia_percentage: number
  range?: { from: number; to: number; price: number }[]
}

export type PlacasSection = Record<string, PlacaEntry>

export const SECTION_ONE: PlacasSection = {
  no: { name: 'Sin placas', price: 4000, tenencia_percentage: 0.035 },
  cdmx: { name: 'CDMX', price: 8500, tenencia_percentage: 0.035 },
  morelos: {
    name: 'Morelos',
    price: 8500,
    tenencia_percentage: 0,
    range: [
      { from: 0,          to: 999999.99,      price: 8500 },
      { from: 1000000,    to: 1999999,        price: 9500 },
      { from: 2000000,    to: 2999999.99,     price: 11500 },
      { from: 3000000.99, to: 3999999.99,     price: 13000 },
      { from: 4000000,    to: 10000000000,    price: 14500 },
    ],
  },
  estado_mexico: { name: 'Estado de México', price: 9300, tenencia_percentage: 0.0383 },
  hidalgo:       { name: 'Hidalgo',          price: 9500, tenencia_percentage: 0 },
  jalisco:       { name: 'Jalisco',          price: 13750, tenencia_percentage: 0.035 },
  puebla:        { name: 'Puebla',           price: 8750, tenencia_percentage: 0 },
  queretaro:     { name: 'Querétaro',        price: 12760, tenencia_percentage: 0.035 },
}

export const SECTION_TWO: PlacasSection = {
  cdmx:          { name: 'CDMX',             price: 11000, tenencia_percentage: 0.042 },
  morelos:       { name: 'Morelos',          price: 8750,  tenencia_percentage: 0 },
  estado_mexico: { name: 'Estado de México', price: 16000, tenencia_percentage: 0.042 },
  hidalgo:       { name: 'Hidalgo',          price: 9500,  tenencia_percentage: 0 },
  jalisco:       { name: 'Jalisco',          price: 13750, tenencia_percentage: 0.035 },
  puebla:        { name: 'Puebla',           price: 13000, tenencia_percentage: 0 },
  queretaro:     { name: 'Querétaro',        price: 16000, tenencia_percentage: 0.035 },
}

export const SECTION_THREE: PlacasSection = {
  cdmx:          { name: 'CDMX',                  price: 9300,  tenencia_percentage: 0 },
  morelos:       { name: 'Morelos',               price: 8750,  tenencia_percentage: 0 },
  estado_mexico: { name: 'Estado de México',      price: 9300,  tenencia_percentage: 0 },
  queretaro:     { name: 'Querétaro (Ecológicas)', price: 14000, tenencia_percentage: 0 },
}

export function getSection(section: 'section_one' | 'section_two' | 'section_three'): PlacasSection {
  if (section === 'section_two') return SECTION_TWO
  if (section === 'section_three') return SECTION_THREE
  return SECTION_ONE
}

export function getPlacaPrice(price: number, section: 'section_one' | 'section_two' | 'section_three', state: string): number {
  const placa = getSection(section)[state]
  if (!placa) return 4000
  if (placa.range) {
    const match = placa.range.find(r => price >= r.from && price <= r.to)
    return match ? match.price : placa.price
  }
  return placa.price
}

export function getPlacaName(section: 'section_one' | 'section_two' | 'section_three', state: string): string {
  return getSection(section)[state]?.name ?? state
}
