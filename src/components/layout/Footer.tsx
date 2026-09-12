import { motion } from 'framer-motion'
import { personal } from '@/data/portfolioData'
import { navLinks } from './navData'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-border bg-surface text-secondary transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Info */}
          <div className="lg:col-span-2">
            <a
              className="inline-flex items-center gap-2.5 font-mono text-lg font-bold tracking-tight text-primary hover:text-accent-secondary transition-colors"
              href="#hero"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-secondary/40 bg-accent-secondary/10 font-mono text-xs font-bold text-accent-secondary">
                VS
              </span>
              <span>{personal.fullName}</span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-6 text-secondary">
              {personal.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-raised px-3 py-1 text-secondary">
                <span className="h-2 w-2 rounded-full bg-accent-secondary animate-pulse" />
                Hyderabad, India
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-raised px-3 py-1 text-secondary">
                KL University '27
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-technical/40 bg-technical/10 px-3 py-1 text-technical">
                GPA 8.73 / 10
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    className="text-secondary hover:text-accent-secondary transition-colors"
                    href={`#${link.id}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Socials */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              Connect
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  className="inline-flex items-center gap-2 text-secondary hover:text-accent-secondary transition-colors"
                  href={personal.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.16c-3.22.7-3.9-1.38-3.9-1.38-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.72 0-1.27.45-2.3 1.2-3.11-.12-.29-.52-1.48.11-3.07 0 0 .98-.31 3.17 1.19A10.9 10.9 0 0 1 12 5.9c.98 0 1.96.13 2.88.39 2.2-1.5 3.17-1.19 3.17-1.19.64 1.59.24 2.78.12 3.07.75.82 1.2 1.85 1.2 3.11 0 4.45-2.7 5.43-5.28 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .5Z" />
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-secondary hover:text-accent-secondary transition-colors"
                  href={personal.linkedIn}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-secondary hover:text-accent-secondary transition-colors"
                  download="Venkat_Satish_Resume.pdf"
                  href={personal.resume}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Resume (PDF)
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-secondary hover:text-accent-secondary transition-colors"
                  href={`mailto:${personal.email}`}
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect height="14" rx="2" width="18" x="3" y="5" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                  Email
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-secondary hover:text-accent-secondary transition-colors"
                  href={`tel:${personal.phone.replaceAll('-', '')}`}
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 16.92v2.12a2 2 0 0 1-2.18 2 19.74 19.74 0 0 1-8.6-3.06 19.38 19.38 0 0 1-5.98-5.98 19.74 19.74 0 0 1-3.06-8.64A2 2 0 0 1 4.17 1.2h2.13a2 2 0 0 1 2 1.72c.12.91.32 1.8.6 2.65a2 2 0 0 1-.45 2.08l-.9.9a16 16 0 0 0 5.98 5.98l.9-.9a2 2 0 0 1 2.08-.45c.85.28 1.74.48 2.65.6A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  Phone
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {personal.fullName}. Built with React,
            TypeScript &amp; Tailwind CSS.
          </p>

          <motion.button
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-raised px-4 py-2 text-xs font-medium text-secondary shadow-soft transition-colors hover:border-accent-secondary hover:text-accent-secondary"
            onClick={scrollToTop}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
