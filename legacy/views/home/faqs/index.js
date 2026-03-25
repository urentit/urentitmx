/* Bee */
import _, { Box, Grid, Cell } from '../../../bee/grid'

/* Packages */
import Fade from 'react-reveal/Fade'

/* Mocks */
import faqs from '../../../mocks/faqs'

/* Components */
import Section from '../../../components/section'
import { H2 } from '../../../components/title'
import { Faqs, Faq, Question, Answer } from '../../../components/faqs'

export default () => (
  <Section id="preguntas-frecuentes" background="var(--c-bg-grey)">
    <Box>
      <Cell mb={{ _: '1.25rem', m: '2.5rem' }} textAlign="center">
        <H2 text="Preguntas frecuentes sobre arrendamiento vehicular" />
        <_
          as="p"
          mt="1rem"
          fontSize={{ s: '1.125rem' }}
          lineHeight="1.8"
          style={{ textWrap: 'balance' }}
        >
          Resuelve tus dudas más comunes sobre nuestros planes de arrendamiento de flotillas, vehículos ejecutivos, blindados y más.
        </_>
      </Cell>
      <Grid gridTemplateColumns={{ _: '1fr', l: '1fr 1fr' }} alignItems="start">
        <Faqs>
          <Cell display="grid" gridGap="1.25rem">
            {faqs['block-1'].map(({ question, answer }, i) => {
              return (
                <Fade key={i}>
                  <Faq aria-label={question}>
                    <Question>{question}</Question>
                    <Answer>{answer}</Answer>
                  </Faq>
                </Fade>
              )
            })}
          </Cell>
          <Cell display="grid" gridGap="1.25rem">
            {faqs['block-2'].map(({ question, answer }, i) => {
              return (
                <Fade key={i}>
                  <Faq>
                    <Question>{question}</Question>
                    <Answer>{answer}</Answer>
                  </Faq>
                </Fade>
              )
            })}
          </Cell>
        </Faqs>
      </Grid>
    </Box>
  </Section>
)
