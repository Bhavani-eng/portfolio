import { motion } from 'framer-motion'
import { RESUME_DOWNLOAD_NAME, RESUME_PATH } from '../constants/profile'

/** View resume — opens /resume.pdf in a new tab */
export const resumeViewProps = {
  href: RESUME_PATH,
  target: '_blank',
  rel: 'noopener noreferrer',
}

/** Download resume — triggers file download (same origin) */
export const resumeDownloadProps = {
  href: RESUME_PATH,
  download: RESUME_DOWNLOAD_NAME,
}

/**
 * Resume link (plain or animated).
 * @param {'view' | 'download'} variant
 */
export default function ResumeLink({
  children,
  className,
  asMotion = false,
  variant = 'view',
  whileHover,
  whileTap,
  ...rest
}) {
  const linkProps = variant === 'download' ? resumeDownloadProps : resumeViewProps
  const props = {
    ...linkProps,
    className,
    ...rest,
  }

  if (asMotion) {
    return (
      <motion.a whileHover={whileHover} whileTap={whileTap} {...props}>
        {children}
      </motion.a>
    )
  }

  return <a {...props}>{children}</a>
}
