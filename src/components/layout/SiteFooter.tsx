import { ROUTES } from '../../app/routes.ts'
import { Container } from '../ui/Container.tsx'
import { Button } from '../ui/Button.tsx'
import { Logo } from './Logo.tsx'
import { FOOTER_NAV } from './navigation.ts'
import './SiteFooter.css'

export const SiteFooter = () => (
  <footer className="site-footer on-dark">
    <Container className="site-footer__inner">
      <div>
        <div className="site-footer__logo">
          <Logo />
        </div>
        <nav className="site-footer__columns" aria-label="Footer">
          {FOOTER_NAV.map((column) => (
            <ul className="site-footer__column" key={column[0]?.label}>
              {column.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          ))}
        </nav>
      </div>

      <section className="site-footer__newsletter" aria-labelledby="newsletter-title">
        <h2 id="newsletter-title" className="site-footer__newsletter-title">
          Kabar simulasi baru di surel Anda.
        </h2>
        <p>Dapatkan simulasi terbaru setiap bulan.</p>
        <Button href={ROUTES.newsletter}>Berlangganan</Button>
      </section>
    </Container>

    <Container className="site-footer__legal">
      © {new Date().getFullYear()} Lab Simulasi Matematika 1729. Semua hak dilindungi.
    </Container>
  </footer>
)
