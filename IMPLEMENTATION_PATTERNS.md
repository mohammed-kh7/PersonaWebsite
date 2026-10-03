# Implementation Patterns & Code Snippets

This file contains reusable patterns from the portfolio enhancements for future projects.

## 1. Theme Toggle with Persistence (localStorage + System Preference)

```typescript
// context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first (user preference takes priority)
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored

    // Fall back to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  // Prevent flash of unstyled content
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Apply theme to DOM
  useEffect(() => {
    const root = window.document.documentElement
    root.style.colorScheme = theme
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)

    // Dispatch custom event for components
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }))
  }, [theme])

  // Listen for system theme changes (only if user hasn't set preference)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme')
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener?.('change', handleChange)
    return () => mediaQuery.removeEventListener?.('change', handleChange)
  }, [])

  if (!mounted) return <>{children}</>

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(p => p === 'light' ? 'dark' : 'light') }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be within ThemeProvider')
  return context
}
```

## 2. Accessible Button Component with Variants

```typescript
// components/Button.tsx
import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  isLoading,
  children,
  ...props
}) => {
  const baseStyles = 'btn-base font-semibold transition-all focus:ring-2 focus:ring-offset-2'

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-lg focus:ring-primary-500 dark:focus:ring-primary-400 dark:focus:ring-offset-dark-900',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 shadow-lg focus:ring-secondary-500 dark:focus:ring-secondary-400 dark:focus:ring-offset-dark-900',
    outline: 'border-2 border-primary-700 text-primary-700 hover:bg-primary-100 active:bg-primary-200 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900/20 dark:focus:ring-primary-400 dark:focus:ring-offset-dark-900',
    ghost: 'text-gray-800 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-400 dark:text-gray-200 dark:hover:bg-dark-800 dark:focus:ring-dark-600 dark:focus:ring-offset-dark-900',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={clsx(baseStyles, variants[variant], sizes[size], className, {
        'cursor-not-allowed opacity-60': disabled || isLoading,
      })}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="-ml-1 mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}
```

## 3. Tailwind CSS Configuration for Dark Mode

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Uses class strategy (not media)
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1', // Darker for better contrast on light backgrounds
          900: '#0c4a6e',
        },
        dark: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
      },
    },
  },
}
```

## 4. Global CSS with Accessibility Features

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  body {
    @apply bg-white text-gray-900 transition-colors duration-300 dark:bg-dark-900 dark:text-gray-100;
  }

  /* Smooth theme transitions */
  * {
    transition-property: background-color, border-color, color;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }

  /* Better focus visibility */
  :focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Improved scrollbar */
  ::-webkit-scrollbar-thumb {
    @apply rounded-full bg-primary-400 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500;
  }
}

@layer components {
  /* Custom button styles */
  .btn-base {
    @apply inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-200 focus:outline-none;
  }

  /* Focus ring utility */
  .focus-ring {
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400 dark:focus:ring-offset-dark-900;
  }
}
```

## 5. Theme Toggle Button Component

```typescript
// components/ThemeToggle.tsx
import { useTheme } from '@/context/ThemeContext'
import { FiSun, FiMoon } from 'react-icons/fi'
import { motion } from 'framer-motion'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="group rounded-lg p-2 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:hover:bg-dark-800 dark:focus:ring-offset-dark-900"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <FiMoon className="h-5 w-5 transition-transform group-hover:scale-110" />
        ) : (
          <FiSun className="h-5 w-5 transition-transform group-hover:scale-110" />
        )}
      </motion.div>
    </button>
  )
}
```

## 6. WCAG Accessibility Checklist

```markdown
## Color Contrast (WCAG 2.1 AA)
- [ ] Text has 4.5:1 contrast ratio minimum (normal text)
- [ ] Large text has 3:1 contrast ratio minimum
- [ ] Focus indicators have sufficient contrast
- [ ] Interactive elements clearly distinguishable

## Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicator is always visible
- [ ] No keyboard traps

## Motion & Animation
- [ ] Respects prefers-reduced-motion
- [ ] No auto-playing videos/animations
- [ ] Animations don't distract from content

## Semantic HTML & ARIA
- [ ] Proper heading hierarchy
- [ ] Form labels associated with inputs
- [ ] aria-label on icon-only buttons
- [ ] aria-busy on loading states
- [ ] aria-hidden on decorative elements
```

## 7. Testing Dark Mode Across Browsers

```bash
# Test in different browsers
- Chrome/Edge: DevTools > Rendering > Emulate CSS media feature prefers-color-scheme
- Firefox: about:config > ui.systemUsesDarkTheme = 1
- Safari: System Preferences > General > Dark mode

# Test localStorage persistence
1. Toggle theme
2. Reload page - theme should persist
3. Clear localStorage - should use system preference
4. Open DevTools > Application > Local Storage > Check 'theme' key
```

---

## Key Takeaways

1. **localStorage + System Preference:** Check localStorage first (user choice), then system preference (OS setting)
2. **Prevent FOUC:** Use `mounted` state to prevent theme flash on page load
3. **Accessibility First:** Always include `aria-label`, `aria-busy`, focus rings, and motion preferences
4. **Color Contrast:** Use darker colors on light backgrounds, lighter on dark
5. **Smooth Transitions:** 200ms is optimal for theme changes
6. **Custom Events:** Dispatch events for cross-component theme reactions

---

Generated: 2026-09-22 | Project: Mohammed Khudair Portfolio
