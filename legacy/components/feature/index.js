/* Packages */
import ReactHtmlParser from 'react-html-parser'
import Fade from 'react-reveal/Fade'

/* Bee */
import FaIcon from '../../bee/fa-icon'
import { Cell } from '../../bee/grid'

/* Components */
import { Info } from '../../components/tooltip'
import { List, Item } from '../../components/list'

/* Styles */
import { Feature as FeaturedStyled, Label, DD } from './styles'

/**
 * Feature
 * @param {string} label - Label of the feature
 * @param {array} tooltip - Tooltip content
 * @returns
 */

export const Feature = ({ label, tooltip, slug, desc }) => {
  return (
    <Fade bottom>
      <FeaturedStyled className={slug}>
        <Cell>
          <FaIcon
            icon="shield"
            color="var(--c-main)"
            fontSize={{ _: '1.875rem', l: '1.5rem' }}
          />
          <Label as="dt">
            {ReactHtmlParser(label)}
            {tooltip && <Info content={TooltipContent(tooltip)} />}
          </Label>
          <DD>{desc}</DD>
        </Cell>
      </FeaturedStyled>
    </Fade>
  )
}

const TooltipContent = (tooltip) => (
  <List>
    {tooltip.map((item, i) => (
      <Item key={i}>{item}</Item>
    ))}
  </List>
)
