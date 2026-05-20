import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PROFILE } from './constants/profile'
import { EASE_OUT } from './ui/motion'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export const HEADER_OFFSET = 92

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const ratios = new Map(ids.map((id) => [id, 0]))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        let best = ids[0]
        let bestScore = -1
        for (const id of ids) {
          const el = document.getElementById(id)
          if (!el) continue
          const ratio = ratios.get(id) ?? 0
          const rect = el.getBoundingClientRect()
          const visible =
            ratio > 0 ||
            (rect.top < window.innerHeight * 0.55 && rect.bottom > HEADER_OFFSET)
          if (!visible) continue
          const score = ratio + (rect.top <= HEADER_OFFSET + 120 ? 0.15 : 0)
          if (score > bestScore) {
            bestScore = score
            best = id
          }
        }
        setActiveId((prev) => (prev === best ? prev : best))
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -50% 0px`,
        threshold: [0, 0.08, 0.15, 0.3, 0.5],
      },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return activeId
}

function useNavbarScrolled() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrolled
}

function NavLink({ id, label, isActive, onNavigate, layoutId }) {
  return (
    <motion.a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault()
        onNavigate(id)
      }}
      className={`group relative whitespace-nowrap rounded-lg px-2 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
        isActive ? 'text-sky-100' : 'text-slate-400 hover:text-sky-100'
      }`}
      whileHover={{ y: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <span
        className={`relative z-10 transition-[text-shadow] duration-300 ${
          isActive
            ? '[text-shadow:0_0_20px_rgba(56,189,248,0.4)]'
            : 'group-hover:[text-shadow:0_0_14px_rgba(56,189,248,0.35)]'
        }`}
      >
        {label}
      </span>
      {isActive && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-x-1 -bottom-0.5 z-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_14px_rgba(56,189,248,0.7)]"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
    </motion.a>
  )
}

export default function Navbar() {
  const ids = useMemo(() => NAV_ITEMS.map((i) => i.id), [])
  const activeId = useActiveSection(ids)
  const scrolled = useNavbarScrolled()
  const [mobileOpen, setMobileOpen] = useState(false)
  const firstFocusRef = useRef(null)

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const handleNavigate = useCallback(
    (id) => {
      scrollToId(id)
      closeMobile()
    },
    [closeMobile],
  )

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => firstFocusRef.current?.focus())
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeMobile()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen, closeMobile])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className={`sticky top-0 z-50 border-b backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? 'border-white/10 bg-navy-950/80 shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
            : 'border-white/[0.06] bg-navy-950/50 shadow-[0_4px_24px_rgba(0,0,0,0.2)]'
        }`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-3 px-5 sm:gap-4 sm:px-6 lg:px-10">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavigate('home')
            }}
            className={`select-none text-lg font-semibold tracking-tight transition-[color,text-shadow] duration-300 ${
              activeId === 'home'
                ? 'text-sky-100 [text-shadow:0_0_18px_rgba(56,189,248,0.35)]'
                : 'text-white hover:text-sky-100 hover:[text-shadow:0_0_18px_rgba(56,189,248,0.3)]'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {PROFILE.name}
          </motion.a>

          <nav
            className="hidden max-w-[52rem] flex-1 items-center justify-end gap-0.5 overflow-x-auto px-2 lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                id={item.id}
                label={item.label}
                isActive={activeId === item.id}
                onNavigate={handleNavigate}
                layoutId="nav-underline"
              />
            ))}
          </nav>

          <motion.button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-slate-200 transition-colors hover:border-sky-400/35 hover:text-sky-100 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <motion.span
                className="h-0.5 rounded-full bg-current"
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 8, width: '100%' }
                    : { rotate: 0, y: 0, width: '100%' }
                }
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="h-0.5 rounded-full bg-current"
                animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="h-0.5 rounded-full bg-current"
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -8, width: '100%' }
                    : { rotate: 0, y: 0, width: '100%' }
                }
                transition={{ duration: 0.25 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              key="mobile-nav-backdrop"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-navy-950/75 backdrop-blur-sm lg:hidden"
              aria-hidden
              onClick={closeMobile}
            />
            <motion.nav
              key="mobile-nav-panel"
              id="mobile-nav"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="fixed inset-x-4 top-[4.75rem] z-50 max-h-[min(78vh,calc(100dvh-5.25rem))] overflow-y-auto overscroll-contain rounded-2xl border border-white/12 bg-navy-900/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:inset-x-6 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-0.5">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeId === item.id
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 + index * 0.03, duration: 0.28 }}
                    >
                      <a
                        ref={index === 0 ? firstFocusRef : undefined}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigate(item.id)
                        }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-sky-400/15 text-sky-100 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.22)]'
                            : 'text-slate-300 hover:bg-white/5 hover:text-sky-100'
                        }`}
                      >
                        {item.label}
                        {isActive && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
                        )}
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
