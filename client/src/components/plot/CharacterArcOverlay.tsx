import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Star,
  Heart,
  Sword,
  Shield,
  Crown,
} from 'lucide-react';

interface Character {
  id: string;
  name: string;
  color: string;
  icon: React.ElementType;
  visible: boolean;
}

interface DevelopmentPoint {
  id: string;
  characterId: string;
  position: number; // 0-100
  label: string;
  type: 'growth' | 'setback' | 'revelation' | 'decision';
}

const CHARACTERS: Character[] = [
  { id: '1', name: 'Protagonist', color: 'rgb(99 102 241)', icon: Crown, visible: true },
  { id: '2', name: 'Antagonist', color: 'rgb(239 68 68)', icon: Sword, visible: true },
  { id: '3', name: 'Supporting Character', color: 'rgb(34 197 94)', icon: Shield, visible: true },
];

const DEVELOPMENT_POINTS: DevelopmentPoint[] = [
  { id: '1', characterId: '1', position: 20, label: 'Discovers hidden truth', type: 'revelation' },
  { id: '1', characterId: '1', position: 45, label: 'Faces first major defeat', type: 'setback' },
  { id: '1', characterId: '1', position: 75, label: 'Makes crucial choice', type: 'decision' },
  { id: '1', characterId: '1', position: 90, label: 'Overcomes weakness', type: 'growth' },
  { id: '2', characterId: '2', position: 30, label: 'Reveals true nature', type: 'revelation' },
  { id: '2', characterId: '2', position: 60, label: 'Gains upper hand', type: 'growth' },
  { id: '2', characterId: '2', position: 85, label: 'Final confrontation', type: 'decision' },
  { id: '3', characterId: '3', position: 25, label: 'Joins the quest', type: 'decision' },
  { id: '3', characterId: '3', position: 50, label: 'Personal sacrifice', type: 'setback' },
  { id: '3', characterId: '3', position: 80, label: 'Proves loyalty', type: 'growth' },
];

export const CharacterArcOverlay: React.FC = () => {
  const [characters, setCharacters] = useState(CHARACTERS);
  const [developmentPoints, setDevelopmentPoints] = useState(DEVELOPMENT_POINTS);

  const toggleCharacter = (id: string) => {
    setCharacters(prev => prev.map(char => 
      char.id === id ? { ...char, visible: !char.visible } : char
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5 text-indigo-500" />
          <span>Character Arcs</span>
        </CardTitle>
        <CardDescription>
          Track character development alongside plot progression
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Character Toggles */}
        <div className="mb-6 space-y-3">
          {characters.map(character => (
            <div key={character.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {React.createElement(character.icon, {
                  className: `w-4 h-4`,
                  style: { color: character.color }
                })}
                <span className="text-sm font-medium text-slate-700">
                  {character.name}
                </span>
              </div>
              <Switch
                checked={character.visible}
                onCheckedChange={() => toggleCharacter(character.id)}
              />
            </div>
          ))}
        </div>

        {/* Timeline View */}
        <div className="relative h-64 bg-slate-50 rounded-lg p-4">
          {/* Base Timeline */}
          <div className="absolute bottom-12 left-0 right-0 h-0.5 bg-slate-200" />

          {/* Progress Markers */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-between text-xs text-slate-400">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>

          {/* Character Development Points */}
          {characters.map((character, charIndex) => character.visible && (
            <React.Fragment key={character.id}>
              {/* Character Arc Line */}
              <div
                className="absolute h-0.5 bottom-12 left-0 right-0 transition-opacity duration-300"
                style={{
                  backgroundColor: character.color,
                  opacity: 0.3,
                  transform: `translateY(${charIndex * 4}px)`
                }}
              />

              {/* Development Points */}
              {developmentPoints
                .filter(point => point.characterId === character.id)
                .map(point => (
                  <div
                    key={`${character.id}-${point.id}`}
                    className="absolute"
                    style={{
                      left: `${point.position}%`,
                      bottom: `calc(3rem + ${charIndex * 4}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full cursor-pointer transition-transform hover:scale-110"
                      style={{ 
                        backgroundColor: character.color,
                        boxShadow: `0 0 0 2px white, 0 0 0 4px ${character.color}33`
                      }}
                    />
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-medium text-slate-600 bg-white px-1 py-0.5 rounded shadow-sm">
                        {point.label}
                      </span>
                    </div>
                  </div>
                ))}
            </React.Fragment>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-between items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-slate-500">Growth</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3 text-red-500" />
              <span className="text-xs text-slate-500">Revelation</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-slate-500">Decision</span>
            </div>
            <div className="flex items-center space-x-1">
              <Sword className="w-3 h-3 text-purple-500" />
              <span className="text-xs text-slate-500">Setback</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 