export const formatDate = (date: Date | number | string, locale: 'ar' | 'en' = 'en'): string =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(date))
