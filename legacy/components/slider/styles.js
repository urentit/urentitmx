/* Packages */
import styled, { css } from 'styled-components'
import '@splidejs/react-splide/css/core'
import { Splide } from '@splidejs/react-splide'

export const Slider = styled(Splide)`
  & .splide__pagination {
    display: flex;
    grid-gap: 0.625rem;
    margin-top: 2.5rem;
    padding-left: 0;

    & li {
      & button {
        background: var(--c-grey-button);
        border-radius: 50%;
        border: none;
        cursor: pointer;
        height: 0.9375rem;
        transition: background 0.2s ease;
        width: 0.9375rem;

        &.is-active {
          background: var(--c-main);
        }
      }
    }
  }
`

export const Arrows = styled.div`
  background: red;
  width: 100%;
`

const size = 2.5

export const Arrow = styled.button`
  background: transparent;
  border: 2px solid var(--c-grey-dark);
  border-radius: 50%;
  color: var(--c-grey-dark);
  cursor: pointer;
  font-size: 1.25rem;
  height: ${size}rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  width: ${size}rem;

  &:hover {
    border-color: var(--c-main);
    color: var(--c-main);
  }

  ${(props) =>
    props.left &&
    css`
      left: -${size + 2}rem;
    `}

  ${(props) =>
    props.right &&
    css`
      right: -${size + 2}rem;
    `}
`
