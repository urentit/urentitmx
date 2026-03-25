'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const WHATSAPP_NUMBER = '525518062633'
const MESSAGE = encodeURIComponent('Hola, me gustaría obtener información sobre el arrendamiento de vehículos.')

export function WhatsAppWidget() {
  const [visible, setVisible] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Show widget after 2s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  // Auto-show tooltip after 4s (only once)
  useEffect(() => {
    if (!visible || dismissed) return
    const t = setTimeout(() => setTooltipOpen(true), 4000)
    return () => clearTimeout(t)
  }, [visible, dismissed])

  const handleClick = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`,
      '_blank',
      'noopener,noreferrer'
    )
    // Fire GA4 event if dataLayer available
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({ event: 'whatsapp_click' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

          {/* Tooltip bubble */}
          <AnimatePresence>
            {tooltipOpen && !dismissed && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="relative glass rounded-lg px-4 py-3 max-w-[220px] shadow-dark"
              >
                <button
                  onClick={() => { setTooltipOpen(false); setDismissed(true) }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-black-secondary border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={10} />
                </button>
                <p className="text-white text-xs font-sans leading-snug">
                  ¿Tienes dudas? <br />
                  <span className="text-gold font-semibold">¡Escríbenos por WhatsApp!</span>
                </p>
                {/* Arrow */}
                <div className="absolute -bottom-2 right-5 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/10" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onClick={handleClick}
            className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BD5C] rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25D366]"
            aria-label="Contactar por WhatsApp"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}
