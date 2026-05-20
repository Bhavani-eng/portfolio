import { motion } from 'framer-motion'
import { EASE_OUT } from './motion'

export default function SectionHeader({ eyebrow, title, subtitle, headingId }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      className="section-header"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId} className="section-title">
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.header>
  )
}
