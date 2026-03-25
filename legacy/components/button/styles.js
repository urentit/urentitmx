/* Default */
import styled, { css } from 'styled-components'
import * as ss from 'styled-system'

export const Button = styled.a.attrs((props) => ({
  colorHover: props.theme === 'dark' ? 'var(--c-white)' : 'var(--c-main)',
}))`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  font-family: var(--main-font);
  position: relative;
  text-align: center;
  transition: all 0.2s ease;
  vertical-align: middle;
  user-select: none;

  &:hover {
    color: ${(props) => props.colorHover};
  }

  ${(props) =>
    props.large &&
    css`
      min-width: min(280px, 100%);
    `}

  ${(props) =>
    props.underline &&
    css`
      text-decoration: underline;
    `}

  ${(props) =>
    props.variant &&
    css`
      border: 2px solid;
      border-radius: 2.5rem;
      font-size: 1rem;
      font-weight: 700;
      padding: 0.9375rem 1.25rem;

      @media (min-width: 600px) {
        font-size: 1.125rem;
      }
    `}

  ${(props) =>
    props.small &&
    css`
      font-size: 1rem;
      padding: 0.5rem 1.25rem;
    `}

  ${(props) => props.variant && variants[props.variant]}

  ${ss.compose(ss.color, ss.space, ss.typography, ss.layout)}
`

const variants = {
  'white-o-main': css`
    background: transparent;
    border-color: var(--c-white);
    color: var(--c-white);

    &:hover {
      background: var(--c-main);
      border-color: var(--c-main);
      color: var(--c-black);
    }
  `,
  'grey-o-main-o': css`
    background: transparent;
    border-color: var(--c-grey-button);
    color: var(--c-grey-dark);

    &.active,
    &:hover {
      background: transparent;
      border-color: var(--c-main);
      color: var(--c-black);
    }
  `,
  'black-main': css`
    background: var(--c-black);
    border-color: var(--c-main);
    color: var(--c-white);

    &:hover {
      background: var(--c-main);
      border-color: var(--c-main);
      color: var(--c-black);
    }
  `,
  'main-white': css`
    background: var(--c-main);
    border-color: var(--c-main);
    color: var(--c-black);

    &:hover {
      background: var(--c-white);
      border-color: var(--c-white);
      color: var(--c-black);
    }
  `,
  link: css`
    border: none;
    padding: 0;
  `,
}
