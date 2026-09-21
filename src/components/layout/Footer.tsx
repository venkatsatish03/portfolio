import { motion } from 'framer-motion'
import { personal } from '@/data/portfolioData'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 bg-[#0E0E0E] text-[#8E8E96] py-8 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <p className="text-[#8E8E96]">
          © {new Date().getFullYear()} {personal.fullName}. All rights reserved.
        </p>

        <motion.button
          aria-label="Back to top"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white hover:border-white hover:text-white transition-colors"
          onClick={scrollToTop}
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Back to Top</span>
          <span>↑</span>
        </motion.button>
      </div>
    </footer>
  )
}
