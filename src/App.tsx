import { LazyMotion, domAnimation, domMax } from 'framer-motion'
import { AppProvider } from '@/components/providers/AppProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Home } from '@/pages/Home'
import { useLenis } from '@/hooks/useLenis'
import { useGSAPReveal } from '@/hooks/useGSAPReveal'
import { useLanguage } from '@/components/providers/LanguageContext'

function AppContent() {
  const { dir } = useLanguage()

  return (
    <div key={dir} className="flex min-h-screen flex-col">
      <LazyMotion features={domMax} strict>
        <Navbar />
      </LazyMotion>
      <Home />
      <Footer />
    </div>
  )
}

function App() {
  useLenis()

  // Apply GSAP scroll reveal animations to sections
  useGSAPReveal('.animate-on-scroll', { delay: 0.1, stagger: 0.15, duration: 0.7 })

  return (
    <LazyMotion features={domAnimation} strict>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LazyMotion>
  )
}

export default App
