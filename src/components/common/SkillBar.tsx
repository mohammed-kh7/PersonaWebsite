import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface SkillBarProps {
  name: string
  level: number // 0 - 100
  color?: 'indigo' | 'cyan' | 'pink'
  animate?: boolean
  delay?: number
}

const colorMap = {
  indigo: {
    bar: 'from-primary-500 to-primary-400',
    glow: 'shadow-glow-sm',
    bg: 'bg-primary-100 dark:bg-primary-950/30',
  },
  cyan: {
    bar: 'from-accent-cyan-500 to-accent-cyan-400',
    glow: 'shadow-glow-cyan',
    bg: 'bg-accent-cyan-100 dark:bg-accent-cyan-900/20',
  },
  pink: {
    bar: 'from-accent-pink-500 to-accent-pink-400',
    glow: 'shadow-glow-pink',
    bg: 'bg-accent-pink-100 dark:bg-accent-pink-900/20',
  },
}

export const SkillBar: React.FC<SkillBarProps> = ({
  name,
  level,
  color = 'indigo',
  animate = true,
  delay = 0,
}) => {
  const colors = colorMap[color]

  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.8 }}
          className="text-sm font-semibold text-gray-500 dark:text-gray-400"
        >
          {level}%
        </motion.span>
      </div>

      <div
        className={clsx(
          'h-2.5 w-full overflow-hidden rounded-full',
          colors.bg
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={animate ? { width: `${level}%` } : undefined}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={clsx(
            'h-full rounded-full bg-gradient-to-r',
            colors.bar
          )}
        />
      </div>
    </div>
  )
}
