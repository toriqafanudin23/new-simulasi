/** Ilustrasi hero: parabola dengan titik puncak (emas) dan dua akar (merah). */
export const HeroGraph = () => (
  <svg
    className="hero__graph"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 520 360"
    fill="none"
  >
    <g stroke="var(--color-cream)">
      <path d="M20 180h480M260 10v340" strokeOpacity=".35" />
      <path d="M60 20C130 340 200 340 260 340S390 340 460 20" strokeWidth="3" />
    </g>
    <circle cx="260" cy="338" r="7" fill="var(--color-gold)" />
    <circle cx="158" cy="180" r="6" fill="var(--color-red)" />
    <circle cx="362" cy="180" r="6" fill="var(--color-red)" />
  </svg>
)
