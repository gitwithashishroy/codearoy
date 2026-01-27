import type React from 'react';
import {
  Hero,
  Skills,
  Experience,
  Stats,
  Work,
  Contact,
  CodingProfile,
} from '@/features/homepage/sections';

export type SectionConfig = {
  id: string;
  label?: string;
  component: React.ComponentType<any>;
  enabled?: boolean;
};

export const SECTIONS: SectionConfig[] = [
  { id: 'home', label: 'Home', component: Hero, enabled: true },
  { id: 'github', label: 'GitHub', component: CodingProfile, enabled: true },
  { id: 'skills', label: 'Skills', component: Skills, enabled: true },
  { id: 'experience', label: 'Experience', component: Experience, enabled: true },
  { id: 'work', label: 'Work', component: Work, enabled: false },
  { id: 'contact', label: 'Contact', component: Contact, enabled: true },
];

export default SECTIONS;
