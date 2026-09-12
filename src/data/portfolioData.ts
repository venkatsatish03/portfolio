export interface PersonalInfo {
  readonly fullName: string
  readonly role: string
  readonly tagline: string
  readonly email: string
  readonly phone: string
  readonly linkedIn: string
  readonly github: string
  readonly resume: string
}

export interface EducationInfo {
  readonly university: string
  readonly degree: string
  readonly specialization: string
  readonly gpa: string
  readonly duration: string
}

export interface ExperienceItem {
  readonly organization: string
  readonly role: string
  readonly duration: string
  readonly type: string
  readonly points: readonly string[]
}

export interface ProjectItem {
  readonly title: string
  readonly subtitle: string
  readonly tags: readonly string[]
  readonly description: string
  readonly badge?: string
}

export interface SkillCategory {
  readonly category: string
  readonly items: readonly string[]
}

export interface CertificationItem {
  readonly id: string
  readonly name: string
  readonly date: string
  readonly label: string
}

export interface AchievementItem {
  readonly id: string
  readonly text: string
}

export interface CompetitiveProgrammingInfo {
  readonly totalProblems: string
  readonly leetCodeRating: string
  readonly codeChef: string
  readonly codeforces: string
  readonly contests: string
}

export interface AboutHighlight {
  readonly id: string
  readonly icon: string
  readonly text: string
}

export interface AboutSectionContent {
  readonly sectionId: string
  readonly heading: string
  readonly bio: string
  readonly highlightsLabel: string
  readonly highlights: readonly AboutHighlight[]
}

export interface PortfolioData {
  readonly personal: PersonalInfo
  readonly education: EducationInfo
  readonly experiences: readonly ExperienceItem[]
  readonly projects: readonly ProjectItem[]
  readonly skills: readonly SkillCategory[]
  readonly certifications: readonly CertificationItem[]
  readonly achievements: readonly AchievementItem[]
  readonly competitiveProgramming: CompetitiveProgrammingInfo
  readonly targetRoles: readonly string[]
  readonly aboutSection: AboutSectionContent
}

export const personal: PersonalInfo = {
  fullName: 'M. Venkat Satish',
  role: 'Software Engineer · Cybersecurity & Blockchain',
  tagline:
    'Building trustworthy, production-oriented systems across cybersecurity, blockchain, and applied ML.',
  email: '2320090082csit@gmail.com',
  phone: '+91-8790402776',
  linkedIn: 'https://www.linkedin.com/in/medarametla-venkat-satish-005993314/',
  github: 'https://github.com/venkatsatish03',
  resume: '/resume/Venkat_Satish_Resume.pdf',
}

export const education: EducationInfo = {
  university: 'KL University (Deemed), Hyderabad',
  degree: 'B.Tech in Computer Science & Information Technology',
  specialization: 'Cybersecurity & Blockchain',
  gpa: '8.73 / 10',
  duration: 'May 2023 – July 2027',
}

export const experiences: readonly ExperienceItem[] = [
  {
    organization: 'TSAROLABS Pvt. Ltd.',
    role: 'AI & Cybersecurity Intern',
    duration: 'June 2026 – July 2026',
    type: 'On-site, Hyderabad',
    points: [
      'Built a full-stack License Plate Recognition system integrating YOLOv8, EasyOCR, and Real-ESRGAN with a React.js frontend for live monitoring',
      'Designed end-to-end detection pipeline architecture coordinating model integration with frontend components',
      'Contributed to an OSINT web scraping platform using FastAPI, Playwright, and PostgreSQL',
    ],
  },
  {
    organization: 'Oasis Infobyte',
    role: 'Web Development Intern',
    duration: 'Aug 2025 – Sep 2025',
    type: 'Remote',
    points: [
      'Delivered 4 responsive React.js web applications with component-based architecture and state management',
      'Reduced rendering bottlenecks through code refactoring',
    ],
  },
  {
    organization: 'Algorand Blockchain Club',
    role: 'Chair',
    duration: 'Feb 2025 – Present',
    type: 'Student Leadership, KL University',
    points: [
      'Directed a 70-member developer community overseeing 3 blockchain project teams',
      'Organized 20+ national-level technical events reaching 1,500+ student participants',
      'Received Leadership Excellence Award from Algorand Foundation and Student Activity Center',
    ],
  },
]

export const projects: readonly ProjectItem[] = [
  {
    title: 'OjasRaksha',
    subtitle: 'Decentralized Healthcare Platform',
    tags: ['Blockchain', 'Solidity', 'React.js', 'Python'],
    badge: 'Provisional Patent · Co-Inventor',
    description:
      'Patient-controlled medical records platform with consent-based access control, role-based dashboards for 5 stakeholder types, and immutable audit logs tracking 100% of data access events. Enforced data privacy through off-chain encrypted storage aligned with GDPR principles.',
  },
  {
    title: 'CollabChain',
    subtitle: 'Credential Verification Platform',
    tags: ['Algorand', 'Smart Contracts', 'React.js', 'Node.js'],
    badge: 'Algorand Hackathon Semifinalist',
    description:
      'Blockchain application for tamper-proof digital credential issuance with real-time on-chain verification for 3 institution types.',
  },
  {
    title: 'License Plate Recognition (LPR)',
    subtitle: 'Computer Vision Pipeline',
    tags: ['YOLOv8', 'EasyOCR', 'Real-ESRGAN', 'FastAPI', 'React.js'],
    badge: 'Production Internship Project',
    description:
      'Full-stack LPR system with custom-trained YOLOv8 model (mAP50: 0.936), image super-resolution quality gating, FastAPI backend, and Next.js frontend for live monitoring.',
  },
  {
    title: 'StockWise',
    subtitle: 'AI-Based Stock Trend Analysis Platform',
    tags: ['Python', 'React.js', 'Scikit-learn', 'NLP'],
    description:
      'ML stock prediction platform with NLP-based sentiment analysis of financial news. Model achieved 70–80% directional accuracy across test datasets.',
  },
  {
    title: 'Forensic Shield v0.4',
    subtitle: 'USB Security & Data Integrity Monitor',
    tags: ['Python', 'Flask', 'SHA-256'],
    description:
      'USB threat-detection utility performing SHA-256 hash verification on all files upon device connection, with a Flask real-time monitoring dashboard.',
  },
  {
    title: 'Restaurant Table Reservation System',
    subtitle: 'Full-Stack Booking Platform',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Spring Boot'],
    description:
      'Full-stack booking platform with RESTful APIs for scheduling, availability checks, and session handling with PostgreSQL index tuning.',
  },
]

export const skills: readonly SkillCategory[] = [
  {
    category: 'Languages',
    items: [
      'Python',
      'JavaScript',
      'TypeScript',
      'C',
      'C++',
      'Java',
      'SQL',
      'Solidity',
    ],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'HTML5', 'CSS3', 'Responsive Web Design'],
  },
  {
    category: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'Spring Boot',
      'Flask',
      'FastAPI',
      'REST API Design',
    ],
  },
  {
    category: 'DevOps',
    items: ['Docker', 'GitHub Actions', 'Git', 'GitHub'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    category: 'Cloud',
    items: ['AWS', 'Azure'],
  },
  {
    category: 'Blockchain',
    items: ['Algorand', 'Smart Contracts', 'Solidity', 'Cryptography'],
  },
  {
    category: 'ML & Data',
    items: ['Scikit-learn', 'Pandas', 'NumPy', 'NLP', 'Power BI', 'Tableau'],
  },
  {
    category: 'Security',
    items: ['SHA-256', 'OWASP', 'Kali Linux'],
  },
]

export const certifications: readonly CertificationItem[] = [
  {
    id: 'aws-cloud-practitioner',
    name: 'AWS Certified Cloud Practitioner',
    date: 'Apr 2026',
    label: 'AWS Certified Cloud Practitioner — Apr 2026',
  },
  {
    id: 'azure-ai-fundamentals',
    name: 'Microsoft Azure AI Fundamentals (AI-900)',
    date: 'Mar 2026',
    label: 'Microsoft Azure AI Fundamentals (AI-900) — Mar 2026',
  },
  {
    id: 'mongodb-associate-developer-python',
    name: 'MongoDB Associate Developer (Python)',
    date: 'Dec 2025',
    label: 'MongoDB Associate Developer (Python) — Dec 2025',
  },
  {
    id: 'automation-anywhere-rpa',
    name: 'Automation Anywhere Advanced RPA Professional',
    date: 'Dec 2025',
    label: 'Automation Anywhere Advanced RPA Professional — Dec 2025',
  },
  {
    id: 'aviatrix-ace-multicloud-network-associate',
    name: 'Aviatrix ACE – Multicloud Network Associate',
    date: 'Dec 2025',
    label: 'Aviatrix ACE – Multicloud Network Associate — Dec 2025',
  },
]

export const achievements: readonly AchievementItem[] = [
  {
    id: 'sih-2025',
    text: 'SIH 2025: KL University internal round winner, nominated to represent the institution at the main SIH competition',
  },
  {
    id: 'algorand-web3-hackathon',
    text: 'Algorand Web3 Hackathon: Semifinalist',
  },
  {
    id: 'tcs-codevita-season-12',
    text: 'TCS CodeVita Season 12: Global Rank 4903 among 100,000+ participants',
  },
  {
    id: 'leadership-excellence-award',
    text: 'Leadership Excellence Award — Algorand Foundation & Student Activity Center',
  },
  {
    id: 'ojasraksha-patent',
    text: 'Provisional Patent Co-Inventor — OjasRaksha',
  },
]

export const competitiveProgramming: CompetitiveProgrammingInfo = {
  totalProblems: '500+',
  leetCodeRating: '1414',
  codeChef: '1515 (2-Star)',
  codeforces: '870',
  contests: '90+',
}

export const targetRoles: readonly string[] = [
  'Software Development Engineer (SDE)',
  'Security Engineer',
  'Blockchain Engineer',
  'ML/Applied AI Engineer',
]

export const aboutSection: AboutSectionContent = {
  sectionId: 'about',
  heading: 'About Me',
  bio: "I'm a final-year Computer Science student at KL University, building systems that make unreliable, vulnerable, or messy real-world data trustworthy and usable. From a provisionally patented blockchain healthcare platform to a production computer vision pipeline, I work across cybersecurity, blockchain, and applied ML — not as separate interests, but as tools for the same underlying problem. I don't stop at 'it works in the demo.' I care about edge cases, adversarial conditions, and systems that hold up in the real world.",
  highlightsLabel: 'Profile highlights',
  highlights: [
    {
      id: 'education',
      icon: '🎓',
      text: 'KL University — B.Tech CSE (Cybersecurity & Blockchain)',
    },
    {
      id: 'gpa',
      icon: '📊',
      text: 'GPA: 8.73 / 10',
    },
    {
      id: 'internship',
      icon: '💼',
      text: 'AI & Cybersecurity Intern — TSAROLABS Pvt. Ltd.',
    },
    {
      id: 'patent',
      icon: '🏆',
      text: 'Patent Co-Inventor — OjasRaksha',
    },
    {
      id: 'leadership',
      icon: '👥',
      text: 'Chair — Algorand Blockchain Club (70 members)',
    },
    {
      id: 'dsa',
      icon: '💻',
      text: '500+ DSA Problems | LeetCode 1414 | CodeChef 1515',
    },
    {
      id: 'codevita',
      icon: '🥇',
      text: 'TCS CodeVita Global Rank 4903',
    },
  ],
}

export const portfolioData: PortfolioData = {
  personal,
  education,
  experiences,
  projects,
  skills,
  certifications,
  achievements,
  competitiveProgramming,
  targetRoles,
  aboutSection,
}
