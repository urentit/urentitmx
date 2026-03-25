import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Programa de referidos U Rent It'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          background:
            'radial-gradient(circle at top right, rgba(225,190,74,0.32), transparent 30%), linear-gradient(135deg, #151515 0%, #090909 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 28,
            border: '1px solid rgba(225,190,74,0.22)',
            borderRadius: 36,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 58px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                border: '1px solid rgba(225,190,74,0.28)',
                borderRadius: 999,
                padding: '12px 20px',
                color: '#e1be4a',
                fontSize: 24,
                textTransform: 'uppercase',
                letterSpacing: '0.32em',
              }}
            >
              U Rent It Referidos
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 760 }}>
              <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02 }}>
                Comparte tu
                <span style={{ color: '#e1be4a' }}> programa </span>
                de referidos
              </div>
              <div style={{ fontSize: 30, lineHeight: 1.35, color: 'rgba(255,255,255,0.72)' }}>
                Registra a la persona que recomiendas y comparte una página lista para WhatsApp y redes.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.68)' }}>urentit.mx/referidos</div>
              <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.48)' }}>
                Formulario con datos del promotor y del referido
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 999,
                background: '#e1be4a',
                color: '#090909',
                padding: '18px 30px',
                fontSize: 24,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
              }}
            >
              Compartir
            </div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
