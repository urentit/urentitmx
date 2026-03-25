/* Packages */
import styled, { css } from 'styled-components'

/* Bee */
import { FieldOnly, ErrorMessage } from '../../bee/form'

export const FieldContainer = styled.div`
  position: relative;
`

export const Label = styled.label`
  display: block;
  font-weight: 600;
  padding-bottom: 0.625rem;
  padding-left: 1.25rem;
`

export const FieldBox = styled.div`
  position: relative;
`

export const Icon = styled.span`
  align-items: center;
  background: var(--c-main);
  border-radius: 50%;
  color: var(--c-white);
  display: inline-flex;
  height: 3.4375rem;
  justify-content: center;
  left: 0rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.4375rem;
`

export const Field = styled(FieldOnly)`
  border-radius: 30px;
  border: 2px solid var(--c-main);
  font-family: var(--main-font);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.9375rem 1.25rem;
  padding-left: 4.375rem;
  width: 100%;

  ::placeholder {
    color: var(--c-placeholder);
    font-style: italic;
    font-weight: 400;
  }
`

export const ErrorMessageStyled = styled(ErrorMessage)`
  color: var(--c-error);
  display: block;
`
