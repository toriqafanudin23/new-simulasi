/** Seluruh path aplikasi di satu tempat; ganti di sini bila struktur URL berubah. */
export const ROUTES = {
  home: '/',
  simulations: '/simulasi',
  practice: '/latihan',
  about: '/tentang',
  curriculum: '/kurikulum-merdeka',
  privacy: '/kebijakan-privasi',
  contact: '/kontak',
  newsletter: '/berlangganan',
} as const

export const simulationPath = (slug: string): string => `${ROUTES.simulations}/${slug}`
