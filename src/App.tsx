import React, { Suspense } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
// Hero loads synchronously — it is the above-the-fold LCP element
import { Hero } from './components/sections/Hero'

// Everything below the fold is lazy-loaded to reduce initial JS parse time (TBT)
const About    = React.lazy(() => import('./components/sections/About').then(m => ({ default: m.About })))
const Skills   = React.lazy(() => import('./components/sections/Skills').then(m => ({ default: m.Skills })))
const Projects = React.lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })))
const Services = React.lazy(() => import('./components/sections/Services').then(m => ({ default: m.Services })))
const Contact  = React.lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })))

/** Minimal skeleton shown while a lazy section is loading */
const SectionSkeleton = () => (
  <div className="section-padding animate-pulse" aria-hidden="true">
    <div className="container-custom space-y-4">
      <div className="mx-auto h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
      <div className="mx-auto h-4 w-96 max-w-full rounded-lg bg-gray-100 dark:bg-gray-800/60" />
    </div>
  </div>
)

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Hero />
            <Suspense fallback={<SectionSkeleton />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Services />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
