// Auto sustituto (Cotizador especial premium): cuota mensual fija según el
// valor del vehículo con IVA. Debajo de $400,000 no se ofrece.
const TIERS: Array<{ hasta: number; cuota: number }> = [
  { hasta: 800_000,   cuota: 250 },
  { hasta: 1_500_000, cuota: 370 },
  { hasta: Infinity,  cuota: 450 },
]

export const AUTO_SUSTITUTO_MIN = 400_000

/** Cuota mensual del auto sustituto, o null si el valor no califica. */
export function getAutoSustitutoCuota(totalPrice: number): number | null {
  if (!(totalPrice >= AUTO_SUSTITUTO_MIN)) return null
  return TIERS.find(t => totalPrice <= t.hasta)!.cuota
}
