import { ReactNode } from 'react'
import { cn } from '../../../lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      'bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200',
      className
    )}>
      {children}
    </div>
  )
}