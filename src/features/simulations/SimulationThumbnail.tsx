import './SimulationThumbnail.css'

type SimulationThumbnailProps = {
  curvePath: string
}

/** Sumbu koordinat dengan satu kurva; ilustrasi ringkas untuk kartu simulasi. */
export const SimulationThumbnail = ({ curvePath }: SimulationThumbnailProps) => (
  <div className="simulation-thumbnail">
    <svg aria-hidden="true" focusable="false" width="140" height="100" viewBox="0 0 150 110" fill="none">
      <path d="M10 55h130M75 5v100" stroke="var(--color-charcoal)" strokeOpacity=".3" />
      <path d={curvePath} stroke="var(--color-plum)" strokeWidth="3" />
    </svg>
  </div>
)
