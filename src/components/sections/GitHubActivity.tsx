import { useEffect, useState, useMemo, useCallback } from 'react'
import { motion, type Variants } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ContributionDay {
  date: string
  count: number
  level: number // 0-4
}

interface GitHubStats {
  totalRepos: number
  totalContributions: number
  activeRepos: number
  contributions: ContributionDay[]
  loading: boolean
  error: string | null
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const GITHUB_USERNAME = 'venkatsatish03'
const ACTIVE_THRESHOLD_DAYS = 90
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''] as const
const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

/* ------------------------------------------------------------------ */
/*  Custom Hook — useGitHubData                                        */
/* ------------------------------------------------------------------ */

function useGitHubData(): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    totalRepos: 0,
    totalContributions: 0,
    activeRepos: 0,
    contributions: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      try {
        const [profileRes, reposRes, contribRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
            { signal: controller.signal },
          ),
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
            { signal: controller.signal },
          ),
        ])

        let totalRepos = 0
        let activeRepos = 0
        let totalContributions = 0
        let contributions: ContributionDay[] = []

        // Profile — public_repos count
        if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
          const data = await profileRes.value.json()
          totalRepos = data.public_repos ?? 0
        }

        // Repos — count recently pushed
        if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
          const repos = await reposRes.value.json()
          if (Array.isArray(repos)) {
            const cutoff = new Date()
            cutoff.setDate(cutoff.getDate() - ACTIVE_THRESHOLD_DAYS)
            activeRepos = repos.filter(
              (r: { pushed_at: string }) => new Date(r.pushed_at) >= cutoff,
            ).length
          }
        }

        // Contributions — jogruber API
        if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
          const data = await contribRes.value.json()
          if (data.total) {
            totalContributions = Object.values(
              data.total as Record<string, number>,
            ).reduce((a: number, b: number) => a + b, 0)
          }
          if (Array.isArray(data.contributions)) {
            contributions = data.contributions.map(
              (d: { date: string; count: number; level: number }) => ({
                date: d.date,
                count: d.count,
                level: Math.min(d.level, 4),
              }),
            )
          }
        }

        setStats({
          totalRepos,
          totalContributions,
          activeRepos,
          contributions,
          loading: false,
          error: null,
        })
      } catch (err) {
        if (!controller.signal.aborted) {
          setStats((prev) => ({
            ...prev,
            loading: false,
            error: 'Failed to load GitHub data.',
          }))
          console.error('GitHub fetch error:', err)
        }
      }
    }

    fetchData()
    return () => controller.abort()
  }, [])

  return stats
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

interface WeekColumn {
  days: (ContributionDay | null)[]
}

function organizeIntoWeeks(contributions: ContributionDay[]): WeekColumn[] {
  if (!contributions.length) return []

  const weeks: WeekColumn[] = []
  let currentWeek: (ContributionDay | null)[] = []

  // Pad the first week if it doesn't start on Sunday
  const firstDay = new Date(contributions[0].date).getDay()
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null)
  }

  for (const day of contributions) {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push({ days: currentWeek })
      currentWeek = []
    }
  }

  // Pad remaining
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null)
    }
    weeks.push({ days: currentWeek })
  }

  return weeks
}

function getMonthPositions(
  weeks: WeekColumn[],
): { label: string; col: number }[] {
  const positions: { label: string; col: number }[] = []
  let lastMonth = -1

  weeks.forEach((week, colIdx) => {
    for (const day of week.days) {
      if (day) {
        const month = new Date(day.date).getMonth()
        if (month !== lastMonth) {
          positions.push({ label: MONTH_LABELS[month], col: colIdx })
          lastMonth = month
        }
        break
      }
    }
  })

  return positions
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */

function StatCard({
  value,
  label,
  suffix = '',
}: {
  value: number
  label: string
  suffix?: string
}) {
  return (
    <div className="rounded-2xl glass-card p-6 text-center">
      <div className="font-mono text-3xl sm:text-4xl font-extrabold text-primary animate-count-up">
        {value}
        {suffix}
      </div>
      <p className="mt-1 font-mono text-xs font-semibold text-accent uppercase tracking-wider">
        {label}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Heatmap Tooltip                                                    */
/* ------------------------------------------------------------------ */

function HeatmapTooltip({
  day,
  style,
}: {
  day: ContributionDay
  style: React.CSSProperties
}) {
  return (
    <div
      className="absolute z-50 rounded-lg glass-panel px-3 py-2 pointer-events-none whitespace-nowrap font-mono text-xs"
      style={style}
    >
      <span className="font-bold text-primary">
        {day.count} contribution{day.count !== 1 ? 's' : ''}
      </span>
      <span className="text-muted ml-1.5">{formatDate(day.date)}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Heatmap Grid                                                       */
/* ------------------------------------------------------------------ */

function HeatmapGrid({ contributions }: { contributions: ContributionDay[] }) {
  const [tooltip, setTooltip] = useState<{
    day: ContributionDay
    x: number
    y: number
  } | null>(null)

  const weeks = useMemo(() => organizeIntoWeeks(contributions), [contributions])
  const months = useMemo(() => getMonthPositions(weeks), [weeks])

  const handleCellEnter = useCallback(
    (day: ContributionDay, e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const parentRect = (e.currentTarget as HTMLElement)
        .closest('.heatmap-container')
        ?.getBoundingClientRect()
      if (parentRect) {
        setTooltip({
          day,
          x: rect.left - parentRect.left + rect.width / 2,
          y: rect.top - parentRect.top - 8,
        })
      }
    },
    [],
  )

  const handleCellLeave = useCallback(() => setTooltip(null), [])

  const cellSize = 13
  const cellGap = 3

  return (
    <div className="relative heatmap-container">
      {/* Month Labels */}
      <div
        className="relative h-5 ml-10"
        style={{ width: weeks.length * (cellSize + cellGap) }}
      >
        {months.map((m, i) => (
          <span
            className="absolute font-mono text-[10px] text-muted uppercase tracking-wider"
            key={i}
            style={{ left: m.col * (cellSize + cellGap) }}
          >
            {m.label}
          </span>
        ))}
      </div>

      <div className="flex gap-0">
        {/* Day Labels */}
        <div
          className="flex flex-col justify-between pr-2 shrink-0"
          style={{ height: 7 * (cellSize + cellGap) - cellGap }}
        >
          {DAY_LABELS.map((label, i) => (
            <span
              className="font-mono text-[10px] text-muted leading-none flex items-center"
              key={i}
              style={{ height: cellSize }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div
          className="flex gap-[3px] overflow-x-auto pb-2"
          role="grid"
          aria-label="Contribution activity calendar"
        >
          {weeks.map((week, wIdx) => (
            <div className="flex flex-col gap-[3px]" key={wIdx} role="row">
              {week.days.map((day, dIdx) => (
                <div
                  aria-label={
                    day
                      ? `${day.count} contributions on ${day.date}`
                      : undefined
                  }
                  className={`heatmap-cell heatmap-${day?.level ?? 0}`}
                  key={`${wIdx}-${dIdx}`}
                  onMouseEnter={
                    day ? (e) => handleCellEnter(day, e) : undefined
                  }
                  onMouseLeave={day ? handleCellLeave : undefined}
                  role="gridcell"
                  style={{ width: cellSize, height: cellSize }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <HeatmapTooltip
          day={tooltip.day}
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
          }}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Legend                                                              */
/* ------------------------------------------------------------------ */

function HeatmapLegend() {
  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
        Less
      </span>
      {[0, 1, 2, 3, 4].map((level) => (
        <div
          className={`heatmap-cell heatmap-${level}`}
          key={level}
          style={{ width: 12, height: 12 }}
        />
      ))}
      <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
        More
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Loading Skeleton                                                   */
/* ------------------------------------------------------------------ */

function HeatmapSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div className="rounded-2xl glass-card p-6 animate-pulse" key={i}>
            <div className="h-9 w-16 mx-auto rounded bg-surface-raised" />
            <div className="h-3 w-24 mx-auto mt-3 rounded bg-surface-raised" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl glass-panel p-6">
        <div className="h-[120px] rounded bg-surface-raised/30 animate-pulse" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export function GitHubActivity() {
  const {
    totalRepos,
    totalContributions,
    activeRepos,
    contributions,
    loading,
    error,
  } = useGitHubData()

  return (
    <section className="py-24 sm:py-32 border-t border-border/70" id="github">
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
              07 / OPEN SOURCE · GITHUB ACTIVITY
            </div>
            <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary text-left md:text-right">
              Built in the open.
            </h2>
          </div>

          {loading ? (
            <HeatmapSkeleton />
          ) : error ? (
            <motion.div
              className="rounded-2xl glass-panel p-8 text-center"
              variants={itemVariants}
            >
              <p className="text-muted font-mono text-sm">{error}</p>
              <a
                className="mt-3 inline-block font-mono text-xs text-accent hover:underline"
                href={`https://github.com/${GITHUB_USERNAME}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                View profile on GitHub →
              </a>
            </motion.div>
          ) : (
            <>
              {/* Stats Ribbon */}
              <motion.div
                className="grid grid-cols-3 gap-4 mb-10"
                variants={itemVariants}
              >
                <StatCard label="Repositories" value={totalRepos} />
                <StatCard
                  label="Contributions"
                  suffix="+"
                  value={totalContributions}
                />
                <StatCard label="Active Repos" suffix="+" value={activeRepos} />
              </motion.div>

              {/* Heatmap */}
              <motion.div
                className="rounded-2xl glass-panel p-6 sm:p-8"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Activity Calendar
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    Year: {new Date().getFullYear()}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <HeatmapGrid contributions={contributions} />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <a
                    className="font-mono text-xs text-muted hover:text-accent transition-colors"
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    @{GITHUB_USERNAME}
                  </a>
                  <HeatmapLegend />
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
