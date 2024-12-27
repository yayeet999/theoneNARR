import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import {
  UserPlus,
  Users,
  User,
  UserCheck,
  Shield,
  Brain,
  Heart,
  Smile,
  AlertCircle
} from 'lucide-react';

// Types
interface Character {
  id: string;
  name: string;
  age: number;
  gender: string;
  role: string;
  description: string;
}

interface CharacterCard {
  character: Character;
  onClick: () => void;
}

// Components
const CharacterCard: React.FC<CharacterCard> = ({ character, onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex-shrink-0 w-[280px]"
  >
    <Card
      className={cn(
        "h-[360px] cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02]"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-slate-600" />
          <h3 className="font-medium text-lg">{character.name}</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span className="text-sm text-slate-600">{character.role}</span>
          </div>
          <p className="text-sm text-slate-500 line-clamp-3">{character.description}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const AddCharacterCard: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex-shrink-0 w-[280px]"
  >
    <Card
      className={cn(
        "h-[360px] cursor-pointer transition-all duration-300 border-dashed",
        "hover:shadow-lg hover:scale-[1.02] hover:border-indigo-300",
        "flex items-center justify-center"
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center text-center p-6">
        <UserPlus className="w-12 h-12 text-slate-400 mb-4" />
        <h3 className="font-medium text-lg text-slate-900">Add Character</h3>
        <p className="text-sm text-slate-500 mt-2">Create a new character for your story</p>
      </CardContent>
    </Card>
  </motion.div>
);

const CharacterCreationHub: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  
  const handleCreateCharacter = () => {
    setIsCreating(true);
    setShowTutorial(false);
  };

  const handleEditCharacter = (characterId: string) => {
    console.log('Edit character:', characterId);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Character Creation Hub</h1>
          <p className="text-slate-600 mt-2">Build your cast of characters</p>
        </div>

        {!isCreating ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {characters.length === 0 ? (
              <div className="text-center py-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleCreateCharacter}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-6 text-lg rounded-xl"
                  >
                    <UserPlus className="w-6 h-6 mr-2" />
                    Create Your First Character
                  </Button>
                </motion.div>
                <div className="mt-4 text-sm text-slate-500">
                  {characters.length}/7 Characters Created
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="flex space-x-6 overflow-x-auto pb-6">
                  {characters.map((character) => (
                    <CharacterCard
                      key={character.id}
                      character={character}
                      onClick={() => handleEditCharacter(character.id)}
                    />
                  ))}
                  {characters.length < 7 && (
                    <AddCharacterCard onClick={handleCreateCharacter} />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8"
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Basic Information</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Character Name</Label>
                <Input id="name" placeholder="Enter character name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Enter age" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <div className="grid grid-cols-4 gap-4 mt-1">
                  {['Male', 'Female', 'Non-binary', 'Other'].map((gender) => (
                    <Button
                      key={gender}
                      variant="outline"
                      className="w-full"
                    >
                      {gender}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="description">Initial Description</Label>
                <textarea
                  id="description"
                  className="w-full mt-1 rounded-md border border-slate-200 p-3"
                  rows={3}
                  placeholder="Add a brief description or concept for your character"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CharacterCreationHub;
