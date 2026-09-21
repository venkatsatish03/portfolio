export const navLinks = [
  { label: 'Work', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Capabilities', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
] as const

export type NavLinkId = (typeof navLinks)[number]['id']
