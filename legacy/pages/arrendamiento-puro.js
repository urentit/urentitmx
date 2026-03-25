import React from 'react'
import styled, { css } from 'styled-components'
import Main from '../layouts/main'
import Section from '../components/section'
import { H2 } from '../components/title'
import _, { Box, Grid, Cell } from '../bee/grid'
import Button from '../components/button'
import { Link } from 'react-scroll'
import { Faq, Question, Answer } from '../components/faqs'
import Fade from 'react-reveal/Fade'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  font-size: 1rem;

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: var(--c-primary);
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`

const Page = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Arrendamiento Puro de Vehículos",
    "provider": {
      "@type": "Organization",
      "name": "U Rent It",
      "url": "https://urentit.mx"
    },
    "description": "Servicio de arrendamiento puro de vehículos para empresas en México. Deduce impuestos y renueva tu flotilla fácilmente.",
    "areaServed": "MX"
  }

  return (
    <Main
      title="Arrendamiento Puro de Vehículos para tu Empresa"
      description="Descubre los beneficios del arrendamiento puro para tu empresa. Deducción fiscal, renovación constante y menor inversión inicial con U Rent It."
      canonical="https://urentit.mx/arrendamiento-puro"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Section */}
      <Section
        background="url(/img/backgrounds/main.jpg)"
        backgroundSize="cover"
        color="white"
        py={{ _: '6rem', l: '10rem' }}
        css={css`position: relative; &:before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); }`}
      >
        <Box position="relative" zIndex="1" textAlign="center">
          <Cell>
            <_ as="h1" fontWeight="800" fontSize={{ _: '2rem', m: '3rem' }}>
              Arrendamiento Puro de Vehículos para tu Empresa
            </_>
            <_ as="p" fontSize={{ _: '1.2rem', m: '1.5rem' }} mt="1rem">
              Optimiza tus recursos y deduce impuestos con nuestras soluciones de movilidad.
            </_>
            <Cell mt="2rem">
              <Link to="formulario-cotizacion" smooth={true} offset={-50}>
                <Button variant="main-white" large>
                  Solicitar Cotización
                </Button>
              </Link>
            </Cell>
          </Cell>
        </Box>
      </Section>

      {/* What is it? */}
      <Section py={{ _: '4rem', l: '6rem' }}>
        <Box>
          <Cell textAlign="center" mb="3rem">
            <H2 text="¿Qué es el Arrendamiento Puro?" />
            <_ as="p" mt="1.5rem" fontSize="1.125rem" lineHeight="1.6" maxWidth="800px" mx="auto">
              El arrendamiento puro (leasing) es un esquema financiero que te permite el uso y goce de vehículos por un tiempo determinado mediante el pago de una renta mensual. Al finalizar el contrato, tienes la opción de devolver el vehículo, renovarlo por uno nuevo o adquirirlo a un valor residual. Es la solución ideal para empresas que buscan eficiencia fiscal y operativa.
            </_>
          </Cell>

          <Grid gridTemplateColumns={{ _: '1fr', m: '1fr 1fr' }} gridGap="3rem" alignItems="center">
            <Cell>
              <H2 text="Beneficios Clave" />
              <_ as="ul" mt="1.5rem" style={{ listStyle: 'disc', paddingLeft: '1.5rem' }} fontSize="1.125rem" lineHeight="1.8">
                <li><strong>Deducibilidad Fiscal:</strong> Las rentas son deducibles de impuestos como gasto operativo.</li>
                <li><strong>Sin Descapitalización:</strong> No requieres un enganche alto, liberando flujo de efectivo.</li>
                <li><strong>Renovación Constante:</strong> Mantén tu flotilla moderna y eficiente.</li>
                <li><strong>Gestión Simplificada:</strong> Delega trámites y mantenimiento (opcional).</li>
                <li><strong>Fuera de Balance:</strong> No registra pasivos, mejorando tus ratios financieros.</li>
              </_>
            </Cell>
            <Cell>
               {/* Placeholder for an image if needed, or just text/graphic */}
               <div style={{ background: 'var(--c-primary)', padding: '2rem', borderRadius: '8px', color: 'white', textAlign: 'center' }}>
                 <_ as="h3" fontSize="1.5rem" fontWeight="bold">Ideal para Flotillas</_>
                 <_ as="p" mt="1rem">Ejecutivos, Fuerza de Ventas, Reparto y Carga.</_>
               </div>
            </Cell>
          </Grid>
        </Box>
      </Section>

      {/* Comparison Table */}
      <Section background="var(--c-bg-grey)" py={{ _: '4rem', l: '6rem' }}>
        <Box>
          <Cell textAlign="center">
            <H2 text="Arrendamiento Puro vs. Crédito Tradicional" />
          </Cell>
          <Cell overflowX="auto">
            <Table>
              <thead>
                <tr>
                  <th>Característica</th>
                  <th>Arrendamiento Puro (Leasing)</th>
                  <th>Crédito Tradicional</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Inversión Inicial</td>
                  <td>Mínima (1-2 rentas en depósito)</td>
                  <td>Alta (Enganche del 20% o más)</td>
                </tr>
                <tr>
                  <td>Deducibilidad</td>
                  <td>100% de la renta (sujeto a topes legales)</td>
                  <td>Solo intereses y depreciación anual</td>
                </tr>
                <tr>
                  <td>Propiedad</td>
                  <td>Uso y goce temporal</td>
                  <td>Propiedad del activo (se deprecia)</td>
                </tr>
                <tr>
                  <td>Fin del Plazo</td>
                  <td>Renueva, devuelve o compra</td>
                  <td>Te quedas con un auto depreciado</td>
                </tr>
                <tr>
                  <td>Impacto Financiero</td>
                  <td>Gasto operativo (OpEx)</td>
                  <td>Deuda en balance (CapEx)</td>
                </tr>
              </tbody>
            </Table>
          </Cell>
        </Box>
      </Section>

      {/* FAQ */}
      <Section py={{ _: '4rem', l: '6rem' }}>
        <Box>
          <Cell textAlign="center" mb="3rem">
            <H2 text="Preguntas Frecuentes" />
          </Cell>
          <Grid gridTemplateColumns={{ _: '1fr', l: '1fr 1fr' }} gridGap="2rem">
             <Cell display="grid" gridGap="1.25rem">
                <Fade>
                  <Faq>
                    <Question>¿Qué requisitos necesito para arrendar?</Question>
                    <Answer>Generalmente solicitamos acta constitutiva, constancia de situación fiscal, comprobante de domicilio, estados de cuenta bancarios y la identificación del representante legal.</Answer>
                  </Faq>
                </Fade>
                <Fade>
                  <Faq>
                    <Question>¿Son deducibles las rentas?</Question>
                    <Answer>Sí, las rentas son deducibles de ISR como gasto operativo, respetando los topes establecidos por la ley para vehículos de combustión e híbridos/eléctricos.</Answer>
                  </Faq>
                </Fade>
             </Cell>
             <Cell display="grid" gridGap="1.25rem">
                <Fade>
                  <Faq>
                    <Question>¿Puedo comprar el auto al final?</Question>
                    <Answer>Sí, al finalizar el contrato tienes la opción de adquirir el vehículo pagando su valor residual, o bien, devolverlo y estrenar uno nuevo.</Answer>
                  </Faq>
                </Fade>
                <Fade>
                  <Faq>
                    <Question>¿Incluye seguro y mantenimiento?</Question>
                    <Answer>Nuestros planes son flexibles. Podemos incluir seguro, mantenimiento, trámites y telemetría en tu renta mensual para una solución &quot;Llave en Mano&quot;.</Answer>
                  </Faq>
                </Fade>
             </Cell>
          </Grid>
        </Box>
      </Section>

      {/* CTA Section */}
      <Section background="var(--c-bg-grey)" py={{ _: '4rem', l: '6rem' }}>
        <Box textAlign="center">
          <Cell>
            <H2 text="¿Listo para optimizar tu flotilla?" />
            <_ as="p" mt="1.5rem" fontSize="1.125rem" maxWidth="600px" mx="auto">
              Solicita tu cotización personalizada y descubre cómo el arrendamiento puro puede transformar la movilidad de tu empresa.
            </_>
            <Cell mt="2rem">
              <Link to="/" smooth={false}>
                <Button variant="main" large>
                  Solicitar Cotización
                </Button>
              </Link>
            </Cell>
          </Cell>
        </Box>
      </Section>

    </Main>
  )
}

export default Page
