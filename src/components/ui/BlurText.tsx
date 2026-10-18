import React, { useLayoutEffect, useRef } from 'react'
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
  const prevText = useRef(text)
  const hasAnimated = useRef(false)

  // Detect RTL (Arabic) text
  const isRTL = /[؀-ۿ]/.test(text)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Reset animation state when text changes (language switch)
    if (prevText.current !== text) {
      hasAnimated.current = false
      prevText.current = text
    }

    if (hasAnimated.current) return
    if (prefersReducedMotion) {
      hasAnimated.current = true
      return
    }

    const container = containerRef.current
    if (!container) return

    if (isRTL) {
      // Arabic: single div with fade-in, no character splitting
      container.innerHTML = text
      container.className = clsx('inline-block opacity-0 animate-fade-in', className)
      container.style.animationDelay = `${delay}ms`
    } else {
      // LTR: rebuild span list from scratch
      container.innerHTML = ''
      container.className = clsx('inline-flex overflow-hidden', className)
      text.split('').forEach((char, i) => {
        const span = document.createElement('span')
        span.className = 'inline-block opacity-0 blur-char'
        span.textContent = char === ' ' ? ' ' : char
        span.style.animation = `blurIn 0.6s ease forwards ${i * 0.05 + delay / 1000}s`
        container.appendChild(span)
      })
    }

    hasAnimated.current = true
  }, [text, delay, isRTL, className])

  return <div ref={containerRef} className={className} />
}
