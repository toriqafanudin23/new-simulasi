import { createContext, useContext } from 'react'

export type PlaneTone = 'plum' | 'red' | 'gold' | 'charcoal'

/** Pemetaan antara koordinat matematika dan piksel SVG, dibagikan ke elemen di dalam <CoordinatePlane>. */
export type PlaneApi = {
  /** Ukuran area gambar (px). */
  width: number
  height: number
  /** Piksel per satuan. */
  scale: number
  toPxX: (x: number) => number
  toPxY: (y: number) => number
  /** Rentang koordinat yang sedang terlihat. */
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number }
}

export const PlaneContext = createContext<PlaneApi | null>(null)

export const usePlane = (): PlaneApi => {
  const plane = useContext(PlaneContext)
  if (!plane) throw new Error('usePlane hanya boleh dipakai di dalam <CoordinatePlane>.')
  return plane
}
