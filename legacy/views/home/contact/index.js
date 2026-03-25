/* Bee */
import _, { Box, Cell } from '../../../bee/grid'

/* Components */
import Section from '../../../components/section'
import { H2 } from '../../../components/title'

/* ./ */
import Form from './form'

export default () => (
  <Section
    id="formulario-cotizacion"
    background="url(/img/backgrounds/fondo-cotiza.jpg)"
    backgroundSize="cover"
    css={css`
      position: relative;
      &:before {
        background: var(--c-bg-grey);
        content: '';
        height: 100%;
        left: 0px;
        opacity: 0.9;
        position: absolute;
        top: 0px;
        width: 100%;
        z-index: 0;
      }
    `}
  >
    <Box
      css={css`
        position: relative;
        z-index: 1;
      `}
    >
      <Cell mb={{ _: '1.25rem', m: '2.5rem' }}>
        <H2 text="Solicita tu cotización personalizada de arrendamiento vehicular" />
      </Cell>
      <Form />
    </Box>
  </Section>
)
