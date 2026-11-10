import { useId } from 'react'
import './SimulationSettings.css'

type SettingToggleProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

/** Saklar hidup/mati untuk satu pengaturan tampilan (true/false). */
export const SettingToggle = ({ label, checked, onChange }: SettingToggleProps) => {
  const id = useId()
  return (
    <div className="setting-toggle">
      <span id={id} className="setting-toggle__label">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        className="setting-toggle__switch"
        onClick={() => onChange(!checked)}
      >
        <span className="setting-toggle__knob" aria-hidden="true" />
      </button>
    </div>
  )
}
