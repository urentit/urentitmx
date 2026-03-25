/* Styles */
import { Section as StyledSection } from './styles'

/**
 * Section
 * @param {object} children - Children of the section
 * @param {boolean} top - if true, the section won't have a top padding
 * @param {boolean} bottom - if true, the section won't have a bottom padding
 * @param {boolean} middle - if true, the section won't have a top and bottom padding
 * @returns
 */

const Section = ({ children, top, middle, bottom, ...props }) => {
  const padding = { _: '2.5rem', s: '3.75rem', m: '5rem' }

  return (
    <StyledSection
      pb={bottom && padding}
      pt={top && padding}
      py={!top && !middle && !bottom && padding}
      {...props}
    >
      {children}
    </StyledSection>
  )
}

export default Section
