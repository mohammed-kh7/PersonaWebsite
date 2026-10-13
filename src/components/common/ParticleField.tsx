import React, { useMemo } from 'react'
import clsx from 'clsx'

interface ParticleFieldProps {
  className?: string
  count?: number
}

/**
 * Lightweight CSS-only floating particle background.
 * Uses CSS animations — no JS runtime cost.
 * useMemo ensures random values are computed once, not on every re-render.
 */
export const ParticleField: React.FC<ParticleFieldProps> = ({
  className,
  count = 20,
}) => {
  // Memoized: random values are stable across re-renders unless count changes
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 1,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: Math.random() * 15 + 15,
        opacity: Math.random() * 0.3 + 0.1,
      })),
    [count]
  )

  return (
    <div
      className={clsx('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary-400/30 dark:bg-primary-400/20"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: '-10px',
            opacity: p.opacity,
            animation: `particleDrift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
