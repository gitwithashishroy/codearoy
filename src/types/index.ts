// Common types
export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
}
