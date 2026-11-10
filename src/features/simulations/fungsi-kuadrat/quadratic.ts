import { formatNumber } from '../../../lib/formatNumber.ts'

/** Fungsi kuadrat f(x) = ax² + bx + c. Dengan a = 0 grafiknya garis lurus. */
export type Quadratic = { a: number; b: number; c: number }

/** Toleransi untuk membandingkan dengan nol (nilai parameter berasal dari penggeser berlangkah desimal). */
const EPSILON = 1e-9

export const evaluate = ({ a, b, c }: Quadratic, x: number): number => (a * x + b) * x + c

export const isQuadratic = ({ a }: Quadratic): boolean => Math.abs(a) > EPSILON

export const discriminant = ({ a, b, c }: Quadratic): number => {
  const d = b * b - 4 * a * c
  return Math.abs(d) < EPSILON ? 0 : d
}

/** Titik puncak (titik balik); `null` bila bukan fungsi kuadrat. */
export const vertex = (q: Quadratic): { x: number; y: number } | null => {
  if (!isQuadratic(q)) return null
  const x = -q.b / (2 * q.a)
  return { x, y: evaluate(q, x) }
}

/** Akar-akar real, urut dari kecil: dua, satu (kembar), atau tidak ada. Untuk a = 0: satu akar linear bila b ≠ 0. */
export const roots = (q: Quadratic): number[] => {
  if (!isQuadratic(q)) return Math.abs(q.b) > EPSILON ? [-q.c / q.b] : []
  const d = discriminant(q)
  if (d < 0) return []
  if (d === 0) return [-q.b / (2 * q.a)]
  const root = Math.sqrt(d)
  return [(-q.b - root) / (2 * q.a), (-q.b + root) / (2 * q.a)].sort((m, n) => m - n)
}

const term = (coefficient: number, variable: string, first: boolean): string => {
  const magnitude = Math.abs(coefficient)
  const body = variable && magnitude === 1 ? variable : `${formatNumber(magnitude)}${variable}`
  if (first) return coefficient < 0 ? `\u2212${body}` : body
  return `${coefficient < 0 ? '\u2212' : '+'} ${body}`
}

/** Bentuk umum sebagai teks: "x² − 2x − 3". Semua koefisien nol → "0". */
export const formatEquation = ({ a, b, c }: Quadratic): string => {
  const terms: string[] = []
  const add = (coefficient: number, variable: string) => {
    if (Math.abs(coefficient) < EPSILON) return
    terms.push(term(coefficient, variable, terms.length === 0))
  }
  add(a, 'x²')
  add(b, 'x')
  add(c, '')
  return terms.length > 0 ? terms.join(' ') : '0'
}
