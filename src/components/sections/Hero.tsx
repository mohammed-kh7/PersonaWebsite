import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageContext'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FaFacebook } from 'react-icons/fa'

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/mohammed-kh7',
    icon: FiGithub,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hamoodkh7/',
    icon: FiLinkedin,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: FaFacebook,
  },
]

const EMAIL = 'mohammedkhudair123@gmail.com'

export const Hero: React.FC = () => {
  const { t } = useLanguage()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4.5rem)] items-center pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-at-t from-blue-600/5 via-transparent to-transparent dark:from-blue-600/10 dark:via-transparent dark:to-transparent"
        aria-hidden="true"
      />

      <div className="container-custom w-full">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Photo Section: First on mobile (order-1), Right on desktop (lg:order-2) */}
          <motion.div
            className="order-1 flex justify-center lg:order-2 lg:justify-end rtl:lg:justify-start lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="relative">
              {/* Perfectly Circular Profile Image */}
              <div className="relative h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96 rounded-full overflow-hidden shadow-2xl ring-2 ring-blue-500/20 dark:ring-blue-400/30 bg-slate-900">
                <picture>
                  <source
                    srcSet="/images/profile.webp"
                    type="image/webp"
                    sizes="(max-width: 639px) 192px, (max-width: 1023px) 256px, (max-width: 1279px) 320px, 384px"
                  />
                  <img
                    src="/images/profile.jpg"
                    alt={t.hero.profileAlt}
                    width={384}
                    height={432}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    sizes="(max-width: 639px) 192px, (max-width: 1023px) 256px, (max-width: 1279px) 320px, 384px"
                    className="h-full w-full object-cover object-top select-none transition-transform duration-300 hover:scale-105"
                  />
                </picture>
              </div>
            </div>
          </motion.div>

          {/* Typography & CTAs: Second on mobile (order-2, centered), Left on desktop (lg:order-1, start-aligned) */}
          <motion.div
            className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-7 lg:items-start lg:text-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Greeting */}
            <p className="mb-2 text-sm sm:text-base font-semibold tracking-wide text-blue-600 dark:text-blue-400">
              {t.hero.greeting}
            </p>

            {/* Main Name Heading */}
            <h1 className="mb-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              {t.brand.first}
              <br />
              <span className="gradient-text">{t.brand.last}</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="mb-6 max-w-lg text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md shadow-blue-600/25 transition-all duration-150 hover:bg-blue-700 active:bg-blue-800"
              >
                {t.hero.ctaPrimary}
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-transparent px-6 py-3 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 transition-all duration-150 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-950/20"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>

            {/* Social Links & Email */}
            <div className="mb-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-slate-500 transition-colors duration-150 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}

              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                dir="ltr"
              >
                <FiMail className="h-4 w-4" />
                <span>{EMAIL}</span>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-5 border-t border-slate-200/80 dark:border-white/10 w-full">
              {t.hero.stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start">
                  <span className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
