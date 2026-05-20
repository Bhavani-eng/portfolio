import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import SectionHeader from './ui/SectionHeader'
import { cardHover } from './ui/motion'

const highlights = [
  'Computer Science undergraduate with CGPA 9.1',
  'Strong foundations in Data Structures & Algorithms',
  'Interested in AI, Machine Learning, and Computer Vision',
  'Research publication experience at ICWITE',
  'Conducted AI/ML and cybersecurity sessions for 200+ students',
  'Passionate about problem solving, mentoring, and building impactful technology',
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

function useCountUp(target, { duration = 1600, enabled }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let raf
    let start
    const step = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - (1 - p) ** 3
      setValue(target * eased)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, enabled])

  return value
}

function StatCard({
  label,
  sublabel,
  delay,
  children,
  glow = 'sky',
}) {
  const glowClass =
    glow === 'indigo'
      ? 'bg-indigo-400/15 shadow-indigo-500/20'
      : 'bg-sky-400/15 shadow-sky-500/25'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={cardHover}
      className="glass-panel glass-card-interactive group relative overflow-hidden p-6"
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${glowClass}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {label}
        </p>
        <div className="mt-3">{children}</div>
        {sublabel && (
          <p className="mt-2 text-xs leading-relaxed text-slate-500">{sublabel}</p>
        )}
      </div>
    </motion.div>
  )
}

function AnimatedStatNumber({ end, decimals = 0, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const enabled = useInView(ref, { once: true, amount: 0.45 })
  const v = useCountUp(end, { duration: 1700, enabled })

  const display =
    decimals > 0 ? v.toFixed(decimals) : String(Math.min(end, Math.floor(v)))

  return (
    <span ref={ref} className="tabular-nums tracking-tight">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-shell"
      aria-labelledby="about-section-heading"
    >
      <div className="pointer-events-none absolute left-1/4 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 translate-x-1/4 rounded-full bg-indigo-500/10 blur-[110px]" />

      <div className="section-inner">
        <SectionHeader
          eyebrow="Profile"
          title="About"
          headingId="about-section-heading"
          subtitle="A concise snapshot for recruiters and collaborators — academics, technical depth, research, and community impact."
        />

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.05] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10 lg:col-span-7"
          >
            <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-sky-400/12 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl" />

            <div className="relative">
              <h3 className="text-lg font-semibold text-slate-100 sm:text-xl">
                Snapshot
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-base">
                Highlights that reflect how I learn, build, and contribute across
                AI/ML, systems thinking, and outreach.
              </p>

              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-8 space-y-4"
              >
                {highlights.map((text) => (
                  <motion.li
                    key={text}
                    variants={item}
                    className="flex gap-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.85)]"
                      aria-hidden
                    />
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-sky-400/20 bg-sky-400/[0.08] px-5 py-4 text-sm text-sky-100/95 shadow-[0_0_40px_rgba(56,189,248,0.12)]"
              >
                <span className="font-semibold tracking-wide text-sky-200">
                  ICWITE
                </span>
                <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
                <span className="text-slate-300">
                  Research publication & conference exposure
                </span>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
            <StatCard
              label="Academic excellence"
              sublabel="Consistent performance in core CS coursework."
              delay={0.08}
            >
              <p className="text-4xl font-bold text-white sm:text-5xl">
                <AnimatedStatNumber end={9.1} decimals={1} />
                <span className="text-2xl font-semibold text-sky-300/90"> CGPA</span>
              </p>
            </StatCard>

            <StatCard
              label="Community reach"
              sublabel="Hands-on AI/ML & cybersecurity learning sessions."
              delay={0.14}
              glow="indigo"
            >
              <p className="text-4xl font-bold text-white sm:text-5xl">
                <AnimatedStatNumber end={200} decimals={0} suffix="+" />
              </p>
              <p className="mt-1 text-sm font-medium text-slate-400">Students trained</p>
            </StatCard>

            <StatCard
              label="Research"
              sublabel="Peer-reviewed / conference track experience."
              delay={0.2}
            >
              <p className="text-4xl font-bold text-white sm:text-5xl">
                <AnimatedStatNumber end={1} />
              </p>
              <p className="mt-1 text-sm font-medium text-slate-400">Publication</p>
            </StatCard>

            <StatCard
              label="Technical focus"
              sublabel="Where I spend the most deliberate practice."
              delay={0.26}
              glow="indigo"
            >
              <p className="text-lg font-semibold leading-snug text-slate-100 sm:text-xl">
                DSA · Machine Learning · Computer Vision
              </p>
            </StatCard>
          </div>
        </div>
      </div>
    </section>
  )
}
