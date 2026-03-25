/* Bee */
import _, { Box, Grid, Cell } from '../../../bee/grid'

/* Mocks */
import offer from '../../../mocks/offer'

/* Components */
import Section from '../../../components/section'
import { H2 } from '../../../components/title'
import { OfferCard } from '../../../components/offer-card'
import { Slider, Slide } from '../../../components/slider'

export default () => (
  <Section id="oferta" background="var(--c-black)" color="var(--c-white)">
    <Box>
      <Cell mb={{ _: '1.25rem', m: '2.5rem' }} textAlign="center">
        <H2>
          NUESTRA OFERTA DE{' '}
          <_ as="span" color="var(--c-main)">
            VALOR
          </_>
        </H2>
      </Cell>
      <OfferCards />
      <OffersSlider />
    </Box>
  </Section>
)

const OfferCards = () => (
  <Grid
    display={{ _: 'none', l: 'grid' }}
    gridTemplateColumns={{ _: '1fr', s: 'repeat(2, 1fr)', l: 'repeat(3, 1fr)' }}
    alignItems="stretch"
    gridGap="2rem"
  >
    {/* Financiero */}
    <Cell
      as="dl"
      className="financiero"
      display="flex"
      flexDirection="column"
      gridGap="1.25rem"
    >
      {offer.slice(0, 3).map(({ icon, label, description }, i) => (
        <div key={i}>
          <OfferCard icon={icon} label={label} description={description} />
        </div>
      ))}
    </Cell>
    {/* Operativo */}
    <Cell
      as="dl"
      className="operativo"
      display="flex"
      flexDirection="column"
      gridGap="1.25rem"
    >
      {offer.slice(3, 6).map(({ icon, label, description }, i) => (
        <div key={i}>
          <OfferCard icon={icon} label={label} description={description} />
        </div>
      ))}
    </Cell>
    {/* Legal */}
    <Cell
      as="dl"
      className="legal"
      display="flex"
      flexDirection="column"
      gridGap="1.25rem"
    >
      {offer.slice(6, 9).map(({ icon, label, description }, i) => (
        <div key={i}>
          <OfferCard icon={icon} label={label} description={description} />
        </div>
      ))}
    </Cell>
  </Grid>
)

const OffersSlider = () => (
  <Cell display={{ l: 'none' }}>
    <Slider
      options={{
        // autoplay: true,
        gap: '1.25rem',
        pagination: true,
        perPage: 2,
        type: 'loop',

        breakpoints: {
          599: {
            perPage: 1,
          },
        },
      }}
    >
      {offer.map(({ icon, label, description }, i) => (
        <Slide key={i}>
          <OfferCard icon={icon} label={label} description={description} />
        </Slide>
      ))}
    </Slider>
  </Cell>
)
