import { ROUTES } from '../../app/routes.ts'
import { Button } from '../../components/ui/Button.tsx'
import { LabeledSection } from '../../components/ui/LabeledSection.tsx'
import { FEATURED_SIMULATIONS } from '../simulations/data.ts'
import { SimulationCard } from '../simulations/SimulationCard.tsx'
import './FeaturedSimulations.css'

export const FeaturedSimulations = () => (
  <LabeledSection label="Simulasi pilihan">
    <ul className="featured-simulations__grid">
      {FEATURED_SIMULATIONS.map((simulation) => (
        <li key={simulation.slug}>
          <SimulationCard simulation={simulation} />
        </li>
      ))}
    </ul>
    <p className="featured-simulations__more">
      <Button href={ROUTES.simulations}>Lihat semua simulasi</Button>
    </p>
  </LabeledSection>
)
