import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Crown,
  Sword,
  GraduationCap,
  Sparkles,
  Heart,
  MessageCircle,
  Scale
} from 'lucide-react';
import cn from 'classnames';

interface Character {
  id: string;
  name: string;
  role: string;
  age: number;
  traits: string[];
  relationships: number;
  archetype?: string;
  personalityHighlights: string[];
}

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

const roleIcons = {
  'Protagonist': Crown,
  'Antagonist': Sword,
  'Mentor': GraduationCap,
  'Supporting': Users,
  'Catalyst': Sparkles,
  'Confidant': MessageCircle,
  'Foil': Scale,
  'Love Interest': Heart,
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick
}) => {
  const Icon = roleIcons[character.role as keyof typeof roleIcons] || Users;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 },
        scale: { duration: 0.15 }
      }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors duration-200">
        <CardContent className="p-6">
          {/* Role Badge */}
          <div className={cn(
            "absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium",
            "flex items-center gap-1",
            character.role === 'Protagonist' ? "bg-amber-100 text-amber-700" :
            character.role === 'Antagonist' ? "bg-red-100 text-red-700" :
            character.role === 'Mentor' ? "bg-purple-100 text-purple-700" :
            character.role === 'Supporting' ? "bg-blue-100 text-blue-700" :
            character.role === 'Catalyst' ? "bg-green-100 text-green-700" :
            "bg-slate-100 text-slate-700"
          )}>
            <Icon className="w-3 h-3" />
            {character.role}
          </div>

          {/* Character Name and Age */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-slate-900">{character.name}</h3>
            <p className="text-sm text-slate-500">Age {character.age}</p>
          </div>

          {/* Archetype Badge */}
          {character.archetype && (
            <div className="mb-4">
              <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                {character.archetype}
              </span>
            </div>
          )}

          {/* Personality Traits */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Key Traits</h4>
            <div className="flex flex-wrap gap-1">
              {character.personalityHighlights.map((trait, index) => (
                <span
                  key={index}
                  className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Relationship Indicator */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            <div className="flex items-center text-sm text-slate-600">
              <Users className="w-4 h-4 mr-2" />
              {character.relationships} Relationships
            </div>
          </div>

          {/* Interactive Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CharacterCard;
