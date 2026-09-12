import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Achievements } from '@/components/sections/Achievements'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/layout/Footer'

function App() {
  return (
    <div className="relative min-h-screen bg-background text-primary selection:bg-accent-secondary selection:text-background">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
