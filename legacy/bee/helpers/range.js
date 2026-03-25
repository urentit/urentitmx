/**
 * range
 * @param {int} start - The start of the range.
 * @param {int} stop - The stop value. If not provided, the range will be from start to the current value.
 * @param {int} step - The step value - Optional - Default: 1
 * @returns {array} - The range.
 *
 * @example range(1, 10, 1)
 */

export default (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
