import { create } from 'zustand';
import type { DashboardRoute, BreadcrumbItem } from '../types/navigation';

interface NavigationStore {
  currentRoute: DashboardRoute;
  breadcrumbs: BreadcrumbItem[];
  
  navigateTo: (route: DashboardRoute) => void;
  updateBreadcrumbs: (items: BreadcrumbItem[]) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentRoute: 'home',
  breadcrumbs: [],
  
  navigateTo: (route) => {
    set({ currentRoute: route });
  },
  
  updateBreadcrumbs: (items) => {
    set({ breadcrumbs: items });
  }
})); 