import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressiveBlurProps {
  className?: string
  direction?: 'left' | 'right' | 'top' | 'bottom'
  blurIntensity?: number
}

export const ProgressiveBlur: React.FC<ProgressiveBlurProps> = ({
  className,
  direction = 'right',
  blurIntensity = 1
}) => {
  const getGradientDirection = () => {
    switch (direction) {
      case 'left':
        return 'to right'
      case 'right':
        return 'to left'
      case 'top':
        return 'to bottom'
      case 'bottom':
        return 'to top'
      default:
        return 'to left'
    }
  }

  return (
    <div
      className={cn('pointer-events-none', className)}
      style={{
        background: `linear-gradient(${getGradientDirection()}, transparent, rgba(255, 255, 255, 0.1))`,
        backdropFilter: `blur(${blurIntensity * 4}px)`
      }}
    />
  )
}