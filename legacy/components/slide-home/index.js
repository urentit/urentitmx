/* Default */
import { useRouter } from 'next/router'

/* Packages */
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-scroll'
import Fade from 'react-reveal/Fade'

/* Bee */
import _, { Cell } from '../../bee/grid'

/* Component */
import Button from '../../components/button'

/* ./ */
import { SlideHome as StyledSlidehome } from './styles'

export const SlideHome = ({ slide }) => {
  const router = useRouter()

  return (
    <Fade>
      <StyledSlidehome>
        <Cell>
          <_ as="h1" fontWeight="800" fontSize={{ _: '1.75rem', s: '2.2rem' }}>
            {ReactHtmlParser(slide.title)}
          </_>
          <_ as="p" fontSize={{ _: '1.2rem', s: '1.4rem' }}>
            {ReactHtmlParser(slide.content)}
          </_>
        </Cell>
        {router.pathname === '/' && (
          <Cell mt="1.875rem">
            <Link to={slide.callToAction.section} smooth={true} offset={-50} aria-label={slide.callToAction.text}>
              <Button as="span" variant="main-white" large >
                {slide.callToAction.text}
              </Button>
            </Link>
          </Cell>
        )}
      </StyledSlidehome>
    </Fade>
  )
}
