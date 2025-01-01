import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Palette, 
  Eye,
  Globe2,
  Users,
  Clock,
  Mountain,
  Brain,
  Target,
  Activity,
  LayoutList,
  Crown,
  Heart,
  Sword,
  Shield,
  UserCircle2,
  Star
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useStyleStore } from '@/stores/styleStore';
import { useThemeStore } from '@/stores/themeStore';
import { usePlotStructureStore } from '@/stores/plotStructureStore';
import { PRIMARY_STYLES } from '@/components/style/StyleAndTone';
import { useCharacterStore, Character, Relationship } from '@/stores/characterStore';
import { useWorldBuildingStore } from '@/stores/worldBuildingStore';

// Add type for PRIMARY_STYLES
type StyleKey = keyof typeof PRIMARY_STYLES;
type StyleTechnique = {
  id: string;
  name: string;
  description: string;
};

// Add types for scene-related data
interface SceneType {
  type: string;
  percentage: number;
}

interface SceneLength {
  type: string;
  percentage: number;
}

interface TensionPoint {
  point: string;
  level: number;
}

const NovelPreview: React.FC = () => {
  const [, navigate] = useLocation();
  
  // Import all necessary store states
  const {
    selectedStyle,
    selectedTechniques,
    selectedPOV,
    vocabularyLevel,
    dialogFormality
  } = useStyleStore();

  const {
    primaryTheme,
    primaryExpressions,
    supportingThemes,
    supportingExpressions
  } = useThemeStore();

  const {
    selectedStructure,
    conflicts,
    stakes,
    subplots,
    storySummary,
    overallPace,
    sceneTypes,
    sceneLengths,
    tensionPoints,
    showMomentumTracker,
    showCharacterArcs,
    showMultipleViewpoints
  } = usePlotStructureStore();

  // Add character store state
  const { characters, relationships } = useCharacterStore();

  // Add world building store state
  const { worldSystem } = useWorldBuildingStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[90%] mx-auto py-6 space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Novel Preview
          </h2>
          <p className="text-sm text-slate-600">Review your story parameters before generation</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/style")}
            className="gap-2 group border-slate-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/generate")}
            className="gap-2 group bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-md shadow-indigo-200/50"
          >
            Generate Novel
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Characters Section - Full Width */}
        <div className="col-span-12 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <UserCircle2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Characters</CardTitle>
                  <CardDescription className="text-sm">Cast of characters and their relationships</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-3 gap-6">
                {/* Character Cards */}
                {characters.map((character, index) => (
                  <div key={index} className="space-y-4 p-4 rounded-lg border border-slate-200 bg-white/50">
                    <div className="flex items-center gap-2">
                      {character.role === 'Protagonist' && <Crown className="w-4 h-4 text-amber-500" />}
                      {character.role === 'Antagonist' && <Sword className="w-4 h-4 text-red-500" />}
                      {character.role === 'Supporting' && <Shield className="w-4 h-4 text-blue-500" />}
                      <h3 className="font-medium text-slate-900">{character.name}</h3>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-slate-600">Role: </span>
                        <span className="text-sm font-medium">{character.role}</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Archetype: </span>
                        <span className="text-sm font-medium">{character.archetype}</span>
                      </div>
                    </div>

                    {/* Character Traits */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-700">Key Traits</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {character.traits?.majorStrengths.map((trait, i) => (
                          <Badge key={i} variant="secondary" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                            {trait.description}
                          </Badge>
                        ))}
                        {character.traits?.majorFlaws.map((trait, i) => (
                          <Badge key={i} variant="secondary" className="bg-rose-50 text-rose-600 border-rose-200">
                            {trait.description}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Personality & Beliefs */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-700">Personality</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {character.personality?.traits.map((trait, i) => (
                          <Badge key={i} variant="secondary" className="bg-violet-50 text-violet-600 border-violet-200">
                            {trait.trait}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Goals and Motivations */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-700">Goals & Motivations</h4>
                      <div className="text-sm text-slate-600">
                        {character.goals?.map((goal, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Target className="w-3 h-3" />
                            <span>{goal.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Character Relationships */}
              {relationships && relationships.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h3 className="font-medium text-slate-900">Character Relationships</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {relationships.map((rel, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <Heart className="w-4 h-4 text-pink-500" />
                          <div>
                            <div className="text-sm font-medium">{rel.type}</div>
                            <div className="text-xs text-slate-500">
                              {rel.sourceCharacter} → {rel.targetCharacter}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-slate-600">
                          Trust: {rel.attributes.trustLevel}/10
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* World Building Section - 6 columns */}
        <div className="col-span-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50">
                  <Globe2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">World Building</CardTitle>
                  <CardDescription className="text-sm">Setting and world system parameters</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              {/* Setting & Time Period */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-900">Setting & Time Period</h3>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                    {worldSystem?.category || 'Not Set'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Primary Setting</span>
                    <p className="text-sm text-slate-600">{worldSystem?.setting?.name || 'Not Set'}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Time Period</span>
                    <p className="text-sm text-slate-600">{worldSystem?.timePeriod || 'Not Set'}</p>
                  </div>
                </div>
              </div>

              {/* World System Parameters */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">World System Parameters</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Magic Level</span>
                      <span className="text-sm text-slate-600">{worldSystem?.magicLevel}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div 
                        className="h-full rounded-full bg-emerald-500" 
                        style={{ width: `${worldSystem?.magicLevel || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Technology Level</span>
                      <span className="text-sm text-slate-600">{worldSystem?.technologyLevel}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div 
                        className="h-full rounded-full bg-emerald-500" 
                        style={{ width: `${worldSystem?.technologyLevel || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Social Complexity</span>
                      <span className="text-sm text-slate-600">{worldSystem?.socialComplexity}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div 
                        className="h-full rounded-full bg-emerald-500" 
                        style={{ width: `${worldSystem?.socialComplexity || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Environmental Diversity</span>
                      <span className="text-sm text-slate-600">{worldSystem?.environmentalDiversity}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div 
                        className="h-full rounded-full bg-emerald-500" 
                        style={{ width: `${worldSystem?.environmentalDiversity || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cultural Elements */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Cultural Elements</h3>
                <div className="flex flex-wrap gap-2">
                  {worldSystem?.culturalTags?.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="secondary" 
                      className="bg-emerald-50 text-emerald-600 border-emerald-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Theme Expression Section - 6 columns */}
        <div className="col-span-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-50">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Theme Expression</CardTitle>
                  <CardDescription className="text-sm">How themes manifest in your story</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              {/* Primary Theme Expression */}
              {primaryTheme && primaryExpressions?.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <h3 className="font-medium text-slate-900">{primaryTheme.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-slate-700">Thematic Conflicts</span>
                      <div className="space-y-1">
                        {primaryExpressions[0].thematicConflict.map((conflict, index) => (
                          <p key={index} className="text-sm text-slate-600">{conflict}</p>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-slate-700">Character Truths</span>
                      <div className="space-y-1">
                        {primaryExpressions[0].characterTruth.map((truth, index) => (
                          <p key={index} className="text-sm text-slate-600">{truth}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Supporting Theme Expressions */}
              {supportingThemes?.length > 0 && supportingExpressions?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-900">Supporting Themes</h3>
                  <div className="space-y-6">
                    {supportingThemes.map((theme, index) => (
                      <div key={theme.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-violet-500" />
                          <span className="font-medium text-slate-800">{theme.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-slate-700">World Impact</span>
                            <div className="space-y-1">
                              {supportingExpressions[index]?.worldImpact.map((impact, i) => (
                                <p key={i} className="text-sm text-slate-600">{impact}</p>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-slate-700">Thematic Echoes</span>
                            <div className="space-y-1">
                              {supportingExpressions[index]?.thematicEchoes.map((echo, i) => (
                                <p key={i} className="text-sm text-slate-600">{echo}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Plot Structure Section - Expanded */}
        <div className="col-span-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="py-4 px-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50">
                  <Activity className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Plot Structure</CardTitle>
                  <CardDescription className="text-sm">Story pacing and narrative flow</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              {/* Scene Types and Pacing */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Scene Structure</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Scene Types</span>
                    <div className="space-y-1">
                      {sceneTypes?.map((type: SceneType, index) => (
                        <p key={index} className="text-sm text-slate-600">{type.type} ({type.percentage}%)</p>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Scene Lengths</span>
                    <div className="space-y-1">
                      {sceneLengths?.map((length: SceneLength, index) => (
                        <p key={index} className="text-sm text-slate-600">{length.type} ({length.percentage}%)</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tension Points */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Narrative Tension</h3>
                <div className="space-y-2">
                  {tensionPoints?.map((point: TensionPoint, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Mountain className="w-4 h-4 text-amber-500" />
                      <p className="text-sm text-slate-600">{point.point} (Level: {point.level})</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story Features */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Story Features</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className={cn(
                    "transition-colors",
                    showMomentumTracker 
                      ? "bg-amber-50 text-amber-600 border-amber-200"
                      : "bg-slate-100 text-slate-500"
                  )}>
                    Momentum Tracker
                  </Badge>
                  <Badge variant="secondary" className={cn(
                    "transition-colors",
                    showCharacterArcs
                      ? "bg-amber-50 text-amber-600 border-amber-200"
                      : "bg-slate-100 text-slate-500"
                  )}>
                    Character Arcs
                  </Badge>
                  <Badge variant="secondary" className={cn(
                    "transition-colors",
                    showMultipleViewpoints
                      ? "bg-amber-50 text-amber-600 border-amber-200"
                      : "bg-slate-100 text-slate-500"
                  )}>
                    Multiple Viewpoints
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default NovelPreview; 