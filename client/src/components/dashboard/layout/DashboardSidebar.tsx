import React from 'react';
import { useLocation } from 'wouter';
import { Home, Pen, Book, BookOpen, Users, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  to: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  delay?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon: Icon, children, delay = 0 }) => {
  const [location, navigate] = useLocation();
  const isActive = location === to;

  return (
    <motion.button
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => navigate(to)}
      className={cn(
        "w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300",
        isActive 
          ? "bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 text-indigo-600 shadow-sm" 
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-xl transition-all duration-300",
          isActive 
            ? "bg-white shadow-sm" 
            : "bg-transparent group-hover:bg-white/50"
        )}>
          <Icon className={cn(
            "w-[18px] h-[18px] transition-all duration-300",
            isActive ? "scale-110 text-indigo-600" : "text-slate-600"
          )} />
        </div>
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {children}
        </span>
      </div>
      <ChevronRight className={cn(
        "w-4 h-4 transition-all duration-300",
        isActive 
          ? "text-indigo-600 translate-x-0 opacity-100" 
          : "text-slate-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
      )} />
    </motion.button>
  );
};

export const DashboardSidebar: React.FC = () => {
  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="w-72 bg-white/80 border-r border-slate-200/50 shadow-sm backdrop-blur-xl h-[calc(100vh-4rem)] sticky top-16"
    >
      <nav className="p-4 space-y-8">
        <div className="px-4 py-2">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-xs font-medium text-slate-400 uppercase tracking-wider"
          >
            Navigation
          </motion.div>
        </div>

        <div className="space-y-2">
          <SidebarItem to="/" icon={Home} delay={0.2}>
            Home
          </SidebarItem>
        </div>
        
        <div className="space-y-4">
          <div className="px-4 py-2">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-xs font-medium text-slate-400 uppercase tracking-wider"
            >
              Author Tools
            </motion.div>
          </div>
          <div className="space-y-2">
            <SidebarItem to="/blog-writer" icon={Pen} delay={0.4}>
              Blog Writer
            </SidebarItem>
            <SidebarItem to="/story-writer" icon={Book} delay={0.5}>
              Story Writer
            </SidebarItem>
            <SidebarItem to="/novel-workshop" icon={BookOpen} delay={0.6}>
              Novel Workshop
            </SidebarItem>
            <SidebarItem to="/interactive-workshop" icon={Users} delay={0.7}>
              Interactive Workshop
            </SidebarItem>
          </div>
        </div>

        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 border border-indigo-100/50"
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-indigo-600">Need Help?</span>
              <p className="text-xs text-slate-600">
                Check out our guides and documentation to get started.
              </p>
            </div>
          </motion.div>
        </div>
      </nav>
    </motion.aside>
  );
}; 