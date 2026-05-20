import { motion } from 'framer-motion'
import { PROFILE } from './constants/profile'
import SectionHeader from './ui/SectionHeader'

const GITHUB_REPO_URL = PROFILE.github

const PROJECTS = [
  {
    id: 'cbt-yolo',
    title: 'CBT-YOLO: Vehicle Detection & Classification',
    badge: 'ICWITE Publication',
    accent: 'sky',
    techStack: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch'],
    description: [
      'Developed an advanced YOLOv8-based vehicle detection and classification system for real-time traffic analysis',
      'Improved detection accuracy using class-balancing techniques and transformer-based enhancements',
      'Processed and analyzed traffic video datasets using OpenCV and deep learning models',
      'Optimized model performance for better detection of multiple vehicle categories',
      'Research work published at ICWITE conference',
    ],
    features: [
      'Real-time object detection',
      'Vehicle classification',
      'Traffic data processing',
      'Deep learning optimization',
    ],
    github: GITHUB_REPO_URL,
    demo: null,
  },
  {
    id: 'biosense',
    title: 'BIOSENSE: AI-Based Disease Prediction Web Application',
    badge: 'Healthcare AI',
    accent: 'cyan',
    techStack: ['Python', 'Machine Learning', 'HTML', 'CSS'],
    description: [
      'Developed an AI-powered healthcare web application for predicting diseases and health risks',
      'Built machine learning models for predicting PCOS, thyroid disorders, and breast cancer risk',
      'Used structured healthcare datasets for training and prediction analysis',
      'Integrated predictive models into a user-friendly web interface',
      'Focused on early risk detection and accessible healthcare technology',
    ],
    features: [
      'Disease risk prediction',
      'Interactive web interface',
      'Machine learning models',
      'Healthcare analytics',
    ],
    github: GITHUB_REPO_URL,
    demo: null,
  },
]

const cardReveal = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const listItem = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

const accentStyles = {
  sky: {
    glow: 'group-hover:shadow-[0_0_40px_rgba(56,189,248,0.18)] group-hover:border-sky-400/30',
    badge: 'border-sky-400/25 bg-sky-400/10 text-sky-200',
    tag: 'border-sky-400/20 bg-sky-400/10 text-sky-100',
    dot: 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.75)]',
    gradient: 'from-sky-500/15 via-transparent to-transparent',
    primaryBtn:
      'border-sky-400/40 bg-sky-400/15 text-sky-100 hover:bg-sky-400/25 hover:shadow-[0_0_24px_rgba(56,189,248,0.35)]',
  },
  cyan: {
    glow: 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.18)] group-hover:border-cyan-400/30',
    badge: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200',
    tag: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100',
    dot: 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.75)]',
    gradient: 'from-cyan-500/15 via-transparent to-transparent',
    primaryBtn:
      'border-cyan-400/40 bg-cyan-400/15 text-cyan-100 hover:bg-cyan-400/25 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]',
  },
}

function GitHubIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 1.005-.315 3.3 1.005 3.3 1.005.9-.255 1.86-.39 2.82-.39.96 0 1.92.135 2.82.39 0 0 2.295-1.32 3.3-1.005.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

function ProjectCard({ project, index }) {
  const styles = accentStyles[project.accent]

  return (
    <motion.article
      variants={cardReveal}
      className={`glass-panel-lg glass-card-interactive group relative overflow-hidden ${styles.glow}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 ${styles.gradient}`}
      />
      <div className="pointer-events-none absolute -right-24 top-0 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative p-7 sm:p-9 lg:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-3">
            <span
              className={`mt-2 h-2 w-2 shrink-0 rounded-full ${styles.dot}`}
              aria-hidden
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Project {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
                {project.title}
              </h3>
            </div>
          </div>
          <span
            className={`inline-flex w-fit shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${styles.badge}`}
          >
            {project.badge}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`rounded-lg border px-3 py-1 text-xs font-medium ${styles.tag}`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Overview
            </h4>
            <motion.ul
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-4 space-y-3"
            >
              {project.description.map((line) => (
                <motion.li
                  key={line}
                  variants={listItem}
                  className="flex gap-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                  {line}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Key features
            </h4>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-slate-300 transition-colors duration-300 group-hover:border-white/15 group-hover:text-slate-100"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-8">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`btn-primary ${styles.primaryBtn}`}
          >
            <GitHubIcon />
            GitHub Repository
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"
              aria-label="Live demo — link placeholder"
            >
              <ExternalIcon />
              Live Demo
              <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Soon
              </span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section-shell"
      aria-labelledby="projects-section-heading"
    >
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 translate-x-1/4 rounded-full bg-sky-500/8 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-32 left-0 h-64 w-64 -translate-x-1/4 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="section-inner">
        <SectionHeader
          eyebrow="Selected work"
          title="Projects"
          headingId="projects-section-heading"
          subtitle="Research-driven computer vision and applied machine learning — built with production-minded tooling and clear impact narratives for technical review."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.06 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.18, delayChildren: 0.12 },
            },
          }}
          className="mt-12 flex flex-col gap-10 lg:mt-14 lg:gap-12"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
