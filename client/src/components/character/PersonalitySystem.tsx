import React, { useState } from 'react';
import { motion } from "framer-motion";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  Heart,
  Scale,
  Sparkles,
  Star,
  ThumbsUp,
  Plus,
  AlertCircle
} from 'lucide-react';

interface PersonalityTrait {
  id: string;
  trait: string;
  score: number; // 1-10
  manifestation: string; // How this trait manifests in behavior
}

interface Belief {
  id: string;
  belief: string;
  strength: number; // 1-10
  impact: string; // How this belief affects decisions/actions
}

interface EmotionalState {
  id: string;
  emotion: string;
  intensity: number; // 1-10
  trigger: string;
  duration: string;
}

interface Props {
  personalityTraits: PersonalityTrait[];
  beliefs: Belief[];
  emotionalStates: EmotionalState[];
  onAddTrait: (trait: PersonalityTrait) => void;
  onRemoveTrait: (id: string) => void;
  onAddBelief: (belief: Belief) => void;
  onRemoveBelief: (id: string) => void;
  onAddEmotionalState: (state: EmotionalState) => void;
  onRemoveEmotionalState: (id: string) => void;
}

const PERSONALITY_DIMENSIONS = [
  {
    name: 'Openness',
    description: 'Curiosity and willingness to try new experiences',
    icon: Sparkles
  },
  {
    name: 'Conscientiousness',
    description: 'Organization and goal-directed behavior',
    icon: Star
  },
  {
    name: 'Extraversion',
    description: 'Social energy and interaction preference',
    icon: Heart
  },
  {
    name: 'Agreeableness',
    description: 'Cooperation and consideration of others',
    icon: ThumbsUp
  },
  {
    name: 'Neuroticism',
    description: 'Emotional stability and stress response',
    icon: Brain
  }
];

export const PersonalitySystem: React.FC<Props> = ({
  personalityTraits,
  beliefs,
  emotionalStates,
  onAddTrait,
  onRemoveTrait,
  onAddBelief,
  onRemoveBelief,
  onAddEmotionalState,
  onRemoveEmotionalState
}) => {
  const [newTrait, setNewTrait] = useState<Partial<PersonalityTrait>>({});
  const [newBelief, setNewBelief] = useState<Partial<Belief>>({});
  const [newEmotionalState, setNewEmotionalState] = useState<Partial<EmotionalState>>({});

  const handleTraitAdd = () => {
    if (newTrait.trait && newTrait.score && newTrait.manifestation) {
      onAddTrait({
        id: Math.random().toString(36).substr(2, 9),
        trait: newTrait.trait,
        score: newTrait.score,
        manifestation: newTrait.manifestation
      });
      setNewTrait({});
    }
  };

  const handleBeliefAdd = () => {
    if (newBelief.belief && newBelief.strength && newBelief.impact) {
      onAddBelief({
        id: Math.random().toString(36).substr(2, 9),
        belief: newBelief.belief,
        strength: newBelief.strength,
        impact: newBelief.impact
      });
      setNewBelief({});
    }
  };

  const handleEmotionalStateAdd = () => {
    if (newEmotionalState.emotion && newEmotionalState.intensity && 
        newEmotionalState.trigger && newEmotionalState.duration) {
      onAddEmotionalState({
        id: Math.random().toString(36).substr(2, 9),
        emotion: newEmotionalState.emotion,
        intensity: newEmotionalState.intensity,
        trigger: newEmotionalState.trigger,
        duration: newEmotionalState.duration
      });
      setNewEmotionalState({});
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-slate-900">Personality & Psychology</h2>

      {/* Personality Traits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-violet-500" />
            <span>Core Personality Traits</span>
          </CardTitle>
          <CardDescription>Define your character's fundamental personality dimensions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PERSONALITY_DIMENSIONS.map(dimension => (
              <div
                key={dimension.name}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50"
              >
                <div className="flex items-center space-x-2 mb-2">
                  {React.createElement(dimension.icon, {
                    className: "w-4 h-4 text-violet-500"
                  })}
                  <h3 className="font-medium text-slate-900">{dimension.name}</h3>
                </div>
                <p className="text-sm text-slate-500 mb-3">{dimension.description}</p>
                <input
                  type="range"
                  min="1"
                  max="10"
                  className="w-full"
                  value={
                    personalityTraits.find(t => t.trait === dimension.name)?.score || 5
                  }
                  onChange={(e) => {
                    const existing = personalityTraits.find(t => t.trait === dimension.name);
                    if (existing) {
                      onRemoveTrait(existing.id);
                    }
                    onAddTrait({
                      id: Math.random().toString(36).substr(2, 9),
                      trait: dimension.name,
                      score: parseInt(e.target.value),
                      manifestation: existing?.manifestation || ''
                    });
                  }}
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Low</span>
                  <span>High</span>
                </div>
                <Input
                  placeholder="How does this trait manifest?"
                  className="mt-2"
                  value={
                    personalityTraits.find(t => t.trait === dimension.name)?.manifestation || ''
                  }
                  onChange={(e) => {
                    const existing = personalityTraits.find(t => t.trait === dimension.name);
                    if (existing) {
                      onRemoveTrait(existing.id);
                    }
                    onAddTrait({
                      id: Math.random().toString(36).substr(2, 9),
                      trait: dimension.name,
                      score: existing?.score || 5,
                      manifestation: e.target.value
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Beliefs & Values Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-amber-500" />
            <span>Core Beliefs & Values</span>
          </CardTitle>
          <CardDescription>Define what your character believes in and values most</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {beliefs.map(belief => (
            <motion.div
              key={belief.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-2 bg-slate-50 p-3 rounded-md"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{belief.belief}</p>
                <p className="text-xs text-slate-500">Strength: {belief.strength}/10</p>
                <p className="text-xs text-slate-500">Impact: {belief.impact}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveBelief(belief.id)}
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
              </Button>
            </motion.div>
          ))}
          
          <div className="space-y-4">
            <Input
              placeholder="Belief or value"
              value={newBelief.belief || ''}
              onChange={(e) => setNewBelief(prev => ({ ...prev, belief: e.target.value }))}
            />
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label>Strength (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newBelief.strength || ''}
                  onChange={(e) => setNewBelief(prev => ({ ...prev, strength: parseInt(e.target.value) }))}
                />
              </div>
              <div className="flex-1">
                <Label>Impact on Character</Label>
                <Input
                  value={newBelief.impact || ''}
                  onChange={(e) => setNewBelief(prev => ({ ...prev, impact: e.target.value }))}
                  placeholder="How does this affect decisions?"
                />
              </div>
            </div>
            <Button
              onClick={handleBeliefAdd}
              className="w-full"
              disabled={!newBelief.belief || !newBelief.strength || !newBelief.impact}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Belief/Value
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emotional States Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Emotional States</span>
          </CardTitle>
          <CardDescription>Track your character's emotional journey and responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {emotionalStates.map(state => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-2 bg-slate-50 p-3 rounded-md"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{state.emotion}</p>
                <p className="text-xs text-slate-500">Intensity: {state.intensity}/10</p>
                <p className="text-xs text-slate-500">Trigger: {state.trigger}</p>
                <p className="text-xs text-slate-500">Duration: {state.duration}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveEmotionalState(state.id)}
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
              </Button>
            </motion.div>
          ))}
          
          <div className="space-y-4">
            <Input
              placeholder="Emotional state"
              value={newEmotionalState.emotion || ''}
              onChange={(e) => setNewEmotionalState(prev => ({ ...prev, emotion: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Intensity (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newEmotionalState.intensity || ''}
                  onChange={(e) => setNewEmotionalState(prev => ({ ...prev, intensity: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={newEmotionalState.duration || ''}
                  onChange={(e) => setNewEmotionalState(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="How long does it last?"
                />
              </div>
            </div>
            <div>
              <Label>Trigger</Label>
              <Input
                value={newEmotionalState.trigger || ''}
                onChange={(e) => setNewEmotionalState(prev => ({ ...prev, trigger: e.target.value }))}
                placeholder="What causes this emotion?"
              />
            </div>
            <Button
              onClick={handleEmotionalStateAdd}
              className="w-full"
              disabled={!newEmotionalState.emotion || !newEmotionalState.intensity || 
                       !newEmotionalState.trigger || !newEmotionalState.duration}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Emotional State
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalitySystem;
