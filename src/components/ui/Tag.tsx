import type { ReactNode } from 'react'
import { cn } from '../../lib/cn.ts'
import './Tag.css'

type TagProps = {
  children: ReactNode
  tone?: 'default' | 'gold'
  className?: string
}

/** Label kecil huruf kapital untuk kategori dan eyebrow. */
export const Tag = ({ children, tone = 'default', className }: TagProps) => (
  <p className={cn('tag', tone === 'gold' && 'tag--gold', className)}>{children}</p>
)
