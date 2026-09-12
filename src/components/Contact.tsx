import { useState, type FormEvent } from 'react'
import { motion, type Variants } from 'framer-motion'
import { personal } from '@/data/portfolioData'

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

export function Contact() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedStatus, setSubmittedStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(label)
    setTimeout(() => setCopiedItem(null), 2500)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const trimmedName = formValues.name.trim()
    const trimmedEmail = formValues.email.trim()
    const trimmedSubject = formValues.subject.trim() || 'Portfolio Inquiry'
    const trimmedMessage = formValues.message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setSubmittedStatus('error')
      setIsSubmitting(false)
      return
    }

    // Attempt mailto generation
    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${trimmedSubject} - ${trimmedName}`,
    )}&body=${encodeURIComponent(
      `Hi Venkat Satish,\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
    )}`

    // Open mail client
    window.location.href = mailtoUrl
    setSubmittedStatus('success')
    setIsSubmitting(false)
    setFormValues({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section
      className="relative border-t border-border/70 bg-background px-4 py-24 sm:px-6 lg:px-8"
      id="contact"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1 }}
          whileInView="visible"
        >
          {/* Header */}
          <motion.div className="mb-14" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent-secondary">
              <span>06</span>
              <span className="h-px w-6 bg-accent-secondary" />
              <span>Get In Touch</span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Let's Connect &amp; Collaborate
            </h2>
            <p className="mt-2 max-w-2xl text-base text-secondary">
              Have an open position, project inquiry, or want to discuss
              cybersecurity and blockchain architectures? Reach out directly.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Form (7 Cols) */}
            <motion.div
              className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-card"
              variants={itemVariants}
            >
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-primary mb-6">
                Send a Direct Message
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      className="block text-xs font-medium text-secondary mb-2"
                      htmlFor="contact-name"
                    >
                      Your Name <span className="text-accent-secondary">*</span>
                    </label>
                    <input
                      className="w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-accent-secondary focus:outline-none"
                      id="contact-name"
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                      placeholder="Jane Doe"
                      required
                      type="text"
                      value={formValues.name}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-medium text-secondary mb-2"
                      htmlFor="contact-email"
                    >
                      Email Address{' '}
                      <span className="text-accent-secondary">*</span>
                    </label>
                    <input
                      className="w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-accent-secondary focus:outline-none"
                      id="contact-email"
                      onChange={(e) =>
                        setFormValues({ ...formValues, email: e.target.value })
                      }
                      placeholder="jane@example.com"
                      required
                      type="email"
                      value={formValues.email}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-medium text-secondary mb-2"
                    htmlFor="contact-subject"
                  >
                    Subject
                  </label>
                  <input
                    className="w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-accent-secondary focus:outline-none"
                    id="contact-subject"
                    onChange={(e) =>
                      setFormValues({ ...formValues, subject: e.target.value })
                    }
                    placeholder="SDE Opportunity / Project Discussion"
                    type="text"
                    value={formValues.subject}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-medium text-secondary mb-2"
                    htmlFor="contact-message"
                  >
                    Message <span className="text-accent-secondary">*</span>
                  </label>
                  <textarea
                    className="w-full min-h-36 resize-y rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-accent-secondary focus:outline-none"
                    id="contact-message"
                    onChange={(e) =>
                      setFormValues({ ...formValues, message: e.target.value })
                    }
                    placeholder="Hello Venkat, I came across your work on OjasRaksha and wanted to discuss..."
                    required
                    value={formValues.message}
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-8 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? (
                      <span>Preparing message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {submittedStatus === 'success' && (
                  <div className="rounded-xl border border-technical/40 bg-technical/10 p-4 text-xs font-medium text-technical">
                    Draft initiated! Opening your mail client, or feel free to
                    email directly at{' '}
                    <span className="font-mono underline">
                      {personal.email}
                    </span>
                    .
                  </div>
                )}

                {submittedStatus === 'error' && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs font-medium text-rose-400">
                    Please provide your name, valid email, and a message.
                  </div>
                )}
              </form>
            </motion.div>

            {/* Quick Contact Cards (5 Cols) */}
            <motion.div
              className="lg:col-span-5 space-y-4"
              variants={itemVariants}
            >
              {/* Email Card */}
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-secondary/15 text-accent-secondary">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          height="14"
                          rx="2"
                          strokeWidth="2"
                          width="18"
                          x="3"
                          y="5"
                        />
                        <path d="m4 7 8 6 8-6" strokeWidth="2" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-muted">
                        Email Address
                      </p>
                      <a
                        className="text-sm font-semibold text-primary hover:text-accent-secondary transition-colors break-all"
                        href={`mailto:${personal.email}`}
                      >
                        {personal.email}
                      </a>
                    </div>
                  </div>

                  <button
                    aria-label="Copy email"
                    className="rounded-lg border border-border bg-surface-raised px-2.5 py-1 text-xs font-mono text-secondary hover:border-accent-secondary hover:text-primary transition-colors"
                    onClick={() => handleCopy(personal.email, 'email')}
                    type="button"
                  >
                    {copiedItem === 'email' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Phone Card */}
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-technical/15 text-technical">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M22 16.92v2.12a2 2 0 0 1-2.18 2 19.74 19.74 0 0 1-8.6-3.06 19.38 19.38 0 0 1-5.98-5.98 19.74 19.74 0 0 1-3.06-8.64A2 2 0 0 1 4.17 1.2h2.13a2 2 0 0 1 2 1.72c.12.91.32 1.8.6 2.65a2 2 0 0 1-.45 2.08l-.9.9a16 16 0 0 0 5.98 5.98l.9-.9a2 2 0 0 1 2.08-.45c.85.28 1.74.48 2.65.6A2 2 0 0 1 22 16.92Z"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-muted">
                        Phone / WhatsApp
                      </p>
                      <a
                        className="text-sm font-semibold text-primary hover:text-accent-secondary transition-colors"
                        href={`tel:${personal.phone.replaceAll('-', '')}`}
                      >
                        {personal.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    aria-label="Copy phone number"
                    className="rounded-lg border border-border bg-surface-raised px-2.5 py-1 text-xs font-mono text-secondary hover:border-accent-secondary hover:text-primary transition-colors"
                    onClick={() => handleCopy(personal.phone, 'phone')}
                    type="button"
                  >
                    {copiedItem === 'phone' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* LinkedIn Card */}
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
                <a
                  className="flex items-center justify-between group"
                  href={personal.linkedIn}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-muted">
                        Professional Network
                      </p>
                      <p className="text-sm font-semibold text-primary group-hover:text-accent-secondary transition-colors">
                        LinkedIn Profile
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-muted group-hover:text-accent-secondary transition-colors">
                    ↗
                  </span>
                </a>
              </div>

              {/* GitHub Card */}
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
                <a
                  className="flex items-center justify-between group"
                  href={personal.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.16c-3.22.7-3.9-1.38-3.9-1.38-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.72 0-1.27.45-2.3 1.2-3.11-.12-.29-.52-1.48.11-3.07 0 0 .98-.31 3.17 1.19A10.9 10.9 0 0 1 12 5.9c.98 0 1.96.13 2.88.39 2.2-1.5 3.17-1.19 3.17-1.19.64 1.59.24 2.78.12 3.07.75.82 1.2 1.85 1.2 3.11 0 4.45-2.7 5.43-5.28 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .5Z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-muted">
                        Source Code &amp; Repos
                      </p>
                      <p className="text-sm font-semibold text-primary group-hover:text-accent-secondary transition-colors">
                        github.com/venkatsatish03
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-muted group-hover:text-accent-secondary transition-colors">
                    ↗
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
