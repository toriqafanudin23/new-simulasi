import { useEffect } from 'react'

/** Mengatur judul tab untuk halaman yang sedang tampil. */
export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}
