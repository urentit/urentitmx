/* Packages */
import styled from 'styled-components'

export const WhatsappWidget = styled.div`
  background: var(--c-whatsapp);
  bottom: 1.25rem;
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem var(--c-shadow);
  color: var(--c-white);
  display: flex;
  height: 3.5rem;
  place-items: center;
  place-content: center;
  position: fixed;
  right: 1.25rem;
  width: 3.5rem;
  z-index: 10;

  &:hover {
    background: var(--c-main);
    color: var(--c-white);
  }
`
