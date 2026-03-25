/* Default */
import { useRef, useState, useId, useEffect } from 'react'

/* Packages */
import {
  useFormikContext,
  useField,
  Formik,
  Form as FormikForm,
  Field as FormikField,
  ErrorMessage as FormikErrorMessage,
} from 'formik'

/**
 * Form
 * @docs https://formik.org
 * @docs https://github.com/jquense/yup (yup validation)
 * @param {object} formProps - Props to pass to the form.
 * @param {object} initialValues - Initial values of the form. - Example: { email: '', password: '' } - Required.
 * @param {function} validate - Callback function to validate the form. - Example: {values => { ... }} - Optional. - Validate with yup.
 * @param {object} props - Props of the form.
 * @returns
 */

export const Form = ({
  children,
  formProps,
  initialValues,
  validate,
  ...props
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validate={validate}
      {...props}
    >
      <FormikForm aria-label={props['aria-label']} {...formProps}>{children}</FormikForm>
    </Formik>
  )
}

/**
 * Field
 * @docs https://formik.org
 * @param {object} children (optional) - Children of the field.
 * @param {string} label - Label of the field.
 * @param {string} use - Type of the field. - Example: 'input'|'select'|'textarea'. - Default: 'input'.
 * @param {string} className - Class name of the field.
 * @param {string} showErrorMessageAs - If the field has an error, this message will be displayed. - Example: 'small'|'span'|'p'|'div'|'...'
 * @param {object} fieldProps - Props of the field.
 * @param {object} labelProps - Props of the label.
 * @param {object} errorMessageProps - Props of the error message.
 * @param {object} props - Props of the field.
 * @returns
 */

export const Field = ({
  children,
  label,
  className,
  showErrorMessageAs,
  fieldProps,
  labelProps,
  errorMessageProps,
  ...props
}) => {
  const container = useRef(null)
  const id = useId()

  return (
    <div ref={container} className={className} {...fieldProps}>
      <label htmlFor={`${props.name}${id}`}>
        {label && <span {...labelProps}>{label}</span>}
        <FieldOnly id={id} container={container} {...props}>
          {children}
        </FieldOnly>
      </label>
      {showErrorMessageAs && (
        <ErrorMessage
          name={props.name}
          component={showErrorMessageAs}
          {...errorMessageProps}
        />
      )}
    </div>
  )
}

/**
 * FieldOnly
 * @docs https://formik.org
 * @param {string} use - Type of the field. - Example: 'input'|'select'|'textarea'. - Default: 'input'.
 * @param {string} id - Id of the field. - Default: useId().
 * @param {string} name (required) - Name and Id of the field.
 * @param {object} container - Container of the field defined with useRef().
 * @param {function} onFocus - Callback function when the field is focused.
 * @param {function} onBlur - Callback function when the field is blurred.
 * @param {function} onChange - Callback function when the field is changed.
 * @param {boolean} autoSubmit - If the field changes, the form will be submitted.
 * @param {string} showErrorMessageAs - If the field has an error, this message will be displayed. - Example: 'small'|'span'|'p'|'div'|'...'
 * @param {object} errorMessageProps - Props of the error message.
 * @param {object} children - Children of the field.
 * @param {object} props - Props of the field.
 * @returns
 */

export const FieldOnly = ({
  children,
  use,
  id,
  name,
  container,
  autoSubmit,
  onFocus,
  onBlur,
  onChange = () => {},
  ...props
}) => {
  const { submitForm } = useFormikContext()
  const fieldId = id || useId()
  const [isFocused, setIsFocused] = useState()
  const [field, meta, helpers] = useField(name)
  const fieldsWithoutFocus = ['select', 'file', 'checkbox', 'radio']

  useEffect(() => {
    if (field.value && container) container.current.setAttribute('filled', '')
    else if (container) container.current.removeAttribute('filled')

    if (meta.error && container) container.current.setAttribute('error', '')
    else if (container) container.current.removeAttribute('error')
  }, [field, meta])

  const handleFocus = (e) => {
    setIsFocused('')
    if (container) container.current?.setAttribute('focused', '')
    onFocus && onFocus(e)
  }

  const handleBlur = (e) => {
    setIsFocused(null)
    if (container) container.current?.removeAttribute('focused')
    onBlur && onBlur(e)
  }

  const handleChange = (e) => {
    onChange(e)
    if (autoSubmit) submitForm()
  }

  return (
    <>
      <FormikField
        as={use}
        // id={`${name}${fieldId}`}
        id={`${name}`}
        name={name}
        focused={isFocused}
        filled={field.value ? '' : null}
        error={meta.error ? '' : null}
        onFocus={() =>
          fieldsWithoutFocus.includes(use) ? null : handleFocus()
        }
        onBlur={handleBlur}
        onChange={(e) => {
          handleChange(e)
          field.onChange(e)
        }}
        {...props}
      >
        {(use === 'select' && props.placeholder && (
          <>
            <option value="" disabled label={props.placeholder}></option>
            {children}
          </>
        )) ||
          children}
      </FormikField>
    </>
  )
}

/**
 * ErrorMessage
 * @docs https://formik.org
 * @param {string} name - name of the field.
 * @param {string} component - Component of the error message. - Default: 'small' - Example: 'span'|'p'|'div'|'...'
 * @param {object} props - Props of the field.
 * @returns
 */

export const ErrorMessage = ({ name, component, ...props }) => (
  <FormikErrorMessage name={name} component={component} {...props} />
)

export { FieldArray } from 'formik'
