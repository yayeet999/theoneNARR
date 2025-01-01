import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { motion } from 'framer-motion';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-violet-100/20 pointer-events-none" />
      <div className="relative">
        <DashboardHeader />
        <div className="flex">
          <DashboardSidebar />
          <motion.main 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1 px-8 py-6"
          >
            <div className="max-w-7xl mx-auto space-y-8">
              <Breadcrumbs />
              <div className="relative">
                {children}
              </div>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}; 