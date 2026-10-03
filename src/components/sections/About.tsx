import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../common/SectionHeading'
import { Card } from '../common/Card'
import { useLanguage } from '@/context/LanguageContext'
import { FiCode, FiZap } from 'react-icons/fi'

const highlightIcons = {
  code: FiCode,
  zap: FiZap,
} as const

const highlightStyles = {
  code: { color: 'text-primary-500', bg: 'bg-primary-500/10' },
  zap: { color: 'text-accent-cyan-500', bg: 'bg-accent-cyan-500/10' },
} as const

export const About: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Subtle gradient backdrop */}
      <div
        className="absolute inset-0 bg-mesh opacity-50"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          title={t.about.title}
          highlight={t.about.highlight}
          subtitle={t.about.subtitle}
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 text-center sm:text-start text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {t.about.bioLead}{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {t.about.bioRole}
              </span>{' '}
              {t.about.bioTail}
            </p>
            <p className="mb-8 text-center sm:text-start text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {t.about.paragraphTwo}
            </p>

            {/* Tech stack tags */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {t.about.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-sm font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Highlight Cards */}
          <div className="space-y-4">
            {t.about.highlights.map((h, i) => {
              const Icon = highlightIcons[h.id]
              const style = highlightStyles[h.id]

              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card hover className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-start gap-4">
                    <div className={`rounded-xl p-3 ${style.bg}`}>
                      <Icon className={`h-6 w-6 ${style.color}`} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                        {h.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {h.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}