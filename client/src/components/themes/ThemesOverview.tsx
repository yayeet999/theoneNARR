import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Book,
  Heart,
  Crown,
  Scale,
  Compass,
  Users,
  Lightbulb,
  Sparkles,
  Eye,
  Lock,
  ArrowRight,
  Clock,
  Target,
  Globe,
  RefreshCw
} from 'lucide-react';
import { useLocation } from 'wouter';
import { useThemeStore } from '@/stores/themeStore';

interface Theme {
  id: string;
  name: string;
  category: 'primary' | 'personal' | 'relationship' | 'societal' | 'universal';
  description: string;
  icon: React.ElementType;
}

const PRIMARY_THEMES: Theme[] = [
  {
    id: 'identity',
    name: 'Identity & Self-Discovery',
    category: 'primary',
    description: 'Explores personal growth and transformation through understanding oneself',
    icon: Compass
  },
  {
    id: 'love',
    name: 'Love & Relationships',
    category: 'primary',
    description: 'Examines the complexities of love, romance, and human connections',
    icon: Heart
  },
  {
    id: 'power',
    name: 'Power & Ambition',
    category: 'primary',
    description: 'Delves into the pursuit of power and its effects on individuals and society',
    icon: Crown
  },
  {
    id: 'good-evil',
    name: 'Good vs. Evil',
    category: 'primary',
    description: 'Explores moral conflicts and the nature of right and wrong',
    icon: Scale
  },
  {
    id: 'justice',
    name: 'Justice & Morality',
    category: 'primary',
    description: 'Examines ethical dilemmas and the pursuit of justice',
    icon: Scale
  },
  {
    id: 'survival',
    name: 'Survival & Resilience',
    category: 'primary',
    description: 'Chronicles the human spirit\'s capacity to endure and overcome',
    icon: Sparkles
  },
  {
    id: 'family',
    name: 'Family & Legacy',
    category: 'primary',
    description: 'Explores family bonds, inheritance, and generational connections',
    icon: Users
  },
  {
    id: 'change',
    name: 'Change & Transformation',
    category: 'primary',
    description: 'Examines personal and societal evolution and adaptation',
    icon: Lightbulb
  },
  {
    id: 'truth',
    name: 'Truth & Deception',
    category: 'primary',
    description: 'Investigates the nature of truth and the impact of lies',
    icon: Eye
  },
  {
    id: 'freedom',
    name: 'Freedom & Control',
    category: 'primary',
    description: 'Explores the balance between liberty and constraint',
    icon: Lock
  },
  {
    id: 'destiny',
    name: 'Destiny & Choice',
    category: 'primary',
    description: 'Examines the interplay between fate and personal agency',
    icon: Compass
  },
  {
    id: 'sacrifice',
    name: 'Sacrifice & Redemption',
    category: 'primary',
    description: 'Explores the cost of choices and the path to redemption',
    icon: Heart
  }
];

const SUPPORTING_THEMES = {
  personal: [
    { id: 'loss', name: 'Loss & Grief', description: 'Explores the impact of loss and the journey through grief', icon: Heart, category: 'personal' },
    { id: 'redemption', name: 'Redemption', description: 'The journey from fall to restoration', icon: Sparkles, category: 'personal' },
    { id: 'coming-of-age', name: 'Coming of Age', description: 'The transition from youth to maturity', icon: Compass, category: 'personal' },
    { id: 'identity-crisis', name: 'Identity Crisis', description: 'Struggling with self-discovery and personal identity', icon: Users, category: 'personal' },
    { id: 'ambition', name: 'Personal Ambition', description: 'The drive for achievement and its consequences', icon: Target, category: 'personal' },
    { id: 'inner-peace', name: 'Inner Peace', description: 'The quest for harmony within oneself', icon: Sparkles, category: 'personal' }
  ],
  relationship: [
    { id: 'trust', name: 'Trust & Betrayal', description: 'The bonds of trust and the impact of betrayal', icon: Lock, category: 'relationship' },
    { id: 'friendship', name: 'Friendship', description: 'The power and complexity of platonic bonds', icon: Users, category: 'relationship' },
    { id: 'loyalty', name: 'Loyalty & Honor', description: 'Standing by principles and commitments', icon: Crown, category: 'relationship' },
    { id: 'forgiveness', name: 'Forgiveness', description: 'The journey to forgive and heal relationships', icon: Heart, category: 'relationship' },
    { id: 'sacrifice-love', name: 'Sacrifice for Love', description: 'What we give up for those we care about', icon: Heart, category: 'relationship' },
    { id: 'family-bonds', name: 'Family Bonds', description: 'The complexities of familial relationships', icon: Users, category: 'relationship' }
  ],
  societal: [
    { id: 'social-justice', name: 'Social Justice', description: 'The fight for equality and fairness', icon: Scale, category: 'societal' },
    { id: 'tradition', name: 'Tradition vs Progress', description: 'The tension between old and new ways', icon: Lightbulb, category: 'societal' },
    { id: 'power-dynamics', name: 'Power Dynamics', description: 'The interplay of authority and resistance', icon: Crown, category: 'societal' },
    { id: 'class-struggle', name: 'Class Struggle', description: 'Conflicts between social classes and status', icon: Users, category: 'societal' },
    { id: 'cultural-identity', name: 'Cultural Identity', description: 'The preservation and evolution of culture', icon: Globe, category: 'societal' },
    { id: 'revolution', name: 'Revolution & Change', description: 'The process of societal transformation', icon: Sparkles, category: 'societal' }
  ],
  universal: [
    { id: 'fate', name: 'Fate vs Free Will', description: 'The balance between destiny and choice', icon: Compass, category: 'universal' },
    { id: 'nature', name: 'Human Nature', description: 'The fundamental aspects of humanity', icon: Users, category: 'universal' },
    { id: 'time', name: 'Time & Memory', description: 'The impact of time on human experience', icon: Clock, category: 'universal' },
    { id: 'mortality', name: 'Mortality', description: 'Confronting the finite nature of existence', icon: Heart, category: 'universal' },
    { id: 'knowledge', name: 'Knowledge & Truth', description: 'The pursuit and burden of understanding', icon: Book, category: 'universal' },
    { id: 'cycles', name: 'Cycles of Life', description: 'The recurring patterns in existence', icon: RefreshCw, category: 'universal' }
  ]
};

// Theme combination suggestions
const THEME_COMBINATIONS = {
  'identity': ['loss', 'coming-of-age', 'tradition'],
  'love': ['trust', 'loyalty', 'fate'],
  'power': ['social-justice', 'power-dynamics', 'trust'],
  'good-evil': ['redemption', 'loyalty', 'human-nature'],
  'justice': ['social-justice', 'power-dynamics', 'trust'],
  'survival': ['loss', 'loyalty', 'human-nature'],
  'family': ['tradition', 'loyalty', 'time'],
  'change': ['tradition', 'coming-of-age', 'time'],
  'truth': ['trust', 'power-dynamics', 'human-nature'],
  'freedom': ['social-justice', 'power-dynamics', 'fate']
};

export const ThemesOverview: React.FC = () => {
  const [, navigate] = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>('personal');
  const { 
    primaryTheme: selectedPrimaryTheme,
    supportingThemes: selectedSupportingThemes,
    setPrimaryTheme: setSelectedPrimaryTheme,
    setSupportingThemes: setSelectedSupportingThemes 
  } = useThemeStore();

  const handlePrimaryThemeSelect = (themeId: string) => {
    const theme = PRIMARY_THEMES.find(t => t.id === themeId);
    if (theme) {
      setSelectedPrimaryTheme(selectedPrimaryTheme?.id === themeId ? null : theme);
    }
  };

  const handleSupportingThemeSelect = (themeId: string) => {
    const theme = Object.values(SUPPORTING_THEMES)
      .flat()
      .find(t => t.id === themeId);
    
    if (theme) {
      if (selectedSupportingThemes.some(t => t.id === themeId)) {
        setSelectedSupportingThemes(selectedSupportingThemes.filter(t => t.id !== themeId));
      } else if (selectedSupportingThemes.length < 6) {
        setSelectedSupportingThemes([...selectedSupportingThemes, theme]);
      }
    }
  };

  const getRecommendedThemes = () => {
    if (!selectedPrimaryTheme) return [];
    return THEME_COMBINATIONS[selectedPrimaryTheme.id as keyof typeof THEME_COMBINATIONS] || [];
  };

  const recommendedThemes = getRecommendedThemes();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[80%] mx-auto py-16"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Themes</h2>
        <p className="text-slate-600 mt-2">
          Select one primary theme and up to six supporting themes that will drive your story
        </p>
      </div>

      {/* Primary Theme Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="w-6 h-6 text-indigo-500" />
            Primary Theme
          </CardTitle>
          <CardDescription>
            Choose one main theme that will be central to your story
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRIMARY_THEMES.map((theme) => {
              const isSelected = selectedPrimaryTheme?.id === theme.id;
              return (
                <div
                  key={theme.id}
                  onClick={() => handlePrimaryThemeSelect(theme.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all relative group
                    ${isSelected 
                      ? 'bg-indigo-50 shadow-sm border-2 border-indigo-200' 
                      : selectedPrimaryTheme
                        ? 'bg-slate-50 border border-slate-200 opacity-50 cursor-not-allowed'
                        : 'bg-white hover:bg-slate-50/80 border border-slate-200'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    {React.createElement(theme.icon, {
                      className: `w-5 h-5 mt-0.5 ${
                        isSelected ? 'text-indigo-500' : 'text-slate-500'
                      }`
                    })}
                    <div>
                      <div className="font-medium text-slate-900">
                        {theme.name}
                        {isSelected && (
                          <Badge className="ml-2 bg-indigo-500">Selected</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        {theme.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-sm text-slate-600">
            Selected: {selectedPrimaryTheme ? 1 : 0}/1
            {selectedPrimaryTheme && (
              <span className="text-amber-600 ml-2">
                Maximum primary theme selected
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedPrimaryTheme && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-500" />
              Supporting Themes
            </CardTitle>
            <CardDescription>
              Choose 2-3 supporting themes to add depth to your story
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Category Tabs */}
              <div className="flex space-x-2 border-b border-slate-200">
                {Object.keys(SUPPORTING_THEMES).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                      ${activeCategory === category
                        ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500'
                        : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SUPPORTING_THEMES[activeCategory as keyof typeof SUPPORTING_THEMES].map((theme) => {
                  const isSelected = selectedSupportingThemes.some(t => t.id === theme.id);
                  const isRecommended = recommendedThemes.includes(theme.id);
                  return (
                    <div
                      key={theme.id}
                      onClick={() => handleSupportingThemeSelect(theme.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all relative
                        ${isSelected
                          ? 'bg-indigo-50 shadow-sm border-2 border-indigo-200'
                          : isRecommended
                            ? 'bg-emerald-50/50 border border-emerald-200'
                            : 'bg-white hover:bg-slate-50/80 border border-slate-200'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        {React.createElement(theme.icon, {
                          className: `w-5 h-5 mt-0.5 ${
                            isSelected ? 'text-indigo-500' :
                            isRecommended ? 'text-emerald-500' :
                            'text-slate-500'
                          }`
                        })}
                        <div>
                          <div className="font-medium text-slate-900">
                            {theme.name}
                            {isSelected && (
                              <Badge className="ml-2 bg-indigo-500">Selected</Badge>
                            )}
                            {!isSelected && isRecommended && (
                              <Badge className="ml-2 bg-emerald-500">Recommended</Badge>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-slate-600">
                            {theme.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selection Counter */}
              <div className="text-sm text-slate-600">
                Selected: {selectedSupportingThemes.length}/6
                {selectedSupportingThemes.length >= 6 && (
                  <span className="text-amber-600 ml-2">
                    Maximum supporting themes selected
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <div className="mt-12 flex justify-end">
        <Button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
          size="lg"
          onClick={() => navigate("/themes/expression")}
          disabled={!selectedPrimaryTheme || selectedSupportingThemes.length === 0}
        >
          Continue to Theme Expression
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}; 