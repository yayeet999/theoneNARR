import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Plus,
  Trash2,
  ShieldPlus,
  ShieldX,
  AlertCircle,
  Sparkles,
  Swords,
  Brain,
  Heart,
  Star,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

// Predefined trait suggestions based on character archetypes
const TRAIT_SUGGESTIONS = {
  strengths: {
    major: [
      { description: "Natural Leadership", impact: "Inspires and guides others effectively" },
      { description: "Unwavering Determination", impact: "Persists against all odds" },
      { description: "Strategic Mind", impact: "Excels at planning and problem-solving" },
      { description: "Exceptional Intuition", impact: "Reads situations and people accurately" },
      { description: "Inspiring Charisma", impact: "Naturally draws others to their cause" }
    ],
    minor: [
      { description: "Quick Learner", impact: "Adapts rapidly to new situations" },
      { description: "Empathetic", impact: "Understands others' emotions deeply" },
      { description: "Creative Problem Solver", impact: "Finds unique solutions" },
      { description: "Physical Prowess", impact: "Excels in physical activities" },
      { description: "Diplomatic", impact: "Mediates conflicts effectively" }
    ]
  },
  flaws: {
    major: [
      { description: "Overwhelming Pride", impact: "Often underestimates challenges" },
      { description: "Deep-seated Fear", impact: "Paralyzes decision-making in crucial moments" },
      { description: "Blind Loyalty", impact: "Ignores red flags from allies" },
      { description: "Uncontrolled Temper", impact: "Damages relationships in anger" },
      { description: "Crippling Self-Doubt", impact: "Hesitates at critical moments" }
    ],
    minor: [
      { description: "Impulsiveness", impact: "Acts without considering consequences" },
      { description: "Stubbornness", impact: "Resists necessary change" },
      { description: "Overprotective", impact: "Stifles others' growth" },
      { description: "Trust Issues", impact: "Struggles to form deep connections" },
      { description: "Perfectionism", impact: "Gets caught up in details" }
    ]
  }
};

interface Trait {
  id: string;
  description: string;
  impact: string;
}

interface Props {
  majorStrengths: Trait[];
  minorStrengths: Trait[];
  majorFlaws: Trait[];
  minorFlaws: Trait[];
  onAddTrait: (type: 'majorStrength' | 'minorStrength' | 'majorFlaw' | 'minorFlaw', trait: Trait) => void;
  onRemoveTrait: (type: 'majorStrength' | 'minorStrength' | 'majorFlaw' | 'minorFlaw', id: string) => void;
}

const MAX_MAJOR_TRAITS = 3;
const MAX_MINOR_TRAITS = 5;

export const StrengthsFlaws: React.FC<Props> = ({
  majorStrengths,
  minorStrengths,
  majorFlaws,
  minorFlaws,
  onAddTrait,
  onRemoveTrait,
}) => {
  const [newTrait, setNewTrait] = useState({ description: '', impact: '' });
  const [activeView, setActiveView] = useState<'strengths' | 'flaws'>('strengths');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedType, setSelectedType] = useState<'major' | 'minor'>('major');
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleAddTrait = (type: 'majorStrength' | 'minorStrength' | 'majorFlaw' | 'minorFlaw', trait?: { description: string, impact: string }) => {
    const traitToAdd = trait || newTrait;
    if (traitToAdd.description && traitToAdd.impact) {
      const newTraitObj: Trait = {
        id: Math.random().toString(36).substr(2, 9),
        description: traitToAdd.description,
        impact: traitToAdd.impact,
      };
      onAddTrait(type, newTraitObj);
      setNewTrait({ description: '', impact: '' });
      setIsAdding(false);
      setIsCustomizing(false);
    }
  };

  const getTraitLimitWarning = (type: 'major' | 'minor', traits: Trait[]) => {
    const limit = type === 'major' ? MAX_MAJOR_TRAITS : MAX_MINOR_TRAITS;
    const remaining = limit - traits.length;
    return remaining === 0 ? `Maximum ${limit} traits reached` : `${remaining} more trait${remaining === 1 ? '' : 's'} can be added`;
  };

  const calculateBalance = () => {
    const strengthsCount = majorStrengths.length * 2 + minorStrengths.length;
    const flawsCount = majorFlaws.length * 2 + minorFlaws.length;
    const ratio = strengthsCount / (flawsCount || 1);

    if (ratio > 1.5) return { message: "Character may be too powerful - consider adding more flaws", color: "text-yellow-500" };
    if (ratio < 0.67) return { message: "Character may be too flawed - consider adding more strengths", color: "text-yellow-500" };
    return { message: "Character traits are well balanced", color: "text-green-500" };
  };

  const balance = calculateBalance();

  const currentTraits = activeView === 'strengths' 
    ? (selectedType === 'major' ? majorStrengths : minorStrengths)
    : (selectedType === 'major' ? majorFlaws : minorFlaws);

  const traitLimit = selectedType === 'major' ? MAX_MAJOR_TRAITS : MAX_MINOR_TRAITS;

  const suggestions = TRAIT_SUGGESTIONS[activeView][selectedType];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">Strengths & Flaws</h2>
        <div className="flex items-center space-x-2">
          <AlertCircle className={`w-5 h-5 ${balance.color}`} />
          <span className={`text-sm ${balance.color}`}>{balance.message}</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant={activeView === 'strengths' ? "default" : "outline"}
          onClick={() => {
            setActiveView('strengths');
            setIsAdding(false);
            setIsCustomizing(false);
          }}
          className={cn(
            "flex items-center space-x-2 px-6 py-6",
            activeView === 'strengths' 
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "hover:border-emerald-200 hover:text-emerald-600"
          )}
        >
          <ShieldPlus className="w-5 h-5" />
          <span className="text-lg">Strengths</span>
        </Button>
        <Button
          variant={activeView === 'flaws' ? "default" : "outline"}
          onClick={() => {
            setActiveView('flaws');
            setIsAdding(false);
            setIsCustomizing(false);
          }}
          className={cn(
            "flex items-center space-x-2 px-6 py-6",
            activeView === 'flaws'
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "hover:border-red-200 hover:text-red-600"
          )}
        >
          <ShieldX className="w-5 h-5" />
          <span className="text-lg">Flaws</span>
        </Button>
      </div>

      <Card className={cn(
        "relative overflow-hidden border-2 transition-colors duration-300",
        activeView === 'strengths' 
          ? "hover:border-emerald-200"
          : "hover:border-red-200"
      )}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              {activeView === 'strengths' ? (
                <ShieldPlus className="w-5 h-5 text-emerald-500" />
              ) : (
                <ShieldX className="w-5 h-5 text-red-500" />
              )}
              <span>{activeView === 'strengths' ? 'Strengths' : 'Flaws'}</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={selectedType === 'major' ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedType('major');
                  setIsAdding(false);
                  setIsCustomizing(false);
                }}
                className={cn(
                  activeView === 'strengths'
                    ? "hover:bg-emerald-50"
                    : "hover:bg-red-50"
                )}
              >
                Major
              </Button>
              <Button
                variant={selectedType === 'minor' ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedType('minor');
                  setIsAdding(false);
                  setIsCustomizing(false);
                }}
                className={cn(
                  activeView === 'strengths'
                    ? "hover:bg-emerald-50"
                    : "hover:bg-red-50"
                )}
              >
                Minor
              </Button>
            </div>
          </div>
          <CardDescription>
            {getTraitLimitWarning(selectedType, currentTraits)}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeView}-${selectedType}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Existing Traits */}
              {currentTraits.map((trait, index) => (
                <motion.div
                  key={trait.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative"
                  style={{ zIndex: currentTraits.length - index }}
                >
                  <Card className={cn(
                    "hover:bg-slate-100 transition-colors duration-200",
                    activeView === 'strengths' ? "bg-emerald-50" : "bg-red-50"
                  )}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{trait.description}</p>
                          <p className="text-sm text-slate-500 mt-1">{trait.impact}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveTrait(
                            `${selectedType}${activeView === 'strengths' ? 'Strength' : 'Flaw'}` as any,
                            trait.id
                          )}
                          className="ml-2"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Add New Trait Section */}
              {currentTraits.length < traitLimit && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {isAdding ? (
                    <div className="space-y-4">
                      {!isCustomizing ? (
                        // Suggested Traits
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {suggestions.map((suggestion, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ 
                                opacity: 1, 
                                y: 0,
                                transition: { delay: index * 0.1 }
                              }}
                            >
                              <Card
                                className={cn(
                                  "cursor-pointer transition-all duration-200",
                                  "hover:scale-105 hover:shadow-md",
                                  activeView === 'strengths' 
                                    ? "hover:bg-emerald-50 hover:border-emerald-200"
                                    : "hover:bg-red-50 hover:border-red-200"
                                )}
                                onClick={() => handleAddTrait(
                                  `${selectedType}${activeView === 'strengths' ? 'Strength' : 'Flaw'}` as any,
                                  suggestion
                                )}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start space-x-3">
                                    {activeView === 'strengths' ? (
                                      <Star className="w-5 h-5 text-emerald-500 mt-1" />
                                    ) : (
                                      <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                                    )}
                                    <div>
                                      <p className="font-medium text-slate-900">{suggestion.description}</p>
                                      <p className="text-sm text-slate-500 mt-1">{suggestion.impact}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        // Custom Trait Form
                        <Card className={cn(
                          "border-2",
                          activeView === 'strengths' 
                            ? "border-emerald-200"
                            : "border-red-200"
                        )}>
                          <CardContent className="p-4 space-y-4">
                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Input
                                placeholder={`${activeView === 'strengths' ? 'Strength' : 'Flaw'} description`}
                                value={newTrait.description}
                                onChange={(e) => setNewTrait(prev => ({ ...prev, description: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Impact</Label>
                              <Input
                                placeholder="Impact on story/relationships"
                                value={newTrait.impact}
                                onChange={(e) => setNewTrait(prev => ({ ...prev, impact: e.target.value }))}
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                className="flex-1"
                                onClick={() => handleAddTrait(
                                  `${selectedType}${activeView === 'strengths' ? 'Strength' : 'Flaw'}` as any
                                )}
                                disabled={!newTrait.description || !newTrait.impact}
                              >
                                Add
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setIsCustomizing(false);
                                  setNewTrait({ description: '', impact: '' });
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      
                      {!isCustomizing && (
                        <div className="text-center">
                          <Button
                            variant="link"
                            onClick={() => setIsCustomizing(true)}
                            className={cn(
                              "text-sm",
                              activeView === 'strengths'
                                ? "text-emerald-600 hover:text-emerald-700"
                                : "text-red-600 hover:text-red-700"
                            )}
                          >
                            Or create a custom {activeView === 'strengths' ? 'strength' : 'flaw'}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      className={cn(
                        "w-full",
                        activeView === 'strengths'
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      )}
                      variant="outline"
                      onClick={() => setIsAdding(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add {selectedType} {activeView === 'strengths' ? 'Strength' : 'Flaw'}
                    </Button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrengthsFlaws;
