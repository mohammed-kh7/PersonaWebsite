import type { NavKey } from '@/i18n'

export interface NavItem {
  id: NavKey
  href: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}