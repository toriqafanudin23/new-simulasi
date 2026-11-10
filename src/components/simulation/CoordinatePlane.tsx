import { useEffect, useRef, useState, type Dispatch, type KeyboardEvent, type PointerEvent, type ReactNode, type SetStateAction } from 'react'
import { useElementSize } from '../../hooks/useElementSize.ts'
import { clampZoom, type Viewport } from '../../hooks/useViewport.ts'
import { cn } from '../../lib/cn.ts'
import { formatNumber } from '../../lib/formatNumber.ts'
import { useFullscreen } from './FullscreenContext.ts'
import { PlaneContext, type PlaneApi } from './planeContext.ts'
import './CoordinatePlane.css'

type CoordinatePlaneProps = {
  viewport: Viewport
  onViewportChange: Dispatch<SetStateAction<Viewport>>
  /** Deskripsi singkat grafik untuk pembaca layar. */
  label: string
  /** Banyak satuan yang tampak pada sisi terpendek saat zoom 1. */
  unitsAcross?: number
  showGrid?: boolean
  showAxisNumbers?: boolean
  /** Elemen SVG di atas grid: <FunctionGraph>, <PlanePoint>, dst. */
  children?: ReactNode
}

const TARGET_GRID_PX = 48
const KEY_PAN_PX = 48
const KEY_ZOOM = 1.25
/** Angka sumbu yang lebih dekat dari ini ke tepi bidang tidak digambar (agar tidak terpotong). */
const LABEL_EDGE_PX = 14

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value))

/** Jarak garis grid "bulat" (1, 2, 5 × 10ⁿ) yang lebarnya kira-kira TARGET_GRID_PX piksel. */
const niceStep = (scale: number): number => {
  const raw = TARGET_GRID_PX / scale
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  return ([1, 2, 5, 10].find((factor) => factor * magnitude >= raw) ?? 10) * magnitude
}

const range = (from: number, to: number, step: number): number[] => {
  const first = Math.ceil(from / step)
  const last = Math.floor(to / step)
  return Array.from({ length: Math.max(0, last - first + 1) }, (_, index) => (first + index) * step)
}

/**
 * Bidang koordinat SVG: grid, sumbu, angka, geser (seret / panah), dan zoom (tombol, +/−, Ctrl+gulir).
 * Keadaan bidang pandang dipegang pemanggil lewat `useViewport`, jadi tombol zoom bisa di luar bidang.
 * Isi simulasi digambar sebagai `children` memakai koordinat matematika.
 */
export const CoordinatePlane = ({
  viewport,
  onViewportChange,
  label,
  unitsAcross = 20,
  showGrid = true,
  showAxisNumbers = true,
  children,
}: CoordinatePlaneProps) => {
  const [containerRef, { width, height }] = useElementSize<HTMLDivElement>()
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const { fullscreen } = useFullscreen()

  const baseScale = Math.min(width, height) / unitsAcross
  const scale = baseScale * viewport.zoom
  const { centerX, centerY } = viewport

  // Zoom roda: tanpa Ctrl hanya di layar penuh, agar gulir halaman biasa tidak terganggu.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || baseScale <= 0) return
    const onWheel = (event: WheelEvent) => {
      if (!fullscreen && !event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      const rect = svg.getBoundingClientRect()
      const offsetX = event.clientX - rect.left - rect.width / 2
      const offsetY = event.clientY - rect.top - rect.height / 2
      const factor = Math.exp(-event.deltaY * 0.0015)
      onViewportChange((current) => {
        const zoom = clampZoom(current.zoom * factor)
        const oldScale = baseScale * current.zoom
        const newScale = baseScale * zoom
        // Titik di bawah kursor tetap di tempatnya.
        return {
          zoom,
          centerX: current.centerX + offsetX / oldScale - offsetX / newScale,
          centerY: current.centerY - offsetY / oldScale + offsetY / newScale,
        }
      })
    }
    svg.addEventListener('wheel', onWheel, { passive: false })
    return () => svg.removeEventListener('wheel', onWheel)
  }, [fullscreen, baseScale, onViewportChange, width, height])

  const panByPixels = (dx: number, dy: number) =>
    onViewportChange((current) => ({
      ...current,
      centerX: current.centerX - dx / scale,
      centerY: current.centerY + dy / scale,
    }))

  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { x: event.clientX, y: event.clientY }
    setDragging(true)
  }
  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return
    panByPixels(event.clientX - drag.current.x, event.clientY - drag.current.y)
    drag.current = { x: event.clientX, y: event.clientY }
  }
  const endDrag = () => {
    drag.current = null
    setDragging(false)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const pan: Record<string, [number, number]> = {
      ArrowLeft: [KEY_PAN_PX, 0],
      ArrowRight: [-KEY_PAN_PX, 0],
      ArrowUp: [0, KEY_PAN_PX],
      ArrowDown: [0, -KEY_PAN_PX],
    }
    const move = pan[event.key]
    if (move) {
      event.preventDefault()
      panByPixels(...move)
    } else if (event.key === '+' || event.key === '=') {
      onViewportChange((current) => ({ ...current, zoom: clampZoom(current.zoom * KEY_ZOOM) }))
    } else if (event.key === '-') {
      onViewportChange((current) => ({ ...current, zoom: clampZoom(current.zoom / KEY_ZOOM) }))
    }
  }

  const ready = width > 0 && height > 0 && scale > 0

  let content: ReactNode = null
  if (ready) {
    const toPxX = (x: number) => width / 2 + (x - centerX) * scale
    const toPxY = (y: number) => height / 2 - (y - centerY) * scale
    const bounds = {
      xMin: centerX - width / 2 / scale,
      xMax: centerX + width / 2 / scale,
      yMin: centerY - height / 2 / scale,
      yMax: centerY + height / 2 / scale,
    }
    const plane: PlaneApi = { width, height, scale, toPxX, toPxY, bounds }

    const step = niceStep(scale)
    const xTicks = range(bounds.xMin, bounds.xMax, step)
    const yTicks = range(bounds.yMin, bounds.yMax, step)
    const decimals = Math.max(0, -Math.floor(Math.log10(step)))
    const axisX = toPxX(0)
    const axisY = toPxY(0)
    const labelY = clamp(axisY + 16, 16, height - 6)
    const labelX = clamp(axisX - 6, 34, width - 6)

    content = (
      <svg
        ref={svgRef}
        className={cn('coordinate-plane__svg', dragging && 'coordinate-plane__svg--dragging', fullscreen && 'coordinate-plane__svg--fullscreen')}
        width={width}
        height={height}
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {showGrid && (
          <g className="coordinate-plane__grid">
            {xTicks.map((x) => (
              <line key={`gx${x}`} x1={toPxX(x)} x2={toPxX(x)} y1={0} y2={height} />
            ))}
            {yTicks.map((y) => (
              <line key={`gy${y}`} x1={0} x2={width} y1={toPxY(y)} y2={toPxY(y)} />
            ))}
          </g>
        )}
        <g className="coordinate-plane__axes">
          <line x1={0} x2={width} y1={axisY} y2={axisY} />
          <line x1={axisX} x2={axisX} y1={0} y2={height} />
        </g>
        {showAxisNumbers && (
          <g className="coordinate-plane__numbers">
            {xTicks
              .filter((x) => Math.abs(x) > step / 2 && toPxX(x) > LABEL_EDGE_PX && toPxX(x) < width - LABEL_EDGE_PX)
              .map((x) => (
                <text key={`tx${x}`} x={toPxX(x)} y={labelY} textAnchor="middle">
                  {formatNumber(x, decimals)}
                </text>
              ))}
            {yTicks
              .filter((y) => Math.abs(y) > step / 2 && toPxY(y) > LABEL_EDGE_PX && toPxY(y) < height - LABEL_EDGE_PX)
              .map((y) => (
                <text key={`ty${y}`} x={labelX} y={toPxY(y) + 4} textAnchor="end">
                  {formatNumber(y, decimals)}
                </text>
              ))}
          </g>
        )}
        <PlaneContext.Provider value={plane}>{children}</PlaneContext.Provider>
      </svg>
    )
  }

  return (
    <div
      ref={containerRef}
      className="coordinate-plane"
      role="group"
      aria-label={`${label}. Seret atau tekan tombol panah untuk menggeser; tekan plus dan minus untuk memperbesar dan memperkecil.`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {content}
    </div>
  )
}
