import { useCallback, useRef, useState } from 'react'

/** Bidang pandang bidang koordinat: titik pusat (satuan matematika) dan faktor zoom (1 = bawaan). */
export type Viewport = { centerX: number; centerY: number; zoom: number }

export const DEFAULT_VIEWPORT: Viewport = { centerX: 0, centerY: 0, zoom: 1 }

const MIN_ZOOM = 0.05
const MAX_ZOOM = 40
const ZOOM_STEP = 1.25

export const clampZoom = (zoom: number): number => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom))

/** Keadaan bidang pandang + aksi zoom/reset, untuk dihubungkan ke <CoordinatePlane> dan tombol zoom. */
export const useViewport = (initial: Viewport = DEFAULT_VIEWPORT) => {
  const initialRef = useRef(initial)
  const [viewport, setViewport] = useState<Viewport>(initial)

  const zoomBy = useCallback((factor: number) => {
    setViewport((current) => ({ ...current, zoom: clampZoom(current.zoom * factor) }))
  }, [])
  const zoomIn = useCallback(() => zoomBy(ZOOM_STEP), [zoomBy])
  const zoomOut = useCallback(() => zoomBy(1 / ZOOM_STEP), [zoomBy])
  const reset = useCallback(() => setViewport(initialRef.current), [])

  return { viewport, setViewport, zoomBy, zoomIn, zoomOut, reset }
}
