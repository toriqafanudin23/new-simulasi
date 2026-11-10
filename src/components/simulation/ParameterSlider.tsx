import { useId, type ChangeEvent } from 'react'
import { formatNumber } from '../../lib/formatNumber.ts'
import './ParameterSlider.css'

type ParameterSliderProps = {
  /** Nama parameter, mis. "a". Ditampilkan sebagai "a = 1". */
  name: string
  value: number
  min: number
  max: number
  /** Besar langkah penggeser dan tombol kiri/kanan (lihat <StepSelector>). */
  step: number
  onChange: (value: number) => void
}

const EPSILON = 1e-9

/** Kelipatan `step` berikutnya ke atas/bawah dari `value`; nilai di luar kelipatan jatuh ke garis terdekat searah. */
const neighbour = (value: number, step: number, direction: 1 | -1): number =>
  direction === 1 ? (Math.floor(value / step + EPSILON) + 1) * step : (Math.ceil(value / step - EPSILON) - 1) * step

const Arrow = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d={direction === 'left' ? 'M10.5 2.5 5 8l5.5 5.5' : 'M5.5 2.5 11 8l-5.5 5.5'} fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)

/** Label bernilai langsung ("a = 1"), penggeser, dan tombol kiri/kanan. Mendukung keyboard dan sentuh. */
export const ParameterSlider = ({ name, value, min, max, step, onChange }: ParameterSliderProps) => {
  const id = useId()
  const text = formatNumber(value)
  const nudge = (direction: 1 | -1) => onChange(Math.min(max, Math.max(min, neighbour(value, step, direction))))

  return (
    <div className="parameter-slider">
      <label className="parameter-slider__label" htmlFor={id}>
        {name} = {text}
      </label>
      <div className="parameter-slider__row">
        <button
          type="button"
          className="parameter-slider__step"
          aria-label={`Kurangi ${name} sebesar ${formatNumber(step)}`}
          disabled={value <= min}
          onClick={() => nudge(-1)}
        >
          <Arrow direction="left" />
        </button>
        <input
          id={id}
          className="parameter-slider__input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={`${name} sama dengan ${text}`}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value))}
        />
        <button
          type="button"
          className="parameter-slider__step"
          aria-label={`Tambah ${name} sebesar ${formatNumber(step)}`}
          disabled={value >= max}
          onClick={() => nudge(1)}
        >
          <Arrow direction="right" />
        </button>
      </div>
    </div>
  )
}
