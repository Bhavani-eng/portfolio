import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import profileImage from "./assets/profile.jpeg";
import AboutSection from './AboutSection'
import Navbar from './Navbar'
import AchievementsSection from './AchievementsSection'
import CertificatesSection from './CertificatesSection'
import ContactSection from './ContactSection'
import ResumeSection from './ResumeSection'
import ProjectsSection from './ProjectsSection'
import SkillsSection from './SkillsSection'
import PageAmbient from './ui/PageAmbient'
import { PROFILE } from './constants/profile'
import ResumeLink from './ui/ResumeLink'
import { buttonHover, buttonTap, EASE_OUT } from './ui/motion'

const heroLinks = [
  { label: 'Contact Me', href: '#contact', style: 'secondary', external: false },
  { label: 'GitHub', href: PROFILE.github, style: 'ghost', external: true },
  { label: 'LinkedIn', href: PROFILE.linkedin, style: 'ghost', external: true },
]

const btnClass = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
}

function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      className="relative min-h-svh"
    >
      <PageAmbient />
      <Navbar />

      <main className="relative isolate overflow-x-hidden">
        <section
          id="home"
          className="section-inner grid min-h-[calc(100svh-4.25rem)] scroll-mt-[5.75rem] items-center gap-10 px-5 pb-16 pt-8 sm:gap-12 sm:px-6 sm:pb-20 sm:pt-10 md:grid-cols-2 lg:gap-14 lg:px-10 lg:pt-12"
          aria-label="Introduction"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE_OUT }}
            className="glass-panel-lg glass-card-interactive p-7 sm:p-9"
          >
            <p className="eyebrow">AI Engineer Portfolio</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              {PROFILE.name}
            </h1>
            <p className="mt-4 text-base font-medium leading-snug text-slate-300 sm:text-lg">
              {PROFILE.title}
            </p>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base">
              Computer Science undergraduate with strong foundations in Data
              Structures, Machine Learning, Computer Vision, and Problem Solving.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-3">
              <ResumeLink
                asMotion
                variant="view"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: EASE_OUT }}
                whileHover={buttonHover}
                whileTap={buttonTap}
                className={`${btnClass.primary} text-center`}
                aria-label="View resume PDF in a new tab"
              >
                View Resume
              </ResumeLink>
              {heroLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.27 + index * 0.07, duration: 0.4, ease: EASE_OUT }}
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className={`${btnClass[link.style]} text-center`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.12 }}
            className="flex justify-center md:justify-end"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-sky-400/30 blur-2xl" />
              <div className="relative rounded-full border border-sky-300/70 bg-navy-900/80 p-2 shadow-[0_0_40px_rgba(56,189,248,0.38)]">
                <img
                  src={profileImage}
                  alt="Portrait of Bhavani P"
                  className="h-56 w-56 rounded-full object-cover sm:h-64 sm:w-64 lg:h-72 lg:w-72"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <CertificatesSection />
        <ResumeSection />
        <ContactSection />
      </main>
    </motion.div>
  )
}

export default App
