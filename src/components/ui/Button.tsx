import type { AnchorHTMLAttributes } from 'react'
import { cn } from '../../lib/cn.ts'
import './Button.css'

type ButtonTone = 'dark' | 'cream' | 'red'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  tone?: ButtonTone
}

/** Tautan bergaya tombol; selalu navigasi, jadi dirender sebagai <a>. */
export const Button = ({ tone = 'dark', className, ...anchorProps }: ButtonProps) => (
  <a className={cn('button', `button--${tone}`, className)} {...anchorProps} />
)
