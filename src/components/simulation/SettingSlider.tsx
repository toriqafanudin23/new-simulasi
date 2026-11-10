import { useId, type ChangeEvent } from 'react'
import { formatNumber } from '../../lib/formatNumber.ts'
import './ParameterSlider.css'
import './SimulationSettings.css'

type SettingSliderProps = {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}

/** Penggeser kecil untuk pengaturan tampilan (ukuran garis, ukuran titik, dst). */
export const SettingSlider = ({ label, value, min, max, step = 1, onChange }: SettingSliderProps) => {
  const id = useId()
  return (
    <div className="setting-slider">
      <label className="setting-slider__label" htmlFor={id}>
        <span>{label}</span>
        <span className="setting-slider__value">{formatNumber(value)}</span>
      </label>
      <input
        id={id}
        className="parameter-slider__input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value))}
      />
    </div>
  )
}
