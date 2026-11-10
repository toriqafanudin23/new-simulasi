import { SiteLayout } from '../components/layout/SiteLayout.tsx'
import { CatalogPage } from '../features/catalog/CatalogPage.tsx'
import { HomePage } from '../features/home/HomePage.tsx'
import { NotFoundPage } from '../features/not-found/NotFoundPage.tsx'
import { SimulationPage } from '../features/simulations/SimulationPage.tsx'
import { ROUTES, simulationPath } from './routes.ts'

/** Tanpa garis miring penutup, kecuali untuk "/". */
const normalizePath = (pathname: string): string => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname)

const SIMULATION_PREFIX = simulationPath('')

const renderPage = (pathname: string) => {
  const path = normalizePath(pathname)
  if (path === ROUTES.home) return <HomePage />
  if (path === ROUTES.simulations) return <CatalogPage />
  if (path.startsWith(SIMULATION_PREFIX)) return <SimulationPage slug={path.slice(SIMULATION_PREFIX.length)} />
  return <NotFoundPage />
}

/** Akar aplikasi. Semua tautan berupa <a> biasa (halaman dimuat ulang), jadi path cukup dibaca sekali.
 * Halaman baru: tambahkan satu baris `if` di atas dan path-nya di `ROUTES`. */
export const App = () => <SiteLayout>{renderPage(window.location.pathname)}</SiteLayout>
