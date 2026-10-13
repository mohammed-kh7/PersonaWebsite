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
  code: { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-600/10' },
  zap: { color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-800/10' },
} as const

export const About: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionHeading
          title={t.about.title}
          highlight={t.about.highlight}
          subtitle={t.about.subtitle}
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-6 text-center sm:text-start text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {t.about.bioLead}{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {t.about.bioRole}
              </span>{' '}
              {t.about.bioTail}
            </p>
            <p className="mb-8 text-center sm:text-start text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {t.about.paragraphTwo}
            </p>

            {/* Tech stack tags */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {t.about.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-white/70 px-3.5 py-1 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
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
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card hover className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-start gap-4">
                    <div className={`rounded-xl p-3 shrink-0 ${style.bg}`}>
                      <Icon className={`h-6 w-6 ${style.color}`} />
                    </div>
                    <div>
                      <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-white">
                        {h.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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