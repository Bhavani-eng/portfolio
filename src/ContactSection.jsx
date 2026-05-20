import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  GITHUB_DISPLAY,
  LINKEDIN_DISPLAY,
  PROFILE,
} from './constants/profile'
import SectionHeader from './ui/SectionHeader'
import { buttonHover, buttonTap } from './ui/motion'

const panelReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const itemReveal = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

const LINKS = [
  {
    id: 'email',
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    external: false,
  },
  {
    id: 'phone',
    label: 'Phone',
    value: PROFILE.phone,
    href: `tel:${PROFILE.phoneTel}`,
    external: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: LINKEDIN_DISPLAY,
    href: PROFILE.linkedin,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: GITHUB_DISPLAY,
    href: PROFILE.github,
    external: true,
  },
]

const FOOTER_SOCIAL = [
  { label: 'GitHub', href: PROFILE.github },
  { label: 'LinkedIn', href: PROFILE.linkedin },
]

function ContactIcon({ type }) {
  const className = 'h-5 w-5 text-sky-300/90'
  if (type === 'email') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M4 6h16v12H4z" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    )
  }
  if (type === 'phone') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M6 4h4l2 5-2 1a11 11 0 005 5l1-2 5 2v4a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z" />
      </svg>
    )
  }
  if (type === 'linkedin') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 1.005-.315 3.3 1.005 3.3 1.005.9-.255 1.86-.39 2.82-.39.96 0 1.92.135 2.82.39 0 0 2.295-1.32 3.3-1.005.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function AnimatedField({ id, label, type = 'text', value, onChange, required, rows }) {
  const isTextarea = type === 'textarea'
  const Tag = isTextarea ? 'textarea' : 'input'

  return (
    <motion.div variants={itemReveal} className="group relative">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 transition-colors group-focus-within:text-sky-300/90"
      >
        {label}
        {required && <span className="text-sky-400/80"> *</span>}
      </label>
      <Tag
        id={id}
        name={id}
        type={isTextarea ? undefined : type}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-white/12 bg-navy-950/50 px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-sky-400/50 focus:bg-navy-900/60 focus:shadow-[0_0_24px_rgba(56,189,248,0.12)] focus:ring-2 focus:ring-sky-400/20"
        placeholder={isTextarea ? 'Your message…' : `Your ${label.toLowerCase()}`}
      />
    </motion.div>
  )
}

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`)
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    )
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
    setStatus('success')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <motion.form
      variants={panelReveal}
      onSubmit={handleSubmit}
      className="glass-panel-lg relative overflow-hidden p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="relative">
        <h3 className="text-lg font-semibold text-white">Send a message</h3>
        <p className="mt-2 text-sm text-slate-400">
          Recruiters and collaborators — I typically respond within 1–2 business
          days.
        </p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 space-y-5"
        >
          <AnimatedField
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <AnimatedField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <AnimatedField
            id="message"
            label="Message"
            type="textarea"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </motion.div>

        <motion.button
          type="submit"
          whileHover={buttonHover}
          whileTap={buttonTap}
          className="btn-primary mt-8 w-full sm:w-auto"
        >
          Send Message
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </motion.button>

        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-sky-200/90"
            role="status"
          >
            Your email client should open — if not, reach me directly at{' '}
            <a href={`mailto:${PROFILE.email}`} className="font-medium text-sky-300 underline-offset-2 hover:underline">
              {PROFILE.email}
            </a>
            .
          </motion.p>
        )}
      </div>
    </motion.form>
  )
}

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] bg-navy-950/50 backdrop-blur-md">
      <div className="section-inner flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold tracking-tight text-slate-200">
            {PROFILE.name}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Computer Science · AI & ML
          </p>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-3 sm:justify-end"
          aria-label="Footer social links"
        >
          {FOOTER_SOCIAL.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300 transition-all duration-300 hover:border-sky-400/30 hover:text-sky-100 hover:shadow-[0_0_16px_rgba(56,189,248,0.12)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-center text-xs text-slate-500 sm:text-right">
          © {year} {PROFILE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function ContactSection() {
  return (
    <>
      <section
        id="contact"
        className="section-shell"
        aria-labelledby="contact-section-heading"
      >
        <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-96 -translate-x-1/2 rounded-full bg-sky-500/8 blur-[110px]" />

        <div className="section-inner">
          <SectionHeader
            eyebrow="Get in touch"
            title="Contact"
            headingId="contact-section-heading"
            subtitle="Open to internships, research collaborations, and technical roles. Reach out via the channels below or send a direct message."
          />

          <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-5 lg:gap-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="lg:col-span-2"
            >
              <ul className="space-y-4">
                {LINKS.map((link) => (
                  <motion.li key={link.id} variants={itemReveal}>
                    <motion.a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      whileHover={{ x: 4, y: -3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      className="glass-panel glass-card-interactive group flex items-center gap-4 p-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                        <ContactIcon type={link.id} />
                      </span>
                      <span className="min-w-0 text-left">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-sky-100">
                          {link.value}
                        </span>
                      </span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
