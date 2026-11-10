import { simulationPath } from '../../app/routes.ts'
import { Tag } from '../../components/ui/Tag.tsx'
import { cn } from '../../lib/cn.ts'
import { SimulationThumbnail } from './SimulationThumbnail.tsx'
import type { SimulationSummary } from './types.ts'
import './SimulationCard.css'

type SimulationCardProps = {
  simulation: SimulationSummary
  /** Nomor urut di Katalog; bila diberikan, tampil sebagai "01 · Kategori". */
  number?: number
  /** `catalog` = ukuran sedikit lebih besar untuk halaman Katalog. */
  variant?: 'compact' | 'catalog'
}

export const SimulationCard = ({ simulation, number, variant = 'compact' }: SimulationCardProps) => {
  const { slug, title, category, summary, curvePath } = simulation

  return (
    <a className={cn('simulation-card', variant === 'catalog' && 'simulation-card--catalog')} href={simulationPath(slug)}>
      <SimulationThumbnail curvePath={curvePath} />
      <Tag className="simulation-card__category">
        {number !== undefined && <span aria-hidden="true">{String(number).padStart(2, '0')} · </span>}
        {category}
      </Tag>
      <h3 className="simulation-card__title">{title}</h3>
      <p className="simulation-card__summary">{summary}</p>
      <span className="simulation-card__cta">Coba simulasi</span>
    </a>
  )
}
