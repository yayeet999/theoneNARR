import { create } from 'zustand';

export interface Character {
  id: string;
  name: string;
  role: string;
  archetype?: string;
  traits?: {
    majorStrengths: Array<{ id: string; description: string }>;
    minorStrengths: Array<{ id: string; description: string }>;
    majorFlaws: Array<{ id: string; description: string }>;
    minorFlaws: Array<{ id: string; description: string }>;
  };
  personality?: {
    traits: Array<{ id: string; trait: string; score: number }>;
    beliefs: Array<{ id: string; belief: string; strength: number }>;
  };
  goals?: Array<{ id: string; type: 'primary' | 'secondary'; description: string }>;
  background?: {
    lifeEvents: Array<{
      id: string;
      type: 'early_life' | 'defining_moment' | 'major_victory' | 'significant_loss';
      age: number;
      description: string;
    }>;
  };
}

export interface Relationship {
  id: string;
  type: 'family' | 'friend' | 'rival' | 'mentor' | 'student' | 'ally' | 'enemy' | 'romantic';
  sourceCharacter: string;
  targetCharacter: string;
  attributes: {
    trustLevel: number;
    loyaltyScale: number;
    conflictPotential: number;
    powerDynamic: number;
    emotionalBond: number;
  };
}

interface CharacterState {
  characters: Character[];
  relationships: Relationship[];
  addCharacter: (character: Character) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  removeCharacter: (id: string) => void;
  addRelationship: (relationship: Relationship) => void;
  updateRelationship: (id: string, updates: Partial<Relationship>) => void;
  removeRelationship: (id: string) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  characters: [],
  relationships: [],
  
  addCharacter: (character) => 
    set((state) => ({ characters: [...state.characters, character] })),
  
  updateCharacter: (id, updates) =>
    set((state) => ({
      characters: state.characters.map((char) =>
        char.id === id ? { ...char, ...updates } : char
      ),
    })),
  
  removeCharacter: (id) =>
    set((state) => ({
      characters: state.characters.filter((char) => char.id !== id),
    })),
  
  addRelationship: (relationship) =>
    set((state) => ({ relationships: [...state.relationships, relationship] })),
  
  updateRelationship: (id, updates) =>
    set((state) => ({
      relationships: state.relationships.map((rel) =>
        rel.id === id ? { ...rel, ...updates } : rel
      ),
    })),
  
  removeRelationship: (id) =>
    set((state) => ({
      relationships: state.relationships.filter((rel) => rel.id !== id),
    })),
})); 