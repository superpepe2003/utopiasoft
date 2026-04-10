export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  images: string[];
  url?: string;
  category: ProjectCategory;
}

export type ProjectCategory = 'all' | 'frontend' | 'backend' | 'fullstack' | 'municipal';
