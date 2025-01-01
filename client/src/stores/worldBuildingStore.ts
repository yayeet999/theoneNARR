import { create } from 'zustand';

export interface Setting {
  id: string;
  name: string;
  description: string;
  category: 'contained' | 'expansive';
}

export interface WorldSystem {
  category: string;
  setting: Setting | null;
  timePeriod: string | null;
  magicLevel: number;
  technologyLevel: number;
  socialComplexity: number;
  environmentalDiversity: number;
  culturalRange: number;
  supernaturalPresence: number;
  culturalTags: string[];
}

interface WorldBuildingState {
  worldSystem: WorldSystem;
  setWorldSystem: (worldSystem: Partial<WorldSystem>) => void;
}

const initialWorldSystem: WorldSystem = {
  category: '',
  setting: null,
  timePeriod: null,
  magicLevel: 0,
  technologyLevel: 50,
  socialComplexity: 50,
  environmentalDiversity: 50,
  culturalRange: 50,
  supernaturalPresence: 0,
  culturalTags: []
};

export const useWorldBuildingStore = create<WorldBuildingState>((set) => ({
  worldSystem: initialWorldSystem,
  setWorldSystem: (updates) => set((state) => ({
    worldSystem: { ...state.worldSystem, ...updates }
  }))
})); 