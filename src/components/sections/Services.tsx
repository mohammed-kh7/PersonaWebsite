import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../common/SectionHeading'
import { Card } from '../common/Card'
import { useLanguage } from '@/context/LanguageContext'
import { FiCode, FiCpu, FiLayout, FiZap } from 'react-icons/fi'

const iconMap: Record<string, React.ElementType> = {
  code: FiCode,
  layout: FiLayout,
  cpu: FiCpu,
  zap: FiZap,
}

const colorAccents = [
  { bg: 'bg-primary-500/10', text: 'text-primary-500' },
  { bg: 'bg-accent-cyan-500/10', text: 'text-accent-cyan-500' },
  { bg: 'bg-accent-pink-500/10', text: 'text-accent-pink-500' },
  { bg: 'bg-primary-500/10', text: 'text-primary-500' },
]

export const Services: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden bg-surface-100/50 dark:bg-surface-900/50"
    >
      <div className="container-custom relative z-10">
        <SectionHeading
          title={t.services.title}
          highlight={t.services.highlight}
          subtitle={t.services.subtitle}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((service, i) => {
            const Icon = iconMap[service.id] || FiCode
            const accent = colorAccents[i % colorAccents.length]

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card hover glow className="flex h-full flex-col items-center text-center sm:items-start sm:text-start p-6">
                  <div className={`mb-4 inline-flex rounded-xl p-3 ${accent.bg}`}>
                    <Icon className={`h-6 w-6 ${accent.text}`} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>

                  <ul className="w-full space-y-1.5 border-t border-gray-200/50 pt-4 dark:border-white/5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400"
                      >
                        <span className={`h-1.5 w-1.5 sm:h-1 sm:w-1 shrink-0 rounded-full ${accent.bg.replace('/10', '')}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}