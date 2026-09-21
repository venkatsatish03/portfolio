import { motion } from 'framer-motion'
import { aboutSection, personal, education } from '@/data/portfolioData'

export function About() {
  return (
    <section className="py-24 sm:py-32 border-t border-border/70" id="about">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header matching image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="editorial-tag">02 / ABOUT ME</div>
          <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary text-left md:text-right">
            Thoughtful by default.
            <br />
            Curious by nature.
          </h2>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Credential Frame */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface border border-border/80 p-6 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-muted">
                <span className="text-accent font-semibold uppercase tracking-wider">
                  VENKAT SATISH
                </span>
                <span>'23 – '27</span>
              </div>

              {/* Graphic / Avatar Portrait Showcase */}
              <div className="my-auto flex flex-col items-center justify-center text-center py-8">
                <div className="relative mb-6">
                  <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-surface-raised border border-border flex items-center justify-center text-primary font-display text-4xl font-extrabold shadow-inner">
                    <span>VS</span>
                  </div>
                  <span className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-accent border-2 border-surface flex items-center justify-center text-[10px] text-white font-bold">
                    ✓
                  </span>
                </div>

                <h3 className="text-xl font-bold text-primary">
                  {personal.fullName}
                </h3>
                <p className="text-xs font-mono text-muted mt-1 max-w-xs">
                  KL University · B.Tech CSE (Cyber &amp; Blockchain)
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1 text-xs font-mono text-secondary bg-surface-raised">
                  <span className="h-2 w-2 rounded-full bg-technical" />
                  <span>GPA {education.gpa}</span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted">
                <span>Portrait of Venkat Satish</span>
                <span>HYD, IN</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio, Philosophy & Highlights */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-between"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {/* Lead Narrative */}
            <h3 className="editorial-title text-2xl sm:text-3xl font-bold text-primary leading-snug">
              I'm a software engineer focused on the space between security,
              blockchain, and intelligent systems.
            </h3>

            {/* Narrative Paragraphs */}
            <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-secondary font-normal">
              <p>{aboutSection.bio}</p>
              <p>
                Whether designing patient-controlled consent protocols or
                training neural detectors for license plate recognition, my
                priority is building production-grade solutions that perform
                predictably under pressure.
              </p>
            </div>

            {/* Core Highlights List */}
            <div className="mt-8 pt-8 border-t border-border/70">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-accent mb-4">
                Profile Highlights &amp; Accolades
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aboutSection.highlights.slice(0, 6).map((item) => (
                  <div
                    className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-surface/60 p-3 text-xs text-secondary hover:border-accent/30 transition-colors"
                    key={item.id}
                  >
                    <span className="text-base leading-none">{item.icon}</span>
                    <span className="leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="mt-8 pt-6 flex flex-wrap items-center gap-6">
              <a
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors"
                download="Venkat_Satish_Resume.pdf"
                href={personal.resume}
                rel="noreferrer"
                target="_blank"
              >
                <span>DOWNLOAD RESUME (PDF)</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                className="text-xs font-bold uppercase tracking-wider text-secondary hover:text-primary transition-colors flex items-center gap-1"
                href="#experience"
              >
                <span>EXPLORE EXPERIENCE</span>
                <span className="text-accent">↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
