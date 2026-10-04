export type ProjectCategory = 
  | 'All' 
  | 'Business Systems' 
  | 'Web Apps' 
  | 'Real-Time & Backend';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  num: string;
  chapter: string;
  title: string;
  category: string;
  filterCategory: ProjectCategory;
  tagline: string;
  clientType: string;
  year: string;
  businessProblem: string;
  solution: string;
  majorFeatures: string[];
  architectureHighlights: string[];
  techStack: string[];
  myRole: string;
  keyContribution: string;
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  galleryImages?: {
    url: string;
    title: string;
    caption: string;
  }[];
  visualPreview: {
    gradient: string;
    iconName: string;
    badgeText: string;
    uiMockupType: 'pos' | 'erp' | 'grocery' | 'chat' | 'ems' | 'advisory';
  };
}

export interface ServiceItem {
  number: string;
  title: string;
  shortDesc: string;
  typicalProblem: string;
  whatIDeliver: string[];
  technologies: string[];
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration?: string;
  outcome?: string;
  iconName?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  technologies: string[];
  highlights: string[];
}
