/* Package */
import ReactHtmlParser from 'react-html-parser'

/* Bee */
import FaIcon from '../../bee/fa-icon'

/* Styles */
import { H, Label as LabelStyled, Span } from './styles'

/**
 * H1, H2, H3
 * @param {object} children (optional) - Children of the H
 * @param {string} text (optional) - Text to be displayed - (default: '')
 * @param {object} iconProps (optional) - Icon props - e.g. { icon: 'home', color: 'primary', fontSize: '1.25rem' }
 * @returns
 */

export const H1 = ({ ...props }) => (
  <H as="h1" fontSize="clamp(2rem, 5vw, 3.125rem)" {...props}>
    <Children {...props} />
  </H>
)

export const H2 = ({ ...props }) => (
  <H as="h2" fontSize="clamp(2rem, 5vw, 2.1875rem)" {...props}>
    <Children {...props} />
  </H>
)

export const H3 = ({ ...props }) => (
  <H as="h3" fontSize="clamp(1.25rem, 5vw, 1.875rem)" {...props}>
    <Children {...props} />
  </H>
)

const Children = ({ children, text }) => (
  <span>{(children && children) || ReactHtmlParser(text)}</span>
)
