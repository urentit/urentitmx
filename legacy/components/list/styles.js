/* Packages */
import styled from 'styled-components'

export const List = styled.ul`
  margin: 0;
  padding: 0;
`

export const Item = styled.li`
  align-items: baseline;
  display: flex;
  grid-gap: 0.625rem;
  margin: 0.3125rem;
  list-style: none;

  &:before {
    background: var(--c-main);
    border-radius: 50%;
    content: '';
    height: 0.5rem;
    width: 0.5rem;
  }
`
