import type { ContactFormData } from '@/types'

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 5_000,
} as const

const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/

export const validateContact = (data: ContactFormData): boolean =>
  data.name.trim().length >= 2 &&
  data.name.length <= CONTACT_LIMITS.name &&
  data.email.length <= CONTACT_LIMITS.email &&
  EMAIL_PATTERN.test(data.email) &&
  data.subject.trim().length >= 3 &&
  data.subject.length <= CONTACT_LIMITS.subject &&
  data.message.trim().length >= 10 &&
  data.message.length <= CONTACT_LIMITS.message
