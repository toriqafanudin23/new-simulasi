import type { ReactNode } from 'react'
import { useId } from 'react'
import { Container } from './Container.tsx'
import './LabeledSection.css'

type LabeledSectionProps = {
  label: string
  children: ReactNode
}

/** Pola tata letak desain: label bagian di kiri, isi di kanan (bertumpuk di layar kecil). */
export const LabeledSection = ({ label, children }: LabeledSectionProps) => {
  const headingId = useId()

  return (
    <Container as="section" className="labeled-section" aria-labelledby={headingId}>
      <h2 id={headingId} className="labeled-section__label">
        {label}
      </h2>
      <div>{children}</div>
    </Container>
  )
}
