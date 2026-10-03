import React from 'react'
import { motion } from 'framer-motion'
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={clsx(
        'glass-panel p-6',
        hover && 'card-hover',
        glow && 'shadow-glow-sm hover:shadow-glow-md',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
