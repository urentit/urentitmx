/* Packages */
import ReactHtmlParser from 'react-html-parser'

/* Bee */
import _, { Box, Grid, Cell } from '../../../bee/grid'

/* Components */
import Section from '../../../components/section'
import { H2 } from '../../../components/title'

export default () => (
  <Section>
    <Box
      css={css`
        position: relative;
        z-index: 5;
      `}
    >
      <Cell>
        <H2>Aviso de privacidad</H2>
      </Cell>
      <Cell>
        {ReactHtmlParser(`
        <article class="card" id="contenido">
      <p><strong>U Rent It, S.A. de C.V.</strong> (en adelante, “U Rent It”), con domicilio en <strong>Av. Parque de Chapultepec 56-MZ 012, Col. El Parque, 53398 Naucalpan de Juárez, Estado de México</strong>, en cumplimiento con la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</strong> (LFPDPPP) y criterios del INAI, es responsable del tratamiento, uso y protección de los datos personales que recabe de usted a través de <a href="https://urentit.mx">https://urentit.mx</a>, así como por medios electrónicos, telefónicos o presenciales.</p>

      <h2 id="datos">1. Datos Personales que Recabamos</h2>
      <ul>
        <li><strong>Identificación:</strong> nombre completo, RFC, CURP, fecha de nacimiento, domicilio fiscal.</li>
        <li><strong>Contacto:</strong> teléfono, correo electrónico, dirección postal.</li>
        <li><strong>Laborales o empresariales:</strong> razón social, puesto, actividad económica, régimen fiscal.</li>
        <li><strong>Fiscales y financieros:</strong> uso de CFDI, cuenta bancaria (para domiciliaciones o devoluciones).</li>
        <li><strong>Relacionados con el servicio:</strong> contratos de arrendamiento, vehículos, pólizas y facturación.</li>
      </ul>
      <p>No recabamos datos personales sensibles (salud, ideologías, biométricos, etc.).</p>

      <h2 id="finalidades">2. Finalidades del Tratamiento</h2>
      <p><strong>Primarias:</strong></p>
      <ul>
        <li>Identificarlo y formalizar una relación jurídica o comercial.</li>
        <li>Gestionar solicitudes, cotizaciones y contratación de arrendamiento.</li>
        <li>Emitir facturas electrónicas (CFDI) y comprobantes relacionados.</li>
        <li>Notificar vencimientos, pagos, renovaciones y aclaraciones.</li>
        <li>Cumplir obligaciones legales, fiscales y administrativas.</li>
      </ul>
      <p><strong>Secundarias:</strong></p>
      <ul>
        <li>Informar sobre promociones, nuevos servicios y beneficios.</li>
        <li>Realizar encuestas de satisfacción y análisis estadístico.</li>
      </ul>
      <p>Si no desea que sus datos sean tratados para finalidades secundarias, puede manifestarlo en cualquier momento enviando un correo a <a href="mailto:privacidad@urentit.mx">privacidad@urentit.mx</a>.</p>

      <h2 id="transferencias">3. Transferencia de Datos Personales</h2>
      <p>Sus datos personales podrán compartirse exclusivamente con: autoridades fiscales o judiciales; proveedores tecnológicos que operan nuestro hosting, CRM, correo o facturación electrónica; instituciones financieras para pagos o domiciliaciones. U Rent It <strong>no vende ni alquila</strong> datos personales a terceros.</p>

      <h2 id="arco">4. Derechos ARCO y Opciones del Titular</h2>
      <p>Usted puede ejercer sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong>, así como <strong>revocar su consentimiento</strong> o <strong>limitar el uso o divulgación</strong> de sus datos, enviando una solicitud a <a href="mailto:privacidad@urentit.mx">privacidad@urentit.mx</a>.</p>
      <p>Su solicitud debe incluir: nombre completo y medio de respuesta; copia de identificación oficial; descripción precisa de los datos y el derecho a ejercer; y, en su caso, documentos que sustenten la petición. Tiempo de respuesta máximo: <strong>20 días hábiles</strong> a partir de la recepción completa.</p>

      <h2 id="revocacion">5. Revocación del Consentimiento</h2>
      <p>Puede revocar su consentimiento (sin efectos retroactivos) cuando no exista obligación legal que exija su conservación, escribiendo a <a href="mailto:privacidad@urentit.mx">privacidad@urentit.mx</a> con el asunto “Revocación de consentimiento”.</p>

      <h2 id="cookies">6. Uso de Cookies y Tecnologías Similares</h2>
      <p>Utilizamos cookies, web beacons y herramientas analíticas para recordar preferencias, analizar navegación y ofrecer publicidad relevante. Puede deshabilitarlas desde su navegador; algunas funciones del sitio podrían verse afectadas.</p>

      <h2 id="seguridad">7. Medidas de Seguridad</h2>
      <p>Aplicamos medidas administrativas, técnicas y físicas para proteger sus datos contra daño, pérdida, alteración, destrucción o uso no autorizado, conforme a la LFPDPPP y buenas prácticas.</p>

      <h2 id="conservacion">8. Conservación de Datos</h2>
      <p>Conservamos los datos durante la relación contractual y hasta por <strong>10 años</strong> posteriores a su término, o por el periodo que exijan las disposiciones fiscales y mercantiles aplicables.</p>

      <h2 id="cambios">9. Cambios al Aviso de Privacidad</h2>
      <p>Podremos actualizar este Aviso por cambios normativos o de negocio. La versión vigente estará disponible en <a href="https://urentit.mx/aviso-de-privacidad">https://urentit.mx/aviso-de-privacidad</a>.</p>

      <h2 id="contacto">10. Contacto</h2>
      <p><strong>Departamento de Privacidad – U Rent It, S.A. de C.V.</strong><br>
         Av. Parque de Chapultepec 56-MZ 012, Col. El Parque, 53398 Naucalpan de Juárez, Estado de México<br>
         Tel: <a class="kbd" href="tel:+525553908944">+52 55 5390 8944</a> · Correo: <a class="kbd" href="mailto:privacidad@urentit.mx">privacidad@urentit.mx</a> · Web: <a class="kbd" href="https://urentit.mx">urentit.mx</a></p>
    </article>`)}
      </Cell>
    </Box>
  </Section>
)
