import React from 'react';
import type { ReactElement } from 'react';
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs } from 'react-icons/si';

// Meta types
interface Meta {
  title: string;
  description: string;
  keywords: string[];
}

// Navigation
interface NavLink {
  label: string;
  href: string;
}

// Hero section
interface HeroAction {
  label: string;
  target: string;
}

interface Hero {
  name: string;
  badge: string;
  titleLines: string[];
  description: string;
  actions: {
    primary: HeroAction;
    secondary: HeroAction;
  };
}

// Skills
interface SkillCategory {
  category: string;
  icon: string | ReactElement;
  items: string[];
}

// Technical Summary
interface TechnicalSummary {
  languages: string;
  frontend: string;
  tooling: string;
  apiNetworking: string;
}

// Experience
interface ExperiencePoint {
  title: string;
  items: string[];
}

interface Experience {
  date: string;
  role: string;
  company: string;
  location: string;
  points: (ExperiencePoint | string)[];
}

// Stats
interface Stats {
  contributions: string;
  problemsSolved: string;
  years: string;
  coreTech: {
    label: string;
    icon: ReactElement;
  }[];
}

// Footer
interface FooterLink {
  label: string;
  href: string;
}

interface Footer {
  name: string;
  tagline: string;
  quickLinks: FooterLink[];
  social: {
    github: string;
    linkedin: string;
  };
}

// Contact
interface ContactLink {
  label: string;
  url?: string;
}

interface Contact {
  type: string;
  icon: string;
  links: ContactLink[];
}

// Root config
export interface PersonalDetails {
  meta: Meta;
  navLinks: NavLink[];
  hero: Hero;
  skills: SkillCategory[];
  technicalSummary: TechnicalSummary;
  experience: Experience[];
  stats: Stats;
  footer: Footer;
  contact: Contact[];
}

export const PERSONAL_DETAILS: PersonalDetails = {
  meta: {
    title: 'Ashish Kumar Roy - Frontend Developer',
    description:
      'Portfolio of Ashish Kumar Roy, SDE2 Frontend Developer specializing in React, Next.js, and TypeScript',
    keywords: [
      'Ashish Kumar Roy',
      'Frontend Developer',
      'React',
      'Next.js',
      'TypeScript',
      'Portfolio',
    ],
  },

  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    name: 'Ashish Kumar Roy',
    badge: 'SDE 2 - Frontend',
    titleLines: ['Building scalable', 'web experiences', 'with precision.'],
    description:
      'I specialize in React architecture, performance optimization, and robust design systems for enterprise applications.',
    actions: {
      primary: { label: 'View Projects', target: 'work' },
      secondary: { label: 'Contact Me', target: 'contact' },
    },
  },

  skills: [
    {
      category: 'Frontend',
      icon: '⚛️',
      items: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'HTML5',
        'CSS3',
        'SCSS',
        'Redux',
        'React Query',
      ],
    },
    {
      category: 'Backend',
      icon: React.createElement(SiNodedotjs, { size: 20 }),
      items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'MongoDB'],
    },
    {
      category: 'Tools & Testing',
      icon: '🛠️',
      items: ['Git', 'Docker', 'Webpack', 'Vite', 'Jest', 'React Testing Library', 'Cypress'],
    },
  ],

  technicalSummary: {
    languages: 'TypeScript, JavaScript (ES6+), HTML5, CSS3/SCSS',
    frontend: 'React.js, Next.js (App Router/SSR), Storybook, NX monorepo',
    tooling: 'Git, Webpack, Vite, Babel, Turbopack, ESLint, Prettier',
    apiNetworking: 'REST APIs, GraphQL, Caching layers (SWR, React Query), WebSockets',
  },

  experience: [
    {
      date: 'July 2023 - Present',
      role: 'SDE 2 - Frontend',
      company: 'AdmitKard',
      location: 'Noida, India',
      points: [
        {
          title: 'Course Search CoPilot Platform',
          items: [
            `Architected UI for AI-assisted course search across 500+ courses and 130+ universities with conversational inputs, analytics dashboards, and comparison features, reducing search friction by ~40–50%.`,
          ],
        },
        {
          title: 'Application Processing & Automation System',
          items: [
            `Built UI workflows for AI-driven document extraction, automated form population, expert review, and multi-university submissions, reducing manual workload by ~90% and improving turnaround time by 60–70%.`,
          ],
        },
        {
          title: 'Lead Management System (Odyssey)',
          items: [
            `Developed role-based LMS modules with configuration-driven UI and requirement tracking, improving daily lead handling efficiency by 15% and stage processing time by 30%.`,
            `Optimized data fetching via SWR-based caching, eliminating redundant API calls and improving interface responsiveness.`,
          ],
        },
        {
          title: 'Dynamic Form Builder & Versioning System',
          items: [
            `Engineered a configurable form builder with multi-column layouts, field-level configs, and centralized validation, enabling non-engineering teams to build complex forms without code changes.`,
            `Integrated MongoDB-backed schema versioning with rollout/rollback control, reducing deployment cycles by ~80–90%.`,
          ],
        },
      ],
    },
    {
      date: 'Feb 2023 - June 2023',
      role: 'SDE Intern - Frontend',
      company: 'AdmitKard (theBigLeague — Company Launch)',
      location: 'Noida, India',
      points: [
        'Led end-to-end technical setup for an internal startup: repository structure, deployment pipelines, and code standards.',
        'Built and hosted the complete frontend website from scratch on AWS (EC2/S3/Route53), handled CI/CD, environment setup, and production rollout.',
      ],
    },
    {
      date: '2017 - 2021',
      role: 'B.Tech - Electronics & Instrumentation Engineering',
      company: 'National Institute of Technology, Silchar (Assam)',
      location: '',
      points: ['CGPA: 7.73'],
    },
  ],

  stats: {
    contributions: '2.5k+',
    problemsSolved: '300+',
    years: '3 Years',
    coreTech: [
      {
        label: 'React',
        icon: React.createElement(SiReact, { size: 20 }),
      },
      {
        label: 'Next.js',
        icon: React.createElement(SiNextdotjs, { size: 20 }),
      },
      {
        label: 'TypeScript',
        icon: React.createElement(SiTypescript, { size: 20 }),
      },
      {
        label: 'Node.js',
        icon: React.createElement(SiNodedotjs, { size: 20 }),
      },
    ],
  },

  footer: {
    name: 'Ashish Kumar Roy',
    tagline: 'Frontend Engineer — React, Next.js, TypeScript',
    quickLinks: [
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    social: {
      github: 'https://github.com/gitwithashishroy',
      linkedin: 'https://linkedin.com/in/ashish-kumar-roy',
    },
  },

  contact: [
    {
      type: 'Email',
      icon: '📧',
      links: [{ label: 'ashishroy.nits@gmail.com', url: 'mailto:ashishroy.nits@gmail.com' }],
    },
    {
      type: 'Phone',
      icon: '📞',
      links: [{ label: '+91 7903200910' }],
    },
    {
      type: 'GitHub',
      icon: '🐙',
      links: [{ label: 'github.com/gitwithashishroy', url: 'https://github.com/gitwithashishroy' }],
    },
    {
      type: 'LinkedIn',
      icon: '💼',
      links: [
        {
          label: 'linkedin.com/in/ashish-kumar-roy',
          url: 'https://linkedin.com/in/ashish-kumar-roy',
        },
      ],
    },
  ],
};
