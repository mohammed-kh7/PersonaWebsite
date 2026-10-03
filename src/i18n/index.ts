import { ar } from './ar'
import { en } from './en'
import type { Dictionary, Direction, Locale } from './types'

export type {
  Dictionary,
  Direction,
  Locale,
  NavKey,
  ServiceContent,
  SkillCategory,
  SkillId,
  SkillItem,
} from './types'

export const locales: readonly Locale[] = ['en', 'ar']

export const dictionaries: Record<Locale, Dictionary> = { en, ar }

export const directions: Record<Locale, Direction> = { en: 'ltr', ar: 'rtl' }

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
}

export const localeShortLabels: Record<Locale, string> = {
  en: 'EN',
  ar: 'ع',
}

export const STORAGE_KEY = 'locale'

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && locales.includes(value as Locale)

/** Replaces `{placeholder}` tokens inside a dictionary string. */
export const interpolate = (
  template: string,
  values: Record<string, string | number>
): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  )