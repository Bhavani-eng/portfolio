import { motion } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'
import { cardHover } from './ui/motion'

const ACHIEVEMENTS = [
  {
    id: 'kagada-poster',
    category: 'Competition',
    title: '1st Place — Kagada Poster Presentation',
    highlight: true,
    accent: 'sky',
  },
  {
    id: 'kagada-paper',
    category: 'Competition',
    title: '1st Place — Paper Presentation at Kagada',
    highlight: true,
    accent: 'sky',
  },
  {
    id: 'ieee-securathon',
    category: 'Competition',
    title: '1st Place — IEEE Securathon for Cybersecurity Innovation',
    highlight: true,
    accent: 'sky',
  },
  {
    id: 'icwite',
    category: 'Research',
    title: 'Published research paper “CBT-YOLO” at ICWITE conference',
    highlight: false,
    accent: 'cyan',
  },
  {
    id: 'cyber-outreach',
    category: 'Outreach',
    title:
      'Conducted cybersecurity awareness sessions for technical and non-teaching staff across 10+ colleges',
    highlight: false,
    accent: 'indigo',
  },
  {
    id: 'student-sessions',
    category: 'Outreach',
    title: 'Delivered AI/ML and cybersecurity sessions to 200+ students',
    highlight: false,
    accent: 'indigo',
  },
]

const gridReveal = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const categoryStyles = {
  Competition: {
    badge: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    glow: 'group-hover:border-sky-400/25 group-hover:shadow-[0_0_32px_rgba(56,189,248,0.15)]',
    dot: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]',
  },
  Research: {
    badge: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
    glow: 'group-hover:border-cyan-400/25 group-hover:shadow-[0_0_32px_rgba(34,211,238,0.15)]',
    dot: 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]',
  },
  Outreach: {
    badge: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-200',
    glow: 'group-hover:border-indigo-400/25 group-hover:shadow-[0_0_32px_rgba(99,102,241,0.15)]',
    dot: 'bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.7)]',
  },
}

function TrophyIcon() {
  return (
    <svg
      className="h-5 w-5 text-amber-300/90"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM5 4H3v2a4 4 0 004 4M19 4h2v2a4 4 0 01-4 4" />
    </svg>
  )
}

function AchievementCard({ item }) {
  const styles = categoryStyles[item.category]

  return (
    <motion.li variants={cardReveal}>
      <motion.div
        whileHover={cardHover}
        className={`glass-panel glass-card-interactive group relative h-full overflow-hidden p-5 sm:p-6 ${styles.glow}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex h-full flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <span
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${styles.badge}`}
            >
              {item.category}
            </span>
            {item.highlight && (
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10"
                aria-label="First place"
              >
                <TrophyIcon />
              </span>
            )}
          </div>

          <div className="flex flex-1 gap-3">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`}
              aria-hidden
            />
            <p className="text-sm font-medium leading-relaxed text-slate-200 transition-colors duration-300 group-hover:text-white sm:text-[15px]">
              {item.title}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.li>
  )
}

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="section-shell"
      aria-labelledby="achievements-section-heading"
    >
      <div className="pointer-events-none absolute left-1/2 top-12 h-72 w-96 -translate-x-1/2 rounded-full bg-sky-500/8 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-16 right-0 h-64 w-64 translate-x-1/3 rounded-full bg-indigo-500/10 blur-[90px]" />

      <div className="section-inner">
        <SectionHeader
          eyebrow="Recognition"
          title="Achievements"
          headingId="achievements-section-heading"
          subtitle="Competition wins, published research, and community impact — a concise record of outcomes that matter to recruiters and technical reviewers."
        />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          variants={gridReveal}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          {ACHIEVEMENTS.map((item) => (
            <AchievementCard key={item.id} item={item} />
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          className="group relative mt-8 overflow-hidden rounded-2xl border border-sky-400/20 bg-sky-400/[0.06] p-6 shadow-[0_0_40px_rgba(56,189,248,0.1)] backdrop-blur-xl sm:p-8"
        >
          <div className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-sky-400/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <span className="inline-flex w-fit rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-200">
              Foundation
            </span>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Strong foundation in{' '}
              <span className="font-medium text-sky-100">
                Machine Learning
              </span>
              ,{' '}
              <span className="font-medium text-sky-100">Computer Vision</span>
              ,{' '}
              <span className="font-medium text-sky-100">Problem Solving</span>
              , and{' '}
              <span className="font-medium text-sky-100">
                Technical Mentoring
              </span>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
