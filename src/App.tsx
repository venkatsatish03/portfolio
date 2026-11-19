import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Achievements } from '@/components/sections/Achievements'
import { Research } from '@/components/sections/Research'
import { GitHubActivity } from '@/components/sections/GitHubActivity'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/layout/Footer'

function App() {
  return (
    <div className="relative min-h-screen bg-background text-primary selection:bg-accent-secondary selection:text-background">
      {/* Ambient Glow Lights for Glassmorphism Refraction */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      >
        <div className="ambient-glow-orb -top-24 -left-24 w-[420px] h-[420px] bg-accent/25 dark:bg-accent/20 animate-pulse duration-[8000ms]" />
        <div className="ambient-glow-orb top-1/3 -right-32 w-[480px] h-[480px] bg-emerald-500/20 dark:bg-emerald-500/15" />
        <div className="ambient-glow-orb bottom-1/4 -left-32 w-[450px] h-[450px] bg-amber-500/15 dark:bg-amber-600/15" />
      </div>

      <Navbar />
      <main id="main-content">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Achievements />
        <Research />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
