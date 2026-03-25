// prettier-ignore
const logos = {
  dinkbit: 'https://dinkbit.s3.amazonaws.com/img/firmas/dinkbit.png',
  'dinkbit-slogan': 'https://dinkbit.s3.amazonaws.com/img/firmas/dinkbit-slogan.png',
  'dinkbit-hca-blanco': 'https://dinkbit.s3.amazonaws.com/img/firmas/dinkbit-hca-blanco.png',
  'dinkbit-hca-negro': 'https://dinkbit.s3.amazonaws.com/img/firmas/dinkbit-hca-negro.png',
  'dinkbit-hca-slogan-blanco': 'https://dinkbit.s3.amazonaws.com/img/firmas/dinkbit-hca-slogan-blanco.png',
  'dinkbit-hca-slogan-negro': 'https://dinkbit.s3.amazonaws.com/img/firmas/dinkbit-hca-slogan-negro.png',
}

import Image from 'next/image'

export const Logo = ({ logo = 'dinkbit', ...props }) => {
  return (
    <a href="https://dinkbit.com" target="_blank" rel="noreferrer">
      <Image
        src={logos[logo]}
        alt="dinkbit"
        width={80}
        height={46}
        objectFit="contain"
        {...props}
      />
    </a>
  )
}

export const watermark = () => {
  console.clear()
  console.log(
    '%c ',
    `background: url(${logos.dinkbit}) no-repeat center/150px; color: white; padding: 25px 75px`
  )
  console.log(
    '%c' + '¡Hacemos cosas increíbles!',
    'background: ' +
      '#427dfc' +
      '; color: ' +
      '#fff' +
      '; font-weight: bold; padding: 5px;'
  )
}
