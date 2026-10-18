import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

/**
 * Hook to initialize Lenis smooth scroll and sync with GSAP ScrollTrigger
 * Respects prefers-reduced-motion
 */
export const useLenis = () => {
  const isReducedMotion = useRef(false)

  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isReducedMotion.current) return

    if (!lenisInstance) {
      lenisInstance = new Lenis({
        wrapper: document.documentElement,
        content: document.body,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      })

      lenisInstance.on('scroll', () => {
        ScrollTrigger.update()
      })

      const raf = (time: number) => {
        lenisInstance?.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }
  }, [])

  return { lenisInstance }
}

/**
 * Helper to check if reduced motion is preferred
 */
export const shouldReduceMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}