import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LinePath } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleLinear, scalePoint } from '@visx/scale';
import { curveNatural } from '@visx/curve';
import {
  Book,
  Users,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Target,
  Milestone,
  Lightbulb,
  CheckCircle2,
  Crown,
  Star,
  Globe,
  Flame,
  Swords,
  Scale,
  HeartHandshake,
  Eye,
  Binary,
  CircleUserRound,
  Waypoints,
  ArrowBigRightDash,
  Mountain,
  Puzzle,
  Network,
  Glasses,
  Workflow,
  Building2,
  TreePine,
  Shapes,
  Landmark,
  Cloud
} from 'lucide-react';
import { useLocation } from 'wouter';
import { useThemeStore, Theme } from '@/stores/themeStore';
import { ThemeHierarchy } from './ThemeHierarchy';

interface ExpressionOption {
  id: string;
  text: string;
  category: string;
}

type PrimaryCategory = 'thematicConflict' | 'characterTruth' | 'storyEvolution';
type SupportingCategory = 'parallelElements' | 'worldImpact' | 'thematicEchoes';
type Category = PrimaryCategory | SupportingCategory;

interface ThemeExpression {
  themeId: string;
  thematicConflict: string[];
  characterTruth: string[];
  storyEvolution: string[];
  parallelElements: string[];
  worldImpact: string[];
  thematicEchoes: string[];
}

// Separate options for primary and supporting themes
const PRIMARY_EXPRESSION_OPTIONS = {
  thematicConflict: [
    { id: 'conflict1', text: 'Internal struggle and moral dilemma', category: 'thematicConflict' },
    { id: 'conflict2', text: 'External opposition and challenges', category: 'thematicConflict' },
    { id: 'conflict3', text: 'Philosophical contradiction', category: 'thematicConflict' },
    { id: 'conflict4', text: 'Personal desire vs responsibility', category: 'thematicConflict' },
    { id: 'conflict5', text: 'Truth vs perception', category: 'thematicConflict' },
    { id: 'conflict6', text: 'Idealism vs reality', category: 'thematicConflict' }
  ],
  characterTruth: [
    { id: 'truth1', text: 'Core belief transformation', category: 'characterTruth' },
    { id: 'truth2', text: 'Identity revelation', category: 'characterTruth' },
    { id: 'truth3', text: 'Value system challenge', category: 'characterTruth' },
    { id: 'truth4', text: 'Relationship dynamics shift', category: 'characterTruth' },
    { id: 'truth5', text: 'Moral compass evolution', category: 'characterTruth' },
    { id: 'truth6', text: 'Life purpose discovery', category: 'characterTruth' }
  ],
  storyEvolution: [
    { id: 'evolution1', text: 'Opening statement/situation', category: 'storyEvolution' },
    { id: 'evolution2', text: 'Early challenge/question', category: 'storyEvolution' },
    { id: 'evolution3', text: 'Midpoint reversal/revelation', category: 'storyEvolution' },
    { id: 'evolution4', text: 'Escalating consequences', category: 'storyEvolution' },
    { id: 'evolution5', text: 'Climactic confrontation', category: 'storyEvolution' },
    { id: 'evolution6', text: 'Thematic resolution', category: 'storyEvolution' }
  ]
};

const SUPPORTING_EXPRESSION_OPTIONS = {
  parallelElements: [
    { id: 'parallel1', text: 'Character foils and mirrors', category: 'parallelElements' },
    { id: 'parallel2', text: 'Subplot reflections', category: 'parallelElements' },
    { id: 'parallel3', text: 'Contrasting perspectives', category: 'parallelElements' },
    { id: 'parallel4', text: 'Supporting relationships', category: 'parallelElements' },
    { id: 'parallel5', text: 'Environmental parallels', category: 'parallelElements' },
    { id: 'parallel6', text: 'Symbolic connections', category: 'parallelElements' }
  ],
  worldImpact: [
    { id: 'impact1', text: 'Social ripple effects', category: 'worldImpact' },
    { id: 'impact2', text: 'Community transformation', category: 'worldImpact' },
    { id: 'impact3', text: 'Cultural shifts', category: 'worldImpact' },
    { id: 'impact4', text: 'Power dynamic changes', category: 'worldImpact' },
    { id: 'impact5', text: 'Institutional responses', category: 'worldImpact' },
    { id: 'impact6', text: 'Environmental changes', category: 'worldImpact' }
  ],
  thematicEchoes: [
    { id: 'echo1', text: 'Recurring symbols', category: 'thematicEchoes' },
    { id: 'echo2', text: 'Metaphorical patterns', category: 'thematicEchoes' },
    { id: 'echo3', text: 'Dialogue motifs', category: 'thematicEchoes' },
    { id: 'echo4', text: 'Setting resonance', category: 'thematicEchoes' },
    { id: 'echo5', text: 'Object significance', category: 'thematicEchoes' },
    { id: 'echo6', text: 'Ritual/routine meaning', category: 'thematicEchoes' }
  ]
};

// Add constants for limits
const PRIMARY_THEME_LIMITS = {
  total: { min: 7, max: 10 },
  thematicConflict: { min: 2 },
  characterTruth: { min: 2 },
  storyEvolution: { min: 3 }
} as const;

const SUPPORTING_THEME_LIMITS = {
  total: { min: 2, max: 5 }
} as const;

export const ThemeExpression: React.FC = () => {
  const [, navigate] = useLocation();
  const [primaryExpressions, setPrimaryExpressions] = useState<ThemeExpression[]>([]);
  const [supportingExpressions, setSupportingExpressions] = useState<ThemeExpression[]>([]);
  const [activeTheme, setActiveTheme] = useState<string>('');
  const [activePrimaryCategory, setActivePrimaryCategory] = useState<PrimaryCategory>('thematicConflict');
  const [activeSupportingCategory, setActiveSupportingCategory] = useState<SupportingCategory>('parallelElements');
  
  const { 
    primaryTheme: selectedPrimaryTheme, 
    supportingThemes: selectedSupportingThemes,
    primaryExpressions: storePrimaryExpressions,
    supportingExpressions: storeSupportingExpressions,
    setPrimaryExpressions: setStorePrimaryExpressions,
    setSupportingExpressions: setStoreSupportingExpressions
  } = useThemeStore();

  // Initialize expressions from store
  React.useEffect(() => {
    if (storePrimaryExpressions.length > 0) {
      setPrimaryExpressions(storePrimaryExpressions);
    }
    if (storeSupportingExpressions.length > 0) {
      setSupportingExpressions(storeSupportingExpressions);
    }
  }, [storePrimaryExpressions, storeSupportingExpressions]);

  // Set initial active theme when component mounts
  React.useEffect(() => {
    if (selectedPrimaryTheme && !activeTheme) {
      setActiveTheme(selectedPrimaryTheme.id);
    }
  }, [selectedPrimaryTheme, activeTheme]);

  // Sync expressions with store
  React.useEffect(() => {
    setStorePrimaryExpressions(primaryExpressions);
  }, [primaryExpressions, setStorePrimaryExpressions]);

  React.useEffect(() => {
    setStoreSupportingExpressions(supportingExpressions);
  }, [supportingExpressions, setStoreSupportingExpressions]);

  // Guard against missing themes
  if (!selectedPrimaryTheme) {
    navigate("/themes");
    return null;
  }

  // Replace mock data with actual store data
  const selectedThemes = {
    primary: selectedPrimaryTheme ? [selectedPrimaryTheme] : [],
    supporting: selectedSupportingThemes || []
  };

  const handleExpressionSelect = (optionId: string, isPrimary: boolean) => {
    const category = isPrimary ? activePrimaryCategory : activeSupportingCategory;
    const themeId = isPrimary ? selectedPrimaryTheme?.id : activeTheme;
    
    if (!themeId) return;

    if (isPrimary) {
      setPrimaryExpressions(prev => {
        const existing = prev.find(e => e.themeId === themeId);
        if (existing) {
          const currentSelections = existing[category];
          const isRemoving = currentSelections.includes(optionId);
          
          if (!isRemoving) {
            const totalCount = Object.values(existing).reduce(
              (acc: number, curr) => acc + (Array.isArray(curr) ? curr.length : 0),
              0
            );
            if (totalCount >= PRIMARY_THEME_LIMITS.total.max) return prev;
          }

          const updatedSelections = isRemoving
            ? currentSelections.filter(id => id !== optionId)
            : [...currentSelections, optionId];
          
          return prev.map(e =>
            e.themeId === themeId
              ? { ...e, [category]: updatedSelections }
              : e
          );
        }

        return [...prev, {
          themeId,
          thematicConflict: category === 'thematicConflict' ? [optionId] : [],
          characterTruth: category === 'characterTruth' ? [optionId] : [],
          storyEvolution: category === 'storyEvolution' ? [optionId] : [],
          parallelElements: [],
          worldImpact: [],
          thematicEchoes: []
        }];
      });
    } else {
      setSupportingExpressions(prev => {
        const existing = prev.find(e => e.themeId === themeId);
        if (existing) {
          const currentSelections = existing[category];
          const isRemoving = currentSelections.includes(optionId);
          
          if (!isRemoving) {
            const totalCount = Object.values(existing).reduce(
              (acc: number, curr) => acc + (Array.isArray(curr) ? curr.length : 0),
              0
            );
            if (totalCount >= SUPPORTING_THEME_LIMITS.total.max) return prev;
          }

          const updatedSelections = isRemoving
            ? currentSelections.filter(id => id !== optionId)
            : [...currentSelections, optionId];
          
          return prev.map(e =>
            e.themeId === themeId
              ? { ...e, [category]: updatedSelections }
              : e
          );
        }

        return [...prev, {
          themeId,
          thematicConflict: [],
          characterTruth: [],
          storyEvolution: [],
          parallelElements: category === 'parallelElements' ? [optionId] : [],
          worldImpact: category === 'worldImpact' ? [optionId] : [],
          thematicEchoes: category === 'thematicEchoes' ? [optionId] : []
        }];
      });
    }
  };

  const getCurrentExpression = (isPrimary: boolean) => {
    const themeId = isPrimary ? selectedPrimaryTheme?.id : activeTheme;
    const expressions = isPrimary ? primaryExpressions : supportingExpressions;
    
    return expressions.find(e => e.themeId === themeId) || {
      themeId: themeId || '',
      thematicConflict: [],
      characterTruth: [],
      storyEvolution: [],
      parallelElements: [],
      worldImpact: [],
      thematicEchoes: []
    };
  };

  const primaryExpression = getCurrentExpression(true);
  const supportingExpression = getCurrentExpression(false);

  const PRIMARY_CATEGORY_ICONS: Record<PrimaryCategory, React.ElementType> = {
    thematicConflict: Target,
    characterTruth: Users,
    storyEvolution: Milestone
  };

  const SUPPORTING_CATEGORY_ICONS: Record<SupportingCategory, React.ElementType> = {
    parallelElements: Sparkles,
    worldImpact: Globe,
    thematicEchoes: Lightbulb
  };

  const PRIMARY_CATEGORY_DESCRIPTIONS: Record<PrimaryCategory, string> = {
    thematicConflict: 'Define the central conflicts and tensions that embody your primary theme',
    characterTruth: 'Explore how your theme manifests in character development and revelations',
    storyEvolution: 'Chart how your theme develops and transforms throughout the narrative'
  };

  const SUPPORTING_CATEGORY_DESCRIPTIONS: Record<SupportingCategory, string> = {
    parallelElements: 'Identify elements that mirror or contrast with the primary theme',
    worldImpact: 'Define how this theme affects the story world and society',
    thematicEchoes: 'Develop subtle manifestations and recurring motifs'
  };

  const getThemeProgress = (themeId: string) => {
    const themeExpression = primaryExpressions.find(e => e.themeId === themeId) || supportingExpressions.find(e => e.themeId === themeId);
    if (!themeExpression) return 0;
    
    const totalPossibleSelections = Object.keys(PRIMARY_EXPRESSION_OPTIONS).length * 3;
    const totalSelections = Object.values(themeExpression).reduce(
      (acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0),
      0
    );
    return Math.min((totalSelections / totalPossibleSelections) * 100, 100);
  };

  const renderThemeCard = (theme: Theme | null, isPrimary: boolean) => {
    if (!theme) return null;
    const themeColor = isPrimary ? "indigo" : "emerald";

    return (
      <Card className={cn(
        "h-full transition-all duration-300 relative overflow-hidden",
        `hover:shadow-xl hover:shadow-${themeColor}-100/50 group`
      )}>
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300",
          `bg-gradient-to-br from-${themeColor}-500 to-${themeColor}-600`
        )} />
        <CardHeader className="pb-3 relative">
          <CardTitle className="flex items-center gap-3 text-lg">
            {isPrimary ? (
              <>
                <div className="relative">
                  <div className={`absolute inset-0 animate-ping ${themeColor}-500/30 rounded-full`} />
                  <Crown className={`w-6 h-6 text-${themeColor}-500 relative`} />
                </div>
                <span className={`bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-700 bg-clip-text text-transparent font-bold`}>
                  Primary Theme
                </span>
              </>
            ) : (
              <>
                <Star className={`w-6 h-6 text-${themeColor}-500`} />
                <span className={`bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-700 bg-clip-text text-transparent font-bold`}>
                  Supporting Theme
                </span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-xl transition-colors duration-300",
              isPrimary ? "bg-indigo-50 group-hover:bg-indigo-100" : "bg-emerald-50 group-hover:bg-emerald-100"
            )}>
              <Book className={cn(
                "w-6 h-6",
                isPrimary ? "text-indigo-500" : "text-emerald-500"
              )} />
            </div>
            <div className="font-semibold text-slate-800">
              {theme.name}
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{theme.description}</p>
          
          <div className="flex items-center justify-between pt-2">
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs font-medium transition-all duration-300",
                isPrimary 
                  ? "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100" 
                  : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100"
              )}
            >
              {theme && getRequirementStatus(isPrimary, theme.id).total}/
              {isPrimary ? PRIMARY_THEME_LIMITS.total.min : SUPPORTING_THEME_LIMITS.total.min}+ Required
            </Badge>
            <Progress 
              value={getThemeProgress(theme.id)} 
              className={cn(
                "w-24 h-1.5",
                isPrimary ? "bg-indigo-100" : "bg-emerald-100"
              )}
              indicatorClassName={isPrimary ? "bg-indigo-500" : "bg-emerald-500"}
            />
          </div>
          </CardContent>
        </Card>
    );
  };

  const renderCategorySection = (isPrimary: boolean) => {
    const themeColor = isPrimary ? "indigo" : "emerald";
    const activeCategory = isPrimary ? activePrimaryCategory : activeSupportingCategory;
    const setActiveCategory = isPrimary 
      ? setActivePrimaryCategory 
      : setActiveSupportingCategory;
    const categoryOptions = isPrimary ? PRIMARY_EXPRESSION_OPTIONS : SUPPORTING_EXPRESSION_OPTIONS;
    const categoryIcons = isPrimary ? PRIMARY_CATEGORY_ICONS : SUPPORTING_CATEGORY_ICONS;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-sm font-medium text-slate-700">Categories</h4>
          {renderRequirementBadge(isPrimary)}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(Object.keys(categoryOptions) as Array<Category>).map((category) => {
            const IconComponent = categoryIcons[isPrimary ? category as PrimaryCategory : category as SupportingCategory];
            const currentExpressions = isPrimary ? primaryExpression[category] : supportingExpression[category];
            const isActive = activeCategory === category;

            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => isPrimary 
                  ? setActivePrimaryCategory(category as PrimaryCategory)
                  : setActiveSupportingCategory(category as SupportingCategory)
                }
                className={cn(
                  "relative p-5 rounded-xl transition-all flex flex-col items-center gap-3 text-center overflow-hidden group",
                  isActive
                    ? `bg-${themeColor}-50 border-2 border-${themeColor}-200 shadow-lg shadow-${themeColor}-100/50`
                    : "bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:shadow-md"
                )}
              >
                <div className={cn(
                  "p-3 rounded-xl transition-all duration-300",
                  isActive 
                    ? `bg-${themeColor}-100` 
                    : "bg-slate-100 group-hover:bg-slate-200"
                )}>
                  <IconComponent className={cn(
                    "w-6 h-6",
                    isActive ? `text-${themeColor}-500` : "text-slate-600"
                  )} />
                </div>
                
                <div>
                  <div className="font-medium text-sm capitalize mb-2">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <Badge 
                    variant="secondary"
                    className={cn(
                      "text-xs font-medium transition-all duration-300",
                      isActive
                        ? `bg-${themeColor}-100 text-${themeColor}-700`
                        : currentExpressions.length > 0 
                          ? `bg-${themeColor}-50 text-${themeColor}-600`
                          : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {currentExpressions.length} Selected
                  </Badge>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const getOptionIcon = (category: string, optionId: string) => {
    const icons = {
      thematicConflict: {
        'conflict1': Flame,      // Internal struggle
        'conflict2': Swords,     // External opposition
        'conflict3': Scale,      // Philosophical contradiction
        'conflict4': HeartHandshake, // Personal desire vs responsibility
        'conflict5': Eye,        // Truth vs perception
        'conflict6': Binary      // Idealism vs reality
      },
      characterTruth: {
        'truth1': CircleUserRound, // Core belief
        'truth2': Users,         // Identity
        'truth3': Waypoints,     // Value system
        'truth4': Network,       // Relationship dynamics
        'truth5': Mountain,      // Moral compass
        'truth6': Target         // Life purpose
      },
      storyEvolution: {
        'evolution1': Puzzle,    // Opening situation
        'evolution2': Glasses,   // Early challenge
        'evolution3': Workflow,  // Midpoint reversal
        'evolution4': ArrowBigRightDash, // Escalating consequences
        'evolution5': Mountain,  // Climactic confrontation
        'evolution6': Target     // Resolution
      },
      parallelElements: {
        'parallel1': Users,      // Character foils
        'parallel2': Workflow,   // Subplot reflections
        'parallel3': Glasses,    // Contrasting perspectives
        'parallel4': Network,    // Supporting relationships
        'parallel5': TreePine,   // Environmental parallels
        'parallel6': Sparkles    // Symbolic connections
      },
      worldImpact: {
        'impact1': Network,      // Social ripples
        'impact2': Building2,    // Community transformation
        'impact3': Landmark,     // Cultural shifts
        'impact4': Scale,        // Power dynamics
        'impact5': Building2,    // Institutional responses
        'impact6': Cloud         // Environmental changes
      },
      thematicEchoes: {
        'echo1': Sparkles,       // Recurring symbols
        'echo2': Shapes,         // Metaphorical patterns
        'echo3': MessageSquare,  // Dialogue motifs
        'echo4': TreePine,       // Setting resonance
        'echo5': Lightbulb,      // Object significance
        'echo6': Workflow        // Ritual/routine meaning
      }
    };
    
    const IconComponent = icons[category as keyof typeof icons]?.[optionId];
    return IconComponent || Sparkles;
  };

  const renderExpressionOptions = (isPrimary: boolean) => {
    const themeColor = isPrimary ? "indigo" : "emerald";
    const activeCategory = isPrimary ? activePrimaryCategory : activeSupportingCategory;
    const categoryOptions = isPrimary ? PRIMARY_EXPRESSION_OPTIONS : SUPPORTING_EXPRESSION_OPTIONS;
    const categoryDescriptions = isPrimary ? PRIMARY_CATEGORY_DESCRIPTIONS : SUPPORTING_CATEGORY_DESCRIPTIONS;
    const categoryIcons = isPrimary ? PRIMARY_CATEGORY_ICONS : SUPPORTING_CATEGORY_ICONS;
    const IconComponent = categoryIcons[isPrimary ? activeCategory as PrimaryCategory : activeCategory as SupportingCategory];
    
    return (
      <Card className="mt-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className={cn(
                    "p-2 rounded-xl",
                    `bg-${themeColor}-50`
                  )}>
                    <IconComponent className={`w-6 h-6 text-${themeColor}-500`} />
                  </div>
                  {activeCategory.replace(/([A-Z])/g, ' $1').trim()}
                </CardTitle>
                {isPrimary && renderRequirementBadge(true, activeCategory as PrimaryCategory)}
              </div>
              <CardDescription className="mt-2 text-slate-600">
                {isPrimary 
                  ? PRIMARY_CATEGORY_DESCRIPTIONS[activeCategory as PrimaryCategory]
                  : SUPPORTING_CATEGORY_DESCRIPTIONS[activeCategory as SupportingCategory]
                }
              </CardDescription>
            </div>
            <Badge 
              variant="outline" 
              className={cn(
                "transition-all duration-300 px-3 py-1",
                `text-${themeColor}-600 border-${themeColor}-200 bg-${themeColor}-50`
              )}
            >
              {isPrimary ? primaryExpression[activeCategory]?.length || 0 : supportingExpression[activeCategory]?.length || 0} Selected
            </Badge>
          </div>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
            {(isPrimary 
              ? PRIMARY_EXPRESSION_OPTIONS[activeCategory as PrimaryCategory]
              : SUPPORTING_EXPRESSION_OPTIONS[activeCategory as SupportingCategory]
            ).map((option: ExpressionOption) => {
                  const isSelected = (isPrimary ? primaryExpression[activeCategory] : supportingExpression[activeCategory])?.includes(option.id);
              const OptionIcon = getOptionIcon(activeCategory, option.id);
                  return (
                    <motion.button
                      key={option.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleExpressionSelect(option.id, isPrimary)}
                      className={cn(
                    "p-4 rounded-xl text-left transition-all relative group overflow-hidden",
                        isSelected
                      ? `bg-${themeColor}-50 border-2 border-${themeColor}-200 shadow-lg shadow-${themeColor}-100/50`
                      : "bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 hover:shadow-md"
                  )}
                >
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300",
                    `bg-gradient-to-br from-${themeColor}-500 to-${themeColor}-600`
                  )} />
                  
                  <div className="flex items-center gap-3 relative">
                        <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                          isSelected 
                        ? `border-${themeColor}-500 bg-${themeColor}-500`
                            : "border-slate-300 group-hover:border-slate-400"
                        )}>
                          <CheckCircle2 className={cn(
                        "w-4 h-4 transition-all duration-300",
                        isSelected 
                          ? "text-white opacity-100 scale-100" 
                          : "opacity-0 scale-75"
                          )} />
                        </div>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <OptionIcon className={cn(
                        "w-4 h-4 flex-shrink-0",
                        isSelected ? `text-${themeColor}-600` : "text-slate-500"
                      )} />
                      <span className="font-medium text-sm text-slate-800 truncate">
                          {option.text}
                        </span>
                    </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </CardContent>
          </Card>
    );
  };

  const getRequirementStatus = (isPrimary: boolean, themeId: string) => {
    const expression = isPrimary 
      ? primaryExpressions.find(e => e.themeId === themeId)
      : supportingExpressions.find(e => e.themeId === themeId);

    if (!expression) return { met: false, total: 0 };

    if (isPrimary) {
      const thematicCount = expression.thematicConflict.length;
      const truthCount = expression.characterTruth.length;
      const evolutionCount = expression.storyEvolution.length;
      const total = thematicCount + truthCount + evolutionCount;

      return {
        met: total >= PRIMARY_THEME_LIMITS.total.min &&
             total <= PRIMARY_THEME_LIMITS.total.max &&
             thematicCount >= PRIMARY_THEME_LIMITS.thematicConflict.min &&
             truthCount >= PRIMARY_THEME_LIMITS.characterTruth.min &&
             evolutionCount >= PRIMARY_THEME_LIMITS.storyEvolution.min,
        total,
        remaining: PRIMARY_THEME_LIMITS.total.max - total
      };
    } else {
      const total = Object.values(expression).reduce(
        (acc: number, curr) => acc + (Array.isArray(curr) ? curr.length : 0),
        0
      );
      return {
        met: total >= SUPPORTING_THEME_LIMITS.total.min &&
             total <= SUPPORTING_THEME_LIMITS.total.max,
        total,
        remaining: SUPPORTING_THEME_LIMITS.total.max - total
      };
    }
  };

  const renderRequirementBadge = (isPrimary: boolean, category?: Category) => {
    const themeId = isPrimary ? selectedPrimaryTheme?.id : activeTheme;
    if (!themeId) return null;

    const status = getRequirementStatus(isPrimary, themeId);
    const themeColor = isPrimary ? "indigo" : "emerald";

    if (category && isPrimary) {
      const count = status[`${category}Count` as keyof typeof status] as number || 0;
      const min = PRIMARY_THEME_LIMITS[category as keyof typeof PRIMARY_THEME_LIMITS]?.min || 0;
      
      return (
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs transition-all duration-300",
            count >= min
              ? `bg-${themeColor}-50 text-${themeColor}-600 border-${themeColor}-200`
              : "bg-amber-50 text-amber-600 border-amber-200"
          )}
        >
          {count}/{min}+ Required
        </Badge>
      );
    }

    return (
      <Badge 
        variant="outline" 
        className={cn(
          "text-xs transition-all duration-300",
          status.met
            ? `bg-${themeColor}-50 text-${themeColor}-600 border-${themeColor}-200`
            : "bg-amber-50 text-amber-600 border-amber-200"
        )}
      >
        {status.total}/{isPrimary ? PRIMARY_THEME_LIMITS.total.min : SUPPORTING_THEME_LIMITS.total.min}+ Required
        {status.total > 0 && ` (${status.remaining} remaining)`}
      </Badge>
    );
  };

  const meetsRequirements = (isPrimary: boolean, themeId: string) => {
    const expression = isPrimary 
      ? primaryExpressions.find(e => e.themeId === themeId)
      : supportingExpressions.find(e => e.themeId === themeId);

    if (!expression) return false;

    if (isPrimary) {
      const thematicCount = expression.thematicConflict.length;
      const truthCount = expression.characterTruth.length;
      const evolutionCount = expression.storyEvolution.length;
      const total = thematicCount + truthCount + evolutionCount;

      return total >= PRIMARY_THEME_LIMITS.total.min &&
             total <= PRIMARY_THEME_LIMITS.total.max &&
             thematicCount >= PRIMARY_THEME_LIMITS.thematicConflict.min &&
             truthCount >= PRIMARY_THEME_LIMITS.characterTruth.min &&
             evolutionCount >= PRIMARY_THEME_LIMITS.storyEvolution.min;
    } else {
      const total = Object.values(expression).reduce(
        (acc: number, curr) => acc + (Array.isArray(curr) ? curr.length : 0),
        0
      );
      return total >= SUPPORTING_THEME_LIMITS.total.min &&
             total <= SUPPORTING_THEME_LIMITS.total.max;
    }
  };

  const canGenerate = useMemo(() => {
    if (!selectedPrimaryTheme) return false;
    
    if (!meetsRequirements(true, selectedPrimaryTheme.id)) return false;

    return selectedThemes.supporting.every(theme => 
      meetsRequirements(false, theme.id)
    );
  }, [primaryExpressions, supportingExpressions, selectedPrimaryTheme, selectedThemes.supporting]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[95%] mx-auto py-6 space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-8">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Theme Expression
          </h2>
          <p className="text-slate-600 mt-1">Define how each theme will be expressed throughout your story</p>
        </div>
        <div className="flex gap-3">
        <Button
          variant="outline"
            size="default"
          onClick={() => navigate("/themes")}
            className="gap-2 group"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
        </Button>
        <Button
            size="default"
          onClick={() => navigate("/style")}
          disabled={!canGenerate}
            className={cn(
              "gap-2 group transition-all duration-300",
              canGenerate
                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-200/50"
                : "bg-slate-100 text-slate-400"
            )}
        >
          Continue to Narrative Style
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
        </div>
      </div>

      {/* Primary Theme Section */}
      <div className="space-y-3">
        <div className="px-8 flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-900">Primary Theme Development</h3>
          <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">Required</Badge>
        </div>

        {/* Primary Theme Container */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-5">
            <div className="grid grid-cols-12 gap-x-6">
              {/* Left Content Container - 8/12 columns (66.66%) */}
              <div className="col-span-8 space-y-4">
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-4">
                      {renderThemeCard(selectedPrimaryTheme, true)}
                    </div>
                    <div className="col-span-8">
                      <div className="space-y-4">
                        {renderCategorySection(true)}
                        {renderExpressionOptions(true)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Space - Hierarchy Visualization */}
              <div className="col-span-4 h-[515px] flex items-center justify-center">
                <ThemeHierarchy
                  width={400}
                  height={515}
                  theme={selectedPrimaryTheme}
                  isPrimary={true}
                  selectedExpressions={primaryExpression}
                  expressionOptions={PRIMARY_EXPRESSION_OPTIONS}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Themes Section */}
      <div className="space-y-3">
        <div className="px-8 flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-900">Supporting Themes Development</h3>
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">Optional</Badge>
        </div>

        {/* Supporting Themes Container */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-5">
            <div className="grid grid-cols-12 gap-x-6">
              {/* Left Content Container - 8/12 columns (66.66%) */}
              <div className="col-span-8 space-y-4">
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-4">
                      <Card className="hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 group">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Star className="w-5 h-5 text-emerald-500" />
                            <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent font-bold">
                              Supporting Themes
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {selectedThemes.supporting.map((theme) => (
                            <motion.button
                              key={theme.id}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => setActiveTheme(theme.id)}
                              className={cn(
                                "w-full p-3 rounded-lg transition-all relative overflow-hidden text-left group",
                                activeTheme === theme.id
                                  ? "bg-emerald-50 border-2 border-emerald-200 shadow-md shadow-emerald-100/50"
                                  : "bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300"
                              )}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                              <div className="flex items-center gap-2 relative">
                                <div className={cn(
                                  "p-1.5 rounded-lg transition-all duration-300",
                                  activeTheme === theme.id 
                                    ? "bg-emerald-100" 
                                    : "bg-slate-100 group-hover:bg-slate-200"
                                )}>
                                  <Users className={cn(
                                    "w-4 h-4",
                                    activeTheme === theme.id ? "text-emerald-500" : "text-slate-500"
                                  )} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm text-slate-800 truncate">
                                    {theme.name}
                                  </div>
                                </div>
                                <Badge className={cn(
                                  "text-xs transition-all duration-300",
                                  activeTheme === theme.id
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-slate-100 text-slate-600"
                                )}>
                                  Support
                                </Badge>
                              </div>
                            </motion.button>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                    <div className="col-span-8">
                      <div className="space-y-4">
                        {renderCategorySection(false)}
                        {renderExpressionOptions(false)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Space - Hierarchy Visualization */}
              <div className="col-span-4 h-[515px] flex items-center justify-center">
                <ThemeHierarchy
                  width={400}
                  height={515}
                  theme={selectedThemes.supporting.find(t => t.id === activeTheme) || null}
                  isPrimary={false}
                  selectedExpressions={supportingExpression}
                  expressionOptions={SUPPORTING_EXPRESSION_OPTIONS}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 