import type { ReactNode } from 'react'
import { LanguageProvider } from '@/components/providers/LanguageContext'
import { ThemeProvider } from '@/components/providers/ThemeContext'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <LanguageProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </LanguageProvider>
)
