import { createContext, useContext } from 'react'

export type FullscreenApi = {
  fullscreen: boolean
  enter: () => void
  exit: () => void
}

const noop = () => {}

/** Di luar <FullscreenProvider>, komponen simulasi tetap bekerja (selalu tidak layar penuh). */
export const FullscreenContext = createContext<FullscreenApi>({ fullscreen: false, enter: noop, exit: noop })

export const useFullscreen = (): FullscreenApi => useContext(FullscreenContext)
