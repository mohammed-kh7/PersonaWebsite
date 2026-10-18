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
  const textRef = useRef<string>('')

  // Detect RTL (Arabic) text
  const isRTL = /[؀-ۿ]/.test(text)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    // If text changed, remove old spans completely before rebuilding
    if (textRef.current !== text) {
      textRef.current = text
      container.innerHTML = ''
    }

    if (isRTL) {
      // For Arabic: show text as a single unit with fade-in
      container.textContent = text
      container.style.opacity = '0'
      container.style.animation = 'none'
      void container.offsetWidth
      container.style.animation = `fadeIn 0.5s ease ${delay}ms forwards`
      return
    }

    // For LTR: build fresh spans and trigger animation
    container.className = clsx('inline-flex overflow-hidden', className)
    text.split('').forEach((char, i) => {
      const span = document.createElement('span')
      span.className = 'inline-block opacity-0 blur-char'
      span.textContent = char === ' ' ? ' ' : char
      span.style.animation = `blurIn 0.6s ease forwards ${i * 0.05 + delay / 1000}s`
      container.appendChild(span)
    })
  }, [text, delay, isRTL, className])

  return <div ref={containerRef} className={clsx(className)} />
}
