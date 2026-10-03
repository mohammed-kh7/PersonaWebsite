import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiInstagram, FiArrowUp } from 'react-icons/fi'
import { FaFacebook } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'

const socialLinks = [
  { name: 'GitHub', icon: FiGithub, url: 'https://github.com/mohammed-kh7' },
  { name: 'LinkedIn', icon: FiLinkedin, url: 'https://www.linkedin.com/in/hamoodkh7/' },
  { name: 'Facebook', icon: FaFacebook, url: 'https://www.facebook.com/hamood.kh71' },
  { name: 'Instagram', icon: FiInstagram, url: 'https://www.instagram.com/hamood.kh7/' },
  { name: 'Email', icon: FiMail, url: 'mailto:mohammedkhudair123@gmail.com' },
]

export const Footer: React.FC = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-gray-200/50 dark:border-white/5">
      <div className="container-custom py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div>
            <button
              onClick={scrollToTop}
              className="mb-2 text-xl font-bold focus:outline-none"
              aria-label={t.nav.scrollToTop}
            >
              <span className="gradient-text">{t.brand.first}</span>{' '}
              <span className="text-gray-900 dark:text-white">{t.brand.last}</span>
            </button>
            <p className="max-w-md text-center text-sm text-gray-500 dark:text-gray-400 sm:text-start">
              {t.footer.tagline}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2.5 text-gray-500 transition-colors hover:bg-primary-500/10 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright & Back to top */}
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-gray-200/50 pt-8 dark:border-white/5">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} {t.brand.first} {t.brand.last}. {t.footer.rights}
          </p>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-primary-500/10 hover:text-primary-500 dark:text-gray-500 dark:hover:text-primary-400"
            aria-label={t.common.backToTop}
          >
            <FiArrowUp className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}