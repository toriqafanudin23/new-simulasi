import { ROUTES } from '../../app/routes.ts'
import { BlockOrnament } from '../../components/ui/BlockOrnament.tsx'
import { Button } from '../../components/ui/Button.tsx'
import { Container } from '../../components/ui/Container.tsx'
import { Tag } from '../../components/ui/Tag.tsx'
import { TextLink } from '../../components/ui/TextLink.tsx'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import './NotFoundPage.css'

/** Untuk alamat yang belum ada atau halamannya belum dibuat (mis. halaman tiap simulasi). */
export const NotFoundPage = () => {
  usePageTitle('Halaman belum tersedia — 1729')

  return (
    <section className="not-found on-dark">
      <BlockOrnament className="not-found__ornament" />
      <Container className="not-found__inner">
        <Tag tone="gold">Halaman belum tersedia</Tag>
        <h1 className="not-found__title">Bagian ini masih dalam pembuatan.</h1>
        <p className="not-found__text">Alamat yang Anda buka belum ada. Mulailah dari beranda atau telusuri katalog simulasi.</p>
        <div className="not-found__actions">
          <Button tone="cream" href={ROUTES.home}>
            Ke beranda
          </Button>
          <TextLink variant="bar" href={ROUTES.simulations}>
            Lihat semua simulasi
          </TextLink>
        </div>
      </Container>
    </section>
  )
}
