/** Shared motion tokens — subtle, recruiter-friendly */
export const EASE_OUT = [0.22, 1, 0.36, 1]

export const sectionReveal = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

export const contentReveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
}

export const cardHover = {
  y: -4,
  transition: { type: 'spring', stiffness: 400, damping: 26 },
}

export const buttonHover = {
  y: -2,
  scale: 1.02,
}

export const buttonTap = {
  scale: 0.98,
}
