/* Packages */
import styled from 'styled-components'
import * as ss from 'styled-system'

const colorTypes = {
  error: 'var(--c-red)',
  info: 'var(--c-cyan)',
  success: 'var(--c-green)',
  warning: 'var(--c-primary)',
}

export const Title = styled.p`
  color: ${(props) => colorTypes[props.type]};
  font-weight: 500;

  ${ss.compose(ss.typography)}
`
export const Message = styled.p`
  color: var(--c-dark-text);

  ${ss.compose(ss.typography)}
`
export const ErrorList = styled.ul`
  margin: 0 auto;
  padding: 0px;
  width: min(450px, 100%);

  & li:last-of-type {
    border-bottom: none;
  }
`
export const ErrorItem = styled.li`
  border-bottom: 1px solid var(--c-black-light);
  color: var(--c-dark-text);
  display: block;
  list-style: none;
  padding: 0.625rem 0px;
`
