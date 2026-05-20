export const PROFILE = {
  name: 'Bhavani P',
  title: 'Computer Science Engineering Student | AI & ML Enthusiast',
  email: 'bhavani_23cseu019@uvce.ac.in',
  phone: '+91 7899747533',
  phoneTel: '+917899747533',
  github: 'https://github.com/Bhavani-eng',
  linkedin: 'https://www.linkedin.com/in/bhavani-ashrit-6b22432b2',
}

/** Absolute path from site root; respects Vite base URL on GitHub Pages / subpath deploys */
const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`

export const RESUME_PATH = `${base}resume.pdf`
export const RESUME_DOWNLOAD_NAME = 'Bhavani-P-Resume.pdf'

export const GITHUB_DISPLAY = 'github.com/Bhavani-eng'
export const LINKEDIN_DISPLAY = 'linkedin.com/in/bhavani-ashrit-6b22432b2'

export function assetPath(relativePath) {
  const normalized = relativePath.replace(/^\//, '')
  return `${base}${normalized}`
}

export const CERTIFICATES = [
  { id: 'cert-1', title: 'Certification 1', href: assetPath('certificates/cert1.jpeg'), kind: 'image' },
  { id: 'cert-2', title: 'Certification 2', href: assetPath('certificates/cert2.jpeg'), kind: 'image' },
  { id: 'cert-3', title: 'Certification 3', href: assetPath('certificates/cert3.jpeg'), kind: 'image' },
  { id: 'cert-4', title: 'Certification 4', href: assetPath('certificates/cert4.jpeg'), kind: 'image' },
  { id: 'cert-5', title: 'Certification 5', href: assetPath('certificates/cert5.jpeg'), kind: 'image' },
  { id: 'cert-6', title: 'Certification 6', href: assetPath('certificates/cert6.jpeg'), kind: 'image' },
]

export const SEMESTER_RESULTS = {
  id: 'semester-results',
  title: 'Semester Results',
  href: assetPath('results/result.pdf'),
  kind: 'pdf',
}
