import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { shouldReduceMotion } from './useLenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook to animate elements on scroll entry using GSAP
 * Lightweight - only triggers once per element
 */
export const useGSAPReveal = (
  selector: string,
  options: {
    delay?: number
    stagger?: number
    duration?: number
  } = {}
) => {
  const { delay = 0.1, stagger = 0.15, duration = 0.7 } = options
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current || shouldReduceMotion()) return

    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    elements.forEach((el, i) => {
      const element = el as HTMLElement
      if (!element.dataset.gsapAnimated) {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay: delay + i * stagger,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
        element.dataset.gsapAnimated = 'true'
      }
    })

    initialized.current = true
    return () => {
      ScrollTrigger.refresh()
    }
  }, [selector, delay, stagger, duration])
}