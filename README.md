# 1729 — Lab Simulasi Matematika

Dibangun ulang dari awal mengikuti panduan "Desain UI Akademik Klasik".
Tahap saat ini: **Beranda**, **Katalog Simulasi** (`/simulasi`), dan halaman simulasi pertama: **Fungsi Kuadrat** (`/simulasi/fungsi-kuadrat`).

## Menjalankan

```bash
npm install
npm run dev
npm run build
```

## Struktur

```
src/
  app/          App dan ROUTES (satu tempat untuk semua path)
  styles/       fonts, tokens (warna, tipografi, jarak), base
  hooks/        hook umum (useDisclosure)
  lib/          utilitas kecil (cn)
  components/
    ui/         Button, TextLink, Tag, Container, LabeledSection, BlockOrnament
    layout/     SiteLayout, UtilityBar, SiteHeader, SiteFooter, Logo
  features/
    home/       HomePage dan seksi-seksinya
    catalog/    CatalogPage: hero, pencarian + filter Fase/Elemen (filter.ts), grid kartu
    not-found/  halaman untuk alamat yang belum ada (mis. halaman tiap simulasi)
    simulations/ tipe, data (15 simulasi), curriculum (CP), SimulationCard, SimulationPage, registry.ts,
                 dan satu folder per simulasi (mis. fungsi-kuadrat/)
```

## Konvensi

- Warna, font, dan jarak hanya diambil dari `styles/tokens.css`.
- Satu komponen = satu `.tsx` + satu `.css` (kelas BEM) di folder yang sama.
- Impor langsung ke berkas (tanpa barrel `index.ts`) agar bundle tetap kecil.
- Menambah simulasi: tambah satu objek di `SIMULATIONS` (`features/simulations/data.ts`); Katalog menyesuaikan sendiri
  (nomor urut mengikuti urutan di sana, pilihan filter Fase/Elemen dibuat dari data CP-nya).
  Simulasi pilihan Beranda dipilih lewat `FEATURED_SLUGS` di berkas yang sama.
- Menambah halaman: buat folder di `features/`, bungkus dengan `SiteLayout`, daftarkan path di `ROUTES` dan tambahkan `case` di `app/App.tsx` (routing ringan tanpa pustaka; tautan berupa `<a>` biasa).


## Kit simulasi (`src/components/simulation/`)

Bahan bangun yang dipakai ulang semua simulasi. Tanpa dependensi tambahan (grafik digambar dengan SVG).

| Komponen / hook | Fungsi |
| --- | --- |
| `SimulationFrame` | Kerangka: panel Parameter + Hasil, panggung, tombol zoom, Atur ulang, Bagikan, dan mode layar penuh |
| `FullscreenProvider` / `useFullscreen` | Status layar penuh (Fullscreen API bila tersedia, Esc keluar, fokus kembali ke pembuka) |
| `CoordinatePlane` | Bidang koordinat: grid, sumbu, angka; geser (seret / panah), zoom (tombol, +/−, Ctrl+gulir) |
| `FunctionGraph`, `PlanePoint`, `VerticalLine` | Isi bidang koordinat, ditulis dalam koordinat matematika |
| `ParameterSlider` | Penggeser berlabel nilai ("a = 1") dengan tombol kiri/kanan; keyboard dan sentuh |
| `StepSelector` | Pemilih besar langkah (±0,2 / ±0,5 / ±1) untuk penggeser dan tombol kiri/kanan |
| `useSimulationParams` (hooks/) | Nilai parameter + reset + tautan bagikan; nilai awal dibaca dari `?a=2&b=-1` |
| `useViewport` (hooks/) | Bidang pandang (pusat + zoom) untuk `CoordinatePlane` dan tombol zoom |
| `formatNumber` (lib/) | Angka dengan titik desimal (0.5) dan minus matematika (−); koordinat ditulis (x, y) |

`PlaneContext`/`usePlane` memberi akses ke pemetaan koordinat ↔ piksel bila perlu elemen gambar baru
(mis. `HorizontalLine`, `PlaneSegment`); cukup satu berkas kecil seperti `VerticalLine.tsx`.

## Menambah simulasi baru

1. Pastikan simulasinya ada di `SIMULATIONS` (`features/simulations/data.ts`).
2. Buat folder `features/simulations/<slug>/` berisi **matematika murni** (`*.ts`, mudah diuji) dan komponen
   simulasi yang menyusun kit di atas. Contoh lengkap: `fungsi-kuadrat/`.
3. Daftarkan di `registry.ts`: `lead` (pengantar), `goal` (tujuan pembelajaran), dan `Component` (dimuat malas).

Slug yang belum didaftarkan menampilkan halaman "belum tersedia".
