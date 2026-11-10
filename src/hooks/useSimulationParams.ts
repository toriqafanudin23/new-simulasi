import { useCallback, useState } from 'react'

export type ParamDef = { default: number; min: number; max: number; step: number }
export type ParamDefs<K extends string> = Readonly<Record<K, ParamDef>>
export type ParamValues<K extends string> = Record<K, number>

const decimalsOf = (step: number): number => step.toString().split('.')[1]?.length ?? 0

/** Membatasi ke rentang dan membulatkan ke kelipatan langkah (menghindari 0,30000000000000004). */
const snap = ({ min, max, step }: ParamDef, value: number): number => {
  const clamped = Math.min(max, Math.max(min, value))
  return Number((Math.round(clamped / step) * step).toFixed(decimalsOf(step)))
}

const keysOf = <K extends string>(defs: ParamDefs<K>): K[] => Object.keys(defs) as K[]

const defaultsOf = <K extends string>(defs: ParamDefs<K>): ParamValues<K> =>
  Object.fromEntries(keysOf(defs).map((key) => [key, defs[key].default])) as ParamValues<K>

/** Nilai awal: dari query string (mis. ?a=2&b=-1) bila valid, selain itu bawaan. */
const readFromUrl = <K extends string>(defs: ParamDefs<K>): ParamValues<K> => {
  const query = new URLSearchParams(window.location.search)
  const values = defaultsOf(defs)
  for (const key of keysOf(defs)) {
    const raw = query.get(key)
    if (raw === null || raw.trim() === '') continue
    const parsed = Number(raw)
    if (Number.isFinite(parsed)) values[key] = snap(defs[key], parsed)
  }
  return values
}

/**
 * Parameter sebuah simulasi: nilai, perubahan, reset, dan tautan yang bisa dibagikan.
 * `defs` harus konstan (didefinisikan di luar komponen).
 */
export const useSimulationParams = <K extends string>(defs: ParamDefs<K>) => {
  const [values, setValues] = useState<ParamValues<K>>(() => readFromUrl(defs))

  const setValue = useCallback(
    (key: K, value: number) => setValues((current) => ({ ...current, [key]: snap(defs[key], value) })),
    [defs],
  )
  const reset = useCallback(() => setValues(defaultsOf(defs)), [defs])

  const query = new URLSearchParams(keysOf(defs).map((key) => [key, String(values[key])]))
  const shareUrl = `${window.location.origin}${window.location.pathname}?${query.toString()}`

  return { values, setValue, reset, shareUrl }
}
