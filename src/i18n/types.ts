export type Locale = 'en' | 'ar'
export type Direction = 'ltr' | 'rtl'

export type NavKey = 'home' | 'about' | 'skills' | 'projects' | 'services' | 'contact'
export type SkillCategory = 'frontend' | 'tools' | 'automation'
export type SkillId =
  | 'react'
  | 'javascript'
  | 'html-css'
  | 'tailwind'
  | 'responsive-design'
  | 'git-github'
  | 'figma'
  | 'vscode'
  | 'n8n-workflows'
  | 'ai-integration'
  | 'api-automation'
  | 'webhook-design'

export interface StatItem {
  value: string
  label: string
}

export interface HighlightItem {
  id: 'code' | 'zap'
  title: string
  description: string
}

export interface SkillItem {
  id: SkillId
  label: string
  category: SkillCategory
}

export interface SkillCategoryItem {
  key: SkillCategory
  label: string
}

export interface ProjectContent {
  id: string
  title: string
  description: string
}

export interface ServiceContent {
  id: string
  title: string
  description: string
  features: string[]
}

export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  brand: {
    first: string
    last: string
  }
  nav: {
    label: string
    items: Record<NavKey, string>
    themeToggle: string
    toggleMenu: string
    scrollToTop: string
    switchLanguage: string
  }
  common: {
    liveDemo: string
    visitDemo: string
    github: string
    previousSlide: string
    nextSlide: string
    slideOf: string
    goToSlide: string
    backToTop: string
    sending: string
    sendMessage: string
  }
  hero: {
    greeting: string
    descriptionLead: string
    descriptionTail: string
    ctaPrimary: string
    ctaSecondary: string
    stats: StatItem[]
    profileAlt: string
    scrollIndicator: string
  }
  about: {
    title: string
    highlight: string
    subtitle: string
    bioLead: string
    bioRole: string
    bioTail: string
    paragraphTwo: string
    highlights: HighlightItem[]
    techStack: string[]
  }
  skills: {
    title: string
    highlight: string
    subtitle: string
    categories: SkillCategoryItem[]
    items: SkillItem[]
  }
  projects: {
    title: string
    highlight: string
    subtitle: string
    items: ProjectContent[]
  }
  services: {
    title: string
    highlight: string
    subtitle: string
    items: ServiceContent[]
  }
  contact: {
    title: string
    highlight: string
    subtitle: string
    connectTitle: string
    connectText: string
    emailLabel: string
    responseTimeLabel: string
    responseTimeValue: string
    talkLabel: string
    talkValue: string
    form: {
      name: string
      email: string
      subject: string
      message: string
      namePlaceholder: string
      emailPlaceholder: string
      subjectPlaceholder: string
      messagePlaceholder: string
      submit: string
      successTitle: string
      successText: string
      errorText: string
    }
  }
  footer: {
    tagline: string
    rights: string
  }
  validation: {
    required: string
    email: string
    minLength: string
    maxLength: string
    pattern: string
  }
}