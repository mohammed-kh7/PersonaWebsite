import { useState, useEffect, useRef, RefObject } from 'react'

/**
 * Custom hook to detect when an element enters the viewport.
 * Useful for triggering entrance animations.
 *
 * @param options - IntersectionObserver options
 * @returns [ref, isInView] - Ref to attach to the element, and whether it's in view
 */
export const useInView = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {}
): [RefObject<T | null>, boolean] => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Once in view, stop observing (animate once)
          observer.unobserve(element)
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px 0px -50px 0px',
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin])

  return [ref, isInView]
}
