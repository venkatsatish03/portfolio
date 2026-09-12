export const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
] as const

export type NavLinkId = (typeof navLinks)[number]['id']
