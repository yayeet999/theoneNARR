import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Target, Flag, Trophy } from 'lucide-react';

interface Goal {
  id: string;
  type: 'primary' | 'secondary';
  description: string;
}

interface MotivationsGoalsProps {
  primaryMotivation: string;
  onPrimaryMotivationChange: (motivation: string) => void;
  goals: Goal[];
  onGoalAdd: (goal: Goal) => void;
  onGoalUpdate: (id: string, goal: Partial<Goal>) => void;
}

const MOTIVATION_OPTIONS = [
  'Survival',
  'Achievement',
  'Recognition',
  'Power',
  'Knowledge',
  'Justice',
  'Love',
  'Freedom'
];

const MotivationsGoals: React.FC<MotivationsGoalsProps> = ({
  primaryMotivation,
  onPrimaryMotivationChange,
  goals,
  onGoalAdd,
  onGoalUpdate
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Motivations & Goals</h3>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label>Primary Motivation</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {MOTIVATION_OPTIONS.map((motivation) => (
                <Button
                  key={motivation}
                  variant="outline"
                  className={`justify-start ${
                    primaryMotivation === motivation ? 'bg-indigo-50 border-indigo-600 text-indigo-600' : ''
                  }`}
                  onClick={() => onPrimaryMotivationChange(motivation)}
                >
                  <Target className="w-4 h-4 mr-2" />
                  {motivation}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Character Goals</Label>
            <Button
              variant="outline"
              onClick={() => {
                onGoalAdd({
                  id: Math.random().toString(36).substr(2, 9),
                  type: 'secondary',
                  description: ''
                });
              }}
              className="text-sm"
              disabled={goals.length >= 3}
            >
              Add Goal
            </Button>
          </div>

          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-32">
                      <Label>Type</Label>
                      <select
                        className="w-full mt-1 rounded-md border border-slate-200 p-2"
                        value={goal.type}
                        onChange={(e) => onGoalUpdate(goal.id, { type: e.target.value as 'primary' | 'secondary' })}
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                      </select>
                    </div>
                    
                    <div className="flex-1">
                      <Label>Description</Label>
                      <textarea
                        className="w-full mt-1 rounded-md border border-slate-200 p-2"
                        value={goal.description}
                        onChange={(e) => onGoalUpdate(goal.id, { description: e.target.value })}
                        rows={2}
                        placeholder={`Describe the ${goal.type} goal...`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {goals.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              Add goals to define your character's motivations
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotivationsGoals;
