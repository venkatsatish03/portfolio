import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { publications, type PublicationItem } from '@/data/portfolioData'

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

function PublicationCard({ paper }: { paper: PublicationItem }) {
  const [copiedBibtex, setCopiedBibtex] = useState(false)
  const [showBibtex, setShowBibtex] = useState(false)

  const handleCopyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(paper.bibtex)
      setCopiedBibtex(true)
      setTimeout(() => setCopiedBibtex(false), 2500)
    } catch {
      // Fallback
    }
  }

  return (
    <motion.article
      className="rounded-3xl glass-panel p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-all duration-300 hover:border-accent/40"
      variants={itemVariants}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl pointer-events-none"
      />

      {/* Top Meta Header: Venue + Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent/15 px-3 py-1 font-mono text-xs font-semibold text-accent">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            {paper.conferenceShort}
          </span>

          <span className="rounded-lg border border-border/70 bg-surface/50 px-2.5 py-1 font-mono text-xs text-muted">
            {paper.location}
          </span>

          <span className="rounded-lg border border-border/70 bg-surface/50 px-2.5 py-1 font-mono text-xs text-muted">
            {paper.dates}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 dark:border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
            {paper.status}
          </span>
        </div>
      </div>

      {/* Conference Full Name */}
      <p className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
        {paper.conference}
      </p>

      {/* Paper Title */}
      <h3 className="editorial-title text-2xl sm:text-3xl font-bold text-primary leading-tight mb-5">
        {paper.title}
      </h3>

      {/* Authors list with Self Highlight */}
      <div className="mb-6">
        <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted mb-2.5">
          Authors
        </h4>
        <div className="flex flex-wrap items-center gap-2">
          {paper.authors.map((author, idx) => (
            <span
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                author.isSelf
                  ? 'border border-accent bg-accent/15 text-accent font-semibold shadow-sm'
                  : 'border border-border/60 bg-surface/40 text-secondary'
              }`}
              key={idx}
            >
              {author.name}
            </span>
          ))}
        </div>
      </div>

      {/* Abstract */}
      <div className="mb-6 rounded-2xl border border-border/60 bg-surface/30 p-5 backdrop-blur-sm">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
          <svg
            className="h-4 w-4 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          Framework Overview &amp; Contribution
        </h4>
        <p className="text-sm leading-relaxed text-secondary">
          {paper.abstract}
        </p>
      </div>

      {/* Patent Linkage Note */}
      {paper.patentFiling && (
        <div className="mb-6 flex items-center gap-3 rounded-xl patent-banner p-3.5 text-xs">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg patent-banner-star font-bold">
            ★
          </span>
          <span className="leading-relaxed">
            <strong className="font-bold">Patent Interlock:</strong> Directly
            underpins the architectural mechanisms of the{' '}
            <strong className="font-semibold underline decoration-current/30 underline-offset-2">
              {paper.patentFiling}
            </strong>
            .
          </span>
        </div>
      )}

      {/* Tags / Keywords */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {paper.tags.map((tag, idx) => (
          <span
            className="glass-badge rounded-md px-2.5 py-1 text-[11px] font-mono text-muted"
            key={idx}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions: BibTeX, Proceedings Notice, Link */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-surface/60 px-4 py-2 font-mono text-xs font-semibold text-primary transition-all hover:border-accent hover:text-accent"
            onClick={() => setShowBibtex(!showBibtex)}
            type="button"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            {showBibtex ? 'Hide BibTeX' : 'Cite (BibTeX)'}
          </button>

          <button
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-surface/60 px-4 py-2 font-mono text-xs font-medium text-muted transition-all hover:text-primary"
            onClick={handleCopyBibtex}
            type="button"
          >
            {copiedBibtex ? (
              <>
                <svg
                  className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Copied!
                </span>
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                Copy Citation
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {paper.link ? (
            <a
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 font-mono text-xs font-bold text-white shadow-sm transition-all hover:opacity-90"
              href={paper.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read Paper
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </a>
          ) : (
            <span className="font-mono text-xs text-muted flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Proceedings forthcoming (Dec 2026)
            </span>
          )}
        </div>
      </div>

      {/* Expandable BibTeX Block */}
      {showBibtex && (
        <motion.div
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 overflow-hidden rounded-xl border border-border/70 bg-black/60 p-4 font-mono text-xs text-zinc-300"
          initial={{ opacity: 0, height: 0 }}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-muted">
            <span>BibTeX Entry</span>
            <button
              className="text-accent hover:underline text-[11px]"
              onClick={handleCopyBibtex}
              type="button"
            >
              {copiedBibtex ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="overflow-x-auto text-[11px] leading-relaxed">
            {paper.bibtex}
          </pre>
        </motion.div>
      )}
    </motion.article>
  )
}

export function Research() {
  return (
    <section className="py-24 sm:py-32 border-t border-border/70" id="research">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1 }}
          whileInView="visible"
        >
          {/* Header matching portfolio editorial pattern */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="editorial-tag">
              06 / RESEARCH &amp; PUBLICATIONS
            </div>
            <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary text-left md:text-right">
              Scientific &amp; patent work.
            </h2>
          </div>

          <p className="max-w-3xl text-base sm:text-lg text-secondary mb-12 -mt-8 leading-relaxed">
            Advancing decentralized healthcare data governance, privacy
            compliance, and distributed consensus through peer-reviewed research
            and patent-registered architectures.
          </p>

          {/* Publications List */}
          <div className="space-y-8">
            {publications.map((paper) => (
              <PublicationCard key={paper.id} paper={paper} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
