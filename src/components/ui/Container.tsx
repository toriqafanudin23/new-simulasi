import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cn } from '../../lib/cn.ts'
import './Container.css'

type ContainerProps<T extends ElementType> = {
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, 'as'>

/** Pembatas lebar konten: maks. 1328 px dengan gutter responsif. */
export const Container = <T extends ElementType = 'div'>({
  as,
  className,
  ...rest
}: ContainerProps<T>) => {
  const Component: ElementType = as ?? 'div'
  return <Component className={cn('container', className)} {...rest} />
}
