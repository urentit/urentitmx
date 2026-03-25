/* Packages */
import styled, { css } from 'styled-components'
import * as ss from 'styled-system'

const gutter = 0.625
const gridFlex = css`
  align-items: center;
  vertical-align: middle;
`

export const Box = styled('div').attrs(() => ({ className: 'box' }))`
  display: block;
  margin: 0 auto;
  max-width: 85.375rem;
  padding: 0rem 0.625rem;
  width: 100%;

  ${ss.compose(ss.layout, ss.space)}
`

export const Grid = styled('div').attrs((props) => ({
  className: 'grid',
}))`
  display: grid;
  ${gridFlex}

  ${ss.compose(ss.flexbox, ss.grid, ss.layout, ss.space)}
`

export const Flex = styled('div').attrs((props) => ({
  className: 'flex',
}))`
  display: flex;
  ${gridFlex}

  ${ss.compose(ss.flexbox, ss.grid, ss.layout, ss.space)}
`

export const Cell = styled('div').attrs(() => ({
  className: 'cell',
}))`
  padding: ${gutter}rem;
  ${(propos) => propos.show && 'outline: 1px solid;'}

  ${(props) =>
    props.nested &&
    css`
      padding: 0;
    `}

  ${ss.compose(
    ss.background,
    ss.border,
    ss.color,
    ss.flexbox,
    ss.grid,
    ss.layout,
    ss.space,
    ss.typography
  )}
`

export const _ = styled('div')`
  ${ss.compose(
    ss.background,
    ss.border,
    ss.color,
    ss.flexbox,
    ss.grid,
    ss.layout,
    ss.position,
    ss.shadow,
    ss.space,
    ss.typography
  )}
`
