import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { LanguageToggle } from '../common/LanguageToggle'
import type { NavItem } from '@/types'
import clsx from 'clsx'

const navItems: NavItem[] = [
  { id: 'home', href: 'hero' },
  { id: 'about', href: 'about' },
  { id: 'skills', href: 'skills' },
  { id: 'projects', href: 'projects' },
  { id: 'services', href: 'services' },
  { id: 'contact', href: 'contact' },
]

const sectionIds = navItems.map((item) => item.href)

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { t, interpolate } = useLanguage()
  const scrollSpyActive = useScrollSpy(sectionIds, 80)

  // Default to 'hero' on initial load before scroll spy kicks in
  const activeSection = scrollSpyActive || 'hero'

  // Track scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    // Check immediately on mount
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Removed pendingSection state as we handle it directly with setTimeout

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close the sheet on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false)
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const themeLabel = interpolate(t.nav.themeToggle, {
    theme: theme === 'light' ? 'dark' : 'light',
  })

  return (
    <nav
      className={clsx(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
      )}
      role="navigation"
      aria-label={t.nav.label}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-2 sm:h-[4.5rem]">
          {/* Logo — allowed to shrink so the controls can never be pushed off-screen */}
          <button
            onClick={() => scrollToSection('hero')}
            className="min-w-0 text-start text-base font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:text-xl"
            aria-label={t.nav.scrollToTop}
          >
            <span className="block truncate">
              <span className="gradient-text">{t.brand.first}</span>{' '}
              <span className="text-gray-900 dark:text-white">{t.brand.last}</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <LayoutGroup>
              {navItems.map((item) => {
                const isActive = activeSection === item.href
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={clsx(
                      'relative z-10 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    )}
                  >
                    <span className="relative z-10">{t.nav.items[item.id]}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-primary-500/10 dark:bg-primary-500/15"
                        style={{ zIndex: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </LayoutGroup>

            {/* Theme Toggle */}
            <div className="ms-3 h-5 w-px bg-gray-300 dark:bg-gray-700" />
            <LanguageToggle className="ms-1" />
            <button
              onClick={toggleTheme}
              className="ms-1 rounded-lg p-2 text-gray-500 transition-colors hover:bg-white/50 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
              aria-label={themeLabel}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? (
                    <FiMoon className="h-5 w-5" />
                  ) : (
                    <FiSun className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex shrink-0 items-center gap-0.5 md:hidden sm:gap-1">
            <LanguageToggle className="px-1.5 sm:px-2" />
            <button
              onClick={toggleTheme}
              className="shrink-0 rounded-lg p-2 text-gray-500 dark:text-gray-400"
              aria-label={themeLabel}
            >
              {theme === 'light' ? (
                <FiMoon className="h-5 w-5" />
              ) : (
                <FiSun className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen((open) => !open)}
              className="-mr-1 shrink-0 rounded-lg p-2 text-gray-700 dark:text-gray-300"
              aria-label={t.nav.toggleMenu}
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gray-200/50 dark:border-white/5 md:hidden"
          >
            <div className="glass-nav max-h-[calc(100vh-4rem)] overflow-y-auto px-4 pb-6 pt-4">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href
                  return (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={clsx(
                        'w-full rounded-lg px-4 py-3.5 text-start text-base font-medium transition-colors active:scale-[0.99]',
                        isActive
                          ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                          : 'text-gray-600 hover:bg-white/30 dark:text-gray-400 dark:hover:bg-white/5'
                      )}
                    >
                      {t.nav.items[item.id]}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}