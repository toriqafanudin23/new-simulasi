import { formatNumber } from '../../lib/formatNumber.ts'
import './StepSelector.css'

type StepSelectorProps = {
  /** Pilihan besar langkah, mis. [0.2, 0.5, 1]. */
  options: readonly number[]
  value: number
  onChange: (step: number) => void
  label?: string
}

/** Pemilih besar langkah untuk penggeser dan tombol kiri/kanan ParameterSlider. */
export const StepSelector = ({ options, value, onChange, label = 'Langkah geser' }: StepSelectorProps) => (
  <div className="step-selector" role="group" aria-label={label}>
    <span className="step-selector__label" aria-hidden="true">
      {label}
    </span>
    <div className="step-selector__options">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className="step-selector__option"
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          ±{formatNumber(option)}
        </button>
      ))}
    </div>
  </div>
)
