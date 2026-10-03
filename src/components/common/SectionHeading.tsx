import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface SectionHeadingProps {
  title: string
  highlight?: string
  subtitle?: string
  className?: string
  align?: 'center' | 'left'
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  highlight,
  subtitle,
  className,
  align = 'center',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={clsx(
        'mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2
        className={clsx(
          'mb-4 font-display text-4xl font-bold text-balance sm:text-5xl',
          'text-gray-900 dark:text-white'
        )}
      >
        {highlight ? `${title} ` : title}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'text-lg leading-relaxed',
            'text-gray-600 dark:text-gray-400',
            align === 'center' && 'mx-auto max-w-2xl'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}