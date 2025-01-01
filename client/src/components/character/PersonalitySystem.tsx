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
  Brain,
  Heart,
  Scale,
  Sparkles,
  Star,
  ThumbsUp,
  Plus,
  AlertCircle,
  Shuffle
} from 'lucide-react';
import CoreBeliefs from './CoreBeliefs';

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

interface Props {
  personalityTraits: PersonalityTrait[];
  beliefs: Belief[];
  onAddTrait: (trait: PersonalityTrait) => void;
  onRemoveTrait: (id: string) => void;
  onAddBelief: (belief: Belief) => void;
  onRemoveBelief: (id: string) => void;
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
  },
  {
    name: 'Adaptability',
    description: 'Flexibility in facing changes and challenges',
    icon: Shuffle
  }
];

export const PersonalitySystem: React.FC<Props> = ({
  personalityTraits,
  beliefs,
  onAddTrait,
  onRemoveTrait,
  onAddBelief,
  onRemoveBelief
}) => {
  const [newTrait, setNewTrait] = useState<Partial<PersonalityTrait>>({});

  const handleTraitAdd = () => {
    if (newTrait.trait && newTrait.score) {
      onAddTrait({
        id: Math.random().toString(36).substr(2, 9),
        trait: newTrait.trait,
        score: newTrait.score,
        manifestation: ''
      });
      setNewTrait({});
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Core Beliefs & Values Section */}
      <CoreBeliefs
        beliefs={beliefs}
        onAddBelief={onAddBelief}
        onRemoveBelief={onRemoveBelief}
      />
    </div>
  );
};

export default PersonalitySystem;
