import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  Paintbrush2,
  Eye,
  BookText,
  Pen,
  Sparkles,
  Newspaper,
  Brain,
  Theater,
  Glasses,
  Users,
  User,
  Shuffle,
  Infinity,
  Binoculars,
  SlidersHorizontal,
  X
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useStyleStore } from '@/stores/styleStore';

export const PRIMARY_STYLES = {
  descriptive: {
    name: 'Descriptive',
    description: 'Rich in detail and imagery',
    icon: Paintbrush2,
    techniques: [
      { id: 'sensory', name: 'Sensory Details', description: 'Vivid descriptions engaging all five senses' },
      { id: 'metaphorical', name: 'Metaphorical Language', description: 'Rich use of metaphors and similes' },
      { id: 'atmospheric', name: 'Atmospheric', description: 'Strong emphasis on mood and setting' },
      { id: 'character-focused', name: 'Character-Focused', description: 'Detailed character descriptions and mannerisms' },
      { id: 'world-building', name: 'World-Building', description: 'Elaborate environmental and cultural details' }
    ]
  },
  minimalist: {
    name: 'Minimalist',
    description: 'Concise and direct',
    icon: Pen,
    techniques: [
      { id: 'concise', name: 'Concise Prose', description: 'Short, clear sentences with minimal decoration' },
      { id: 'implied', name: 'Implied Meaning', description: 'Subtle implications rather than explicit statements' },
      { id: 'precise', name: 'Precise Word Choice', description: 'Carefully selected words for maximum impact' },
      { id: 'white-space', name: 'White Space', description: 'Strategic use of silence and pauses' },
      { id: 'understated', name: 'Understated', description: 'Subtle emotional undercurrents' }
    ]
  },
  lyrical: {
    name: 'Lyrical',
    description: 'Poetic and flowing',
    icon: Sparkles,
    techniques: [
      { id: 'rhythmic', name: 'Rhythmic Prose', description: 'Musical quality in sentence structure' },
      { id: 'poetic', name: 'Poetic Devices', description: 'Use of alliteration, assonance, and rhythm' },
      { id: 'emotional', name: 'Emotional Resonance', description: 'Strong focus on feelings and mood' },
      { id: 'imagery', name: 'Vivid Imagery', description: 'Beautiful and evocative descriptions' },
      { id: 'flowing', name: 'Flowing Transitions', description: 'Smooth movement between ideas' }
    ]
  },
  experimental: {
    name: 'Experimental',
    description: 'Unconventional techniques',
    icon: Brain,
    techniques: [
      { id: 'nonlinear', name: 'Nonlinear Narrative', description: 'Complex timeline and structure' },
      { id: 'mixed-media', name: 'Mixed Media', description: 'Integration of various textual elements' },
      { id: 'meta', name: 'Meta-Narrative', description: 'Self-referential storytelling' },
      { id: 'fragmented', name: 'Fragmented Style', description: 'Broken narrative and varied perspectives' },
      { id: 'innovative', name: 'Innovative Format', description: 'Unique presentation and structure' }
    ]
  },
  journalistic: {
    name: 'Journalistic',
    description: 'Clear and factual',
    icon: Newspaper,
    techniques: [
      { id: 'objective', name: 'Objective Reporting', description: 'Unbiased presentation of events' },
      { id: 'research', name: 'Research Integration', description: 'Incorporation of facts and data' },
      { id: 'interviews', name: 'Interview Style', description: 'Direct quotes and testimonials' },
      { id: 'timeline', name: 'Timeline Based', description: 'Chronological event presentation' },
      { id: 'context', name: 'Contextual Analysis', description: 'Background and implications' }
    ]
  },
  stream: {
    name: 'Stream of Consciousness',
    description: 'Free-flowing thoughts',
    icon: Brain,
    techniques: [
      { id: 'internal', name: 'Internal Monologue', description: 'Continuous thought flow' },
      { id: 'associative', name: 'Associative Leaps', description: 'Connected thought patterns' },
      { id: 'raw', name: 'Raw Emotion', description: 'Unfiltered emotional expression' },
      { id: 'memory', name: 'Memory Integration', description: 'Blended past and present' },
      { id: 'subconscious', name: 'Subconscious Elements', description: 'Dream-like qualities' }
    ]
  },
  dramatic: {
    name: 'Dramatic',
    description: 'Emphasis on emotion and conflict',
    icon: Theater,
    techniques: [
      { id: 'tension', name: 'High Tension', description: 'Sustained dramatic pressure' },
      { id: 'dialogue', name: 'Dynamic Dialogue', description: 'Powerful conversational exchanges' },
      { id: 'pacing', name: 'Dramatic Pacing', description: 'Strategic rhythm and timing' },
      { id: 'conflict', name: 'Conflict Focus', description: 'Emphasis on confrontation' },
      { id: 'emotional', name: 'Emotional Intensity', description: 'Strong emotional expression' }
    ]
  },
  objective: {
    name: 'Objective',
    description: 'Detached and observational',
    icon: Glasses,
    techniques: [
      { id: 'neutral', name: 'Neutral Tone', description: 'Unbiased observation' },
      { id: 'analytical', name: 'Analytical Approach', description: 'Logical examination' },
      { id: 'distance', name: 'Emotional Distance', description: 'Detached perspective' },
      { id: 'factual', name: 'Factual Focus', description: 'Emphasis on observable details' },
      { id: 'balanced', name: 'Balanced Presentation', description: 'Multiple viewpoints' }
    ]
  }
} as const;

const POV_OPTIONS = [
  {
    id: 'single',
    name: 'Single POV',
    description: 'Story told through one character\'s perspective',
    icon: User
  },
  {
    id: 'multiple',
    name: 'Multiple POV',
    description: 'Narrative switches between different characters',
    icon: Users
  },
  {
    id: 'omniscient',
    name: 'Omniscient',
    description: 'All-knowing narrator with access to all thoughts',
    icon: Infinity
  },
  {
    id: 'limited',
    name: 'Limited',
    description: 'Restricted to specific character knowledge',
    icon: Binoculars
  },
  {
    id: 'switching',
    name: 'Switching POV',
    description: 'Dynamic perspective changes following patterns',
    icon: Shuffle
  }
] as const;

export const StyleAndTone: React.FC = () => {
  const [, navigate] = useLocation();
  const [showTechniques, setShowTechniques] = useState(false);
  
  const {
    selectedStyle,
    selectedTechniques,
    selectedPOV,
    vocabularyLevel,
    dialogFormality,
    setSelectedStyle,
    setSelectedTechniques,
    setSelectedPOV,
    setVocabularyLevel,
    setDialogFormality
  } = useStyleStore();

  const handleStyleSelect = (styleId: keyof typeof PRIMARY_STYLES) => {
    if (styleId !== selectedStyle) {
      setSelectedTechniques([]);
    }
    setSelectedStyle(styleId);
    setShowTechniques(true);
  };

  const handleTechniqueToggle = (techniqueId: string) => {
    setSelectedTechniques(
      selectedTechniques.includes(techniqueId)
        ? selectedTechniques.filter(id => id !== techniqueId)
        : selectedTechniques.length >= 3
          ? selectedTechniques
          : [...selectedTechniques, techniqueId]
    );
  };

  const canContinue = selectedStyle && 
                     selectedTechniques.length >= 2 && 
                     selectedPOV;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[90%] mx-auto py-6 space-y-6"
    >
      {/* Enhanced Header */}
      <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Style & Tone
          </h2>
          <p className="text-sm text-slate-600">Shape your story's voice and narrative style</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/themes/expression")}
            className="gap-2 group border-slate-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/preview")}
            disabled={!canContinue}
            className={cn(
              "gap-2 group transition-all duration-300",
              canContinue
                ? "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-md shadow-indigo-200/50"
                : "bg-slate-100 text-slate-400"
            )}
          >
            Continue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Primary Writing Style - Full Width */}
        <Card className="shadow-sm bg-gradient-to-br from-white to-slate-50/50">
          <CardHeader className="py-4 px-5 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-50">
                  <BookText className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Primary Writing Style</CardTitle>
                  <CardDescription className="text-sm">Choose your main writing style</CardDescription>
                </div>
              </div>
              {selectedStyle && (
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "px-3 py-1",
                    selectedTechniques.length >= 2
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : "bg-amber-50 text-amber-600 border-amber-200"
                  )}
                >
                  {selectedTechniques.length}/2-3 Selected
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(PRIMARY_STYLES).map(([id, style]) => {
                const Icon = style.icon;
                const isSelected = selectedStyle === id;
                
                return (
                  <motion.button
                    key={id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStyleSelect(id as keyof typeof PRIMARY_STYLES)}
                    className={cn(
                      "relative p-3 rounded-lg text-left transition-all group overflow-hidden h-full aspect-[2/1]",
                      isSelected
                        ? "bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-200 shadow-lg shadow-indigo-100/50"
                        : "bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300",
                          isSelected 
                            ? "bg-gradient-to-br from-indigo-100 to-violet-100" 
                            : "bg-slate-100 group-hover:bg-slate-200"
                        )}>
                          <Icon className={cn(
                            "w-5 h-5",
                            isSelected ? "text-indigo-600" : "text-slate-600"
                          )} />
                        </div>
                        <div className="font-semibold text-base text-slate-900">{style.name}</div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="text-sm text-slate-600 line-clamp-2">{style.description}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {style.techniques.slice(0, 2).map(technique => (
                            <span 
                              key={technique.id} 
                              className={cn(
                                "inline-flex text-xs items-center px-2 py-0.5 rounded-full",
                                isSelected 
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "bg-slate-100 text-slate-600"
                              )}
                            >
                              {technique.name}
                            </span>
                          ))}
                        </div>
                        {isSelected && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowTechniques(true);
                            }}
                            className="w-full mt-auto bg-white hover:bg-slate-50 h-7 text-xs"
                          >
                            Select Techniques
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout for Narrative Perspective and Language Level */}
        <div className="grid grid-cols-12 gap-6">
          {/* Narrative Perspective - 65% width */}
          <div className="col-span-8">
            <Card className="shadow-sm bg-gradient-to-br from-white to-slate-50/50 h-full">
              <CardHeader className="py-4 px-5 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50">
                    <Eye className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Narrative Perspective</CardTitle>
                    <CardDescription className="text-sm">Choose narration style</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-5 gap-3">
                  {POV_OPTIONS.map(pov => {
                    const Icon = pov.icon;
                    const isSelected = selectedPOV === pov.id;
                    
                    return (
                      <motion.button
                        key={pov.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedPOV(pov.id)}
                        className={cn(
                          "aspect-[4/5] p-3 rounded-lg text-left transition-all relative group flex flex-col",
                          isSelected
                            ? "bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-200 shadow-md"
                            : "bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <div className={cn(
                          "p-2 rounded-lg transition-colors duration-300 mb-2",
                          isSelected 
                            ? "bg-gradient-to-br from-indigo-100 to-violet-100" 
                            : "bg-slate-100 group-hover:bg-slate-200"
                        )}>
                          <Icon className={cn(
                            "w-5 h-5",
                            isSelected ? "text-indigo-600" : "text-slate-600"
                          )} />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 text-sm mb-1">{pov.name}</div>
                          <div className="text-xs text-slate-600 line-clamp-3">{pov.description}</div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Language Level - 35% width */}
          <div className="col-span-4">
            <Card className="shadow-sm bg-gradient-to-br from-white to-slate-50/50 h-full">
              <CardHeader className="py-4 px-5 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50">
                    <SlidersHorizontal className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Language Level</CardTitle>
                    <CardDescription className="text-sm">Adjust writing complexity</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-6">
                {/* Vocabulary */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-slate-900">
                      Vocabulary
                    </label>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "px-2.5 py-0.5",
                        vocabularyLevel < 33 
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : vocabularyLevel < 66
                            ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                            : "bg-violet-50 text-violet-600 border-violet-200"
                      )}
                    >
                      {vocabularyLevel < 33 ? "Simple" : vocabularyLevel < 66 ? "Moderate" : "Complex"}
                    </Badge>
                  </div>
                  <div className="pt-2">
                    <Slider
                      value={[vocabularyLevel]}
                      onValueChange={([value]) => setVocabularyLevel(value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs text-slate-500">Basic</span>
                      <span className="text-xs text-slate-500">Advanced</span>
                    </div>
                  </div>
                </div>

                {/* Dialog Formality */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-slate-900">
                      Dialog Style
                    </label>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "px-2.5 py-0.5",
                        dialogFormality < 33 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : dialogFormality < 66
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : "bg-indigo-50 text-indigo-600 border-indigo-200"
                      )}
                    >
                      {dialogFormality < 33 ? "Casual" : dialogFormality < 66 ? "Natural" : "Formal"}
                    </Badge>
                  </div>
                  <div className="pt-2">
                    <Slider
                      value={[dialogFormality]}
                      onValueChange={([value]) => setDialogFormality(value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs text-slate-500">Informal</span>
                      <span className="text-xs text-slate-500">Formal</span>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3">
                  <div className="text-sm font-medium text-slate-900 mb-1">Preview</div>
                  <p className="text-sm text-slate-600">
                    {vocabularyLevel < 33 && dialogFormality < 33 
                      ? "Simple words with casual dialogue"
                      : vocabularyLevel > 66 && dialogFormality > 66
                        ? "Sophisticated vocabulary with formal discourse"
                        : "Balanced language with natural conversation"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Techniques Dialog - Enhanced */}
      <Dialog.Root open={showTechniques && selectedStyle !== null} onOpenChange={setShowTechniques}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] bg-white rounded-xl shadow-xl">
            <div className="p-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Dialog.Title className="text-lg font-semibold text-slate-900">
                    Select Writing Techniques
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-slate-600">
                    Choose 2-3 techniques to define your writing approach
                  </Dialog.Description>
                </div>
                <Dialog.Close className="rounded-lg p-2 hover:bg-slate-100 transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </Dialog.Close>
              </div>
            </div>

            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {selectedStyle && PRIMARY_STYLES[selectedStyle].techniques.map(technique => {
                  const isSelected = selectedTechniques.includes(technique.id);
                  const isDisabled = !isSelected && selectedTechniques.length >= 3;
                  
                  return (
                    <motion.button
                      key={technique.id}
                      whileHover={{ scale: isDisabled ? 1 : 1.01 }}
                      whileTap={{ scale: isDisabled ? 1 : 0.99 }}
                      onClick={() => handleTechniqueToggle(technique.id)}
                      disabled={isDisabled}
                      className={cn(
                        "p-4 rounded-lg text-left transition-all relative group",
                        isSelected
                          ? "bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-200 shadow-md"
                          : isDisabled
                            ? "bg-slate-50 border border-slate-200 opacity-60 cursor-not-allowed"
                            : "bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-slate-900">{technique.name}</div>
                          {isSelected && (
                            <Badge 
                              variant="secondary" 
                              className="bg-indigo-100 text-indigo-600 border-indigo-200"
                            >
                              Selected
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-slate-600">{technique.description}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 bg-gradient-to-br from-slate-50 to-white flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTechniques(false)}
                className="border-slate-300"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => setShowTechniques(false)}
                disabled={selectedTechniques.length < 2}
                className={cn(
                  "transition-all duration-300",
                  selectedTechniques.length >= 2
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-md shadow-indigo-200/50"
                    : "bg-slate-100 text-slate-400"
                )}
              >
                Confirm Selection
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.div>
  );
}; 