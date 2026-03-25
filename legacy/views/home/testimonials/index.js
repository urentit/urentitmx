/* Bee */
import _, { Box, Cell } from '../../../bee/grid'

/* Mocks */
import testimonials from '../../../mocks/testimonials'

/* Components */
import Section from '../../../components/section'
import { H2 } from '../../../components/title'
import { Slider, Slide } from '../../../components/slider'
import TestimonialCard from '../../../components/testimonial-card'

export default () => (
  <Section id="opiniones-clientes" background="var(--c-black)">
    <Box>
      <Cell mb={{ _: '1.25rem', m: '2.5rem' }} textAlign="center">
        {/* prettier-ignore */}
        <H2 color="var(--c-white)">¿QUÉ OPINAN NUESTROS <_ as="span" color="var(--c-main)">CLIENTES</_>?</H2>
        <_
          as="p"
          color="var(--c-white)"
          mt="1rem"
          fontSize={{ s: '1.125rem' }}
          lineHeight="1.8"
          style={{ textWrap: 'balance' }}
        >
          Conoce la experiencia de nuestros clientes que ya disfrutan de un arrendamiento flexible y personalizado con U Rent It.
        </_>
      </Cell>
      <Cell>
        <Slider
          options={{
            arrows: true,
            gap: '1.25rem',
            pagination: true,
            perPage: 3,
            // type: 'loop',

            breakpoints: {
              1519: {
                arrows: false,
              },
              1023: {
                perPage: 2,
              },
              599: {
                perPage: 1,
              },
            },
          }}
        >
          {testimonials.map((testimonial, i) => (
            <Slide key={i}>
              <TestimonialCard {...testimonial} />
            </Slide>
          ))}
        </Slider>
      </Cell>
    </Box>
  </Section>
)
