import { type ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface WorkshopCard {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: () => void;
  isPlaceholder?: boolean;
} 