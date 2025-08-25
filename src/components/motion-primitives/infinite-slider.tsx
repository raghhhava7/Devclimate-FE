import React from 'react'
import { cn } from '@/lib/utils'

interface InfiniteSliderProps {
  children: React.ReactNode
  speed?: number
  speedOnHover?: number
  gap?: number
  className?: string
}

export const InfiniteSlider: React.FC<InfiniteSliderProps> = ({
  children,
  speed = 40,
  speedOnHover = 20,
  gap = 24,
  className
}) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="flex animate-scroll hover:animate-scroll-slow"
        style={{
          gap: `${gap}px`,
          animationDuration: `${speed}s`,
          '--hover-duration': `${speedOnHover}s`
        } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  )
}