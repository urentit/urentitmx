/* Packages */
import NumberFormat from 'react-number-format'

const currencySettings = {
  displayType: 'text',
  prefix: '$',
  decimalScale: 2,
  type: 'tel',
  thousandSeparator: true,
}

export const Number = ({ ...props }) => {
  return <NumberFormat {...currencySettings} prefix='' {...props} />
}

export const Currency = ({ ...props }) => {
  return <NumberFormat {...currencySettings} {...props} />
}

export const CurrencyInput = ({ ...props }) => {
  return (
    <div className="label-input">
      <NumberFormat {...currencySettings} displayType="input" {...props} />
    </div>
  )
}
