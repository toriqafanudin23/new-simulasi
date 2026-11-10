import { useState } from 'react'
import { PageHero } from '../../components/layout/PageHero.tsx'
import { Container } from '../../components/ui/Container.tsx'
import { ROUTES } from '../../app/routes.ts'
import { terbilang } from '../../lib/terbilang.ts'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { SIMULATIONS } from '../simulations/data.ts'
import { SimulationCard } from '../simulations/SimulationCard.tsx'
import { CatalogFilter } from './CatalogFilter.tsx'
import { EMPTY_FILTER, matchesFilter, type CatalogFilterState } from './filter.ts'
import './CatalogPage.css'

const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1)

/** Nomor urut mengikuti urutan katalog penuh, sehingga tidak berubah saat disaring. */
const NUMBERED = SIMULATIONS.map((simulation, index) => ({ simulation, number: index + 1 }))

export const CatalogPage = () => {
  usePageTitle('Simulasi — 1729')
  const [filter, setFilter] = useState<CatalogFilterState>(EMPTY_FILTER)

  const visible = NUMBERED.filter(({ simulation }) => matchesFilter(simulation, filter))

  return (
    <>
      <PageHero
        variant="listing"
        crumbs={[{ label: 'Beranda', href: ROUTES.home }, { label: 'Simulasi' }]}
        title="Simulasi"
        lead={`${capitalize(terbilang(SIMULATIONS.length))} simulasi siap pakai.`}
        leadMore="Cari berdasarkan topik atau Capaian Pembelajaran."
      />

      <div className="catalog__filter-band">
        <Container>
          <CatalogFilter value={filter} onChange={setFilter} total={SIMULATIONS.length} shown={visible.length} />
        </Container>
      </div>

      <Container className="catalog__results">
        {visible.length > 0 ? (
          <ul className="catalog__grid" aria-label="Daftar simulasi">
            {visible.map(({ simulation, number }) => (
              <li key={simulation.slug}>
                <SimulationCard simulation={simulation} number={number} variant="catalog" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="catalog__empty">
            Tidak ada simulasi yang cocok. Coba kata kunci atau filter lain, atau pilih “Hapus filter”.
          </p>
        )}
      </Container>
    </>
  )
}
