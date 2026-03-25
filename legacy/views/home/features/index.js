/* Bee */
import _, { Box, Grid, Cell } from '../../../bee/grid'

/* Packages */
import { Link } from 'react-scroll'

/* Mocks */
import features from '../../../mocks/features'

/* Components */
import Section from '../../../components/section'
import { H2, H3 } from '../../../components/title'
import { Feature } from '../../../components/feature'
import { Slider, Slide } from '../../../components/slider'
import Button from '../../../components/button'
import { Info } from '../../../components/tooltip'
import { List, Item } from '../../../components/list'

export default () => (
  <Section background="var(--c-black-light)" color="var(--c-white)">
    <Box>
      <Cell mb={{ _: '1.25rem', m: '2.5rem' }}>
        <H2>
          ¿Por qué elegir{' '}
          <_ as="span" color="var(--c-main)">
            U Rent It
          </_>{' '}
          para el arrendamiento de tu necesidad de vehículos de todo tipo?
        </H2>
        <_ as="p" mt="1.25rem" fontSize={{ s: '1.125rem' }} lineHeight="1.8">
          Nos diferenciamos con soluciones de leasing flexibles, seguras y
          operativas, diseñadas para empresas que buscan eficiencia sin
          comprometer su capital.
        </_>
      </Cell>
      <FeatureCards />
      <FeaturesSlider />
      <LabelTooltip />
      <Cell textAlign="center" mt={{ _: '2.5rem', s: '3.75rem' }}>
        <Link
          to="formulario-cotizacion"
          smooth={true}
          offset={-50}
          aria-label="Obtén tu cotización personalizada"
        >
          <Button
            as="span"
            variant="white-o-main"
            text="Obtén tu cotización personalizada"
            large
          />
        </Link>
      </Cell>
    </Box>
  </Section>
)

const FeatureCards = () => (
  <Grid
    as="dl"
    display={{ _: 'none', l: 'grid' }}
    alignItems="start"
    gridTemplateColumns={{
      _: '1fr',
      s: 'repeat(2, 1fr)',
      l: 'repeat(3, 1fr)',
      xl: 'repeat(4, 1fr)',
    }}
    className="diferenciadores"
  >
    {features.map(({ label, tooltip, slug, desc }, i) => (
      <Cell key={i} p="1rem">
        <Feature
          label={label}
          tooltip={tooltip}
          slug={slug}
          desc={desc}
        />
      </Cell>
    ))}
  </Grid>
)

const FeaturesSlider = () => (
  <Cell display={{ l: 'none' }} mt="1.25rem">
    <Slider
      options={{
        autoplay: true,
        gap: '1.25rem',
        pagination: true,
        perPage: 1,
        type: 'loop',
      }}
    >
      {features.map(({ label, tooltip, slug, desc }, i) => (
        <Slide key={i}>
          <Feature
            label={label}
            tooltip={tooltip}
            slug={slug}
            desc={desc}
          />
        </Slide>
      ))}
    </Slider>
  </Cell>
)

const LabelTooltip = ({ label, tooltip }) => (
  <Cell textAlign="center" mt={{ _: '2.5rem', s: '3.75rem' }}>
    <H3>
      Valor residual con{' '}
      <_ as="span" color="var(--c-main)">
        3 opciones
      </_>{' '}
      al final del plazo
      <Info
        content={
          <List>
            <Item>Regresar la unidad </Item>
            <Item>
              Compra de la unidad al valor estipulado en la cotización{' '}
            </Item>
            <Item>Refinanciamiento de 1 a 2 años más del valor residual</Item>
          </List>
        }
      />
    </H3>
  </Cell>
)
