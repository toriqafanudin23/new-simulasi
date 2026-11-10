import { useState } from 'react'
import { CoordinatePlane } from '../../../components/simulation/CoordinatePlane.tsx'
import { FunctionGraph } from '../../../components/simulation/FunctionGraph.tsx'
import { ParameterSlider } from '../../../components/simulation/ParameterSlider.tsx'
import { PlanePoint } from '../../../components/simulation/PlanePoint.tsx'
import { SettingSlider } from '../../../components/simulation/SettingSlider.tsx'
import { SettingToggle } from '../../../components/simulation/SettingToggle.tsx'
import { SimulationFrame } from '../../../components/simulation/SimulationFrame.tsx'
import { StepSelector } from '../../../components/simulation/StepSelector.tsx'
import { VerticalLine } from '../../../components/simulation/VerticalLine.tsx'
import { useSimulationParams, type ParamDefs } from '../../../hooks/useSimulationParams.ts'
import { useViewport } from '../../../hooks/useViewport.ts'
import { formatNumber } from '../../../lib/formatNumber.ts'
import { evaluate, formatEquation, isQuadratic, roots, vertex } from './quadratic.ts'

type Key = 'a' | 'b' | 'c'

/** Nilai awal f(x) = x² − 2x − 3: puncak (1, −4), akar −1 dan 3. */
const PARAMS: ParamDefs<Key> = {
  a: { default: 1, min: -5, max: 5, step: 0.1 },
  b: { default: -2, min: -20, max: 20, step: 0.1 },
  c: { default: -3, min: -10, max: 10, step: 0.1 },
}

/** Pilihan besar langkah penggeser dan tombol kiri/kanan. */
const STEP_OPTIONS = [0.2, 0.5, 1] as const

/** Ukuran bawaan tampilan (px): tebal garis grafik dan jari-jari titik. */
const DEFAULT_LINE_WIDTH = 4
const DEFAULT_POINT_SIZE = 8

const KEYS: readonly Key[] = ['a', 'b', 'c']

/** Koordinat gaya internasional: "(0.5, −3.5)". */
const point = (x: number, y: number): string => `(${formatNumber(x)}, ${formatNumber(y)})`

const rootsText = (rootValues: readonly number[], quadratic: boolean): string => {
  if (rootValues.length === 0) return 'Tidak ada akar real'
  if (rootValues.length === 1) return quadratic ? `Akar kembar ${formatNumber(rootValues[0])}` : `Akar ${formatNumber(rootValues[0])}`
  return `Akar ${formatNumber(rootValues[0])} dan ${formatNumber(rootValues[1])}`
}

/** f(x) = ax² + bx + c: ubah a, b, c lalu amati puncak, akar, dan sumbu simetri. */
export const QuadraticSimulation = () => {
  const { values, setValue, reset, shareUrl } = useSimulationParams(PARAMS)
  const [step, setStep] = useState<number>(1)
  const [showGrid, setShowGrid] = useState(true)
  const [showCoordinates, setShowCoordinates] = useState(true)
  const [showIntercepts, setShowIntercepts] = useState(true)
  const [lineWidth, setLineWidth] = useState(DEFAULT_LINE_WIDTH)
  const [pointSize, setPointSize] = useState(DEFAULT_POINT_SIZE)
  const { viewport, setViewport, zoomIn, zoomOut, reset: resetView } = useViewport()

  const quadratic = isQuadratic(values)
  const top = vertex(values)
  const rootValues = roots(values)
  const equation = `f(x) = ${formatEquation(values)}`

  return (
    <SimulationFrame
      title="Fungsi Kuadrat"
      equation={equation}
      shareUrl={shareUrl}
      onReset={reset}
      onZoomIn={zoomIn}
      onZoomOut={zoomOut}
      onResetView={resetView}
      parameters={
        <>
          <StepSelector options={STEP_OPTIONS} value={step} onChange={setStep} />
          {KEYS.map((key) => (
            <ParameterSlider
              key={key}
              name={key}
              value={values[key]}
              min={PARAMS[key].min}
              max={PARAMS[key].max}
              step={step}
              onChange={(value) => setValue(key, value)}
            />
          ))}
        </>
      }
      settings={
        <>
          <SettingToggle label="Grid" checked={showGrid} onChange={setShowGrid} />
          <SettingToggle label="Koordinat" checked={showCoordinates} onChange={setShowCoordinates} />
          <SettingToggle label="Titik potong" checked={showIntercepts} onChange={setShowIntercepts} />
          <SettingSlider label="Ukuran garis" value={lineWidth} min={1} max={10} onChange={setLineWidth} />
          <SettingSlider label="Ukuran titik" value={pointSize} min={3} max={16} onChange={setPointSize} />
        </>
      }
      summary={
        <>
          {top ? <p>{`Puncak ${point(top.x, top.y)} · ${rootsText(rootValues, quadratic)}`}</p> : <p>Bukan fungsi kuadrat (a = 0): grafik berupa garis lurus.</p>}
          {top && <p>{`Sumbu simetri x = ${formatNumber(top.x)}`}</p>}
        </>
      }
      stage={
        <CoordinatePlane viewport={viewport} onViewportChange={setViewport} label={`Grafik ${equation}`} showGrid={showGrid}>
          {top && <VerticalLine x={top.x} tone="charcoal" />}
          <FunctionGraph f={(x) => evaluate(values, x)} tone="plum" strokeWidth={lineWidth} />
          {showIntercepts &&
            rootValues.map((root) => (
              <PlanePoint
                key={root}
                x={root}
                y={0}
                tone="red"
                radius={pointSize}
                label={showCoordinates ? point(root, 0) : undefined}
                labelPlacement={top && top.y > 0 ? 'below' : 'above'}
              />
            ))}
          {top && (
            <PlanePoint
              x={top.x}
              y={top.y}
              tone="gold"
              radius={pointSize + 1}
              label={showCoordinates ? point(top.x, top.y) : undefined}
              labelPlacement={values.a > 0 ? 'below' : 'above'}
            />
          )}
        </CoordinatePlane>
      }
    />
  )
}
