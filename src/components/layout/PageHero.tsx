import type { ReactNode } from 'react'
import { BlockOrnament } from '../ui/BlockOrnament.tsx'
import { Container } from '../ui/Container.tsx'
import { cn } from '../../lib/cn.ts'
import './PageHero.css'

type Crumb = {
  label: string
  /** Kosongkan untuk halaman saat ini (butir terakhir). */
  href?: string
}

type PageHeroProps = {
  /** `listing` = lebar, marun, berornamen (daftar/katalog); `detail` = ringkas, ungu (halaman satu item). */
  variant: 'listing' | 'detail'
  crumbs: readonly Crumb[]
  title: string
  /** Kalimat pengantar yang selalu tampil. */
  lead?: ReactNode
  /** Lanjutan pengantar; disembunyikan di layar kecil. */
  leadMore?: ReactNode
}

/** Pembuka halaman dalam: jejak halaman, judul h1, dan pengantar singkat. */
export const PageHero = ({ variant, crumbs, title, lead, leadMore }: PageHeroProps) => (
  <section className={cn('page-hero', 'on-dark', `page-hero--${variant}`)}>
    {variant === 'listing' && <BlockOrnament tone="maroon" className="page-hero__ornament" />}
    <Container className="page-hero__inner">
      <nav aria-label="Jejak halaman">
        <ol className="page-hero__crumbs">
          {crumbs.map(({ label, href }, index) => {
            const isCurrent = index === crumbs.length - 1
            return (
              <li key={label} aria-current={isCurrent ? 'page' : undefined}>
                {href && !isCurrent ? <a href={href}>{label}</a> : label}
              </li>
            )
          })}
        </ol>
      </nav>
      <h1 className="page-hero__title">{title}</h1>
      {(lead || leadMore) && (
        <p className="page-hero__lead">
          {lead}
          {lead && leadMore ? ' ' : null}
          {leadMore && <span className="page-hero__lead-more">{leadMore}</span>}
        </p>
      )}
    </Container>
  </section>
)
