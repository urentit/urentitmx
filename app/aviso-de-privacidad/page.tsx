import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad',
  description:
    'Conoce cómo U Rent It trata y protege tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).',
  alternates: {
    canonical: 'https://urentit.mx/aviso-de-privacidad',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function AvisoPrivacidadPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="container-site max-w-3xl">
        <nav className="flex items-center gap-2 text-white/30 font-sans text-xs mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold transition-colors duration-150">Inicio</Link>
          <span>/</span>
          <span className="text-white/60">Aviso de Privacidad</span>
        </nav>

        <h1 className="font-display text-3xl sm:text-4xl text-white font-bold mb-2">
          Aviso de <span className="text-gold italic">Privacidad</span>
        </h1>
        <p className="text-white/40 font-sans text-sm mb-10">Última actualización: marzo 2025</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 font-sans text-white/60 leading-relaxed">

          <section>
            <h2 className="font-sans font-semibold text-white text-base mb-2">Responsable del tratamiento de datos</h2>
            <p>
              <strong className="text-white/80">U Rent It S.A. de C.V.</strong> (en adelante "U Rent It"), con domicilio en Ciudad de México, es responsable del
              tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión
              de los Particulares (LFPDPPP) y su Reglamento.
            </p>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-white text-base mb-2">Datos personales recabados</h2>
            <p>U Rent It puede recabar los siguientes datos personales:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-white/50">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Razón social o nombre de empresa</li>
              <li>Información sobre el vehículo de interés</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-white text-base mb-2">Finalidades del tratamiento</h2>
            <p>Sus datos serán utilizados para las siguientes finalidades primarias:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-white/50">
              <li>Atender solicitudes de cotización y contacto</li>
              <li>Brindar información sobre nuestros servicios de arrendamiento</li>
              <li>Dar seguimiento comercial a prospectos</li>
              <li>Cumplir con obligaciones contractuales derivadas del arrendamiento</li>
            </ul>
            <p className="mt-3">
              De manera secundaria y sujeto a su consentimiento expreso, podemos utilizar sus datos para:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-white/50">
              <li>Envío de comunicaciones comerciales y promociones</li>
              <li>Encuestas de satisfacción</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-white text-base mb-2">Transferencia de datos</h2>
            <p>
              U Rent It no transferirá sus datos personales a terceros sin su consentimiento, salvo en los casos
              previstos en el Artículo 37 de la LFPDPPP o cuando sea necesario para la prestación del servicio
              contratado (p. ej. aseguradoras, gestorías vehiculares).
            </p>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-white text-base mb-2">Derechos ARCO</h2>
            <p>
              Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales
              (Derechos ARCO). Para ejercerlos, envíe una solicitud a:{' '}
              <a href="mailto:privacidad@urentit.mx" className="text-gold hover:underline">privacidad@urentit.mx</a>{' '}
              indicando su nombre, datos de contacto y descripción clara del derecho que desea ejercer.
            </p>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-white text-base mb-2">Cookies y tecnologías de rastreo</h2>
            <p>
              Este sitio utiliza cookies propias y de terceros (Google Analytics, Google Tag Manager) para mejorar
              la experiencia del usuario y medir el desempeño del sitio. Puede deshabilitar las cookies desde la
              configuración de su navegador; sin embargo, algunas funciones del sitio pueden verse afectadas.
            </p>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-white text-base mb-2">Cambios al aviso de privacidad</h2>
            <p>
              U Rent It se reserva el derecho de modificar el presente aviso. Cualquier cambio será publicado en
              esta misma página con la fecha de actualización correspondiente.
            </p>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-white text-base mb-2">Contacto</h2>
            <p>
              Para cualquier duda o comentario sobre este aviso, contáctanos en{' '}
              <a href="mailto:privacidad@urentit.mx" className="text-gold hover:underline">privacidad@urentit.mx</a>{' '}
              o llámanos al{' '}
              <a href="tel:+525518062633" className="text-gold hover:underline">55 1806 2633</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
