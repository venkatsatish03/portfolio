import { type MouseEvent, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { personal } from '@/data/portfolioData'
import { navLinks, type NavLinkId } from './navData'

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      {isOpen ? (
        <path
          d="M6 6l12 12M18 6 6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      )}
    </svg>
  )
}

export function Navbar() {
  const [activeLink, setActiveLink] = useState<NavLinkId>('about')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (visibleEntry?.target.id) {
          setActiveLink(visibleEntry.target.id as NavLinkId)
        }
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (
    id: NavLinkId,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    const targetSection = document.getElementById(id)
    setActiveLink(id)
    setIsMobileMenuOpen(false)

    if (targetSection) {
      event.preventDefault()
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const renderNavLink = (id: NavLinkId, label: string) => {
    const isActive = activeLink === id

    return (
      <a
        className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors duration-200 ${
          isActive
            ? 'text-accent-secondary font-semibold'
            : 'text-secondary hover:text-primary'
        }`}
        href={`#${id}`}
        onClick={(event) => handleNavClick(id, event)}
      >
        {label}
        {isActive && (
          <motion.span
            className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
            layoutId="activeNavIndicator"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </a>
    )
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 backdrop-blur-xl bg-background/85 border-b border-border/80 shadow-soft'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand / Name */}
        <a
          className="group flex items-center gap-2.5 font-mono text-sm sm:text-base font-bold tracking-tight text-primary transition-colors hover:text-accent-secondary"
          href="#hero"
          onClick={(event) => {
            const heroSection = document.getElementById('hero')
            if (heroSection) {
              event.preventDefault()
              heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-secondary/40 bg-accent-secondary/10 font-mono text-xs font-bold text-accent-secondary group-hover:border-accent-secondary group-hover:bg-accent-secondary/20 transition-all">
            VS
          </span>
          <span className="flex items-center gap-1.5">
            <span>{personal.fullName}</span>
            <span className="hidden sm:inline-block text-xs font-normal text-muted">
              · SDE / Security
            </span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 rounded-full border border-border/70 bg-surface/70 px-3 py-1.5 shadow-soft backdrop-blur-md md:flex">
          {navLinks.map(({ id, label }) => (
            <span key={id}>{renderNavLink(id, label)}</span>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            aria-label="Download Venkat Satish's Resume (PDF)"
            className="inline-flex items-center gap-1.5 rounded-xl border border-accent-secondary/50 bg-accent-secondary/10 px-3.5 py-1.5 text-xs font-semibold text-accent-secondary shadow-soft transition-all duration-200 hover:border-accent-secondary hover:bg-accent-secondary hover:text-background active:scale-[0.98]"
            download="Venkat_Satish_Resume.pdf"
            href={personal.resume}
            rel="noreferrer"
            target="_blank"
          >
            <svg
              className="h-3.5 w-3.5"
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
            <span>Resume</span>
          </a>
          <a
            className="inline-flex items-center gap-1.5 rounded-full border border-technical/40 bg-technical/10 px-3 py-1 text-xs font-medium text-technical"
            href="#contact"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-technical opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-technical" />
            </span>
            Available for Roles
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile Actions & Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/80 text-secondary shadow-soft backdrop-blur-md hover:border-accent-secondary hover:text-accent-secondary focus-visible:ring-2 focus-visible:ring-accent-secondary"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            <MenuIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            animate={{ opacity: 1, height: 'auto' }}
            aria-label="Mobile navigation drawer"
            className="overflow-hidden border-b border-border bg-surface-raised/95 px-6 py-6 shadow-card backdrop-blur-2xl md:hidden"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map(({ id, label }) => (
                <a
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    activeLink === id
                      ? 'bg-accent-secondary/15 text-accent-secondary font-semibold'
                      : 'text-secondary hover:bg-surface hover:text-primary'
                  }`}
                  href={`#${id}`}
                  key={id}
                  onClick={(event) => handleNavClick(id, event)}
                >
                  <span>{label}</span>
                  {activeLink === id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary" />
                  )}
                </a>
              ))}
            </div>

            <div className="mt-5 border-t border-border pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-secondary px-2">
                <span>Status</span>
                <span className="inline-flex items-center gap-1.5 text-technical font-medium">
                  <span className="h-2 w-2 rounded-full bg-technical animate-pulse" />
                  Open to Opportunities
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-accent-secondary/50 bg-accent-secondary/10 px-4 py-2.5 text-xs font-semibold text-accent-secondary shadow-soft transition-colors hover:bg-accent-secondary hover:text-background text-center"
                  download="Venkat_Satish_Resume.pdf"
                  href={personal.resume}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    className="h-3.5 w-3.5"
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
                  <span>Resume</span>
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-background shadow-soft transition-colors hover:bg-accent-secondary text-center"
                  href="#contact"
                  onClick={(e) => handleNavClick('contact', e)}
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
