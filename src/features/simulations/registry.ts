import { lazy, type ComponentType } from 'react'

/** Isi halaman sebuah simulasi, di luar data katalog (lihat `data.ts`). */
export type SimulationPageContent = {
  /** Kalimat pengantar di bawah judul. */
  lead: string
  /** Tujuan pembelajaran, satu kalimat. */
  goal: string
  /** Simulasi interaktifnya; dimuat saat halaman dibuka. */
  Component: ComponentType
}

/**
 * Simulasi yang halamannya sudah dibuat, menurut slug di `data.ts`.
 * Menambah simulasi: buat folder di sini, lalu daftarkan di bawah.
 */
export const SIMULATION_PAGES: Readonly<Record<string, SimulationPageContent>> = {
  'fungsi-kuadrat': {
    lead: 'Amati puncak, akar, dan sumbu simetri parabola saat koefisien berubah.',
    goal: 'Siswa dapat menentukan titik puncak, akar, dan sumbu simetri dari bentuk umum fungsi kuadrat.',
    Component: lazy(() =>
      import('./fungsi-kuadrat/QuadraticSimulation.tsx').then((module) => ({ default: module.QuadraticSimulation })),
    ),
  },
}
