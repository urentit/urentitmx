/* Bee */
import FaIcon from '../../bee/fa-icon'

/* Styles */
import { Card, Content, Img, Auhor, Rate, Quote } from './styles'

/**
 * TestimonialCard
 * @param {object} img - Testimonial image - e.g. next/image
 * @param {string} author - Testimonial author - e.g. 'John Doe'
 * @param {string} quote - Testimonial quote - e.g. 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
 * @param {number} rate - Testimonial rate - e.g. 4
 */

import Image from 'next/image'

// ...

const TestimonialCard = ({ img, author, rate, quote }) => (
  <Card>
    <Img>
      <Image src={img} alt={`Cliente ${author}`} layout="fill" objectFit="cover" />
    </Img>
    <Content>
      <Auhor>{author}</Auhor>
      <Rate aria-label="5 estrellas">
        {Array(rate)
          .fill()
          .map((empty, i) => (
            <FaIcon key={i} icon="star" />
          ))}
      </Rate>
      <Quote>{quote}</Quote>
    </Content>
  </Card>
)

export default TestimonialCard
