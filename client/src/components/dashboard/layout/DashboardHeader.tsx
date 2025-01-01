import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bell } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="h-16 bg-white/80 border-b border-slate-200/50 shadow-sm backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="h-full px-8 flex items-center justify-between max-w-7xl mx-auto">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-purple-500/10 shadow-sm">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            AI Novel Generator
          </h1>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative p-2 rounded-xl bg-gradient-to-br from-slate-100 via-white to-slate-50 shadow-sm border border-slate-200/50 hover:shadow-md hover:border-slate-300/50 transition-all duration-300"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500" />
          </motion.button>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 via-violet-100 to-purple-100 p-0.5">
              <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center text-lg font-medium text-indigo-600">
                A
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}; 