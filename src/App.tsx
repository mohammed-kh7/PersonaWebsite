import { AppProvider } from '@/components/providers/AppProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Home } from '@/pages/Home'

function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Home />
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App
