import { LazyMotion, domAnimation, domMax } from 'framer-motion'
import { AppProvider } from '@/components/providers/AppProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Home } from '@/pages/Home'

function App() {
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
