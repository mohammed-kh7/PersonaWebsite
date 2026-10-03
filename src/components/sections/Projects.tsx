import React, { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import { SectionHeading } from '../common/SectionHeading'
import { Card } from '../common/Card'
import { Button } from '../common/Button'
import { useLanguage } from '@/context/LanguageContext'
import { interpolate } from '@/i18n'
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface ProjectLink {
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

const projects: ProjectLink[] = [
  {
    image: '/images/projects/portfolio.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    liveUrl: 'https://mohammed-kh7.github.io/MO1/',
    githubUrl: 'https://github.com/mohammed-kh7/MO1',
  },
  {
    image: '/images/projects/cruds.png',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage'],
    liveUrl: 'https://mohammed-kh7.github.io/cruds/',
    githubUrl: 'https://github.com/mohammed-kh7/cruds',
  },
  {
    image: '/images/projects/xo.png',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'DOM Manipulation'],
    liveUrl: 'https://mohammed-kh7.github.io/XO/',
    githubUrl: 'https://github.com/mohammed-kh7/XO',
  },
  {
    image: '/images/projects/hangman.png',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Game Logic'],
    liveUrl: 'https://mohammed-kh7.github.io/Hangman/',
    githubUrl: 'https://github.com/mohammed-kh7/Hangman',
  },
  {
    image: '/images/projects/currency-converter.png',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Currency Logic'],
    liveUrl: 'https://mohammed-kh7.github.io/-/',
    githubUrl: 'https://github.com/mohammed-kh7/-',
  },
]

export const Projects: React.FC = () => {
  const { t, locale } = useLanguage()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: true,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  // Embla resolves the scroll direction once, so re-initialise when the locale flips
  useEffect(() => {
    emblaApi?.reInit()
  }, [emblaApi, locale])

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="mb-10 flex flex-col items-center justify-center gap-6 text-center">
          <SectionHeading
            title={t.projects.title}
            highlight={t.projects.highlight}
            subtitle={t.projects.subtitle}
            className="mb-0"
            align="center"
          />

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-100 text-gray-600 transition-all hover:bg-primary-500 hover:text-white disabled:opacity-30 disabled:hover:bg-surface-100 disabled:hover:text-gray-600 dark:bg-surface-800 dark:text-gray-300 dark:disabled:hover:bg-surface-800 dark:disabled:hover:text-gray-300"
              aria-label={t.common.previousSlide}
            >
              <FiChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-100 text-gray-600 transition-all hover:bg-primary-500 hover:text-white disabled:opacity-30 disabled:hover:bg-surface-100 disabled:hover:text-gray-600 dark:bg-surface-800 dark:text-gray-300 dark:disabled:hover:bg-surface-800 dark:disabled:hover:text-gray-300"
              aria-label={t.common.nextSlide}
            >
              <FiChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Embla Carousel */}
        <div
          className="overflow-hidden"
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
        >
          <div className="flex -ms-6 pb-6 touch-pan-y">
            {t.projects.items.map((content, index) => {
              const project = projects[index]

              if (!project) return null

              return (
                <div
                  key={content.id}
                  className="min-w-0 flex-[0_0_100%] ps-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={interpolate(t.common.slideOf, {
                    current: index + 1,
                    total: t.projects.items.length,
                  })}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card glow className="group flex h-full flex-col overflow-hidden p-0">
                      {/* Image Preview Area */}
                      <div className="relative aspect-video w-full overflow-hidden bg-surface-100 dark:bg-surface-850">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={`${content.title} preview`}
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="select-none text-4xl font-bold text-primary-500/20 dark:text-primary-400/15">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                        )}
                        {/* Gradient overlay on hover with quick action link */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-500"
                            >
                              <FiExternalLink className="h-4 w-4" />
                              {t.common.visitDemo}
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                          {content.title}
                        </h3>
                        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {content.description}
                        </p>

                        {/* Tech tags */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-primary-500/10 px-2.5 py-0.5 text-xs font-medium text-primary-600 dark:text-primary-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links — Live Demo & GitHub */}
                        <div className="flex gap-2 border-t border-gray-200/50 pt-4 dark:border-white/5">
                          {project.liveUrl && (
                            <Button
                              variant="primary"
                              size="sm"
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-xs"
                            >
                              <FiExternalLink className="me-1.5 h-3.5 w-3.5" />
                              {t.common.liveDemo}
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-xs"
                            >
                              <FiGithub className="me-1.5 h-3.5 w-3.5" />
                              {t.common.github}
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-8 bg-primary-500'
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'
              }`}
              aria-label={interpolate(t.common.goToSlide, { index: index + 1 })}
              aria-current={index === selectedIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}