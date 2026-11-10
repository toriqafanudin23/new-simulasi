import { cn } from '../../lib/cn.ts'
import { usePlane, type PlaneTone } from './planeContext.ts'

type VerticalLineProps = {
  x: number
  tone?: PlaneTone
  dashed?: boolean
}

/** Garis lurus vertikal x = konstanta menembus seluruh bidang (mis. sumbu simetri). */
export const VerticalLine = ({ x, tone = 'charcoal', dashed = true }: VerticalLineProps) => {
  const { height, toPxX } = usePlane()
  if (!Number.isFinite(x)) return null

  return (
    <line
      className={cn('plane-tone--' + tone)}
      x1={toPxX(x)}
      x2={toPxX(x)}
      y1={0}
      y2={height}
      stroke="var(--plane-tone)"
      strokeWidth={1.5}
      strokeDasharray={dashed ? '6 6' : undefined}
    />
  )
}
