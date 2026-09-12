import { motion, type Variants } from 'framer-motion'
import { aboutSection, education, targetRoles } from '@/data/portfolioData'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

function HighlightIcon({ id }: { id: string }) {
  switch (id) {
    case 'education':
    case 'gpa':
      return (
        <svg
          className="h-5 w-5 text-accent-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      )
    case 'internship':
      return (
        <svg
          className="h-5 w-5 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect
            height="14"
            rx="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            width="20"
            x="2"
            y="7"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
          />
        </svg>
      )
    case 'patent':
      return (
        <svg
          className="h-5 w-5 text-amber-400"
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
      )
    case 'leadership':
      return (
        <svg
          className="h-5 w-5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      )
    default:
      return (
        <svg
          className="h-5 w-5 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      )
  }
}

export function About() {
  return (
    <section
      className="relative border-t border-border/70 bg-background/50 px-4 py-24 sm:px-6 lg:px-8"
      id={aboutSection.sectionId}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.15 }}
          whileInView="visible"
        >
          {/* Section Header */}
          <motion.div className="mb-14" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent-secondary">
              <span>01</span>
              <span className="h-px w-6 bg-accent-secondary" />
              <span>Background &amp; Philosophy</span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              {aboutSection.heading}
            </h2>
            <p className="mt-2 max-w-2xl text-base text-secondary">
              Bridging the gap between theory and resilient, battle-tested
              software.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left: Bio & Target Roles (7 Cols) */}
            <motion.div
              className="lg:col-span-7 space-y-8"
              variants={itemVariants}
            >
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-card">
                <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-accent-secondary">
                  Core Mission
                </h3>
                <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
                  {aboutSection.bio}
                </p>

                {/* Core Pillars */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/70 bg-surface-raised/60 p-4">
                    <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-primary">
                      <span className="h-2 w-2 rounded-full bg-accent-secondary" />
                      Adversarial Resilience
                    </div>
                    <p className="mt-2 text-xs leading-5 text-secondary">
                      Prioritizing edge cases, untrusted inputs, and
                      security-first architecture over quick superficial demos.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-surface-raised/60 p-4">
                    <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-primary">
                      <span className="h-2 w-2 rounded-full bg-technical" />
                      Verifiable Privacy
                    </div>
                    <p className="mt-2 text-xs leading-5 text-secondary">
                      Enforcing GDPR-aligned off-chain encryption paired with
                      tamper-proof blockchain audit trails.
                    </p>
                  </div>
                </div>
              </div>

              {/* Target Roles Grid */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                  Target Engineering Roles
                </h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {targetRoles.map((role) => (
                    <div
                      className="flex items-center gap-3 rounded-xl border border-border/70 bg-surface-raised px-4 py-3 text-sm font-medium text-primary shadow-soft transition-all hover:border-accent-secondary/50 hover:bg-surface-elevated"
                      key={role}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-secondary/15 text-accent-secondary font-mono text-xs">
                        &gt;
                      </span>
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Education & Highlights Bento (5 Cols) */}
            <motion.div
              className="lg:col-span-5 space-y-6"
              variants={itemVariants}
            >
              {/* Education Card */}
              <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-raised p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                    Education
                  </span>
                  <span className="rounded-full border border-technical/40 bg-technical/10 px-2.5 py-0.5 text-[11px] font-semibold text-technical">
                    GPA {education.gpa}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold tracking-tight text-primary">
                  {education.university}
                </h3>
                <p className="mt-1 text-sm font-medium text-secondary">
                  {education.degree}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-lg border border-border bg-surface px-3 py-1 text-accent-secondary font-medium">
                    {education.specialization}
                  </span>
                  <span className="rounded-lg border border-border bg-surface px-3 py-1 text-muted">
                    {education.duration}
                  </span>
                </div>
              </div>

              {/* Verified Profile Highlights */}
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                  {aboutSection.highlightsLabel}
                </h3>

                <ul className="space-y-3.5">
                  {aboutSection.highlights.map((item) => (
                    <li
                      className="flex items-start gap-3.5 rounded-xl border border-border/50 bg-surface-raised/70 p-3 text-sm text-secondary transition-colors hover:border-accent-secondary/40 hover:text-primary"
                      key={item.id}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface shadow-soft">
                        <HighlightIcon id={item.id} />
                      </span>
                      <span className="pt-1 text-xs sm:text-sm font-medium leading-relaxed">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
