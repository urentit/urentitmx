/* Packages */
import styled from 'styled-components'
import * as ss from 'styled-system'

export const Section = styled.section`
  ${ss.compose(
    ss.background,
    ss.color,
    ss.layout,
    ss.position,
    ss.space,
    ss.typography
  )}
`
