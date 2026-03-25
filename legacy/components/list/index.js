/* Styles */
import { List as ListStyled, Item as ItemStyled } from './styles'

/**
 * List
 * @param {object} children - List items
 * @param {object} props - Props for the component
 * @returns
 */

export const List = ({ children, ...props }) => (
  <ListStyled {...props}>{children}</ListStyled>
)

/**
 * Item
 * @param {object} children
 * @param {object} props - Props for the component
 * @returns
 */

export const Item = ({ children, ...props }) => (
  <ItemStyled {...props}>
    <span>{children}</span>
  </ItemStyled>
)
