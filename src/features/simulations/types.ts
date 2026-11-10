import type { CpTag } from './curriculum.ts'

export type SimulationSummary = {
  /** Bagian URL: /simulasi/<slug> */
  slug: string
  title: string
  category: string
  /** Satu kalimat singkat untuk kartu. */
  summary: string
  /** Konsep yang dipelajari; ikut dicari di katalog. */
  concepts: readonly string[]
  /** Capaian Pembelajaran Kurikulum Merdeka yang berkaitan; dipakai filter Fase dan Elemen. */
  cp: readonly CpTag[]
  /** Data path SVG (viewBox 0 0 150 110) untuk kurva pada thumbnail. */
  curvePath: string
}
