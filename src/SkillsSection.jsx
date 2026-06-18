import { motion } from 'framer-motion'
import SectionHeader from './ui/SectionHeader'

const SKILL_CATEGORIES = [
  {
    id: 'languages',
    title: 'Languages',
    accent: 'sky',
    skills: ['C', 'C++', 'Python', 'Java', 'HTML', 'CSS'],
  },
  {
    id: 'tools',
    title: 'Tools',
    accent: 'indigo',
    skills: ['Git', 'GitHub', 'VS Code'],
  },
  {
    id: 'core',
    title: 'Core Skills',
    accent: 'sky',
    skills: [
      'Data Structures & Algorithms',
      'Problem Solving',
      'Debugging',
      'Technical Documentation',
      'Mentoring',
    ],
  },
  {
    id: 'aiml',
    title: 'AI / ML',
    accent: 'cyan',
    skills: [
      'Machine Learning',
      'Computer Vision',
      'YOLO',
      'OpenCV',
    ],
  },
  {
    id: 'genai',
    title: 'Generative AI / AI',
    accent: 'cyan',
    skills: [
      'Retrieval-Augmented Generation (RAG)',
      'LangChain',
      'ChromaDB',
      'Vector Embeddings',
      'Large Language Models (LLMs)',
    ],
  },
]

const categoryReveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
}

const skillCard = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

const accentGlow = {
  sky: 'from-sky-400/20 via-sky-500/5 to-transparent group-hover:shadow-[0_0_28px_rgba(56,189,248,0.22)]',
  indigo:
    'from-indigo-400/20 via-indigo-500/5 to-transparent group-hover:shadow-[0_0_28px_rgba(99,102,241,0.22)]',
  cyan: 'from-cyan-400/20 via-cyan-500/5 to-transparent group-hover:shadow-[0_0_28px_rgba(34,211,238,0.22)]',
}

const accentDot = {
  sky: 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]',
  indigo: 'bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]',
  cyan: 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]',
}

const accentBorder = {
  sky: 'group-hover:border-sky-400/35',
  indigo: 'group-hover:border-indigo-400/35',
  cyan: 'group-hover:border-cyan-400/35',
}

function SkillChip({ name, accent }) {
  return (
    <motion.li variants={skillCard}>
      <motion.div
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
        className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${accentBorder[accent]}`}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accentGlow[accent]}`}
        />
        <span className="relative text-sm font-medium tracking-wide text-slate-200 transition-colors duration-300 group-hover:text-white">
          {name}
        </span>
      </motion.div>
    </motion.li>
  )
}

function CategoryBlock({ category }) {
  const { title, skills, accent, id } = category

  return (
    <motion.article
      variants={categoryReveal}
      className="glass-panel-lg relative overflow-hidden p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${accentDot[accent]}`}
            aria-hidden
          />
          <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {title}
          </h3>
          <span className="ml-auto hidden text-xs font-medium tabular-nums text-slate-500 sm:inline">
            {String(skills.length).padStart(2, '0')} skills
          </span>
        </div>
        <div
          className="mt-4 h-px w-full bg-gradient-to-r from-sky-400/40 via-white/10 to-transparent"
          aria-hidden
        />

        <motion.ul
          variants={cardsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className={`mt-6 grid gap-3 ${
            id === 'core' || id === 'languages'
              ? 'sm:grid-cols-2'
              : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {skills.map((skill) => (
            <SkillChip key={skill} name={skill} accent={accent} />
          ))}
        </motion.ul>
      </div>
    </motion.article>
  )
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="section-shell"
      aria-labelledby="skills-section-heading"
    >
      <div className="pointer-events-none absolute left-0 top-24 h-72 w-72 -translate-x-1/3 rounded-full bg-sky-500/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[90px]" />

      <div className="section-inner">
        <SectionHeader
          eyebrow="Expertise"
          title="Skills"
          headingId="skills-section-heading"
          subtitle="A structured view of languages, tooling, fundamentals, and AI/ML capabilities — built for clarity in technical interviews and recruiter reviews."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
          className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-2"
        >
          {SKILL_CATEGORIES.map((category) => (
            <CategoryBlock key={category.id} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
