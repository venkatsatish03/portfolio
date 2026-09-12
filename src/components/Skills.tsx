import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { skills } from '@/data/portfolioData'

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

interface CategoryGroup {
  readonly id: string
  readonly title: string
  readonly iconName: string
  readonly accentColor: string
  readonly items: readonly string[]
}

const categoryIcons: Record<string, string> = {
  Languages: 'code',
  Security: 'shield',
  Blockchain: 'link',
  Backend: 'server',
  Cloud: 'cloud',
  'ML & Data': 'cpu',
  Frontend: 'layout',
  Databases: 'database',
  DevOps: 'terminal',
}

export function Skills() {
  const [searchQuery, setSearchQuery] = useState('')

  const allCategories: CategoryGroup[] = skills.map((cat) => ({
    id: cat.category.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: cat.category,
    iconName: categoryIcons[cat.category] || 'code',
    accentColor:
      cat.category === 'Security' || cat.category === 'Blockchain'
        ? 'text-cyan-400'
        : cat.category === 'Languages'
          ? 'text-purple-400'
          : cat.category === 'Backend'
            ? 'text-blue-400'
            : 'text-emerald-400',
    items: cat.items,
  }))

  const filteredCategories = allCategories
    .map((cat) => {
      if (!searchQuery.trim()) return cat
      const query = searchQuery.toLowerCase()
      const matchingItems = cat.items.filter((item) =>
        item.toLowerCase().includes(query),
      )
      if (matchingItems.length > 0 || cat.title.toLowerCase().includes(query)) {
        return {
          ...cat,
          items: matchingItems.length > 0 ? matchingItems : cat.items,
        }
      }
      return null
    })
    .filter((cat): cat is CategoryGroup => cat !== null)

  return (
    <section
      className="relative border-t border-border/70 bg-background px-4 py-24 sm:px-6 lg:px-8"
      id="skills"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1 }}
          whileInView="visible"
        >
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
            variants={itemVariants}
          >
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent-secondary">
                <span>04</span>
                <span className="h-px w-6 bg-accent-secondary" />
                <span>Technical Arsenal</span>
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Skills &amp; Technologies
              </h2>
              <p className="mt-2 max-w-xl text-base text-secondary">
                Comprehensive toolset spanning core systems, security auditing,
                smart contracts, ML pipelines, and cloud APIs.
              </p>
            </div>

            {/* Quick Filter Search */}
            <div className="w-full md:w-72">
              <div className="relative">
                <input
                  aria-label="Filter skills"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 pl-10 text-xs text-primary placeholder:text-muted focus:border-accent-secondary focus:outline-none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter (e.g. Python, Docker)..."
                  type="text"
                  value={searchQuery}
                />
                <svg
                  className="absolute left-3.5 top-3 h-4 w-4 text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                {searchQuery && (
                  <button
                    aria-label="Clear filter"
                    className="absolute right-3 top-2.5 text-xs text-muted hover:text-primary"
                    onClick={() => setSearchQuery('')}
                    type="button"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {filteredCategories.map((group) => (
              <motion.div
                animate="visible"
                className="rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:border-accent-secondary/50 hover:shadow-soft"
                key={group.id}
                variants={itemVariants}
              >
                <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-4">
                  <h3 className="font-mono text-sm font-bold tracking-tight text-primary flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${group.accentColor} bg-current`}
                    />
                    {group.title}
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {group.items.length} items
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      className="rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium text-secondary transition-all hover:border-accent-secondary/50 hover:text-primary hover:bg-surface-elevated"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
