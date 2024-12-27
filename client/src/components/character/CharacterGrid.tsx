import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { CharacterCard } from './CharacterCard';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

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

interface CharacterGridProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
  onCreateClick: () => void;
  maxCharacters?: number;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  onCharacterClick,
  onCreateClick,
  maxCharacters = 7
}) => {
  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="flex gap-6">
        <AnimatePresence>
          {characters.map((character) => (
            <motion.div
              key={character.id}
              layout
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-[280px] flex-shrink-0"
            >
              <CharacterCard
                character={character}
                onClick={() => onCharacterClick(character)}
              />
            </motion.div>
          ))}

          {/* Add Character Card */}
          {characters.length < maxCharacters && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-[280px] flex-shrink-0"
            >
              <div className="h-full flex items-center justify-center">
                <Button
                  onClick={onCreateClick}
                  variant="outline"
                  size="lg"
                  className="w-full h-[200px] border-2 border-dashed hover:border-primary hover:bg-primary/5 transition-colors duration-200"
                >
                  <Plus className="w-6 h-6 mr-2" />
                  Add Character
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Limit Indicator */}
        <div className="absolute top-4 right-4 text-sm text-slate-500">
          {characters.length}/{maxCharacters} Characters
        </div>
      </div>

      {/* Scroll Indicators */}
      {characters.length > 0 && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </>
      )}
    </div>
  );
};

export default CharacterGrid;
