/** Capaian Pembelajaran (CP) Matematika Kurikulum Merdeka, dipakai untuk mencari dan menyaring simulasi.
 *
 * Tiap simulasi diberi satu atau lebih tag: fase + elemen + fokus. `fokus` adalah ringkasan singkat
 * (bukan kutipan resmi) agar guru cepat menemukan simulasi yang cocok dengan CP-nya.
 * Rujukan resmi tetap dokumen CP Matematika dari Kemendikdasmen.
 *
 * Fase D = kelas 7–9 (SMP), E = kelas 10, F = kelas 11–12. */

export type Fase = 'D' | 'E' | 'F'

export type Elemen =
  | 'Bilangan'
  | 'Aljabar'
  | 'Aljabar dan Fungsi'
  | 'Pengukuran'
  | 'Geometri'
  | 'Analisis Data dan Peluang'
  | 'Kalkulus'

export type CpTag = {
  fase: Fase
  elemen: Elemen
  fokus: string
  /** Bagian Matematika Tingkat Lanjut (Fase F). */
  lanjut?: boolean
  /** Topik di luar rumusan CP; dipakai sebagai pengayaan. */
  pengayaan?: boolean
}

export const FASE_INFO: Record<Fase, { label: string; kelas: string }> = {
  D: { label: 'Fase D', kelas: 'Kelas 7–9' },
  E: { label: 'Fase E', kelas: 'Kelas 10' },
  F: { label: 'Fase F', kelas: 'Kelas 11–12' },
}

export const FASE_LIST: readonly Fase[] = ['D', 'E', 'F']

/** Elemen untuk filter. "Aljabar" (Fase D) dan "Aljabar dan Fungsi" (Fase E, F) digabung. */
export const ELEMEN_FILTER = [
  'Bilangan',
  'Aljabar dan Fungsi',
  'Pengukuran',
  'Geometri',
  'Analisis Data dan Peluang',
  'Kalkulus',
] as const

export type ElemenFilter = (typeof ELEMEN_FILTER)[number]

export const elemenGroup = (elemen: Elemen): ElemenFilter =>
  elemen === 'Aljabar' ? 'Aljabar dan Fungsi' : elemen

/** "Fase E · Aljabar dan Fungsi" (+ catatan Mat. Lanjut atau Pengayaan). */
export const cpLabel = ({ fase, elemen, lanjut, pengayaan }: CpTag): string => {
  const note = lanjut ? ' (Mat. Lanjut)' : pengayaan ? ' (Pengayaan)' : ''
  return `Fase ${fase} · ${elemen}${note}`
}

type CpExtra = Pick<CpTag, 'lanjut' | 'pengayaan'>

/** Pembuat tag per fase, supaya data simulasi tetap ringkas. */
export const faseD = (elemen: Elemen, fokus: string, extra: CpExtra = {}): CpTag => ({ fase: 'D', elemen, fokus, ...extra })
export const faseE = (elemen: Elemen, fokus: string, extra: CpExtra = {}): CpTag => ({ fase: 'E', elemen, fokus, ...extra })
export const faseF = (elemen: Elemen, fokus: string, extra: CpExtra = {}): CpTag => ({ fase: 'F', elemen, fokus, ...extra })

export const LANJUT: CpExtra = { lanjut: true }
export const PENGAYAAN: CpExtra = { pengayaan: true }
