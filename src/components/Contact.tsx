import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal } from '@/data/portfolioData'

export function Contact() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedStatus, setSubmittedStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [showDirectForm, setShowDirectForm] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Hyderabad IST time
      const timeStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setCurrentTime(timeStr)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const trimmedName = formValues.name.trim()
    const trimmedEmail = formValues.email.trim()
    const trimmedMessage = formValues.message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setSubmittedStatus('error')
      setIsSubmitting(false)
      return
    }

    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] From ${trimmedName}`,
    )}&body=${encodeURIComponent(
      `Hi Venkat Satish,\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
    )}`

    window.location.href = mailtoUrl
    setSubmittedStatus('success')
    setIsSubmitting(false)
    setFormValues({ name: '', email: '', message: '' })
  }

  return (
    <section
      className="bg-[#0E0E0E] text-[#F5F5F5] pt-24 pb-16 sm:pt-32 sm:pb-20 transition-colors"
      id="contact"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Top Kicker matching image */}
        <div className="editorial-tag text-accent font-mono text-xs uppercase tracking-widest mb-10">
          06 / CONTACT
        </div>

        {/* Giant Editorial Headline */}
        <div className="max-w-4xl">
          <h2 className="editorial-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.0] text-white">
            Have a good idea?
            <br />
            <span className="text-accent">Let's make it real.</span>
          </h2>

          {/* Subtext */}
          <p className="mt-8 text-base sm:text-xl text-[#9E9EA6] max-w-2xl leading-relaxed">
            I'm currently available for Software Engineering, Security, and
            Blockchain roles. Whether you have an open position, an ambitious
            project, or a technical inquiry, let's talk.
          </p>

          {/* Giant Email CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              className="group inline-flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white hover:text-accent transition-colors"
              href={`mailto:${personal.email}`}
            >
              <span className="border-b-2 border-white/40 group-hover:border-accent transition-colors pb-1">
                {personal.email}
              </span>
              <span className="text-accent text-3xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            <button
              aria-label="Copy email address"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-mono text-[#A0A0A0] hover:text-white hover:border-white/40 transition-colors"
              onClick={handleCopyEmail}
              type="button"
            >
              {copiedEmail ? '✓ Copied!' : 'Copy Email'}
            </button>
          </div>

          {/* Action Row */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all duration-200"
              onClick={() => setShowDirectForm(!showDirectForm)}
              type="button"
            >
              <span>
                {showDirectForm ? 'Close Message Form' : 'Send Direct Message'}
              </span>
              <span>{showDirectForm ? '✕' : '✉'}</span>
            </button>

            <a
              className="text-xs font-mono text-[#8E8E96] hover:text-white transition-colors"
              href={`tel:${personal.phone.replaceAll('-', '')}`}
            >
              Phone: {personal.phone}
            </a>
          </div>
        </div>

        {/* Direct Contact Form Drawer */}
        <AnimatePresence>
          {showDirectForm && (
            <motion.div
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-12 max-w-2xl rounded-2xl border border-white/15 bg-[#171719] p-6 sm:p-8 overflow-hidden"
              exit={{ opacity: 0, height: 0 }}
              initial={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-accent mb-6">
                Send a Message to Venkat Satish
              </h3>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block text-xs font-mono text-[#A0A0A0] mb-1.5"
                    htmlFor="contact-name"
                  >
                    Your Name *
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/15 bg-[#101012] px-4 py-2.5 text-sm text-white placeholder-[#606066] focus:border-accent focus:outline-none"
                    id="contact-name"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                    placeholder="e.g. Sarah Connor"
                    required
                    type="text"
                    value={formValues.name}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-mono text-[#A0A0A0] mb-1.5"
                    htmlFor="contact-email"
                  >
                    Your Email *
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/15 bg-[#101012] px-4 py-2.5 text-sm text-white placeholder-[#606066] focus:border-accent focus:outline-none"
                    id="contact-email"
                    onChange={(e) =>
                      setFormValues({ ...formValues, email: e.target.value })
                    }
                    placeholder="sarah@example.com"
                    required
                    type="email"
                    value={formValues.email}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-mono text-[#A0A0A0] mb-1.5"
                    htmlFor="contact-message"
                  >
                    Message *
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-white/15 bg-[#101012] px-4 py-2.5 text-sm text-white placeholder-[#606066] focus:border-accent focus:outline-none"
                    id="contact-message"
                    onChange={(e) =>
                      setFormValues({ ...formValues, message: e.target.value })
                    }
                    placeholder="Tell me about your project, team, or opportunity..."
                    required
                    rows={4}
                    value={formValues.message}
                  />
                </div>

                <button
                  className="rounded-full bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-accent hover:text-white transition-colors"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Preparing Mail...' : 'Send Message'}
                </button>

                {submittedStatus === 'success' && (
                  <p className="text-xs text-technical mt-2">
                    ✓ Email client opened! Looking forward to connecting.
                  </p>
                )}
                {submittedStatus === 'error' && (
                  <p className="text-xs text-rose-400 mt-2">
                    Please fill out all required fields.
                  </p>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Meta Row matching reference screenshot */}
        <div className="mt-24 pt-10 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono text-[#8E8E96]">
          {/* Location & Live Clock */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-technical animate-pulse" />
              <span>HYDERABAD, INDIA</span>
            </span>
            <span>·</span>
            <span>LOCAL TIME (IST): {currentTime || '5:30 PM'}</span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6 uppercase tracking-wider text-white">
            <a
              className="hover:text-accent transition-colors"
              href={personal.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub ↗
            </a>
            <a
              className="hover:text-accent transition-colors"
              href={personal.linkedIn}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn ↗
            </a>
            <a
              className="hover:text-accent transition-colors"
              download="Venkat_Satish_Resume.pdf"
              href={personal.resume}
              rel="noreferrer"
              target="_blank"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
