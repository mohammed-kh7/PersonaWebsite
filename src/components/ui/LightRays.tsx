import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'

interface LightRaysProps {
  className?: string
  color?: string
  count?: number
}

/**
 * LightRays component - React Bits style
 * Subtle animated light rays background effect
 */
export const LightRays: React.FC<LightRaysProps> = ({
  className,
  color = 'rgba(37, 99, 235, 0.08)',
  count = 6,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const raysRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    gsap.set(container, { overflow: 'hidden' })

    raysRef.current.forEach((ray, i) => {
      if (ray) {
        gsap.set(ray, {
          transformOrigin: 'center bottom',
          rotate: i * (360 / count),
        })
        gsap.to(ray, {
          rotate: i * (360 / count) + 15,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    })
  }, [count])

  return (
    <div
      ref={containerRef}
      className={clsx('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) raysRef.current[i] = el }}
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg at 50% 100%, transparent 0deg, ${color} 30deg, transparent 60deg)`,
            width: '150%',
            height: '150%',
            left: '-25%',
            top: '-25%',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary dark:to-[var(--bg-primary)]" />
    </div>
  )
}