import { cn } from '../../lib/cn.ts'
import { usePlane, type PlaneTone } from './planeContext.ts'

type PlanePointProps = {
  x: number
  y: number
  tone?: PlaneTone
  radius?: number
  /** Teks di dekat titik, mis. koordinatnya. */
  label?: string
  labelPlacement?: 'above' | 'below'
}

const CHAR_WIDTH_PX = 7.5

/** Titik pada koordinat matematika (x, y), dengan label opsional. Tidak tampil bila koordinatnya tak berhingga. */
export const PlanePoint = ({ x, y, tone = 'red', radius = 8, label, labelPlacement = 'above' }: PlanePointProps) => {
  const { width, toPxX, toPxY } = usePlane()
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null

  const cx = toPxX(x)
  const cy = toPxY(y)
  const offset = radius + 6
  const flip = label !== undefined && cx + offset + label.length * CHAR_WIDTH_PX > width

  return (
    <g className={cn('plane-tone--' + tone)}>
      <circle cx={cx} cy={cy} r={radius} fill="var(--plane-tone)" stroke={tone === 'gold' ? 'var(--color-charcoal)' : 'var(--color-white)'} strokeWidth={tone === 'gold' ? 1.5 : 2} />
      {label && (
        <text
          className="plane-label"
          x={flip ? cx - offset : cx + offset}
          y={labelPlacement === 'above' ? cy - offset : cy + offset + 8}
          textAnchor={flip ? 'end' : 'start'}
          style={{ fontSize: 13, fontWeight: 600 }}
        >
          {label}
        </text>
      )}
    </g>
  )
}
