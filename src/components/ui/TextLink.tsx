import type { AnchorHTMLAttributes } from 'react'
import { cn } from '../../lib/cn.ts'
import './TextLink.css'

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  /** `bar` = garis kiri (pada latar gelap); `underline` = garis bawah merah. */
  variant?: 'bar' | 'underline'
}

export const TextLink = ({ variant = 'underline', className, ...anchorProps }: TextLinkProps) => (
  <a className={cn('text-link', `text-link--${variant}`, className)} {...anchorProps} />
)
