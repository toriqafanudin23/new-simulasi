import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { FullscreenContext } from './FullscreenContext.ts'

const ROOT_CLASS = 'is-simulation-fullscreen'

/**
 * Menyimpan status "layar penuh" untuk satu simulasi. Selain menampilkan simulasi menutup layar,
 * mencoba memakai Fullscreen API peramban (untuk proyektor). Esc keluar; fokus kembali ke pembuka.
 */
export const FullscreenProvider = ({ children }: { children: ReactNode }) => {
  const [fullscreen, setFullscreen] = useState(false)
  const opener = useRef<HTMLElement | null>(null)

  const enter = useCallback(() => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setFullscreen(true)
  }, [])
  const exit = useCallback(() => setFullscreen(false), [])

  useEffect(() => {
    if (!fullscreen) return
    const root = document.documentElement
    root.classList.add(ROOT_CLASS)
    root.requestFullscreen?.().catch(() => {
      /* Ditolak (mis. iOS Safari): tampilan menutup layar tetap berfungsi. */
    })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreen(false)
    }
    // Keluar lewat Esc bawaan peramban tidak memicu keydown, hanya fullscreenchange.
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) setFullscreen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      root.classList.remove(ROOT_CLASS)
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => {})
      opener.current?.focus()
    }
  }, [fullscreen])

  const value = useMemo(() => ({ fullscreen, enter, exit }), [fullscreen, enter, exit])
  return <FullscreenContext.Provider value={value}>{children}</FullscreenContext.Provider>
}
