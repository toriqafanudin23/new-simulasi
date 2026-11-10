import { useCallback, useEffect, useState } from 'react'

/** Status buka/tutup untuk menu dan panel; Escape menutup saat terbuka. */
export const useDisclosure = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const toggle = useCallback(() => setIsOpen((open) => !open), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, close])

  return { isOpen, toggle, close }
}
