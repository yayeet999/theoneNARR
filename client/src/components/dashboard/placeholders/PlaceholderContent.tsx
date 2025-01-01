import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Rocket, ArrowRight, Lightbulb, Star } from 'lucide-react';

interface PlaceholderContentProps {
  title: string;
}

export const PlaceholderContent: React.FC<PlaceholderContentProps> = ({ title }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-10"
    >
      {/* Header */}
      <div className="relative">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-violet-100/30 to-purple-100/30 rounded-3xl blur-xl"
        />
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative px-8 py-10 space-y-4"
        >
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-xl text-slate-600 max-w-3xl leading-relaxed"
          >
            This feature is currently in development. We're working hard to bring you powerful tools for your writing journey.
          </motion.p>
        </motion.div>
      </div>

      {/* Coming Soon Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-sm overflow-hidden">
          <CardContent className="p-10">
            <div className="flex items-start gap-12">
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-purple-500/10 shadow-sm">
                      <Clock className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900">Coming Soon</h3>
                  </div>
                  <p className="text-lg text-slate-600">
                    We're crafting something special for you. This feature will help you:
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      icon: Star,
                      text: "Enhance your writing process",
                      color: "indigo",
                      delay: 0.6
                    },
                    {
                      icon: Lightbulb,
                      text: "Access powerful AI-driven tools",
                      color: "violet",
                      delay: 0.7
                    },
                    {
                      icon: Sparkles,
                      text: "Create compelling content effortlessly",
                      color: "purple",
                      delay: 0.8
                    },
                    {
                      icon: ArrowRight,
                      text: "Streamline your creative workflow",
                      color: "indigo",
                      delay: 0.9
                    }
                  ].map((item) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.delay, duration: 0.4 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className={`p-2 rounded-xl bg-${item.color}-50 transition-all duration-300 group-hover:scale-110`}>
                        <item.icon className={`w-5 h-5 text-${item.color}-500`} />
                      </div>
                      <span className="text-slate-700">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-purple-500/10 rounded-2xl blur-sm" />
                <motion.div 
                  className="relative p-8"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Rocket className="w-32 h-32 text-indigo-600" />
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white p-8 shadow-lg"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="p-2 rounded-xl bg-white/10"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <p className="text-lg text-white font-medium">
              We're making progress! Check back soon for updates.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 