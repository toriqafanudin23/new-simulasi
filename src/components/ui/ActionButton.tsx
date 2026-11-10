import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn.ts'
import './Button.css'

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: 'dark' | 'cream' | 'red'
}

/** Padanan <Button> untuk aksi di halaman (bukan navigasi); tampilannya sama. */
export const ActionButton = ({ tone = 'dark', className, type = 'button', ...buttonProps }: ActionButtonProps) => (
  <button type={type} className={cn('button', `button--${tone}`, className)} {...buttonProps} />
)
