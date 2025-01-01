import { create } from 'zustand';

interface StyleState {
  selectedStyle: string | null;
  selectedTechniques: string[];
  selectedPOV: string | null;
  vocabularyLevel: number;
  dialogFormality: number;
  setSelectedStyle: (style: string | null) => void;
  setSelectedTechniques: (techniques: string[]) => void;
  setSelectedPOV: (pov: string | null) => void;
  setVocabularyLevel: (level: number) => void;
  setDialogFormality: (level: number) => void;
}

export const useStyleStore = create<StyleState>((set) => ({
  selectedStyle: null,
  selectedTechniques: [],
  selectedPOV: null,
  vocabularyLevel: 50,
  dialogFormality: 50,
  setSelectedStyle: (style) => set({ selectedStyle: style }),
  setSelectedTechniques: (techniques) => set({ selectedTechniques: techniques }),
  setSelectedPOV: (pov) => set({ selectedPOV: pov }),
  setVocabularyLevel: (level) => set({ vocabularyLevel: level }),
  setDialogFormality: (level) => set({ dialogFormality: level }),
})); 