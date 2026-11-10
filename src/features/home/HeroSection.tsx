import { ROUTES } from '../../app/routes.ts'
import { BlockOrnament } from '../../components/ui/BlockOrnament.tsx'
import { Button } from '../../components/ui/Button.tsx'
import { Container } from '../../components/ui/Container.tsx'
import { Tag } from '../../components/ui/Tag.tsx'
import { HeroGraph } from './HeroGraph.tsx'
import './HeroSection.css'

export const HeroSection = () => (
  <section className="hero on-dark">
    <BlockOrnament className="hero__ornament" />
    <Container className="hero__inner">
      <div className="hero__copy">
        <Tag tone="gold">Lab Simulasi Matematika</Tag>
        <h1 className="hero__title">Matematika yang bisa dilihat, digeser, dan dipahami.</h1>
        <p className="hero__lead">
          Simulasi interaktif untuk guru dan siswa <span className="hero__nowrap">SMP–SMA</span>. Geser parameter dan lihat grafik berubah
          seketika.
        </p>
        <Button tone="cream" href={ROUTES.simulations}>
          Buka simulasi
        </Button>
      </div>
      <HeroGraph />
    </Container>
  </section>
)
