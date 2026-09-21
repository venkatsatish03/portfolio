import { motion, type Variants } from 'framer-motion'
import {
  achievements,
  certifications,
  competitiveProgramming,
} from '@/data/portfolioData'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function Achievements() {
  return (
    <section
      className="py-24 sm:py-32 border-t border-border/70"
      id="achievements"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1 }}
          whileInView="visible"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="editorial-tag">
              05 / RECOGNITION &amp; CODING TRACK RECORD
            </div>
            <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary text-left md:text-right">
              Milestones &amp; impact.
            </h2>
          </div>

          {/* 1. Competitive Programming Stats Ribbon */}
          <motion.div
            className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-12"
            variants={itemVariants}
          >
            <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-sm text-center">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-primary">
                {competitiveProgramming.totalProblems}
              </div>
              <p className="mt-1 font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                DSA Problems Solved
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-sm text-center">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-primary">
                {competitiveProgramming.leetCodeRating}
              </div>
              <p className="mt-1 font-mono text-xs font-semibold text-muted uppercase tracking-wider">
                LeetCode Rating
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-sm text-center">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-primary">
                {competitiveProgramming.codeChef}
              </div>
              <p className="mt-1 font-mono text-xs font-semibold text-muted uppercase tracking-wider">
                CodeChef Rating
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-sm text-center">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-primary">
                {competitiveProgramming.contests}
              </div>
              <p className="mt-1 font-mono text-xs font-semibold text-muted uppercase tracking-wider">
                Contests Attended
              </p>
            </div>
          </motion.div>

          {/* 2. Bento Grid: Honors & Competitions */}
          <div className="grid gap-6 lg:grid-cols-12 mb-12">
            {/* Honors Card (7 Cols) */}
            <motion.div
              className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-card"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
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
                  Competitions &amp; Honors
                </h3>
                <span className="font-mono text-xs text-muted">
                  National &amp; Global
                </span>
              </div>

              <div className="space-y-4">
                {achievements.map((item) => (
                  <div
                    className="flex items-start gap-3.5 rounded-xl border border-border/70 bg-surface-raised p-4 transition-all hover:border-accent-secondary/50 hover:bg-surface-elevated"
                    key={item.id}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-400/15 text-amber-400 font-bold text-xs">
                      ★
                    </span>
                    <p className="pt-0.5 text-sm font-medium leading-relaxed text-secondary">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Industry Certifications (5 Cols) */}
            <motion.div
              className="lg:col-span-5 rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-card"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Industry Certifications
                </h3>
                <span className="font-mono text-xs text-muted">Verified</span>
              </div>

              <div className="space-y-3.5">
                {certifications.map((cert) => (
                  <div
                    className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-surface-raised p-3.5 transition-all hover:border-accent-secondary/50"
                    key={cert.id}
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-primary">
                        {cert.name}
                      </h4>
                      <p className="mt-0.5 font-mono text-[11px] text-muted">
                        Completed: {cert.date}
                      </p>
                    </div>

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-technical/15 text-technical text-xs">
                      ✓
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
