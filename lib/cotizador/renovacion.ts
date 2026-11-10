// Cotizador cuantitativo: módulo compartido cliente/servidor (sin prisma).
// El valor residual es forzoso (1 %) y no se muestra; al término del contrato
// el cliente regresa el vehículo y recibe uno nuevo del mismo valor sin dar
// pago inicial nuevamente.

export const RENOVACION_TIPO = 'cuantitativo' as const

export const CONDICIONES_RENOVACION: string[] = [
  'Al término del contrato el cliente tiene derecho a cambiar su vehículo por uno nuevo del mismo valor, sin dar pago inicial nuevamente: solo regresa el vehículo actual.',
  'El vehículo debe devolverse en buenas condiciones mecánicas y estéticas.',
  'Máximo 20,000 km por año; el excedente tiene cargo por kilometraje adicional.',
  'Sujeto a disponibilidad del mismo modelo al mismo precio, o bien de un vehículo distinto de valor igual o menor. De lo contrario, el cliente debe pagar la diferencia del valor de compra para seguir pagando las mismas rentas mensuales por el nuevo periodo contratado.',
]
