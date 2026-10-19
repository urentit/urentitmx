// Helper centralizado para eventos de analítica.
// El cotizador aislado no carga GTM/GA4; si en el futuro se agrega un tag,
// estos eventos llegan al dataLayer sin cambiar los componentes.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  } else {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: eventName, ...params })
  }
}

export const analytics = {
  cotizadorSubmit: (type: string) => trackEvent('cotizador_submit',       { quote_type: type }),
  cotizadorPDF:    (type: string) => trackEvent('cotizador_pdf_download', { quote_type: type }),
  cotizadorWA:     (type: string) => trackEvent('cotizador_whatsapp',     { quote_type: type }),
}
