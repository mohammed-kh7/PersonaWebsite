import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGlobe } from 'react-icons/fi'
import { useLanguage } from '@/context/LanguageContext'
import { localeLabels, localeShortLabels } from '@/i18n'
import clsx from 'clsx'

interface LanguageToggleProps {
  className?: string
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { locale, toggleLocale, t } = useLanguage()
  const nextLocale = locale === 'en' ? 'ar' : 'en'

  return (
    <button
      onClick={toggleLocale}
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold',
        'text-gray-500 transition-colors hover:bg-white/50 hover:text-gray-900',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        'dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
        className
      )}
      aria-label={t.nav.switchLanguage}
      title={t.nav.switchLanguage}
    >
      <FiGlobe className="h-4 w-4 shrink-0" aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={nextLocale}
          lang={nextLocale}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="inline-block whitespace-nowrap"
        >
          {/* Short code on small screens, full name once there is room */}
          <span className="sm:hidden">{localeShortLabels[nextLocale]}</span>
          <span className="hidden sm:inline">{localeLabels[nextLocale]}</span>
        </motion.span>
      </AnimatePresence>
    </button>
  )
}