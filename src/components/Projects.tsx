import { useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { projects, personal, type ProjectItem } from '@/data/portfolioData'

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

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

type ProjectCategory =
  | 'All'
  | 'Blockchain & Web3'
  | 'AI & Computer Vision'
  | 'Cybersecurity & Systems'
  | 'Full-Stack'

interface ProjectDetailMeta {
  readonly category: ProjectCategory
  readonly keyMetric?: string
  readonly architecturePoints?: readonly string[]
}

const projectMetadataMap: Record<string, ProjectDetailMeta> = {
  OjasRaksha: {
    category: 'Blockchain & Web3',
    keyMetric: '100% Immutable Audit Trail',
    architecturePoints: [
      'Provisional Patent Co-Inventor with custom smart contract access gating',
      'Off-chain encrypted storage adhering to GDPR patient data compliance',
      'Role-based dashboards supporting 5 clinical and administrative stakeholder types',
    ],
  },
  CollabChain: {
    category: 'Blockchain & Web3',
    keyMetric: 'Real-Time Verification',
    architecturePoints: [
      'Algorand blockchain smart contract architecture for anti-tamper credentials',
      'Multi-tenant verification gateway designed for 3 institutional tiers',
      'Semifinalist recognition in Algorand Web3 Hackathon',
    ],
  },
  'License Plate Recognition (LPR)': {
    category: 'AI & Computer Vision',
    keyMetric: 'mAP50: 0.936 Precision',
    architecturePoints: [
      'Custom fine-tuned YOLOv8 object detector coupled with EasyOCR',
      'Integrated Real-ESRGAN super-resolution pre-processing to restore degraded plate captures',
      'Asynchronous FastAPI microservice backend communicating with React monitoring dashboard',
    ],
  },
  StockWise: {
    category: 'AI & Computer Vision',
    keyMetric: '70–80% Directional Accuracy',
    architecturePoints: [
      'Scikit-learn classification ensemble processing multivariate price histories',
      'NLP sentiment classification pipeline evaluating live financial news releases',
      'Dynamic React visualization dashboards tracking signal predictions',
    ],
  },
  'Forensic Shield v0.4': {
    category: 'Cybersecurity & Systems',
    keyMetric: 'Real-Time SHA-256 Verifier',
    architecturePoints: [
      'Automatic OS-level USB mounting event hook capturing foreign storage drives',
      'High-throughput SHA-256 checksum comparison against threat intelligence hashes',
      'Flask monitoring dashboard flagging unauthorized executable alterations',
    ],
  },
  'Restaurant Table Reservation System': {
    category: 'Full-Stack',
    keyMetric: 'PostgreSQL Index Tuned',
    architecturePoints: [
      'Dual-stack service integration combining Express.js and Spring Boot modules',
      'Concurrency-safe booking transactions with PostgreSQL table index optimization',
      'Full stateful session management with JWT and responsive React layout',
    ],
  },
}

const categories: readonly ProjectCategory[] = [
  'All',
  'Blockchain & Web3',
  'AI & Computer Vision',
  'Cybersecurity & Systems',
  'Full-Stack',
]

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All')
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'All') return true
    const meta = projectMetadataMap[project.title]
    return meta?.category === activeCategory
  })

  return (
    <section
      className="relative border-t border-border/70 bg-background/60 px-4 py-24 sm:px-6 lg:px-8"
      id="projects"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1 }}
          whileInView="visible"
        >
          {/* Header */}
          <motion.div className="mb-12" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent-secondary">
              <span>03</span>
              <span className="h-px w-6 bg-accent-secondary" />
              <span>Engineering Portfolio</span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Featured Systems &amp; Projects
            </h2>
            <p className="mt-2 max-w-2xl text-base text-secondary">
              Production systems, patent co-inventions, blockchain applications,
              and computer vision pipelines.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  aria-pressed={activeCategory === cat}
                  className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-accent-secondary text-background font-semibold shadow-soft'
                      : 'border border-border bg-surface text-secondary hover:border-accent-secondary/50 hover:text-primary'
                  }`}
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    setExpandedProject(null)
                  }}
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Note specifically for Full-Stack */}
            <AnimatePresence>
              {activeCategory === 'Full-Stack' && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-start gap-3 rounded-xl border border-accent-secondary/35 bg-accent-secondary/10 p-4 text-xs sm:text-sm text-secondary backdrop-blur-sm max-w-3xl shadow-soft"
                  exit={{ opacity: 0, y: -8 }}
                  initial={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-accent-secondary mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <p className="leading-relaxed">
                    <strong className="font-semibold text-accent-secondary">
                      Note:
                    </strong>{' '}
                    The project shown here is categorized specifically as a
                    Full-Stack project. However, several of the projects listed
                    under other technology stacks are also fully developed
                    full-stack applications, with their categorization
                    highlighting the primary technologies used.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              animate="visible"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              exit="exit"
              initial="hidden"
              key={activeCategory}
              variants={gridVariants}
            >
              {filteredProjects.map((project: ProjectItem) => {
                const meta = projectMetadataMap[project.title]
                const isExpanded = expandedProject === project.title
                const isPatent = project.badge?.includes('Patent')
                const isHackathon = project.badge?.includes('Hackathon')

                return (
                  <motion.article
                    className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:border-accent-secondary/60 hover:shadow-soft"
                    key={project.title}
                    variants={cardVariants}
                  >
                    <div>
                      {/* Badge & Category */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="font-mono text-[11px] font-semibold text-accent-secondary uppercase tracking-wider">
                          {meta?.category ?? 'Engineering'}
                        </span>
                        {project.badge && (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                              isPatent
                                ? 'border border-amber-500/40 bg-amber-500/10 text-amber-400'
                                : isHackathon
                                  ? 'border border-purple-500/40 bg-purple-500/10 text-purple-400'
                                  : 'border border-accent-secondary/40 bg-accent-secondary/10 text-accent-secondary'
                            }`}
                          >
                            {project.badge}
                          </span>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-xl font-bold tracking-tight text-primary">
                        {project.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-muted">
                        {project.subtitle}
                      </p>

                      {/* Key Metric Pill if available */}
                      {meta?.keyMetric && (
                        <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-technical/30 bg-technical/10 px-2.5 py-1 text-xs font-semibold text-technical">
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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span>{meta.keyMetric}</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="mt-4 text-sm leading-relaxed text-secondary">
                        {project.description}
                      </p>

                      {/* Expandable Architecture Details */}
                      {meta?.architecturePoints && (
                        <div className="mt-4">
                          <button
                            className="inline-flex items-center gap-1 font-mono text-xs text-accent-secondary hover:underline"
                            onClick={() =>
                              setExpandedProject(
                                isExpanded ? null : project.title,
                              )
                            }
                            type="button"
                          >
                            <span>
                              {isExpanded
                                ? 'Hide Architecture'
                                : 'View Architecture'}
                            </span>
                            <svg
                              className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {isExpanded && (
                            <motion.ul
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 space-y-2 border-l border-accent-secondary/40 pl-3 pt-1 text-xs text-muted"
                              exit={{ opacity: 0, height: 0 }}
                              initial={{ opacity: 0, height: 0 }}
                            >
                              {meta.architecturePoints.map((point, i) => (
                                <li className="leading-relaxed" key={i}>
                                  • {point}
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer: Tags & Action */}
                    <div className="mt-6 pt-4 border-t border-border/50">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            className="rounded-md border border-border bg-surface-raised px-2 py-0.5 font-mono text-[11px] text-secondary"
                            key={tag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <a
                          aria-label={`View code for ${project.title} on GitHub`}
                          className="inline-flex items-center gap-1.5 font-medium text-secondary hover:text-accent-secondary transition-colors"
                          href={personal.github}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.16c-3.22.7-3.9-1.38-3.9-1.38-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.72 0-1.27.45-2.3 1.2-3.11-.12-.29-.52-1.48.11-3.07 0 0 .98-.31 3.17 1.19A10.9 10.9 0 0 1 12 5.9c.98 0 1.96.13 2.88.39 2.2-1.5 3.17-1.19 3.17-1.19.64 1.59.24 2.78.12 3.07.75.82 1.2 1.85 1.2 3.11 0 4.45-2.7 5.43-5.28 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .5Z" />
                          </svg>
                          <span>Repository</span>
                        </a>

                        <a
                          aria-label={`Project link for ${project.title}`}
                          className="inline-flex items-center gap-1 font-medium text-accent-secondary hover:underline"
                          href="#contact"
                        >
                          <span>Inquire Details</span>
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
