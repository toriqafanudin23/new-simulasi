import { faseD, faseE, faseF, LANJUT, PENGAYAAN } from './curriculum.ts'
import type { SimulationSummary } from './types.ts'

/** Seluruh simulasi, dalam urutan tampil di Katalog (nomor urut diambil dari sini).
 * Menambah simulasi: tambah satu objek di sini; Katalog menyesuaikan sendiri. */
export const SIMULATIONS: readonly SimulationSummary[] = [
  {
    slug: 'fungsi-kuadrat',
    title: 'Fungsi Kuadrat',
    category: 'Aljabar',
    summary: 'Parabola, titik puncak, akar, dan sumbu simetri.',
    concepts: ['Parabola', 'Diskriminan', 'Puncak', 'Persamaan kuadrat'],
    cp: [
      faseD('Aljabar', 'Fungsi nonlinear (kuadrat) dan grafiknya'),
      faseE('Aljabar dan Fungsi', 'Persamaan dan fungsi kuadrat'),
    ],
    curvePath: 'M20 10Q75 130 130 10',
  },
  {
    slug: 'transformasi-geometri',
    title: 'Transformasi Geometri',
    category: 'Geometri',
    summary: 'Translasi, rotasi, refleksi, dan dilatasi.',
    concepts: ['Translasi', 'Rotasi', 'Refleksi', 'Dilatasi'],
    cp: [
      faseD('Geometri', 'Transformasi: translasi, refleksi, rotasi, dilatasi'),
      faseF('Aljabar dan Fungsi', 'Matriks untuk transformasi geometri', LANJUT),
    ],
    curvePath: 'M20 90L60 30L110 80L130 20',
  },
  {
    slug: 'trigonometri',
    title: 'Trigonometri',
    category: 'Trigonometri',
    summary: 'Sinus, kosinus, dan tangen pada lingkaran satuan.',
    concepts: ['Sudut', 'Sinus', 'Kosinus', 'Lingkaran satuan'],
    cp: [
      faseE('Geometri', 'Perbandingan trigonometri pada segitiga siku-siku'),
      faseF('Aljabar dan Fungsi', 'Fungsi trigonometri dan lingkaran satuan', LANJUT),
    ],
    curvePath: 'M10 55Q40 5 75 55T140 55',
  },
  {
    slug: 'vektor',
    title: 'Vektor',
    category: 'Vektor',
    summary: 'Penjumlahan, sudut, proyeksi, dan hasil kali titik.',
    concepts: ['Penjumlahan vektor', 'Hasil kali titik', 'Sudut antarvektor', 'Proyeksi vektor'],
    cp: [faseF('Geometri', 'Vektor pada bidang datar dan operasi aljabarnya', LANJUT)],
    curvePath: 'M25 90L105 25M105 25L90 27M105 25L103 41',
  },
  {
    slug: 'sistem-linear',
    title: 'Sistem Linear',
    category: 'Aljabar',
    summary: 'Titik potong garis sebagai solusi sistem persamaan.',
    concepts: ['Persamaan linear', 'Interseksi', 'Sistem', 'Solusi'],
    cp: [
      faseD('Aljabar', 'Sistem persamaan linear'),
      faseE('Aljabar dan Fungsi', 'Sistem persamaan dan pertidaksamaan linear'),
      faseE('Aljabar dan Fungsi', 'Sistem pertidaksamaan linear dan program linear'),
    ],
    curvePath: 'M15 90L135 20M15 25L135 85',
  },
  {
    slug: 'irisan-kerucut',
    title: 'Irisan Kerucut',
    category: 'Geometri',
    summary: 'Elips, parabola, dan hiperbola dari fokus dan parameter.',
    concepts: ['Elips', 'Parabola', 'Hiperbola', 'Fokus'],
    cp: [faseF('Geometri', 'Lingkaran, elips, dan persamaan garis singgung', LANJUT)],
    curvePath: 'M20 55a55 30 0 1 0 110 0a55 30 0 1 0 -110 0',
  },
  {
    slug: 'bangun-ruang-sisi-datar',
    title: 'Bangun Ruang Sisi Datar 3D',
    category: 'Geometri',
    summary: 'Model 3D kubus, limas, prisma, dan jaring-jaringnya.',
    concepts: ['Volume kubus', 'Volume limas', 'Jaring-jaring', 'Prisma', 'Limas', 'Sisi, rusuk, titik sudut'],
    cp: [faseD('Pengukuran', 'Luas permukaan dan volume bangun ruang sisi datar')],
    curvePath: 'M35 40h50v50h-50zM60 20h50v50h-50zM35 40L60 20M85 40L110 20M85 90L110 70M35 90L60 70',
  },
  {
    slug: 'sektor-lingkaran',
    title: 'Sektor Lingkaran',
    category: 'Geometri',
    summary: 'Jari-jari, sudut pusat, panjang busur, dan luas juring.',
    concepts: ['Juring', 'Busur', 'Sudut pusat', 'Lingkaran'],
    cp: [
      faseD('Pengukuran', 'Keliling dan luas lingkaran'),
      faseF('Geometri', 'Teorema lingkaran, panjang busur, dan luas juring'),
    ],
    curvePath: 'M75 55L75 15A40 40 0 0 1 113 69Z',
  },
  {
    slug: 'titik-istimewa-segitiga',
    title: 'Titik Istimewa Segitiga',
    category: 'Geometri',
    summary: 'Titik berat, titik bagi, titik sumbu, titik tinggi, dan garis Euler.',
    concepts: ['Titik berat', 'Titik bagi', 'Titik sumbu', 'Titik tinggi', 'Garis Euler'],
    cp: [faseD('Geometri', 'Garis dan titik istimewa segitiga', PENGAYAAN)],
    curvePath: 'M20 95L130 95L65 20ZM65 20L75 95M20 95L97 57',
  },
  {
    slug: 'teorema-pythagoras',
    title: 'Teorema Pythagoras',
    category: 'Geometri',
    summary: 'Hubungan a² + b² = c² dan buktinya lewat luas persegi.',
    concepts: ['Teorema Pythagoras', 'Segitiga siku-siku', 'Luas persegi', 'Tripel Pythagoras'],
    cp: [faseD('Geometri', 'Teorema Pythagoras dan penerapannya')],
    curvePath: 'M30 95L120 95L30 30ZM30 83h12v12',
  },
  {
    slug: 'garis-singgung-dua-lingkaran',
    title: 'Garis Singgung Dua Lingkaran',
    category: 'Geometri',
    summary: 'Garis singgung persekutuan luar dan dalam, beserta konstruksinya.',
    concepts: ['Lingkaran', 'Garis singgung persekutuan', 'Konstruksi geometri'],
    cp: [faseF('Geometri', 'Teorema lingkaran dan garis singgung persekutuan', PENGAYAAN)],
    curvePath: 'M21 62a24 24 0 1 0 48 0a24 24 0 1 0 -48 0M94 52a14 14 0 1 0 28 0a14 14 0 1 0 -28 0M15 38H135',
  },
  {
    slug: 'transformasi-fungsi',
    title: 'Transformasi Fungsi',
    category: 'Aljabar',
    summary: 'Geser, regangkan, dan refleksikan grafik fungsi.',
    concepts: ['Translasi', 'Peregangan', 'Refleksi', 'Grafik fungsi'],
    cp: [faseF('Aljabar dan Fungsi', 'Transformasi fungsi (linear, kuadrat, eksponensial)')],
    curvePath: 'M10 75C40 75 45 20 75 20S110 75 140 75',
  },
  {
    slug: 'plotter-grafik',
    title: 'Plotter Grafik',
    category: 'Fungsi',
    summary: 'Gambar fungsi dan amati perilakunya.',
    concepts: ['Grafik fungsi', 'Ekspresi', 'Plot', 'Analisis visual'],
    cp: [
      faseE('Aljabar dan Fungsi', 'Grafik fungsi kuadrat, eksponensial, dan logaritma'),
      faseF('Aljabar dan Fungsi', 'Berbagai fungsi untuk memodelkan fenomena', LANJUT),
    ],
    curvePath: 'M15 95L55 50L95 70L135 15',
  },
  {
    slug: 'turunan',
    title: 'Turunan',
    category: 'Kalkulus',
    summary: 'Tali busur yang mendekati garis singgung di satu titik.',
    concepts: ['Turunan', 'Garis singgung', 'Laju perubahan', 'Kemonotonan'],
    cp: [faseF('Kalkulus', 'Laju perubahan sesaat, turunan, garis singgung, dan optimasi', LANJUT)],
    curvePath: 'M15 95Q75 -35 135 95M15 79L85 3',
  },
  {
    slug: 'integral',
    title: 'Integral',
    category: 'Kalkulus',
    summary: 'Jumlah Riemann yang mendekati luas di bawah kurva.',
    concepts: ['Integral', 'Luas daerah', 'Riemann', 'Aproksimasi'],
    cp: [faseF('Kalkulus', 'Integral sebagai kebalikan turunan dan penghitung luas', LANJUT)],
    curvePath: 'M15 90Q75 -10 135 90',
  },
]

const findSimulation = (slug: string): SimulationSummary => {
  const simulation = SIMULATIONS.find((item) => item.slug === slug)
  if (!simulation) throw new Error(`Simulasi tidak ditemukan: ${slug}`)
  return simulation
}

/** Simulasi pilihan di Beranda (diambil dari daftar di atas, jadi selalu ada di Katalog). */
const FEATURED_SLUGS = ['fungsi-kuadrat', 'integral', 'trigonometri'] as const

export const FEATURED_SIMULATIONS: readonly SimulationSummary[] = FEATURED_SLUGS.map(findSimulation)
