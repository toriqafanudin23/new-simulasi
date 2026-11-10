import { cn } from '../../lib/cn.ts'
import { usePlane, type PlaneTone } from './planeContext.ts'

type FunctionGraphProps = {
  f: (x: number) => number
  tone?: PlaneTone
  strokeWidth?: number
  dashed?: boolean
}

const SAMPLE_PX = 2
/** Nilai piksel di luar rentang ini dijepit agar tidak merusak SVG; letaknya jauh di luar layar. */
const PX_LIMIT = 20000

/** Grafik y = f(x), disampel tiap beberapa piksel di rentang yang terlihat. Nilai tak terhingga memutus garis. */
export const FunctionGraph = ({ f, tone = 'plum', strokeWidth = 4, dashed = false }: FunctionGraphProps) => {
  const { width, bounds, scale, toPxX, toPxY } = usePlane()

  let path = ''
  let penDown = false
  for (let px = 0; px <= width + SAMPLE_PX; px += SAMPLE_PX) {
    const x = bounds.xMin + px / scale
    const y = f(x)
    if (!Number.isFinite(y)) {
      penDown = false
      continue
    }
    const py = Math.min(PX_LIMIT, Math.max(-PX_LIMIT, toPxY(y)))
    path += `${penDown ? 'L' : 'M'}${toPxX(x).toFixed(1)} ${py.toFixed(1)}`
    penDown = true
  }

  return (
    <path
      className={cn('plane-tone--' + tone)}
      d={path}
      fill="none"
      stroke="var(--plane-tone)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? '8 6' : undefined}
    />
  )
}
