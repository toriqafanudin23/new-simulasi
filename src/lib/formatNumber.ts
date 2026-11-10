const MINUS = '\u2212'
const formatters = new Map<number, Intl.NumberFormat>()

const formatterFor = (maxDecimals: number): Intl.NumberFormat => {
  let formatter = formatters.get(maxDecimals)
  if (!formatter) {
    formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: maxDecimals, useGrouping: false })
    formatters.set(maxDecimals, formatter)
  }
  return formatter
}

/** Angka dengan titik desimal (0.5), tanpa pemisah ribuan, tanda minus matematika (−), dan tanpa "−0". Bukan angka → "—". */
export const formatNumber = (value: number, maxDecimals = 2): string => {
  if (!Number.isFinite(value)) return '—'
  const rounded = Number(value.toFixed(maxDecimals))
  if (rounded === 0) return '0'
  return formatterFor(maxDecimals).format(rounded).replace('-', MINUS)
}
