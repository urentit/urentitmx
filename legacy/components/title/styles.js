/* Packages */
import styled, { css } from 'styled-components'
import * as ss from 'styled-system'

export const H = styled('h1')`
  align-items: flex-start;
  display: inline-flex;
  font-family: var(--secondary-font);
  font-weight: 800;
  padding: 0;
  ${(props) =>
    props.shadow &&
    css`
      text-shadow: 0px 2px 0px var(--c-shadow);
    `}

  ${ss.compose(ss.color, ss.typography)}
`
