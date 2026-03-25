/* Bee */
import FaIcon from '../../bee/fa-icon'

/* Components */
import Button from '../../components/button'

/* Mocks */
import app from '../../mocks/app'

/* Styles */
import { WhatsappWidget as StyledWhatsappWidget } from './styles'

export const WhatsappWidget = () => (
  <StyledWhatsappWidget
    as={Button}
    href={`https://wa.me/${app.whatsapp.short}`}
    target="_blank"
    rel="noreferrer"
  >
    <FaIcon icon="whatsapp" lib="fab" fontSize="2rem" />
  </StyledWhatsappWidget>
)
