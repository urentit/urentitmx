// Helper centralizado para eventos GA4
// Todos los componentes deben usar estas funciones en lugar de llamar gtag/dataLayer directamente


export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  } else {
    // Fallback a dataLayer para GTM
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: eventName, ...params })
  }
}

// Eventos tipados para mayor consistencia
export const analytics = {
  // CTAs principales
  ctaClick:       (label: string) => trackEvent('cta_click',             { cta_label: label }),
  whatsappClick:  (source: string) => trackEvent('whatsapp_click',       { source }),

  // Cotizador
  cotizadorSubmit:(type: string)  => trackEvent('cotizador_submit',      { quote_type: type }),
  cotizadorPDF:   (type: string)  => trackEvent('cotizador_pdf_download',{ quote_type: type }),
  cotizadorWA:    (type: string)  => trackEvent('cotizador_whatsapp',    { quote_type: type }),

  // Contenido
  videoPlay:      (title: string) => trackEvent('video_play',            { video_title: title }),
  formSubmit:     (form: string)  => trackEvent('form_submit',           { form_name: form }),
  referralSubmit: ()              => trackEvent('referral_form_submit'),
}
