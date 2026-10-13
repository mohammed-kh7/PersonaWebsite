import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../common/SectionHeading'
import { Card } from '../common/Card'
import { useLanguage } from '@/context/LanguageContext'
import { FiCode, FiLayers, FiCpu, FiLayout } from 'react-icons/fi'

const iconMap: Record<string, React.ElementType> = {
  '1': FiCode,
  '2': FiLayers,
  '3': FiCpu,
  '4': FiLayout,
}

const colorAccents = [
  { bg: 'bg-blue-600/10', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-600' },
  { bg: 'bg-blue-800/10', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-700' },
  { bg: 'bg-sky-500/10', text: 'text-sky-600 dark:text-sky-400', dot: 'bg-sky-500' },
  { bg: 'bg-slate-700/10', text: 'text-slate-700 dark:text-slate-300', dot: 'bg-slate-600' },
]

export const Services: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/30"
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
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card hover className="flex h-full flex-col items-center text-center sm:items-start sm:text-start p-6">
                  <div className={`mb-4 inline-flex rounded-xl p-3 ${accent.bg}`}>
                    <Icon className={`h-6 w-6 ${accent.text}`} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.description}
                  </p>

                  <ul className="w-full space-y-2 border-t border-slate-200/60 pt-4 dark:border-white/5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
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