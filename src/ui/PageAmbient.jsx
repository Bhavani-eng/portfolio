import { motion } from 'framer-motion'

/** Subtle global background orbs — kept low-key to avoid clutter */
export default function PageAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-48 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-sky-500/[0.14] blur-[100px]"
        animate={{
          x: [0, 40, -24, 0],
          y: [0, -16, 12, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-[38%] -right-32 h-80 w-80 rounded-full bg-indigo-500/[0.12] blur-[90px]"
        animate={{
          x: [0, -24, 16, 0],
          y: [0, 20, -16, 0],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-[12%] left-[8%] h-64 w-64 rounded-full bg-sky-600/[0.08] blur-[80px]"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
      <div className="ambient-grid absolute inset-0 opacity-[0.35]" />
    </div>
  )
}
