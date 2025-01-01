export type DashboardRoute = 
  | 'home'
  | 'blog-writer'
  | 'story-writer'
  | 'novel-workshop'
  | 'interactive-workshop'
  | 'novel-generation'
  | 'novel-workflow';

export interface BreadcrumbItem {
  label: string;
  route: DashboardRoute;
  path: string;
} 