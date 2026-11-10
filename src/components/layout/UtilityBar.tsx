import { ROUTES } from '../../app/routes.ts'
import './UtilityBar.css'

/** Bilah tipis di atas header; disembunyikan di layar kecil. */
export const UtilityBar = () => (
  <div className="utility-bar">
    <a className="utility-bar__search" href={ROUTES.simulations}>
      Cari simulasi, materi, atau topik
    </a>
    <span>Gratis &amp; sumber terbuka</span>
  </div>
)
