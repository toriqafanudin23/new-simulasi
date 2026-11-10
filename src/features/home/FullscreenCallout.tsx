import { ROUTES } from '../../app/routes.ts'
import { BlockOrnament } from '../../components/ui/BlockOrnament.tsx'
import { Container } from '../../components/ui/Container.tsx'
import { TextLink } from '../../components/ui/TextLink.tsx'
import './FullscreenCallout.css'

export const FullscreenCallout = () => (
  <Container as="section" className="fullscreen-callout" aria-labelledby="fullscreen-callout-title">
    <div className="fullscreen-callout__panel on-dark">
      <BlockOrnament className="fullscreen-callout__ornament" />
      <h2 id="fullscreen-callout-title" className="fullscreen-callout__title">
        Mode layar penuh untuk proyektor.
      </h2>
      <p className="fullscreen-callout__text">Tampilan besar dan bersih, siap dipakai di depan kelas.</p>
      <TextLink variant="bar" href={ROUTES.simulations}>
        Coba mode layar penuh
      </TextLink>
    </div>
  </Container>
)
