import { Suspense } from 'react'
import { ROUTES } from '../../app/routes.ts'
import { PageHero } from '../../components/layout/PageHero.tsx'
import { ActionButton } from '../../components/ui/ActionButton.tsx'
import { Container } from '../../components/ui/Container.tsx'
import { LabeledSection } from '../../components/ui/LabeledSection.tsx'
import { FullscreenProvider } from '../../components/simulation/FullscreenProvider.tsx'
import { useFullscreen } from '../../components/simulation/FullscreenContext.ts'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { NotFoundPage } from '../not-found/NotFoundPage.tsx'
import { SIMULATIONS } from './data.ts'
import { SIMULATION_PAGES, type SimulationPageContent } from './registry.ts'
import type { SimulationSummary } from './types.ts'
import './SimulationPage.css'

const FullscreenButton = () => {
  const { enter } = useFullscreen()
  return <ActionButton onClick={enter}>Buka layar penuh</ActionButton>
}

const SimulationView = ({ simulation, content }: { simulation: SimulationSummary; content: SimulationPageContent }) => {
  usePageTitle(`${simulation.title} — 1729`)
  const { Component } = content

  return (
    <>
      <PageHero
        variant="detail"
        crumbs={[{ label: 'Beranda', href: ROUTES.home }, { label: 'Simulasi', href: ROUTES.simulations }, { label: simulation.title }]}
        title={simulation.title}
        leadMore={content.lead}
      />
      <FullscreenProvider>
        <Container className="simulation-page__stage">
          <Suspense fallback={<p className="simulation-page__loading">Memuat simulasi…</p>}>
            <Component />
          </Suspense>
        </Container>
        <LabeledSection label="Tujuan pembelajaran">
          <p className="simulation-page__goal">{content.goal}</p>
          <FullscreenButton />
        </LabeledSection>
      </FullscreenProvider>
    </>
  )
}

/** Halaman /simulasi/<slug>. Slug yang belum punya halaman menampilkan "belum tersedia". */
export const SimulationPage = ({ slug }: { slug: string }) => {
  const simulation = SIMULATIONS.find((item) => item.slug === slug)
  const content = SIMULATION_PAGES[slug]
  if (!simulation || !content) return <NotFoundPage />
  return <SimulationView simulation={simulation} content={content} />
}
