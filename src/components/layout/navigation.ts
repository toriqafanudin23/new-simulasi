import { ROUTES } from '../../app/routes.ts'

export type NavLink = {
  label: string
  href: string
}

/** Tautan utama: tampil di header (desktop) dan di panel menu. */
export const PRIMARY_NAV: readonly NavLink[] = [
  { label: 'Simulasi', href: ROUTES.simulations },
  { label: 'Latihan', href: ROUTES.practice },
  { label: 'Tentang', href: ROUTES.about },
]

/** Kolom tautan footer; panel menu memakai tautan kedua sebagai pelengkap. */
export const FOOTER_NAV: readonly (readonly NavLink[])[] = [
  [
    { label: 'Simulasi', href: ROUTES.simulations },
    { label: 'Latihan', href: ROUTES.practice },
    { label: 'Katalog', href: ROUTES.simulations },
  ],
  [
    { label: 'Tentang', href: ROUTES.about },
    { label: 'Kurikulum Merdeka', href: ROUTES.curriculum },
    { label: 'Kebijakan Privasi', href: ROUTES.privacy },
    { label: 'Kontak', href: ROUTES.contact },
  ],
]

const PRIMARY_HREFS = new Set(PRIMARY_NAV.map(({ href }) => href))

/** Tautan pelengkap di panel menu: kolom footer kedua tanpa duplikat tautan utama. */
export const MENU_EXTRA_NAV: readonly NavLink[] = (FOOTER_NAV[1] ?? []).filter(
  ({ href }) => !PRIMARY_HREFS.has(href),
)
