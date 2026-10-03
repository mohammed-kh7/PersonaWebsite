import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../common/SectionHeading'
import { GlassPanel } from '../common/GlassPanel'
import { useLanguage } from '@/context/LanguageContext'
import type { SkillCategory, SkillId } from '@/i18n'
import {
  FiCode,
  FiLayout,
  FiZap,
  FiGitBranch,
  FiCpu,
  FiBox,
  FiFeather,
  FiTool,
  FiDatabase,
  FiTerminal,
} from 'react-icons/fi'

const skillIcons: Record<SkillId, React.ElementType> = {
  react: FiCode,
  javascript: FiTerminal,
  'html-css': FiLayout,
  tailwind: FiFeather,
  'responsive-design': FiBox,
  'git-github': FiGitBranch,
  figma: FiLayout,
  vscode: FiTool,
  'n8n-workflows': FiDatabase,
  'ai-integration': FiCpu,
  'api-automation': FiZap,
  'webhook-design': FiBox,
}

const categoryStyles: Record<
  SkillCategory,
  { pillBg: string; pillText: string }
> = {
  frontend: {
    pillBg: 'bg-primary-500/10 hover:bg-primary-500/20 border-primary-500/20',
    pillText: 'text-primary-600 dark:text-primary-400',
  },
  tools: {
    pillBg: 'bg-accent-pink-500/10 hover:bg-accent-pink-500/20 border-accent-pink-500/20',
    pillText: 'text-accent-pink-600 dark:text-accent-pink-400',
  },
  automation: {
    pillBg: 'bg-accent-cyan-500/10 hover:bg-accent-cyan-500/20 border-accent-cyan-500/20',
    pillText: 'text-accent-cyan-600 dark:text-accent-cyan-400',
  },
}

export const Skills: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden bg-surface-100/50 dark:bg-surface-900/50"
    >
      <div className="container-custom relative z-10">
        <SectionHeading
          title={t.skills.title}
          highlight={t.skills.highlight}
          subtitle={t.skills.subtitle}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.skills.categories.map((cat, catIdx) => {
            const style = categoryStyles[cat.key]

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: catIdx * 0.12 }}
              >
                <GlassPanel className="h-full p-6">
                  <h3 className="mb-5 text-center sm:text-start text-lg font-semibold text-gray-900 dark:text-white">
                    {cat.label}
                  </h3>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                    {t.skills.items
                      .filter((s) => s.category === cat.key)
                      .map((skill, i) => {
                        const Icon = skillIcons[skill.id]

                        return (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: catIdx * 0.1 + i * 0.06 }}
                          >
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${style.pillBg} ${style.pillText}`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {skill.label}
                            </span>
                          </motion.div>
                        )
                      })}
                  </div>
                </GlassPanel>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}