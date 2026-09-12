import { motion, type Variants } from 'framer-motion'
import { experiences } from '@/data/portfolioData'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const experienceTags: Record<string, string[]> = {
  'TSAROLABS Pvt. Ltd.': [
    'YOLOv8',
    'EasyOCR',
    'Real-ESRGAN',
    'FastAPI',
    'Playwright',
    'PostgreSQL',
    'React.js',
    'Computer Vision',
  ],
  'Oasis Infobyte': [
    'React.js',
    'JavaScript',
    'State Management',
    'Responsive Web',
    'Performance Optimization',
  ],
  'Algorand Blockchain Club': [
    'Algorand',
    'Smart Contracts',
    'Blockchain Architecture',
    'Developer Community',
    'Event Direction',
  ],
}

export function Experience() {
  return (
    <section
      className="relative border-t border-border/70 bg-background px-4 py-24 sm:px-6 lg:px-8"
      id="experience"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.15 }}
          whileInView="visible"
        >
          {/* Section Header */}
          <motion.div className="mb-16" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent-secondary">
              <span>02</span>
              <span className="h-px w-6 bg-accent-secondary" />
              <span>Career &amp; Leadership</span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Experience &amp; Track Record
            </h2>
            <p className="mt-2 max-w-2xl text-base text-secondary">
              Hands-on engineering in applied computer vision, OSINT platforms,
              full-stack systems, and blockchain leadership.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative border-l border-border/80 pl-6 sm:pl-10 space-y-12 max-w-5xl ml-2 sm:ml-6">
            {experiences.map((exp) => {
              const tags = experienceTags[exp.organization] || []
              const isLeadership = exp.type.includes('Leadership')

              return (
                <motion.div
                  className="relative group"
                  key={`${exp.organization}-${exp.role}`}
                  variants={itemVariants}
                >
                  {/* Timeline Dot */}
                  <span
                    className={`absolute -left-[31px] sm:-left-[47px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background shadow-soft transition-transform duration-300 group-hover:scale-125 ${
                      isLeadership
                        ? 'bg-amber-400 ring-4 ring-amber-400/20'
                        : 'bg-accent-secondary ring-4 ring-accent-secondary/20'
                    }`}
                  />

                  {/* Card Content */}
                  <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-card transition-all duration-300 hover:border-accent-secondary/50 hover:shadow-soft">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-5">
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                          {exp.organization}
                        </span>
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-primary sm:text-2xl">
                          {exp.role}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-full border border-border bg-surface-raised px-3 py-1 text-xs font-medium text-secondary">
                          {exp.duration}
                        </span>
                        <span className="inline-flex rounded-full border border-border/80 bg-surface px-3 py-1 text-xs font-medium text-muted">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="mt-5 space-y-3">
                      {exp.points.map((point, index) => (
                        <li
                          className="flex items-start gap-3 text-sm leading-relaxed text-secondary sm:text-base"
                          key={index}
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Chips */}
                    {tags.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            className="rounded-md border border-border bg-surface-raised px-2.5 py-1 font-mono text-xs text-secondary transition-colors hover:border-accent-secondary/40 hover:text-primary"
                            key={tag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
