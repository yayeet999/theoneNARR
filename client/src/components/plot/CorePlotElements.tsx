import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Mountain,
  Building2,
  Brain,
  Compass,
  Laptop2,
  Plus,
  Minus,
  ChevronDown,
  ArrowRight,
  Heart,
  Search,
  Sparkles,
  Globe2,
  GitBranch,
  Sword,
  Trophy,
  Network,
  Lightbulb
} from 'lucide-react';
import { useLocation } from "wouter";
import { usePlotStructureStore } from '@/stores/plotStructureStore';

const CONFLICT_TYPES = [
  {
    id: 'person-vs-person',
    name: 'Person vs Person',
    icon: Users,
    description: 'Direct conflict between characters',
    examples: ['A rebel fights an oppressive empire', 'Two candidates compete for office']
  },
  {
    id: 'person-vs-nature',
    name: 'Person vs Nature',
    icon: Mountain,
    description: 'Struggle against natural forces',
    examples: ['Survival in a harsh wilderness', 'Escaping a natural disaster']
  },
  {
    id: 'person-vs-society',
    name: 'Person vs Society',
    icon: Building2,
    description: 'Conflict with social institutions or norms',
    examples: ['Fighting against discrimination', 'Challenging corrupt systems']
  },
  {
    id: 'person-vs-self',
    name: 'Person vs Self',
    icon: Brain,
    description: 'Internal psychological conflict',
    examples: ['Overcoming personal fears', 'Moral dilemmas']
  },
  {
    id: 'person-vs-fate',
    name: 'Person vs Fate/God',
    icon: Compass,
    description: 'Struggle against destiny or supernatural forces',
    examples: ['Defying prophecy', 'Challenging divine will']
  },
  {
    id: 'person-vs-technology',
    name: 'Person vs Technology',
    icon: Laptop2,
    description: 'Conflict with artificial or technological forces',
    examples: ['Fighting against AI', 'Surviving in a digital world']
  }
];

const SUBPLOT_TYPES = [
  {
    id: 'romance',
    name: 'Romance',
    description: 'Love, relationships, and emotional connections',
    icon: Heart,
    iconColor: 'text-rose-500'
  },
  {
    id: 'mystery',
    name: 'Mystery',
    description: 'Secrets, investigations, and revelations',
    icon: Search,
    iconColor: 'text-purple-500'
  },
  {
    id: 'character-growth',
    name: 'Character Growth',
    description: 'Personal development and transformation',
    icon: Sparkles,
    iconColor: 'text-amber-500'
  },
  {
    id: 'social-commentary',
    name: 'Social Commentary',
    description: 'Exploring societal issues and themes',
    icon: Globe2,
    iconColor: 'text-blue-500'
  },
  {
    id: 'parallel',
    name: 'Parallel Plot',
    description: 'Story that mirrors or contrasts the main plot',
    icon: GitBranch,
    iconColor: 'text-green-500'
  },
  {
    id: 'revenge',
    name: 'Revenge',
    description: 'Pursuit of vengeance or justice',
    icon: Sword,
    iconColor: 'text-red-500'
  },
  {
    id: 'ambition',
    name: 'Ambition',
    description: 'Quest for power, success, or achievement',
    icon: Trophy,
    iconColor: 'text-yellow-500'
  },
  {
    id: 'conspiracy',
    name: 'Conspiracy',
    description: 'Hidden connections and secret agendas',
    icon: Network,
    iconColor: 'text-indigo-500'
  },
  {
    id: 'discovery',
    name: 'Discovery',
    description: 'Scientific, magical, or personal revelations',
    icon: Lightbulb,
    iconColor: 'text-cyan-500'
  }
];

const IMPORTANCE_LEVELS = [
  {
    value: 'Major',
    description: 'Significant impact on main plot',
    color: 'bg-blue-50 hover:bg-blue-100 ring-blue-500'
  },
  {
    value: 'Supporting',
    description: 'Enhances story but not crucial',
    color: 'bg-green-50 hover:bg-green-100 ring-green-500'
  },
  {
    value: 'Minor',
    description: 'Adds depth without major impact',
    color: 'bg-amber-50 hover:bg-amber-100 ring-amber-500'
  }
];

export const CorePlotElements: React.FC = () => {
  const [, navigate] = useLocation();
  const {
    conflicts,
    setConflicts,
    stakes,
    setStakes,
    subplots,
    setSubplots,
    storySummary,
    setStorySummary
  } = usePlotStructureStore();

  const handleConflictToggle = (conflictId: string) => {
    setConflicts((prev) => prev.map((conflict) => 
      conflict.type === conflictId
        ? { ...conflict, selected: !conflict.selected }
        : conflict
    ));
  };

  const handleAddSubplot = () => {
    const newSubplot = {
      id: Math.random().toString(36).substr(2, 9),
      type: '',
      importance: 'Supporting' as const,
      description: ''
    };
    setSubplots((prev) => [...prev, newSubplot]);
  };

  const handleUpdateSubplot = (id: string, updates: Partial<{ type: string; importance: 'Major' | 'Supporting' | 'Minor'; description: string }>) => {
    setSubplots((prev) => prev.map((subplot) => 
      subplot.id === id ? { ...subplot, ...updates } : subplot
    ));
  };

  const handleRemoveSubplot = (id: string) => {
    setSubplots((prev) => prev.filter((subplot) => subplot.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[80%] mx-auto py-16"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Core Plot Elements</h2>
        <p className="text-slate-600 mt-2">
          Define the fundamental elements that will drive your story forward
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Conflict Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Main Conflict</CardTitle>
            <CardDescription>Choose one or more types of conflict for your story</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {CONFLICT_TYPES.map(conflict => (
              <div
                key={conflict.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  conflicts.find(c => c.type === conflict.id)?.selected
                    ? 'bg-indigo-50 ring-2 ring-indigo-500'
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
                onClick={() => handleConflictToggle(conflict.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    conflicts.find(c => c.type === conflict.id)?.selected
                      ? 'bg-indigo-100'
                      : 'bg-slate-100'
                  }`}>
                    {React.createElement(conflict.icon, {
                      className: `w-4 h-4 ${
                        conflicts.find(c => c.type === conflict.id)?.selected
                          ? 'text-indigo-600'
                          : 'text-slate-600'
                      }`
                    })}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-slate-900">{conflict.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{conflict.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stakes */}
        <Card>
          <CardHeader>
            <CardTitle>Stakes</CardTitle>
            <CardDescription>Define what's at risk in your story</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Personal Stakes</Label>
                <Slider
                  value={[stakes.personal]}
                  onValueChange={([value]) => setStakes({ ...stakes, personal: value })}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>Professional Stakes</Label>
                <Slider
                  value={[stakes.professional]}
                  onValueChange={([value]) => setStakes({ ...stakes, professional: value })}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>Societal Stakes</Label>
                <Slider
                  value={[stakes.societal]}
                  onValueChange={([value]) => setStakes({ ...stakes, societal: value })}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>Existential Stakes</Label>
                <Slider
                  value={[stakes.existential]}
                  onValueChange={([value]) => setStakes({ ...stakes, existential: value })}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subplots */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Subplots</CardTitle>
            <CardDescription>Add and manage your story's subplots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Button
                variant="outline"
                onClick={handleAddSubplot}
                disabled={subplots.length >= 3}
                className="w-full justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Subplot
              </Button>

              <div className="space-y-8">
                {subplots.map((subplot) => (
                  <div key={subplot.id} className="bg-slate-50 rounded-lg p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-slate-900">Subplot {subplots.indexOf(subplot) + 1}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSubplot(subplot.id)}
                        className="text-slate-500 hover:text-red-500"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Type Selection */}
                    <div className="space-y-3">
                      <Label className="text-base">Type</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {SUBPLOT_TYPES.map(type => (
                          <div
                            key={type.id}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                              subplot.type === type.id
                                ? 'bg-indigo-50 ring-2 ring-indigo-500'
                                : 'bg-white hover:bg-slate-50'
                            }`}
                            onClick={() => handleUpdateSubplot(subplot.id, { type: type.id })}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-sm text-slate-900">{type.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">{type.description}</p>
                              </div>
                              {React.createElement(type.icon, {
                                className: `w-5 h-5 ${subplot.type === type.id ? 'text-indigo-500' : type.iconColor}`
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Importance and Description in Two Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Importance Selection - Left Column */}
                      <div className="space-y-3">
                        <Label className="text-base">Importance</Label>
                        <div className="space-y-3">
                          {IMPORTANCE_LEVELS.map(level => (
                            <div
                              key={level.value}
                              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                subplot.importance === level.value
                                  ? `${level.color} ring-2`
                                  : 'bg-white hover:bg-slate-50'
                              }`}
                              onClick={() => handleUpdateSubplot(subplot.id, { importance: level.value as 'Major' | 'Supporting' | 'Minor' })}
                            >
                              <h4 className="font-medium text-sm text-slate-900">{level.value}</h4>
                              <p className="text-xs text-slate-500 mt-1">{level.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Description Input - Right Column */}
                      <div className="space-y-3">
                        <Label className="text-base">Description</Label>
                        <div className="relative h-full">
                          <Input
                            value={subplot.description}
                            onChange={(e) => handleUpdateSubplot(subplot.id, { description: e.target.value })}
                            placeholder="Describe your subplot's main elements and purpose..."
                            className="w-full h-[calc(100%-2rem)] min-h-[150px] py-2 px-3 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Story Description */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Story Description</CardTitle>
            <CardDescription>Provide a brief summary of your story's concept</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={storySummary}
              onChange={(e) => setStorySummary(e.target.value)}
              placeholder="Enter your story's overall concept..."
              className="h-24"
            />
          </CardContent>
        </Card>
      </div>

      {/* Continue Button */}
      <div className="mt-12 flex justify-end">
        <Button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
          size="lg"
          onClick={() => navigate("/plot-structure/pacing-integration")}
        >
          Continue to Pacing & Integration
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}; 