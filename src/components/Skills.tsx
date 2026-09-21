import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, certifications } from '@/data/portfolioData'

interface CapabilityRow {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly description: string
  readonly techStack: readonly string[]
}

const capabilitiesData: readonly CapabilityRow[] = [
  {
    id: 'blockchain',
    index: '01',
    title: 'Blockchain & Decentralized Architecture',
    description:
      'Designing tamper-resistant distributed ledger applications, smart contract protocols, consensus integrity, and privacy-preserving off-chain encrypted medical/credential records.',
    techStack: [
      'Solidity',
      'Algorand',
      'Smart Contracts',
      'Cryptography',
      'SHA-256',
    ],
  },
  {
    id: 'fullstack',
    index: '02',
    title: 'Full-Stack Systems & API Engineering',
    description:
      'Building performant, component-driven web applications and resilient backend microservices with transactional database optimization, real-time telemetry, and secure auth flows.',
    techStack: [
      'React.js',
      'TypeScript',
      'Node.js',
      'FastAPI',
      'Spring Boot',
      'PostgreSQL',
    ],
  },
  {
    id: 'ai-cv',
    index: '03',
    title: 'Applied AI & Computer Vision Pipelines',
    description:
      'Training and deploying custom computer vision detectors (YOLOv8), super-resolution enhancement (Real-ESRGAN), and predictive machine learning models with NLP sentiment analysis.',
    techStack: [
      'YOLOv8',
      'EasyOCR',
      'Real-ESRGAN',
      'Scikit-learn',
      'NLP',
      'Python',
    ],
  },
  {
    id: 'security-cloud',
    index: '04',
    title: 'Cybersecurity & Cloud Infrastructure',
    description:
      'Applying defense-in-depth threat modeling, file integrity verification hooks, containerized microservice architectures, and automated CI/CD testing pipelines.',
    techStack: ['Docker', 'AWS', 'Azure', 'GitHub Actions', 'OWASP', 'Linux'],
  },
]

export function Skills() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [showFullMatrix, setShowFullMatrix] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleRow = (id: string) => {
    setExpandedRow((curr) => (curr === id ? null : id))
  }

  const filteredCategories = skills.filter((cat) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      cat.category.toLowerCase().includes(q) ||
      cat.items.some((item) => item.toLowerCase().includes(q))
    )
  })

  return (
    <section className="py-24 sm:py-32 border-t border-border/70" id="skills">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header matching image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="editorial-tag">03 / CAPABILITIES</div>
          <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary text-left md:text-right">
            What I can help with.
          </h2>
        </div>

        {/* Editorial Horizontal Rows matching reference image */}
        <div className="divide-y divide-border/80 border-t border-b border-border/80">
          {capabilitiesData.map((item) => {
            const isExpanded = expandedRow === item.id

            return (
              <motion.div
                className={`group cursor-pointer py-8 sm:py-10 transition-colors px-2 sm:px-4 ${
                  isExpanded ? 'bg-surface/70' : 'hover:bg-surface/40'
                }`}
                initial={{ opacity: 0, y: 16 }}
                key={item.id}
                onClick={() => toggleRow(item.id)}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                  {/* Column 1: Index Number */}
                  <div className="md:col-span-1 font-mono text-xs sm:text-sm font-semibold text-accent">
                    {item.index}
                  </div>

                  {/* Column 2: Title */}
                  <div className="md:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-primary tracking-tight group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Column 3: Description */}
                  <div className="md:col-span-6">
                    <p className="text-sm sm:text-base leading-relaxed text-secondary font-normal">
                      {item.description}
                    </p>

                    {/* Tech stack chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <span
                          className="rounded-md bg-surface-raised px-2.5 py-1 font-mono text-[11px] text-secondary border border-border/60"
                          key={tech}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 4: Animated Diagonal Arrow */}
                  <div className="md:col-span-1 flex md:justify-end text-xl text-muted group-hover:text-accent transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Matrix Toggle Button */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary hover:border-accent hover:text-accent transition-all duration-200"
            onClick={() => setShowFullMatrix(!showFullMatrix)}
            type="button"
          >
            <span>
              {showFullMatrix
                ? 'Hide Granular Skill Matrix'
                : 'Browse Full Technical Skill Matrix & Certifications'}
            </span>
            <span>{showFullMatrix ? '↑' : '↓'}</span>
          </button>

          <span className="text-xs font-mono text-muted">
            9 CATEGORIES · 5 INDUSTRY CERTIFICATIONS
          </span>
        </div>

        {/* Comprehensive Technical Skills Drawer */}
        <AnimatePresence>
          {showFullMatrix && (
            <motion.div
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-10 overflow-hidden pt-6 border-t border-border/60"
              exit={{ opacity: 0, height: 0 }}
              initial={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Search filter */}
              <div className="mb-8 max-w-md">
                <input
                  aria-label="Filter technical skills"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-mono text-primary placeholder:text-muted focus:border-accent focus:outline-none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter skills (e.g., Python, Solidity, Docker)..."
                  type="text"
                  value={searchQuery}
                />
              </div>

              {/* Categorized Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((cat) => (
                  <div
                    className="rounded-2xl border border-border/70 bg-surface p-5"
                    key={cat.category}
                  >
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-accent mb-3">
                      {cat.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <span
                          className="rounded-lg bg-surface-raised px-2.5 py-1 text-xs text-secondary border border-border/50"
                          key={item}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications Row */}
              <div className="mt-8 rounded-2xl border border-border/70 bg-surface p-6">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-accent mb-4">
                  Verified Certifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {certifications.map((cert) => (
                    <div
                      className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-surface-raised/70 p-3 text-xs text-secondary"
                      key={cert.id}
                    >
                      <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                      <div>
                        <p className="font-semibold text-primary">
                          {cert.name}
                        </p>
                        <p className="text-[11px] font-mono text-muted">
                          {cert.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
