/**
 * hexToRgb
 * @param {string} hex - The hex to convert. Must be 6 characters long. - e.g. #ffffff
 * @returns {string} - The rgb value.
 */

export const hexToRgb = (hex) => {
  const rgb = hex.replace('#', '').match(/.{1,2}/g)

  return `${rgb.map((i) => parseInt(i, 16)).join(',')}`
}
