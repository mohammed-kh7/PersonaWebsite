import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

/**
 * BlurText component - CSS-based blur animation on mount
 * No GSAP dependency - lightweight and respects prefers-reduced-motion
 * RTL/Arabic text is NOT split by character to avoid breaking
 */
export const BlurText: React.FC<BlurTextProps> = ({ text, className, delay = 100 }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const prevText = useRef(text)

  // Detect RTL (Arabic) text
  const isRTL = /[؀-ۿ]/.test(text)

  useEffect(() => {
    // Reset when text changes (language switch)
    if (text !== prevText.current) {
      hasAnimated.current = false
      prevText.current = text
    }

    if (hasAnimated.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      hasAnimated.current = true
      return
    }

    const container = containerRef.current
    if (!container) return

    // Add animation class with delay
    const timer = setTimeout(() => {
      container.classList.add('blur-text-animated')
    }, delay)

    hasAnimated.current = true
    return () => clearTimeout(timer)
  }, [text, delay])

  if (isRTL) {
    // For Arabic: show text as a single unit with fade-in
    return (
      <div
        ref={containerRef}
        className={clsx('inline-block opacity-0 animate-fade-in', className)}
        style={{ animationDelay: `${delay}ms` }}
      >
        {text}
      </div>
    )
  }

  // For LTR: split by characters for blur effect
  return (
    <div
      ref={containerRef}
      className={clsx('inline-flex overflow-hidden', className)}
    >
      {text.split('').map((char, i) => (
        <span
          key={`${text}-${i}`}
          className="inline-block opacity-0 blur-char"
          style={{
            animation: `blurIn 0.6s ease forwards ${i * 0.05 + delay / 1000}s`,
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </div>
  )
}
