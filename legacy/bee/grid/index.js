/* Styles */
import {
  Box as BoxStyled,
  Grid as GridStyled,
  Flex as FlexStyled,
  Cell as CellStyled,
  _ as _Styled,
} from './styles'

/**
 * Box
 * @docs layout - https://styled-system.com/table#layout
 * @docs space - https://styled-system.com/table#space
 * @param {object} props - The props.
 * @returns {object} - The component.
 */

export const Box = ({ children, ...props }) => (
  <BoxStyled {...props}>{children}</BoxStyled>
)

/**
 * Grid
 * @docs flexbox - https://styled-system.com/table#flexbox
 * @docs grid - https://styled-system.com/table#grid-layout
 * @docs layout - https://styled-system.com/table#layout
 * @param {boolean} inner - If the grid is inner
 * @param {object} props - The props.
 * @returns {object} - The component.
 */

export const Grid = ({ children, ...props }) => (
  <GridStyled {...props}>{children}</GridStyled>
)

/**
 * Flex
 * @docs flexbox - https://styled-system.com/table#flexbox
 * @docs grid - https://styled-system.com/table#grid-layout
 * @docs layout - https://styled-system.com/table#layout
 * @param {boolean} inner - If the grid is inner
 * @param {object} props - The props.
 * @returns {object} - The component.
 */

export const Flex = ({ children, ...props }) => (
  <FlexStyled {...props}>{children}</FlexStyled>
)

/**
 * Cell
 * @docs layout - https://styled-system.com/table#layout
 * @docs space - https://styled-system.com/table#space
 * @param {boolean} nested - If the cell has nested content. - Default: false
 * @param {object} props - The props.
 * @returns {object} - The component.
 */

export const Cell = ({ children, ...props }) => (
  <CellStyled {...props}>{children}</CellStyled>
)

/**
 * _
 * @docs all - https://styled-system.com/table
 * @param {object} props - The props.
 * @returns {object} - The component.
 */

export default ({ children, ...props }) => (
  <_Styled {...props}>{children}</_Styled>
)
