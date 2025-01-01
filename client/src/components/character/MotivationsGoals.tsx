import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Trophy,
  Crown,
  BookOpen,
  Scale,
  Heart,
  Shield,
  Zap,
  Plus,
  X
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface Goal {
  id: string;
  type: 'primary' | 'secondary';
  description: string;
}

interface MotivationsGoalsProps {
  primaryMotivations: string[];
  onPrimaryMotivationChange: (motivation: string) => void;
  goals: Goal[];
  onGoalAdd: (goal: Goal) => void;
  onGoalUpdate: (id: string, goal: Partial<Goal>) => void;
  onGoalRemove: (id: string) => void;
}

const MOTIVATION_OPTIONS = [
  { id: 'survival', label: 'Survival', icon: Shield, color: 'amber' },
  { id: 'achievement', label: 'Achievement', icon: Trophy, color: 'emerald' },
  { id: 'recognition', label: 'Recognition', icon: Crown, color: 'purple' },
  { id: 'power', label: 'Power', icon: Zap, color: 'red' },
  { id: 'knowledge', label: 'Knowledge', icon: BookOpen, color: 'blue' },
  { id: 'justice', label: 'Justice', icon: Scale, color: 'indigo' },
  { id: 'love', label: 'Love', icon: Heart, color: 'rose' },
  { id: 'freedom', label: 'Freedom', icon: Target, color: 'cyan' }
];

const MotivationsGoals: React.FC<MotivationsGoalsProps> = ({
  primaryMotivations,
  onPrimaryMotivationChange,
  goals,
  onGoalAdd,
  onGoalUpdate,
  onGoalRemove
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Motivations & Goals</h3>
        
        <Card className="mb-6 border-slate-200 bg-slate-50/50">
          <CardContent className="p-4">
            <Label className="text-base text-slate-700 mb-3 block">Primary Motivation (Select up to 3)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MOTIVATION_OPTIONS.map((motivation) => (
                <Button
                  key={motivation.id}
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 px-4 hover:bg-slate-100",
                    primaryMotivations.includes(motivation.id) && 
                    `bg-${motivation.color}-50 border-${motivation.color}-200 text-${motivation.color}-700 hover:bg-${motivation.color}-100`,
                    primaryMotivations.length >= 3 && !primaryMotivations.includes(motivation.id) && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (primaryMotivations.includes(motivation.id)) {
                      onPrimaryMotivationChange(motivation.id);
                    } else if (primaryMotivations.length < 3) {
                      onPrimaryMotivationChange(motivation.id);
                    }
                  }}
                  disabled={primaryMotivations.length >= 3 && !primaryMotivations.includes(motivation.id)}
                >
                  {React.createElement(motivation.icon, {
                    className: cn(
                      "w-4 h-4 mr-2",
                      primaryMotivations.includes(motivation.id) ? `text-${motivation.color}-500` : "text-slate-500"
                    )
                  })}
                  {motivation.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-base text-slate-700">Character Goals</Label>
            <Button
              variant="outline"
              onClick={() => {
                onGoalAdd({
                  id: Math.random().toString(36).substr(2, 9),
                  type: 'secondary',
                  description: ''
                });
              }}
              className="text-sm hover:bg-slate-100"
              disabled={goals.length >= 3}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>

          <AnimatePresence mode="popLayout">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-slate-200 bg-white">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-32">
                        <Label className="text-sm text-slate-600">Type</Label>
                        <select
                          className="w-full mt-1 rounded-md border border-slate-200 p-2 text-sm"
                          value={goal.type}
                          onChange={(e) => onGoalUpdate(goal.id, { type: e.target.value as 'primary' | 'secondary' })}
                        >
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                        </select>
                      </div>
                      
                      <div className="flex-1 relative">
                        <Label className="text-sm text-slate-600">Description</Label>
                        <textarea
                          className="w-full mt-1 rounded-md border border-slate-200 p-2 pr-8 text-sm"
                          value={goal.description}
                          onChange={(e) => onGoalUpdate(goal.id, { description: e.target.value })}
                          rows={2}
                          placeholder={`Describe the ${goal.type} goal...`}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-7 right-2 text-slate-400 hover:text-red-500"
                          onClick={() => onGoalRemove(goal.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {goals.length === 0 && (
            <div className="text-center py-8 text-slate-500 bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
              Add goals to define your character's motivations
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotivationsGoals;
