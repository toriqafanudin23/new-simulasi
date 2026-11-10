import { cn } from '../../lib/cn.ts'
import './BlockOrnament.css'

type BlockOrnamentProps = {
  /** Warna dasar latar: `plum` (ungu, bawaan) atau `maroon`. Ornamen selalu sedikit lebih gelap dari latarnya. */
  tone?: 'plum' | 'maroon'
  className?: string
}

/** Satu-satunya ornamen desain: pola balok geometris tonal. Hanya dekoratif. */
export const BlockOrnament = ({ tone = 'plum', className }: BlockOrnamentProps) => (
  <svg
    className={cn('block-ornament', `block-ornament--${tone}`, className)}
    aria-hidden="true"
    focusable="false"
    width="360"
    height="300"
    viewBox="0 0 360 300"
  >
    <rect x="200" y="20" width="36" height="110" />
    <rect x="250" y="150" width="90" height="36" />
    <rect x="50" y="100" width="110" height="36" transform="rotate(-40 90 120)" />
    <rect x="70" y="205" width="100" height="34" transform="rotate(40 120 220)" />
    <rect x="290" y="40" width="34" height="34" />
  </svg>
)
