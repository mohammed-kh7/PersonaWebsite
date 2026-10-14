import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  )
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [isVisible, setIsVisible] = useState(false)
  const particleCount = isMobile ? Math.floor(count / 2) : count

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMobile = () => setIsMobile(mobileQuery.matches)
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches)

    updateMobile()
    updateMotion()
    mobileQuery.addEventListener('change', updateMobile)
    motionQuery.addEventListener('change', updateMotion)
    return () => {
      mobileQuery.removeEventListener('change', updateMobile)
      motionQuery.removeEventListener('change', updateMotion)
    }
  }, [])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // Memoized: random values are stable across re-renders unless count changes
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 1,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: Math.random() * 15 + 15,
        opacity: Math.random() * 0.3 + 0.1,
      })),
    [particleCount]
  )

  if (prefersReducedMotion) return null

  return (
    <div
      ref={containerRef}
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
            animationPlayState: isVisible ? 'running' : 'paused',
          }}
        />
      ))}
    </div>
  )
}
