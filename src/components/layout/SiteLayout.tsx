import type { ReactNode } from 'react'
import { SiteFooter } from './SiteFooter.tsx'
import { SiteHeader } from './SiteHeader.tsx'
import { UtilityBar } from './UtilityBar.tsx'

const MAIN_CONTENT_ID = 'konten-utama'

type SiteLayoutProps = {
  children: ReactNode
}

/** Kerangka halaman: utility bar, header, konten, footer. Dipakai semua halaman. */
export const SiteLayout = ({ children }: SiteLayoutProps) => (
  <>
    <a className="skip-link" href={`#${MAIN_CONTENT_ID}`}>
      Lewati ke konten utama
    </a>
    <UtilityBar />
    <SiteHeader />
    <main id={MAIN_CONTENT_ID}>{children}</main>
    <SiteFooter />
  </>
)
