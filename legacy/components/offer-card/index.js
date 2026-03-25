/* Default */
import Image from 'next/image'

/* Packages */
import Fade from 'react-reveal/Fade'

/* Styles */
import { Card, Label, Icon, DT, DD } from './styles'
import { height } from 'styled-system'

/**
 * Feature
 * @param {string} label - Label of the feature
 * @param {string} icon - Icon of the feature
 * @returns
 */

export const OfferCard = ({ icon, label, description }) => (
  <Fade top>
    <Card>
      <DT>
        <Icon as="span">
          <Image
            src={`/img/default/${icon}`}
            alt={label}
            width={60}
            height={60}
          />
        </Icon>
        <Label as="span">{label}</Label>
      </DT>
      <DD>{description}</DD>
    </Card>
  </Fade>
)
