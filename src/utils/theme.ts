/**
 * Theme utility functions.
 * The primary theme logic lives in ThemeContext.tsx.
 * These are standalone helpers for use outside React.
 */

/**
 * Get the initial theme from localStorage or system preference.
 * Defaults to 'dark' (dark-first design).
 */
export const getInitialTheme = (): 'light' | 'dark' => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored

  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }

  return 'dark'
}

/**
 * Apply theme class and color-scheme to the document root.
 */
export const applyTheme = (theme: 'light' | 'dark'): void => {
  const root = document.documentElement
  root.style.colorScheme = theme
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  localStorage.setItem('theme', theme)
}
