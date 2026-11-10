import { useEffect, useRef, useState } from 'react'

type Size = { width: number; height: number }

/** Ukuran (px) sebuah elemen; diperbarui saat ukurannya berubah. Nol sebelum terukur. */
export const useElementSize = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize((previous) => (previous.width === width && previous.height === height ? previous : { width, height }))
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, size] as const
}
