import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../common/SectionHeading'
import { Card } from '../common/Card'
import { GlassPanel } from '../common/GlassPanel'
import { Input, Textarea } from '../common/Input'
import { Button } from '../common/Button'
import { ParticleField } from '../common/ParticleField'
import { useForm } from '@/hooks/useForm'
import { useLanguage } from '@/context/LanguageContext'
import { sendToN8n } from '@/utils/n8n-integration'
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiSend,
} from 'react-icons/fi'
import type { ContactFormData } from '@/types'

/**
 * Maximum accepted field lengths. Mirrored server-side in api/contact.ts —
 * client validation is UX only, the server is the trust boundary.
 */
const MAX_LENGTHS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 5000,
} as const

export const Contact: React.FC = () => {
  const { t } = useLanguage()
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  // Honeypot: hidden from users, tempting for bots.
  const [honeypot, setHoneypot] = useState('')

  const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm<ContactFormData>(
      { name: '', email: '', subject: '', message: '' },
      {
        name: { required: true, minLength: 2, maxLength: MAX_LENGTHS.name },
        email: { required: true, email: true, maxLength: MAX_LENGTHS.email },
        subject: { required: true, minLength: 3, maxLength: MAX_LENGTHS.subject },
        message: { required: true, minLength: 10, maxLength: MAX_LENGTHS.message },
      },
      {
        messages: t.validation,
        fieldLabels: {
          name: t.contact.form.name,
          email: t.contact.form.email,
          subject: t.contact.form.subject,
          message: t.contact.form.message,
        },
      }
    )

  const onSubmit = handleSubmit(async (data) => {
    const result = await sendToN8n({ ...data, website: honeypot })

    if (result.success) {
      setSubmitStatus('success')
      setHoneypot('')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } else {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  })

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden bg-surface-100/50 dark:bg-surface-900/50"
    >
      <ParticleField count={10} />

      <div className="container-custom relative z-10">
        <SectionHeading
          title={t.contact.title}
          highlight={t.contact.highlight}
          subtitle={t.contact.subtitle}
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="text-center lg:text-start">
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                {t.contact.connectTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t.contact.connectText}
              </p>
            </div>

            <div className="space-y-4">
              <Card hover={false}>
                <div className="flex flex-col items-center text-center lg:flex-row lg:text-start gap-4">
                  <div className="rounded-xl bg-primary-500/10 p-3">
                    <FiMail className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t.contact.emailLabel}
                    </p>
                    <a
                      href="mailto:mohammedkhudair123@gmail.com"
                      className="text-sm text-gray-500 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                      dir="ltr"
                    >
                      mohammedkhudair123@gmail.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card hover={false}>
                <div className="flex flex-col items-center text-center lg:flex-row lg:text-start gap-4">
                  <div className="rounded-xl bg-accent-cyan-500/10 p-3">
                    <FiClock className="h-5 w-5 text-accent-cyan-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t.contact.responseTimeLabel}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t.contact.responseTimeValue}
                    </p>
                  </div>
                </div>
              </Card>

              <Card hover={false}>
                <div className="flex flex-col items-center text-center lg:flex-row lg:text-start gap-4">
                  <div className="rounded-xl bg-accent-pink-500/10 p-3">
                    <FiMessageSquare className="h-5 w-5 text-accent-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t.contact.talkLabel}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t.contact.talkValue}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassPanel strong className="p-6 sm:p-8">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <div className="mb-4 rounded-full bg-emerald-500/10 p-4">
                    <FiCheckCircle className="h-12 w-12 text-emerald-500" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t.contact.form.successText}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5" noValidate>
                  {/* Honeypot — visually hidden but present in the DOM for bots to fill */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <Input
                    name="name"
                    label={t.contact.form.name}
                    placeholder={t.contact.form.namePlaceholder}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                    icon={<FiUser className="h-4 w-4" />}
                    maxLength={MAX_LENGTHS.name}
                    autoComplete="name"
                    required
                  />

                  <Input
                    name="email"
                    type="email"
                    label={t.contact.form.email}
                    placeholder={t.contact.form.emailPlaceholder}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    icon={<FiMail className="h-4 w-4" />}
                    maxLength={MAX_LENGTHS.email}
                    autoComplete="email"
                    required
                  />

                  <Input
                    name="subject"
                    label={t.contact.form.subject}
                    placeholder={t.contact.form.subjectPlaceholder}
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.subject}
                    maxLength={MAX_LENGTHS.subject}
                    autoComplete="off"
                    required
                  />

                  <Textarea
                    name="message"
                    label={t.contact.form.message}
                    placeholder={t.contact.form.messagePlaceholder}
                    rows={5}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.message}
                    maxLength={MAX_LENGTHS.message}
                    required
                  />

                  {submitStatus === 'error' && (
                    <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 dark:text-red-400">
                      {t.contact.form.errorText}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={isSubmitting}
                    loadingText={t.common.sending}
                  >
                    <FiSend className="me-2 h-4 w-4" />
                    {t.contact.form.submit}
                  </Button>
                </form>
              )}
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  )
}