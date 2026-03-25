/* Default */
import { useRef } from 'react'

/* Bee */
import { Form } from '../../bee/form'
import FaIcon from '../../bee/fa-icon'

/* Styles */
import {
  FieldContainer,
  Field as StyledField,
  Label,
  FieldBox,
  Icon,
  ErrorMessage,
} from './styles'

/**
 * Field
 * @docs https://formik.org/docs/api/field
 * @param {string} name - Field name - e.g. 'email'
 * @param {string} label - Field label - e.g. 'Email'
 * @param {string} placeholder - Field placeholder - e.g. 'Enter your email'
 * @param {string} type - Field type - e.g. 'text' - default: 'input'
 * @param {string} icon - Field icon - e.g. 'envelope' - from /lib/fontawesome
 * @returns
 */

export const Field = ({ label, icon = 'question', ...props }) => {
  const fieldContainer = useRef()

  return (
    <FieldContainer ref={fieldContainer}>
      <Label for={props.name}>{label}</Label>
      <FieldBox>
        <Icon>
          <FaIcon icon={icon} />
        </Icon>
        <StyledField container={fieldContainer} {...props} />
      </FieldBox>
    </FieldContainer>
  )
}

export { Form }
