import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M20.25 14.15A7.6 7.6 0 0 1 9.85 3.75 8.25 8.25 0 1 0 20.25 14.15Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.75v2.1M12 19.15v2.1M4.85 4.85l1.48 1.48M17.67 17.67l1.48 1.48M2.75 12h2.1M19.15 12h2.1M4.85 19.15l1.48-1.48M17.67 6.33l1.48-1.48"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <motion.button
      aria-label={label}
      aria-pressed={!isDark}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/80 text-secondary shadow-soft backdrop-blur-md transition-colors hover:border-accent-secondary hover:text-accent-secondary focus-visible:ring-2 focus-visible:ring-accent-secondary"
      onClick={toggleTheme}
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 90, scale: 1 }}
        initial={false}
        key={theme}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </motion.div>
    </motion.button>
  )
}
