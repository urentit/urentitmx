/* Packages */
// Imports moved to dynamic loading inside functions

/* ./ */
import { Main } from './components'

const commonOptions = {
  heightAuto: false,
  showCloseButton: false,
  showConfirmButton: false,
}

/**
 * dialog
 * @param {string} type - The type of the dialog. - Can be 'success', 'error', 'warning', 'info'
 * @param {boolean} showTitle - If false, the title will not be displayed. - Default: true
 * @param {string} message - The message of the dialog. - Can be HTML.
 * @param {array} errors - The errors of the form. - Default: [] - e.g. [{ 'name': 'The name is required' }]
 * @param {object} closeButton - The options of the close button. - e.g. { text: 'Close', variant: 'link', onClick: () => {} }
 * @param {object} options - The options of the dialog. docs - https://sweetalert2.github.io/
 */

export const dialog = async ({ closeButton, ...props }) => {
  const Swal = (await import('sweetalert2')).default
  const withReactContent = (await import('sweetalert2-react-content')).default
  const DialogSwal = withReactContent(Swal)

  DialogSwal.fire({
    html: <Main closeButton={{ ...closeButton }} {...props} />,
    ...commonOptions,
    ...props.options,
  })
}

/**
 * confirm
 * @param {string} type - The type of the dialog. - Can be 'success', 'error', 'warning', 'info'
 * @param {string} title - The title of the dialog. - Can be HTML.
 * @param {boolean} showTitle - If false, the title will not be displayed. - Default: true
 * @param {string} message - The message of the dialog. - Can be HTML.
 * @param {object} confirmButton - The options of the confirm button. - e.g. { text: 'Confirm', variant: 'primary', onClick: () => {} }
 * @param {object} cancelButton - The options of the cancel button. - e.g. { text: 'Cancel', variant: 'link', onClick: () => {} }
 * @param {object} options - The options of the dialog. docs - https://sweetalert2.github.io/
 */

export const confirm = async ({ ...props }) => {
  const Swal = (await import('sweetalert2')).default
  const withReactContent = (await import('sweetalert2-react-content')).default
  const DialogSwal = withReactContent(Swal)

  DialogSwal.fire({
    html: <Main {...props} />,
    ...commonOptions,
    ...props.options,
  })
}
