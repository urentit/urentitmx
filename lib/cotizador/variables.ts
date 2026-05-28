export const VARS = {
  // Tasas de renting
  TASARENTING: 28,       // 36 meses
  TASARENTING2: 27,      // 48 meses
  TASARENTINGVIP: 26,    // VIP 36 meses
  TASARENTINGVIP2: 25,   // VIP 48 meses

  // Impuesto
  IVA: 1.16,

  // Comisión de apertura base
  CPA: 0.03,

  // Seguros autos (porcentaje anual)
  PS1: 0.06,   // hasta $380,000
  PS2: 0.05,   // $380,001 – $500,000
  PS3: 0.04,   // más de $500,000

  // Seguros carga (porcentaje anual)
  PS1_CARGA: 0.09,
  PS2_CARGA: 0.06,
  PS3_CARGA: 0.04,

  // Rangos de precio para seguros
  RANGO1: 380000,
  RANGO2: 500000,

  // Servicios preventivos
  SERVICES_BASE: 2400,
  VAR_DATA: 0.0045,

  // Servicios eléctricos (promedio de 3 servicios anuales)
  ELECTRIC_SERVICES: (8470 + 12210 + 7260) / 3,  // 9313.33

  // GPS
  GPS_BASE: 4032,
  GPS_MONTHLY: 138,
  GPS_FACTOR: 1.95,

  // Trámites y administración
  TRAMITES_LIBRES: 4000,

  // Tenencias/refrendos anuales (estados con tenencia fija)
  TENENCIAS_FIXED: 2000,

  // Verificaciones
  VERI: 1800,
  VERI_FORANEOS: 3200,

  // Estados con tenencia FIJA (no porcentual) — jalisco incluido por lógica del legacy
  TENENCIA_FIXED_STATES: ['no', 'morelos', 'hidalgo', 'puebla', 'jalisco'] as string[],

  // Usuarios VIP (email)
  VIP_USERS: ['dc@urentit.mx'] as string[],
} as const
