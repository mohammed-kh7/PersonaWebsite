import React, { Suspense } from 'react'
import { Hero } from '@/components/sections/Hero'
import { LoadingSkeleton } from '@/components/skeleton/LoadingSkeleton'

// Everything below the fold is lazy-loaded to reduce initial JS parse time (TBT)
const About = React.lazy(() => import('@/components/sections/About').then((m) => ({ default: m.About })))
const Skills = React.lazy(() => import('@/components/sections/Skills').then((m) => ({ default: m.Skills })))
const Projects = React.lazy(() => import('@/components/sections/Projects').then((m) => ({ default: m.Projects })))
const Services = React.lazy(() => import('@/components/sections/Services').then((m) => ({ default: m.Services })))
const Contact = React.lazy(() => import('@/components/sections/Contact').then((m) => ({ default: m.Contact })))

export const Home = () => (
  <main className="flex-1">
    <Hero />
    <Suspense fallback={<LoadingSkeleton />}>
      <About />
    </Suspense>
    <Suspense fallback={<LoadingSkeleton />}>
      <Skills />
    </Suspense>
    <Suspense fallback={<LoadingSkeleton />}>
      <Projects />
    </Suspense>
    <Suspense fallback={<LoadingSkeleton />}>
      <Services />
    </Suspense>
    <Suspense fallback={<LoadingSkeleton />}>
      <Contact />
    </Suspense>
  </main>
)
