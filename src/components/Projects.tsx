import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, type ProjectItem } from '@/data/portfolioData'

interface ProjectDetailMeta {
  readonly index: string
  readonly year: string
  readonly category: string
  readonly keyMetric?: string
  readonly architecturePoints?: readonly string[]
}

const projectMetadataMap: Record<string, ProjectDetailMeta> = {
  OjasRaksha: {
    index: '01',
    year: '2026',
    category: 'DECENTRALIZED HEALTHCARE · PATENT',
    keyMetric: '100% Immutable Audit Trail',
    architecturePoints: [
      'Provisional Patent Co-Inventor with custom smart contract access gating',
      'Off-chain encrypted storage adhering to GDPR patient data compliance',
      'Role-based dashboards supporting 5 clinical and administrative stakeholder types',
    ],
  },
  CollabChain: {
    index: '02',
    year: '2025',
    category: 'CREDENTIAL VERIFICATION · ALGORAND',
    keyMetric: 'Real-Time Verification',
    architecturePoints: [
      'Algorand blockchain smart contract architecture for anti-tamper credentials',
      'Multi-tenant verification gateway designed for 3 institutional tiers',
      'Semifinalist recognition in Algorand Web3 Hackathon',
    ],
  },
  'License Plate Recognition (LPR)': {
    index: '03',
    year: '2026',
    category: 'COMPUTER VISION · YOLOv8 · TSAROLABS',
    keyMetric: 'mAP50: 0.936 Precision',
    architecturePoints: [
      'Custom fine-tuned YOLOv8 object detector coupled with EasyOCR',
      'Integrated Real-ESRGAN super-resolution pre-processing to restore degraded plate captures',
      'Asynchronous FastAPI microservice backend communicating with React monitoring dashboard',
    ],
  },
  StockWise: {
    index: '04',
    year: '2025',
    category: 'AI & PREDICTIVE MODELING',
    keyMetric: '70–80% Directional Accuracy',
    architecturePoints: [
      'Financial sentiment classification engine using NLP text processing',
      'Ensemble models utilizing Scikit-learn regressors on historical price points',
      'Interactive dashboard for visualizing sentiment-driven predictive swings',
    ],
  },
  'Forensic Shield v0.4': {
    index: '05',
    year: '2025',
    category: 'SYSTEM INTEGRITY & CYBERSECURITY',
    keyMetric: 'Instant Threat Alerting',
    architecturePoints: [
      'Automated SHA-256 cryptographic hashing pipeline executing on media mount',
      'Threat telemetry logging with known malicious checksum cross-referencing',
      'Real-time Flask dashboard providing immediate file-tampering notifications',
    ],
  },
  'Restaurant Table Reservation System': {
    index: '06',
    year: '2025',
    category: 'FULL-STACK SYSTEMS & REST APIs',
    keyMetric: 'Zero Overbooking Conflict Guarantee',
    architecturePoints: [
      'High-concurrency reservation engine backed by transactional PostgreSQL schemas',
      'Role-delimited customer reservation flow with instant confirmation tokens',
      'Admin operations suite with live capacity metrics and dynamic table allocation',
    ],
  },
}

function ProjectLogo({
  logoUrl,
  title,
  fallback,
  className = 'h-full w-full object-cover',
}: {
  logoUrl?: string
  title: string
  fallback: React.ReactNode
  className?: string
}) {
  const [error, setError] = useState(false)

  if (logoUrl && !error) {
    return (
      <img
        alt={`${title} Logo`}
        className={className}
        onError={() => setError(true)}
        src={logoUrl}
      />
    )
  }

  return <>{fallback}</>
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  )
  const [showAll, setShowAll] = useState(false)

  // Primary 3 featured projects matching the screenshot asymmetric grid
  const featuredProjects = projects.slice(0, 3)
  const moreProjects = projects.slice(3)

  return (
    <section className="py-24 sm:py-32" id="projects">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header matching image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="editorial-tag">01 / SELECTED WORK</div>
          <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary text-left md:text-right">
            A few things I've made.
          </h2>
        </div>

        {/* Asymmetric Editorial Grid matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Featured Large Card (OjasRaksha) */}
          {featuredProjects[0] && (
            <motion.div
              className="lg:col-span-7 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              onClick={() => setSelectedProject(featuredProjects[0])}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {/* Card Image / Preview Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface border border-border/70 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-md">
                {/* Top Corner Meta */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                    {featuredProjects[0].badge || 'Patent Co-Inventor'}
                  </span>
                  <span className="font-mono text-xs font-bold text-muted">
                    01
                  </span>
                </div>

                {/* Minimalist Visual Abstract Graphic */}
                <div className="my-auto flex flex-col items-center justify-center text-center py-6">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border border-border/80 shadow-md flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform duration-300 overflow-hidden bg-surface">
                    <ProjectLogo
                      className="h-full w-full object-cover"
                      fallback={
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                      logoUrl={featuredProjects[0].logoUrl}
                      title={featuredProjects[0].title}
                    />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
                    {featuredProjects[0].title}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-secondary max-w-md">
                    {featuredProjects[0].subtitle}
                  </p>
                </div>

                {/* Bottom Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {featuredProjects[0].tags.map((tag) => (
                    <span
                      className="text-[11px] font-mono font-medium text-secondary"
                      key={tag}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & Metadata below card */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                    {featuredProjects[0].title}
                  </h3>
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </div>
                <div className="text-xs font-mono text-muted uppercase tracking-wider">
                  {projectMetadataMap[featuredProjects[0].title]?.year} /{' '}
                  {projectMetadataMap[featuredProjects[0].title]?.category}
                </div>
              </div>
            </motion.div>
          )}

          {/* Right Column: Stacked Two Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 lg:gap-10">
            {/* Card 2: CollabChain */}
            {featuredProjects[1] && (
              <motion.div
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                onClick={() => setSelectedProject(featuredProjects[1])}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface border border-border/70 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                      {featuredProjects[1].badge || 'Algorand Hackathon'}
                    </span>
                    <span className="font-mono text-xs font-bold text-muted">
                      02
                    </span>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center text-center py-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/5 border border-border flex items-center justify-center text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-primary">
                      {featuredProjects[1].title}
                    </h4>
                    <p className="text-xs text-secondary">
                      {featuredProjects[1].subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                    {featuredProjects[1].tags.slice(0, 3).map((tag) => (
                      <span
                        className="text-[11px] font-mono text-secondary"
                        key={tag}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1.5">
                    <span>{featuredProjects[1].title}</span>
                    <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </span>
                  </h3>
                  <div className="text-[11px] font-mono text-muted uppercase">
                    {projectMetadataMap[featuredProjects[1].title]?.year} /{' '}
                    ALGORAND
                  </div>
                </div>
              </motion.div>
            )}

            {/* Card 3: License Plate Recognition */}
            {featuredProjects[2] && (
              <motion.div
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                onClick={() => setSelectedProject(featuredProjects[2])}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface border border-border/70 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                      {featuredProjects[2].badge || 'TSAROLABS'}
                    </span>
                    <span className="font-mono text-xs font-bold text-muted">
                      03
                    </span>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center text-center py-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/5 border border-border flex items-center justify-center text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-primary">
                      {featuredProjects[2].title}
                    </h4>
                    <p className="text-xs text-secondary">
                      {featuredProjects[2].subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                    {featuredProjects[2].tags.slice(0, 3).map((tag) => (
                      <span
                        className="text-[11px] font-mono text-secondary"
                        key={tag}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1.5">
                    <span>{featuredProjects[2].title}</span>
                    <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </span>
                  </h3>
                  <div className="text-[11px] font-mono text-muted uppercase">
                    {projectMetadataMap[featuredProjects[2].title]?.year} / AI
                    &amp; CV
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Expandable Section for Remaining Projects */}
        <div className="mt-16 text-center">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary hover:border-accent hover:text-accent transition-all duration-200"
            onClick={() => setShowAll(!showAll)}
            type="button"
          >
            <span>
              {showAll ? 'Show Fewer Projects' : 'Explore All 6 Projects'}
            </span>
            <span>{showAll ? '↑' : '↓'}</span>
          </button>
        </div>

        {/* Additional Projects Grid */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden"
              exit={{ opacity: 0, height: 0 }}
              initial={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
            >
              {moreProjects.map((project) => {
                const meta = projectMetadataMap[project.title]
                return (
                  <div
                    className="group cursor-pointer rounded-2xl border border-border/70 bg-surface p-6 flex flex-col justify-between hover:border-accent/40 hover:shadow-md transition-all"
                    key={project.title}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-muted mb-4">
                        <span className="text-accent font-semibold uppercase">
                          {meta?.year}
                        </span>
                        <span>{meta?.index}</span>
                      </div>
                      <h4 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                        {project.title}
                      </h4>
                      <p className="mt-1 text-xs font-mono text-muted">
                        {project.subtitle}
                      </p>
                      <p className="mt-4 text-xs text-secondary leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          className="text-[10px] font-mono text-secondary"
                          key={tag}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="relative max-w-2xl w-full rounded-2xl bg-surface border border-border p-6 sm:p-8 shadow-2xl text-primary max-h-[85vh] overflow-y-auto"
                exit={{ opacity: 0, scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.95 }}
              >
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    {selectedProject.logoUrl && (
                      <div className="h-12 w-12 rounded-xl border border-border/80 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm bg-surface">
                        <img
                          alt={`${selectedProject.title} logo`}
                          className="h-full w-full object-cover"
                          src={selectedProject.logoUrl}
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-mono text-accent font-semibold uppercase">
                        {projectMetadataMap[selectedProject.title]?.category}
                      </span>
                      <h3 className="text-2xl font-bold text-primary mt-1">
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    aria-label="Close modal"
                    className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors text-lg"
                    onClick={() => setSelectedProject(null)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <p className="text-sm sm:text-base leading-relaxed text-secondary">
                    {selectedProject.description}
                  </p>

                  {projectMetadataMap[selectedProject.title]?.keyMetric && (
                    <div className="inline-flex items-center gap-2 rounded-lg bg-technical/10 border border-technical/30 px-3 py-1.5 text-xs font-semibold text-technical">
                      <span>Key Metric:</span>
                      <span>
                        {projectMetadataMap[selectedProject.title]?.keyMetric}
                      </span>
                    </div>
                  )}

                  {/* Project External / Live Links Action Bar */}
                  {selectedProject.links && selectedProject.links.length > 0 && (
                    <div className="pt-2 pb-1 flex flex-wrap items-center gap-3">
                      {selectedProject.links.map((link) => {
                        const isGithub = link.type === 'github'
                        return (
                          <a
                            className={
                              isGithub
                                ? 'group inline-flex items-center gap-2 rounded-xl border border-border bg-surface-raised px-4 py-2.5 text-xs font-mono font-semibold text-primary transition-all hover:bg-primary hover:text-background hover:border-primary hover:scale-[1.02] active:scale-[0.98] shadow-sm'
                                : 'group inline-flex items-center gap-2 rounded-xl bg-primary text-background px-4 py-2.5 text-xs font-mono font-semibold transition-all hover:bg-accent hover:text-white hover:scale-[1.02] active:scale-[0.98] shadow-sm'
                            }
                            href={link.url}
                            key={link.label}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {isGithub ? (
                              <svg
                                className="h-4 w-4 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                              </svg>
                            ) : (
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-technical opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-technical" />
                              </span>
                            )}
                            <span>{link.label}</span>
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                              ↗
                            </span>
                          </a>
                        )
                      })}
                    </div>
                  )}

                  {projectMetadataMap[selectedProject.title]
                    ?.architecturePoints && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-primary mb-2">
                        Architecture &amp; Highlights:
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-secondary">
                        {projectMetadataMap[
                          selectedProject.title
                        ]?.architecturePoints?.map((pt) => (
                          <li className="flex items-start gap-2" key={pt}>
                            <span className="text-accent mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        className="rounded-md bg-surface-raised px-2.5 py-1 text-xs font-mono text-secondary"
                        key={tag}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
