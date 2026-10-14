import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../common/SectionHeading'
import { GlassPanel } from '../common/GlassPanel'
import { useLanguage } from '@/components/providers/LanguageContext'
import type { SkillCategory, SkillId } from '@/i18n'
import {
  FiCode,
  FiLayout,
  FiZap,
  FiGitBranch,
  FiBox,
  FiFeather,
  FiTool,
  FiTerminal,
  FiLayers,
  FiDatabase,
  FiCpu,
} from 'react-icons/fi'

const skillIcons: Record<SkillId, React.ElementType> = {
  react: FiCode,
  javascript: FiTerminal,
  typescript: FiCode,
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
  performance: FiZap,
  architecture: FiLayers,
  vite: FiZap,
}

const categoryStyles: Record<
  SkillCategory,
  { pillBg: string; pillText: string }
> = {
  frontend: {
    pillBg: 'bg-blue-600/10 hover:bg-blue-600/20 border-blue-600/25',
    pillText: 'text-blue-600 dark:text-blue-400',
  },
  tools: {
    pillBg: 'bg-slate-700/10 hover:bg-slate-700/20 border-slate-600/25',
    pillText: 'text-slate-700 dark:text-slate-300',
  },
  automation: {
    pillBg: 'bg-sky-500/10 hover:bg-sky-500/20 border-sky-400/30',
    pillText: 'text-sky-600 dark:text-sky-300',
  },
  performance: {
    pillBg: 'bg-blue-800/10 hover:bg-blue-800/20 border-blue-700/25',
    pillText: 'text-blue-700 dark:text-blue-300',
  },
}

export const Skills: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/30"
    >
      <div className="container-custom relative z-10">
        <SectionHeading
          title={t.skills.title}
          highlight={t.skills.highlight}
          subtitle={t.skills.subtitle}
        />

        {/* Bento grid layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.skills.categories.map((cat, catIdx) => {
            const style = categoryStyles[cat.key] || categoryStyles.frontend

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: catIdx * 0.1 }}
              >
                <GlassPanel className="h-full p-6 shadow-sm">
                  <h3 className="mb-5 text-center sm:text-start text-lg font-bold text-slate-900 dark:text-white">
                    {cat.label}
                  </h3>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                    {t.skills.items
                      .filter((s) => s.category === cat.key)
                      .map((skill, i) => {
                        const Icon = skillIcons[skill.id] || FiCode

                        return (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.25, delay: catIdx * 0.08 + i * 0.04 }}
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
