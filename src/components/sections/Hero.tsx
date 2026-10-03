import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../common/Button'
import { ParticleField } from '../common/ParticleField'
import { useLanguage } from '@/context/LanguageContext'
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaFacebook } from 'react-icons/fa'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const EMAIL = 'mohammedkhudair123@gmail.com'

export const Hero: React.FC = () => {
  const { t } = useLanguage()

  const scrollTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 lg:pb-0 lg:pt-0"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-mesh" aria-hidden="true">
        {/* Large blurred orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -end-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary-500/15 blur-[120px] dark:bg-primary-500/10"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -start-32 h-[500px] w-[500px] rounded-full bg-accent-cyan-500/12 blur-[120px] dark:bg-accent-cyan-500/8"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-pink-500/8 blur-[100px] dark:bg-accent-pink-500/5"
        />
      </div>

      <ParticleField count={15} />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Profile Image — shown on mobile above the text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="order-1 flex items-center justify-center lg:order-2"
          >
            <div className="relative">
              {/* Glow ring behind image */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary-500 via-accent-cyan-500 to-accent-pink-500 opacity-20 blur-2xl dark:opacity-15"
                aria-hidden="true"
              />

              {/* Profile photo */}
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl ring-1 ring-white/10 dark:border-white/10 sm:h-60 sm:w-60 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
                <img
                  src="/images/profile.jpg"
                  alt={t.hero.profileAlt}
                  className="h-full w-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.style.background =
                        'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #ec4899 100%)'
                      parent.innerHTML =
                        '<div class="flex h-full items-center justify-center text-white text-7xl font-bold select-none">MK</div>'
                    }
                  }}
                />
              </div>

              {/* Floating tech badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-panel absolute -start-6 top-8 px-3 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 sm:-start-8 sm:text-sm lg:top-12"
              >
                <span dir="ltr">⚛️ React</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="glass-panel absolute -end-4 top-1/3 px-3 py-1.5 text-xs font-medium text-accent-cyan-600 dark:text-accent-cyan-400 sm:-end-6 sm:text-sm"
              >
                <span dir="ltr">🤖 N8n</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="glass-panel absolute -bottom-8 -start-4 hidden px-3 py-1.5 text-xs font-medium text-accent-pink-600 dark:text-accent-pink-400 sm:-start-6 sm:block sm:text-sm"
              >
                <span dir="ltr">✨ JavaScript</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-2 flex flex-col items-center justify-center text-center lg:order-1 lg:items-start lg:text-start"
          >
            <motion.p
              variants={item}
              className="mb-3 text-base font-medium tracking-wide text-primary-600 dark:text-primary-400 sm:text-lg"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              variants={item}
              className="mb-4 font-display text-4xl font-extrabold leading-[1.15] text-balance text-gray-900 dark:text-white sm:text-6xl lg:text-7xl"
            >
              {t.brand.first}
              <br />
              <span className="gradient-text">{t.brand.last}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mb-8 max-w-lg text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl"
            >
              {t.hero.descriptionLead}{' '}
              <span
                dir="ltr"
                className="font-semibold text-primary-600 dark:text-primary-400"
              >
                React
              </span>
              ,{' '}
              <span
                dir="ltr"
                className="font-semibold text-accent-cyan-600 dark:text-accent-cyan-400"
              >
                N8n Automation
              </span>
              {t.hero.descriptionTail}
            </motion.p>

            {/* CTA Buttons — full width on mobile so they are easy to tap */}
            <motion.div
              variants={item}
              className="mb-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            >
              <Button size="lg" onClick={() => scrollTo('projects')} className="w-full sm:w-auto">
                {t.hero.ctaPrimary}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto"
              >
                {t.hero.ctaSecondary}
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start"
            >
              <a
                href="https://github.com/mohammed-kh7"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2.5 text-gray-500 transition-colors hover:bg-white/60 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-primary-400"
                aria-label="GitHub"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/hamoodkh7/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2.5 text-gray-500 transition-colors hover:bg-white/60 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-primary-400"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/hamood.kh71"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2.5 text-gray-500 transition-colors hover:bg-white/60 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-primary-400"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <div className="hidden h-5 w-px bg-gray-300 sm:block dark:bg-gray-700" />
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                dir="ltr"
              >
                {EMAIL}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="mt-12 grid w-full max-w-sm grid-cols-3 gap-6 sm:max-w-none"
            >
              {t.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 rounded-full p-2 text-gray-400 transition-colors hover:text-primary-500 dark:text-gray-500 dark:hover:text-primary-400 sm:block"
        aria-label={t.hero.scrollIndicator}
      >
        <FiArrowDown className="h-6 w-6" />
      </motion.button>
    </section>
  )
}