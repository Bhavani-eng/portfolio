import { motion } from 'framer-motion'
import { RESUME_DOWNLOAD_NAME, RESUME_PATH } from './constants/profile'
import SectionHeader from './ui/SectionHeader'
import ResumeLink from './ui/ResumeLink'
import { buttonHover, buttonTap } from './ui/motion'

const panelReveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
  },
}

function DownloadIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  )
}

export default function ResumeSection() {
  return (
    <section
      id="resume"
      className="section-shell"
      aria-labelledby="resume-section-heading"
    >
      <div className="pointer-events-none absolute right-0 top-16 h-80 w-80 translate-x-1/4 rounded-full bg-sky-500/8 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-24 left-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="section-inner">
        <SectionHeader
          eyebrow="Curriculum Vitae"
          title="Resume"
          headingId="resume-section-heading"
          subtitle="Preview my latest résumé below or download a copy for offline review — formatted for recruiters and technical hiring panels."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={panelReveal}
          className="mt-12 lg:mt-14"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <ResumeLink
                asMotion
                variant="download"
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="btn-primary"
                aria-label="Download resume PDF"
              >
                <DownloadIcon />
                Download Resume
              </ResumeLink>
              <ResumeLink
                asMotion
                variant="view"
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="btn-secondary"
                aria-label="View resume PDF in a new tab"
              >
                <ExternalIcon />
                View Resume
              </ResumeLink>
              <motion.a
                href="#contact"
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="btn-ghost"
              >
                <MailIcon />
                Contact Me
              </motion.a>
            </div>
          </div>

          <motion.div
            whileHover={{ boxShadow: '0 0 48px rgba(56, 189, 248, 0.12)' }}
            transition={{ duration: 0.4 }}
            className="glass-panel-lg glass-card-interactive group overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-navy-900/50 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400/80 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  PDF Preview
                </span>
              </div>
              <ResumeLink
                variant="view"
                className="truncate text-xs font-medium text-sky-300/90 transition-colors hover:text-sky-100"
              >
                {RESUME_DOWNLOAD_NAME}
              </ResumeLink>
            </div>

            <div className="relative bg-navy-950/80">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-500/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <iframe
                title="Bhavani P — Resume PDF"
                src={`${RESUME_PATH}#toolbar=1&navpanes=0`}
                className="h-[min(75dvh,720px)] w-full min-h-[420px] border-0 sm:min-h-[520px]"
              />
            </div>
          </motion.div>

          <p className="mt-5 text-center text-xs text-slate-500">
            Tip: On mobile, use{' '}
            <ResumeLink
              variant="view"
              className="font-medium text-slate-400 underline-offset-2 hover:text-sky-200 hover:underline"
            >
              View Resume
            </ResumeLink>{' '}
            if the inline viewer is limited.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
