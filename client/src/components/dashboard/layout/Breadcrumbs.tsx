import React from 'react';
import { useLocation } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigationStore } from '@/stores/navigationStore';

export const Breadcrumbs: React.FC = () => {
  const [, navigate] = useLocation();
  const { breadcrumbs } = useNavigationStore();

  return (
    <motion.nav 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center space-x-2 text-sm bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200/50 shadow-sm"
    >
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </motion.div>
          )}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: index * 0.1, 
              duration: 0.4,
              ease: [0.23, 1, 0.32, 1]
            }}
            onClick={() => navigate(item.path)}
            className={cn(
              "px-3 py-1.5 rounded-xl transition-all duration-300",
              index === breadcrumbs.length - 1
                ? "bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 text-indigo-600 font-medium shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            )}
          >
            <span className="relative">
              {item.label}
              {index === breadcrumbs.length - 1 && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500/50 to-violet-500/50"
                  initial={false}
                />
              )}
            </span>
          </motion.button>
        </React.Fragment>
      ))}
    </motion.nav>
  );
}; 