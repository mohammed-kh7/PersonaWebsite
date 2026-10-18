import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import clsx from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

/**
 * BlurText component - React Bits style
 * Text starts blurred and comes into focus on scroll
 * RTL/Arabic text is NOT split by character to avoid breaking
 */
export const BlurText: React.FC<BlurTextProps> = ({ text, className, delay = 100 }) => {
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([])
  const hasAnimated = useRef(false)

  // Detect RTL (Arabic) text
  const isRTL = /[؀-ۿ]/.test(text)

  useEffect(() => {
    if (hasAnimated.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      hasAnimated.current = true
      return
    }

    const spans = spanRefs.current.filter(Boolean)
    if (!spans.length) return

    const triggerEl = spans[0]?.closest('section') || spans[0]
    if (!triggerEl) return

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    spans.forEach((span, i) => {
      if (span) {
        timeline.fromTo(
          span,
          { filter: 'blur(10px)', opacity: 0 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * (delay / 1000),
          }
        )
      }
    })

    hasAnimated.current = true
    return () => {
      timeline.kill()
    }
  }, [delay])

  if (isRTL) {
    // For Arabic: show text as a single unit with fade-in
    return (
      <span
        ref={(el) => (spanRefs.current[0] = el)}
        className={clsx('inline-block', className)}
      >
        {text}
      </span>
    )
  }

  // For LTR: split by characters for blur effect
  return (
    <span className={clsx('inline-flex overflow-hidden', className)}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => (spanRefs.current[i] = el)}
          className="inline-block"
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}