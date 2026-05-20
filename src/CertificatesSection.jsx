import { motion } from 'framer-motion'
import { CERTIFICATES, SEMESTER_RESULTS } from './constants/profile'
import SectionHeader from './ui/SectionHeader'
import { buttonHover, buttonTap, sectionReveal } from './ui/motion'

const gridReveal = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

function ImageDocIcon() {
  return (
    <svg
      className="h-11 w-11 text-sky-300/85"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      aria-hidden
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="11" r="2.5" />
      <path d="M8 17l2.5-2.5a1 1 0 011.4 0L14 17" />
    </svg>
  )
}

function PdfDocIcon() {
  return (
    <svg
      className="h-11 w-11 text-sky-300/85"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
      <path d="M14 2v6h6M10 13h4M10 17h4M8 9h1" />
    </svg>
  )
}

function ViewIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

function CredentialCard({ item }) {
  const Icon = item.kind === 'pdf' ? PdfDocIcon : ImageDocIcon

  return (
    <motion.li variants={cardReveal} className="list-none">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="glass-panel glass-card-interactive group flex h-full flex-col p-5 sm:p-6"
      >
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-navy-950/45 px-4 py-8 transition-colors duration-300 group-hover:border-sky-400/20 group-hover:bg-navy-900/50">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 shadow-[0_0_24px_rgba(56,189,248,0.12)] transition-shadow duration-300 group-hover:shadow-[0_0_28px_rgba(56,189,248,0.22)]">
            <Icon />
          </div>
        </div>

        <h3 className="mt-5 text-center text-sm font-semibold leading-snug text-slate-100 sm:text-[15px]">
          {item.title}
        </h3>

        <motion.a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={buttonHover}
          whileTap={buttonTap}
          className="btn-secondary mt-5 w-full"
          aria-label={`View ${item.title} in a new tab`}
        >
          <ViewIcon />
          View
        </motion.a>
      </motion.article>
    </motion.li>
  )
}

function CredentialGroup({ title, description, items, compact = false }) {
  const gridClass = compact
    ? 'grid max-w-sm gap-5 sm:grid-cols-1'
    : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <motion.div variants={sectionReveal} className="relative">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{description}</p>
        </div>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        variants={gridReveal}
        className={gridClass}
      >
        {items.map((item) => (
          <CredentialCard key={item.id} item={item} />
        ))}
      </motion.ul>
    </motion.div>
  )
}

export default function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="section-shell"
      aria-labelledby="certificates-section-heading"
    >
      <div className="pointer-events-none absolute left-0 top-24 h-72 w-72 -translate-x-1/3 rounded-full bg-sky-500/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[90px]" />

      <div className="section-inner">
        <SectionHeader
          eyebrow="Credentials"
          title="Certifications & Results"
          headingId="certificates-section-heading"
          subtitle="Verified certifications and academic semester results — open any document instantly for recruiter and academic review."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.06 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.08 },
            },
          }}
          className="mt-12 space-y-14 lg:mt-14 lg:space-y-16"
        >
          <CredentialGroup
            title="Certifications"
            description="Professional courses, workshops, and credential documents."
            items={CERTIFICATES}
          />

          <CredentialGroup
            title="Semester Results"
            description="Consolidated academic markscards and semester performance records."
            items={[SEMESTER_RESULTS]}
            compact
          />
        </motion.div>
      </div>
    </section>
  )
}
