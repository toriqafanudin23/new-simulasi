import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn.ts'
import { Tag } from '../ui/Tag.tsx'
import { useFullscreen } from './FullscreenContext.ts'
import './SimulationFrame.css'
import './SimulationSettings.css'

type SimulationFrameProps = {
  title: string
  /** Rumus singkat berupa teks biasa, mis. "f(x) = x² − 2x − 3". Tampil di atas grafik atau di panel, sesuai ukuran layar. */
  equation: string
  /** Penggeser parameter (<ParameterSlider>). */
  parameters: ReactNode
  /** Pengaturan tampilan (<SettingToggle>, <SettingSlider>); dilipat di bawah parameter. Opsional. */
  settings?: ReactNode
  /** Hasil perhitungan dalam satu-dua baris. */
  summary: ReactNode
  /** Panggung simulasi, biasanya <CoordinatePlane>. */
  stage: ReactNode
  /** Tautan ke keadaan simulasi saat ini; disalin oleh tombol Bagikan. */
  shareUrl: string
  onReset: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetView: () => void
}

const STATUS_MS = 3000

/**
 * Kerangka satu simulasi: panel parameter + hasil di samping/bawah panggung, tombol zoom,
 * dan mode layar penuh (bilah atas, panel melayang). Mode diatur oleh <FullscreenProvider>.
 */
export const SimulationFrame = ({
  title,
  equation,
  parameters,
  settings,
  summary,
  stage,
  shareUrl,
  onReset,
  onZoomIn,
  onZoomOut,
  onResetView,
}: SimulationFrameProps) => {
  const { fullscreen, exit } = useFullscreen()
  const [panelOpen, setPanelOpen] = useState(true)
  const [status, setStatus] = useState('')
  const exitButton = useRef<HTMLButtonElement>(null)
  const statusTimer = useRef<number>(undefined)

  useEffect(() => {
    if (fullscreen) exitButton.current?.focus()
  }, [fullscreen])

  useEffect(() => () => window.clearTimeout(statusTimer.current), [])

  const announce = (message: string) => {
    setStatus(message)
    window.clearTimeout(statusTimer.current)
    statusTimer.current = window.setTimeout(() => setStatus(''), STATUS_MS)
  }

  const share = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      announce('Tautan disalin.')
    } catch {
      window.prompt('Salin tautan ini:', shareUrl)
    }
  }

  const reset = () => {
    onReset()
    announce('Parameter dikembalikan.')
  }

  return (
    <section className={cn('simulation-frame', fullscreen && 'simulation-frame--fullscreen')} aria-label={`Simulasi ${title}`}>
      {fullscreen && (
        <div className="simulation-frame__bar on-dark">
          <div className="simulation-frame__bar-group">
            <button ref={exitButton} type="button" className="simulation-frame__bar-button" onClick={exit}>
              Keluar
            </button>
            <span className="simulation-frame__bar-title">{title}</span>
          </div>
          <div className="simulation-frame__bar-group">
            <button type="button" className="simulation-frame__bar-button" aria-pressed={panelOpen} onClick={() => setPanelOpen((open) => !open)}>
              Parameter
            </button>
            <button type="button" className="simulation-frame__bar-button" onClick={reset}>
              Atur ulang
            </button>
            <button type="button" className="simulation-frame__bar-button" onClick={share}>
              Bagikan
            </button>
          </div>
        </div>
      )}

      <div className="simulation-frame__stage">
        {stage}
        <p className="simulation-frame__equation">{equation}</p>
        <div className="simulation-frame__zoom" role="group" aria-label="Zoom grafik">
          <button type="button" className="simulation-frame__zoom-button" aria-label="Perbesar" onClick={onZoomIn}>
            <span aria-hidden="true">+</span>
          </button>
          <button type="button" className="simulation-frame__zoom-button" aria-label="Perkecil" onClick={onZoomOut}>
            <span aria-hidden="true">−</span>
          </button>
          <button type="button" className="simulation-frame__zoom-button" aria-label="Kembalikan tampilan grafik" onClick={onResetView}>
            <span aria-hidden="true">⌂</span>
          </button>
        </div>
        <p className="simulation-frame__status" role="status">
          {status}
        </p>
      </div>

      <aside className="simulation-frame__panel" aria-label="Parameter dan hasil" hidden={fullscreen && !panelOpen}>
        <Tag className="simulation-frame__heading">Parameter</Tag>
        <div className="simulation-frame__parameters">{parameters}</div>

        {settings && (
          <details className="simulation-settings">
            <summary className="simulation-settings__summary">
              <Tag>Pengaturan</Tag>
            </summary>
            <div className="simulation-settings__body">{settings}</div>
          </details>
        )}

        <div className="simulation-frame__results" aria-live="polite">
          <Tag className="simulation-frame__heading simulation-frame__results-heading">Hasil</Tag>
          <p className="simulation-frame__results-equation">{equation}</p>
          <div className="simulation-frame__summary">{summary}</div>
        </div>

        <div className="simulation-frame__actions">
          <button type="button" className="simulation-frame__action" onClick={reset}>
            Atur ulang
          </button>
          <button type="button" className="simulation-frame__action" onClick={share}>
            Bagikan
          </button>
        </div>
      </aside>
    </section>
  )
}
