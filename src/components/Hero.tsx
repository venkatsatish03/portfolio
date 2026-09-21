import { useState, type MouseEvent } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  personal,
  education,
  competitiveProgramming,
} from '@/data/portfolioData'
import { HackerDossier } from '@/components/common/HackerDossier'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function scrollToSection(
  sectionId: string,
  event: MouseEvent<HTMLAnchorElement>,
) {
  const section = document.getElementById(sectionId)
  if (section) {
    event.preventDefault()
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function Hero() {
  const [showDossier, setShowDossier] = useState(false)

  const dossierCode = `const engineer = {
  name: "${personal.fullName}",
  degree: "B.Tech CSE (${education.specialization})",
  institution: "${education.university}",
  gpa: "${education.gpa}",
  patent: "OjasRaksha (Co-Inventor)",
  internship: "TSAROLABS (AI & Cyber)",
  leadership: "Chair, Algorand Club",
  competitiveCoding: "${competitiveProgramming.totalProblems} Solved",
  status: "Available for Software Engineering & Security Roles"
};`

  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-8 sm:pt-40 sm:pb-12"
      id="hero"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full flex-1 flex flex-col justify-center">
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7">
            {/* Kicker tag */}
            <motion.div
              className="editorial-tag text-xs tracking-widest text-accent font-mono mb-4 flex items-center gap-2"
              variants={itemVariants}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>INDEPENDENT ENGINEER &amp; RESEARCHER</span>
            </motion.div>

            {/* Giant Editorial Headline */}
            <motion.h1
              className="editorial-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-primary tracking-tight leading-[0.98]"
              variants={itemVariants}
            >
              I build digital{' '}
              <span className="text-accent italic font-medium inline-block pr-1">
                experiences
              </span>{' '}
              with intent.
            </motion.h1>

            {/* Sub-paragraph */}
            <motion.p
              className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-secondary font-normal"
              variants={itemVariants}
            >
              I help ambitious teams build resilient, production-ready systems
              across cybersecurity, blockchain, and applied ML. KL University CS
              '27 · Patent Co-Inventor.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6"
              variants={itemVariants}
            >
              <a
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-xs font-bold uppercase tracking-wider text-background transition-all duration-200 hover:bg-accent hover:text-white hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                href="#projects"
                onClick={(e) => scrollToSection('projects', e)}
              >
                <span>VIEW SELECTED WORK</span>
              </a>

              <a
                className="group inline-flex h-12 items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary pb-0.5 transition-all hover:text-accent hover:border-accent"
                href="#about"
                onClick={(e) => scrollToSection('about', e)}
              >
                <span>READ ABOUT ME</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <button
                aria-label="Toggle developer dossier terminal"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-primary transition-colors underline decoration-dotted underline-offset-4 cursor-pointer"
                onClick={() => setShowDossier(!showDossier)}
                type="button"
              >
                <span className="text-emerald-500 font-bold">&gt;_</span>
                <span>{showDossier ? 'Hide Code Dossier' : 'View Code Dossier'}</span>
              </button>
            </motion.div>

            {/* Expandable Hacker Dossier Terminal */}
            {showDossier && (
              <HackerDossier
                code={dossierCode}
                fileName="satish_dossier.ts"
              />
            )}
          </div>

          {/* Right Column: Orbital Atom Graphic with Floating VS Badge */}
          <motion.div
            className="lg:col-span-5 flex items-center justify-center relative py-6 lg:py-0"
            variants={itemVariants}
          >
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[440px] lg:h-[440px] flex items-center justify-center">
              {/* SVG Orbital Geometry */}
              <svg
                aria-hidden="true"
                className="w-full h-full text-foreground/20 overflow-visible"
                viewBox="0 0 400 400"
              >
                {/* Orbital Ring 1 */}
                <ellipse
                  className="animate-orbital-1 origin-center"
                  cx="200"
                  cy="200"
                  fill="none"
                  rx="180"
                  ry="70"
                  stroke="currentColor"
                  strokeDasharray="4 6"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                />

                {/* Orbital Ring 2 */}
                <ellipse
                  className="animate-orbital-2 origin-center"
                  cx="200"
                  cy="200"
                  fill="none"
                  rx="180"
                  ry="70"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="1.2"
                  transform="rotate(60 200 200)"
                />

                {/* Orbital Ring 3 */}
                <ellipse
                  className="animate-orbital-3 origin-center"
                  cx="200"
                  cy="200"
                  fill="none"
                  rx="180"
                  ry="70"
                  stroke="currentColor"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  transform="rotate(120 200 200)"
                />

                {/* Outer guide circle */}
                <circle
                  cx="200"
                  cy="200"
                  fill="none"
                  r="150"
                  stroke="currentColor"
                  strokeDasharray="2 8"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
              </svg>

              {/* Floating Orange Initials Badge matching 'YN' in reference */}
              <motion.div
                animate={{
                  y: [-4, 4, -4],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 flex items-center justify-center"
              >
                <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/30 text-white font-display text-xl sm:text-2xl font-extrabold tracking-tight">
                  <span>VS</span>
                  {/* Subtle pulsing outer ring */}
                  <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-25" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Hero Divider & Ticker matching reference */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full mt-16 pt-6 border-t border-border/70">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider text-muted">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-technical" />
            <span>BASED IN HYDERABAD, INDIA · AVAILABLE FOR WORK</span>
          </div>

          <a
            className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors"
            href="#projects"
            onClick={(e) => scrollToSection('projects', e)}
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
