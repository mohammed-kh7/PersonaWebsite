import { LazyMotion, domAnimation, domMax } from 'framer-motion'
import { AppProvider } from '@/components/providers/AppProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Home } from '@/pages/Home'
import { useLenis } from '@/hooks/useLenis'
import { useGSAPReveal } from '@/hooks/useGSAPReveal'

function App() {
  useLenis()

  // Apply GSAP scroll reveal animations to sections (CLAUDE.md: smooth fade/slide)
  useGSAPReveal('.animate-on-scroll', { delay: 0.1, stagger: 0.15, duration: 0.7 })

  return (
    <LazyMotion features={domAnimation} strict>
      <AppProvider>
        <div className="flex min-h-screen flex-col">
          <LazyMotion features={domMax} strict>
            <Navbar />
          </LazyMotion>
          <Home />
          <Footer />
        </div>
      </AppProvider>
    </LazyMotion>
  )
}

export default App
