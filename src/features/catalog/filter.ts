import {
  cpLabel,
  elemenGroup,
  ELEMEN_FILTER,
  FASE_INFO,
  FASE_LIST,
  type ElemenFilter,
  type Fase,
} from '../simulations/curriculum.ts'
import { SIMULATIONS } from '../simulations/data.ts'
import type { SimulationSummary } from '../simulations/types.ts'

export type CatalogFilterState = {
  query: string
  fase: Fase | null
  elemen: ElemenFilter | null
}

export const EMPTY_FILTER: CatalogFilterState = { query: '', fase: null, elemen: null }

export const isFilterActive = ({ query, fase, elemen }: CatalogFilterState): boolean =>
  Boolean(query.trim() || fase || elemen)

/** Huruf kecil tanpa aksen dan spasi ganda, agar pencarian tidak peka huruf besar/kecil. */
const normalize = (text: string): string =>
  text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/\s+/g, ' ').trim()

/** Cocok bila lolos filter Fase dan Elemen, dan setiap kata pencarian cocok dengan awal kata di judul, konsep, atau CP. */
export const matchesFilter = (simulation: SimulationSummary, { query, fase, elemen }: CatalogFilterState): boolean => {
  const { cp } = simulation
  if (fase && !cp.some((tag) => tag.fase === fase)) return false
  if (elemen && !cp.some((tag) => elemenGroup(tag.elemen) === elemen)) return false

  const words = normalize(query).split(' ').filter(Boolean)
  if (words.length === 0) return true

  const haystack = normalize(
    [
      simulation.title,
      simulation.category,
      simulation.summary,
      ...simulation.concepts,
      ...cp.flatMap((tag) => [tag.fokus, cpLabel(tag), `fase ${tag.fase}`, tag.elemen, FASE_INFO[tag.fase].kelas]),
    ].join(' '),
  ).split(' ')
  return words.every((word) => haystack.some((candidate) => candidate.startsWith(word)))
}

/** Pilihan filter hanya yang punya simulasi, supaya tidak ada tombol yang selalu kosong. */
export const FASE_OPTIONS: readonly Fase[] = FASE_LIST.filter((fase) =>
  SIMULATIONS.some(({ cp }) => cp.some((tag) => tag.fase === fase)),
)

export const ELEMEN_OPTIONS: readonly ElemenFilter[] = ELEMEN_FILTER.filter((elemen) =>
  SIMULATIONS.some(({ cp }) => cp.some((tag) => elemenGroup(tag.elemen) === elemen)),
)
