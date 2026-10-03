import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook to detect which section is currently in the viewport.
 * Uses IntersectionObserver for efficient, scroll-based active section detection.
 *
 * @param sectionIds - Array of section element IDs to observe
 * @param offset - Root margin offset (default: 100px from top)
 * @returns The ID of the currently active (most visible) section
 */
export const useScrollSpy = (sectionIds: string[], offset = 100): string => {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    // Disconnect existing observer
    observerRef.current?.disconnect()

    const callback: IntersectionObserverCallback = (entries) => {
      // Keep track of which elements are visible and their intersection ratio
      const visibleEntries = entries.filter((entry) => entry.isIntersecting)

      if (visibleEntries.length > 0) {
        // Pick the one with the highest intersection ratio
        const mostVisible = visibleEntries.reduce((prev, curr) => {
          return curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        })
        
        // If we are very close to the top of the page, forcefully select the first section
        if (window.scrollY < 100 && sectionIds.length > 0) {
          setActiveId(sectionIds[0])
        } else {
          setActiveId(mostVisible.target.id)
        }
      }
    }

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: `-${offset}px 0px -40% 0px`,
      threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0, 0.1, ... 1.0 for better precision
    })

    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [sectionIds, offset])

  return activeId
}
