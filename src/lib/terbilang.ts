const SATUAN = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan']

/** Angka 0–99 dalam kata ("15" → "lima belas"). Di luar rentang, dikembalikan sebagai angka. */
export const terbilang = (n: number): string => {
  if (!Number.isInteger(n) || n < 0 || n > 99) return String(n)
  if (n < 10) return SATUAN[n]
  if (n === 10) return 'sepuluh'
  if (n === 11) return 'sebelas'
  if (n < 20) return `${SATUAN[n - 10]} belas`
  const rest = n % 10
  return `${SATUAN[Math.floor(n / 10)]} puluh${rest ? ` ${SATUAN[rest]}` : ''}`
}
