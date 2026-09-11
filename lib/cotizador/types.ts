export type QuoteType =
  | 'auto'
  | 'carga'
  | 'carga-pesada'
  | 'carga-pesada-especial'
  | 'electrico'
  | 'foraneo'
  | 'usado'
  | 'vip'
  | 'flotilla'
  | 'comision-extra'
  | 'refinanciamiento'

export type PlacaSection = 'section_one' | 'section_two' | 'section_three'

export interface QuoteUser {
  comision: number
  manualServices: boolean
}

export interface QuoteInput {
  totalPrice: number
  accessory?: string
  accessoryValue?: number
  cilindraje?: '4' | '6' | '8'
  state: string
  anticipo: number
  servicios?: number
  seguro?: number
  servicesValue?: number
  modelo?: string
  quoteType: QuoteType
  // Usado
  autometricaValue?: number
  // Flotilla
  residualValue24?: number
  residualValue36?: number
  residualValue48?: number
  includeInsurance?: boolean
  includeGps?: boolean
  includeTenencias?: boolean
  includeVerificaciones?: boolean
}

export interface CostBreakdown {
  anticipo: number
  comisionAp: number
  anticipoTotal: number
  mensualidad: number
  finalCost: number
  importeDeducir: number
  valorVehiculo: number
  totalRentasMasIva: number
  // Fracción de anticipo efectivamente usada en el cálculo. En usados es el
  // anticipo ajustado por la brecha vs Autométrica (ej. 5% elegido → 0.27).
  advancePercentage: number
}

export interface MonthlyBreakdown {
  valorTotal: number
  seguro: number
  services: number
  gps: number
  tramitesL: number
  tenencias: number
  veri: number
  placas: string
  accessory: string
  accessoryValue: number
}

export interface QuoteResult {
  costs: CostBreakdown
  eachMonth: MonthlyBreakdown
}

export interface QuoteResponse {
  '36'?: QuoteResult
  '48'?: QuoteResult
  '60'?: QuoteResult
  '24'?: QuoteResult
  '12'?: QuoteResult
}
