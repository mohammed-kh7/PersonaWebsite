import React from 'react'
import clsx from 'clsx'

interface StarBorderProps {
  children: React.ReactNode
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  className?: string
  color?: string
  sparkColor?: string
  sparkSize?: number
  [key: string]: unknown
}

/**
 * StarBorder component - React Bits style
 * A twinkling star travels around the button border
 */
export const StarBorder: React.FC<StarBorderProps> = ({
  children,
  as: Component = 'button',
  href,
  target,
  rel,
  className,
  color = '#ffffff',
  sparkColor = '#FFD700',
  sparkSize = 4,
  ...props
}: StarBorderProps & Record<string, unknown>) => {
  const sparkles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: sparkSize + Math.random() * 2,
    delay: Math.random() * 2,
    duration: 1.5 + Math.random(),
  }))

  const SparkleIcon = () => (
    <svg
      className="pointer-events-none"
      width={sparkSize}
      height={sparkSize}
      viewBox="0 0 24 24"
      fill={sparkColor}
    >
      <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
    </svg>
  )

  return (
    <span className={clsx('relative inline-flex overflow-hidden rounded-xl group', className)}>
      {/* Border glow effect */}
      <span
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${color}20, transparent 70%)`,
        }}
      />

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        >
          <SparkleIcon />
        </span>
      ))}

      {/* Button content */}
      <Component
        {...(href ? { href, target, rel } : {})}
        {...props}
        className={clsx('relative z-10', className)}
      >
        {children}
      </Component>
    </span>
  )
}