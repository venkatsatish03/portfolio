import { useState, type MouseEvent } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  personal,
  education,
  competitiveProgramming,
} from '@/data/portfolioData'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
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
  const [copiedConsole, setCopiedConsole] = useState(false)

  const dossierCode = `const engineer: SoftwareEngineer = {
  name: "${personal.fullName}",
  university: "KL University",
  specialization: "${education.specialization}",
  gpa: "${education.gpa}",
  patent: "OjasRaksha (Co-Inventor)",
  internship: "TSAROLABS (AI & Cyber)",
  leadership: "Chair, Algorand Club (70 devs)",
  problemsSolved: "${competitiveProgramming.totalProblems}",
  status: "Ready for High-Impact Engineering Roles"
};`

  const handleCopyDossier = () => {
    navigator.clipboard.writeText(dossierCode)
    setCopiedConsole(true)
    setTimeout(() => setCopiedConsole(false), 2000)
  }

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
      id="hero"
    >
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-accent-secondary/15 blur-[120px] sm:w-[750px] sm:h-[750px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-20 -z-10 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-[350px] w-[350px] rounded-full bg-technical/10 blur-[90px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {/* Left Column: Core Narrative */}
          <div className="text-center lg:text-left lg:col-span-7">
            {/* Status Pill */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-accent-secondary/35 bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-secondary shadow-soft backdrop-blur-md"
              variants={itemVariants}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-technical opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-technical" />
              </span>
              <span>Available for Software Engineer &amp; Security Roles</span>
            </motion.div>

            {/* Name and Tagline */}
            <motion.h1
              className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-primary"
              variants={itemVariants}
            >
              Hi, I'm{' '}
              <span className="text-gradient-cyan block sm:inline">
                {personal.fullName}
              </span>
            </motion.h1>

            <motion.p
              className="mt-4 font-mono text-base font-semibold tracking-wide text-accent-secondary sm:text-lg"
              variants={itemVariants}
            >
              {personal.role}
            </motion.p>

            <motion.p
              className="mt-5 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg"
              variants={itemVariants}
            >
              {personal.tagline} Final-year CS student at KL University crafting
              resilient blockchain architectures, production computer vision
              pipelines, and security-first web services.
            </motion.p>

            {/* Credential Badges */}
            <motion.div
              className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2.5"
              variants={itemVariants}
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Patent Co-Inventor (OjasRaksha)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent-secondary/30 bg-accent-secondary/10 px-3 py-1.5 text-xs font-medium text-accent-secondary">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                500+ CP Solved (LeetCode &amp; CodeChef)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-technical/30 bg-technical/10 px-3 py-1.5 text-xs font-medium text-technical">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                GPA 8.73 / 10
              </span>
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <a
                className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]"
                href="#projects"
                onClick={(e) => scrollToSection('projects', e)}
              >
                <span>View Featured Projects</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>

              <a
                aria-label="Download Resume (PDF)"
                className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-accent-secondary/60 bg-accent-secondary/10 px-6 py-3 text-sm font-semibold text-accent-secondary shadow-soft backdrop-blur-md transition-all duration-200 hover:border-accent-secondary hover:bg-accent-secondary hover:text-background active:scale-[0.98]"
                download="Venkat_Satish_Resume.pdf"
                href={personal.resume}
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Download Resume</span>
              </a>

              <a
                className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface/80 px-6 py-3 text-sm font-semibold text-primary shadow-soft backdrop-blur-md transition-all duration-200 hover:border-accent-secondary hover:text-accent-secondary active:scale-[0.98]"
                href="#experience"
                onClick={(e) => scrollToSection('experience', e)}
              >
                <span>Experience &amp; Leadership</span>
              </a>

              <a
                className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface/50 px-5 py-3 text-sm font-medium text-secondary transition-all duration-200 hover:border-accent-secondary hover:text-accent-secondary hover:bg-surface"
                href="#contact"
                onClick={(e) => scrollToSection('contact', e)}
              >
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Quick Links / Socials */}
            <motion.div
              className="mt-8 flex items-center justify-center lg:justify-start gap-5 pt-4 text-secondary border-t border-border/60"
              variants={itemVariants}
            >
              <span className="text-xs font-mono uppercase tracking-wider text-muted">
                Connect:
              </span>
              <a
                aria-label="GitHub Profile"
                className="hover:text-accent-secondary transition-colors"
                href={personal.github}
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.16c-3.22.7-3.9-1.38-3.9-1.38-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.72 0-1.27.45-2.3 1.2-3.11-.12-.29-.52-1.48.11-3.07 0 0 .98-.31 3.17 1.19A10.9 10.9 0 0 1 12 5.9c.98 0 1.96.13 2.88.39 2.2-1.5 3.17-1.19 3.17-1.19.64 1.59.24 2.78.12 3.07.75.82 1.2 1.85 1.2 3.11 0 4.45-2.7 5.43-5.28 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a
                aria-label="LinkedIn Profile"
                className="hover:text-accent-secondary transition-colors"
                href={personal.linkedIn}
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                aria-label="Email Contact"
                className="hover:text-accent-secondary transition-colors"
                href={`mailto:${personal.email}`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect height="14" rx="2" width="18" x="3" y="5" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Developer Dossier Terminal */}
          <motion.div
            className="lg:col-span-5 relative"
            variants={itemVariants}
          >
            <div className="rounded-2xl border border-border/80 bg-surface-raised/90 p-1 shadow-card backdrop-blur-xl">
              {/* Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-muted">
                    satish@security-node:~
                  </span>
                </div>
                <button
                  aria-label="Copy dossier code"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-accent-secondary transition-colors"
                  onClick={handleCopyDossier}
                  type="button"
                >
                  {copiedConsole ? (
                    <span className="text-technical font-semibold">
                      Copied!
                    </span>
                  ) : (
                    <>
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          height="13"
                          rx="2"
                          width="13"
                          x="9"
                          y="9"
                          strokeWidth="2"
                        />
                        <path
                          d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                          strokeWidth="2"
                        />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Code Body */}
              <div className="p-5 font-mono text-xs leading-relaxed text-secondary overflow-x-auto">
                <p className="text-muted mb-2">
                  // Verified Engineer Dossier (v2.4)
                </p>
                <div className="space-y-1">
                  <div>
                    <span className="text-purple-400">const </span>
                    <span className="text-blue-400">engineer</span>:{' '}
                    <span className="text-accent-secondary">
                      SoftwareEngineer
                    </span>{' '}
                    = {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-secondary">name: </span>
                    <span className="text-emerald-400">
                      "{personal.fullName}"
                    </span>
                    ,
                  </div>
                  <div className="pl-4">
                    <span className="text-secondary">university: </span>
                    <span className="text-emerald-400">
                      "KL University (Deemed)"
                    </span>
                    ,
                  </div>
                  <div className="pl-4">
                    <span className="text-secondary">specialization: </span>
                    <span className="text-accent-secondary">
                      "{education.specialization}"
                    </span>
                    ,
                  </div>
                  <div className="pl-4">
                    <span className="text-secondary">gpa: </span>
                    <span className="text-amber-400">"{education.gpa}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-secondary">patent: </span>
                    <span className="text-emerald-400">
                      "OjasRaksha (Co-Inventor)"
                    </span>
                    ,
                  </div>
                  <div className="pl-4">
                    <span className="text-secondary">internship: </span>
                    <span className="text-blue-400">
                      "TSAROLABS (AI &amp; Cyber)"
                    </span>
                    ,
                  </div>
                  <div className="pl-4">
                    <span className="text-secondary">leadership: </span>
                    <span className="text-emerald-400">
                      "Chair, Algorand Club (70 devs)"
                    </span>
                    ,
                  </div>
                  <div className="pl-4">
                    <span className="text-secondary">problemsSolved: </span>
                    <span className="text-amber-400">
                      "{competitiveProgramming.totalProblems}"
                    </span>
                    ,
                  </div>
                  <div className="pl-4">
                    <span className="text-secondary">status: </span>
                    <span className="text-technical">
                      "Open for SDE / Security / AI roles"
                    </span>
                  </div>
                  <div>{'}'};</div>
                </div>

                {/* System Status Ping */}
                <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-technical animate-ping" />
                    STATUS: ONLINE
                  </span>
                  <span>NODE: HYD-IN</span>
                  <span>SHA256: 8f9b...a10e</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
