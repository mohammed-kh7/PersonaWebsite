import React from 'react'
import { m } from 'framer-motion'
import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = true,
  glow = false,
}) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={clsx(
        'glass-panel p-6 shadow-sm',
        hover && 'card-hover',
        glow && 'border-blue-500/30',
        className
      )}
    >
      {children}
    </m.div>
  )
}
