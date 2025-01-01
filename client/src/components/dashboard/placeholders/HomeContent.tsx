import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Lightbulb, Rocket, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HomeContent: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-10"
    >
      {/* Welcome Section */}
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
            Welcome to AI Novel Generator
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-xl text-slate-600 max-w-3xl leading-relaxed"
          >
            Your creative companion for crafting compelling stories. Get started with our intuitive tools and bring your ideas to life.
          </motion.p>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            icon: BookOpen,
            title: "Novel Workshop",
            description: "Create your masterpiece with our comprehensive novel writing tools.",
            color: "indigo",
            delay: 0.5
          },
          {
            icon: Lightbulb,
            title: "Creative Tools",
            description: "Access powerful AI-driven tools to enhance your writing process.",
            color: "violet",
            delay: 0.6
          },
          {
            icon: Rocket,
            title: "Get Started",
            description: "Begin your writing journey with our easy-to-follow guides.",
            color: "purple",
            delay: 0.7
          }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: feature.delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <Card className="group h-full bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className={cn(
                  "p-3 rounded-2xl w-fit transition-all duration-300 group-hover:scale-110",
                  `bg-${feature.color}-50`
                )}>
                  <feature.icon className={cn(
                    "w-6 h-6 transition-all duration-300",
                    `text-${feature.color}-600`
                  )} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
                <div className="pt-2">
                  <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 group/btn">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white p-10 shadow-lg"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">More Features Coming Soon</h2>
            <p className="text-lg text-indigo-100 max-w-2xl">
              Stay tuned for exciting new tools and capabilities that will revolutionize your writing experience.
            </p>
          </div>
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1.1, 1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-12 h-12 text-indigo-100" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 