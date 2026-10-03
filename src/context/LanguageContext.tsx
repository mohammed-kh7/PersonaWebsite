import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEY, dictionaries, directions, interpolate, isLocale, locales } from '@/i18n'
import type { Dictionary, Direction, Locale } from '@/i18n'

export interface LanguageContextType {
  locale: Locale
  dir: Direction
  isRTL: boolean
  t: Dictionary
  interpolate: typeof interpolate
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const detectLocale = (): Locale => {
  if (typeof window === 'undefined') return 'en'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (isLocale(stored)) return stored

  const browserLocales = [navigator.language, ...(navigator.languages ?? [])]
  return browserLocales.some((value) => value.toLowerCase().startsWith('ar')) ? 'ar' : 'en'
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const index = locales.indexOf(prev)
      return locales[(index + 1) % locales.length]
    })
  }, [])

  const dir = directions[locale]
  const t = dictionaries[locale]

  useEffect(() => {
    const root = window.document.documentElement
    root.lang = locale
    root.dir = dir
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale, dir])

  useEffect(() => {
    window.document.title = t.meta.title

    const meta = window.document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t.meta.description)
  }, [t])

  const value = useMemo<LanguageContextType>(
    () => ({
      locale,
      dir,
      isRTL: dir === 'rtl',
      t,
      interpolate,
      setLocale,
      toggleLocale,
    }),
    [locale, dir, t, setLocale, toggleLocale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}