import { create } from 'zustand';

export interface Theme {
  id: string;
  name: string;
}

export interface ThemeExpressions {
  themeId: string;
  thematicConflict: string[];
  characterTruth: string[];
  storyEvolution: string[];
  parallelElements: string[];
  worldImpact: string[];
  thematicEchoes: string[];
}

interface ThemeState {
  primaryTheme: Theme | null;
  supportingThemes: Theme[];
  primaryExpressions: ThemeExpressions[];
  supportingExpressions: ThemeExpressions[];
  setPrimaryTheme: (theme: Theme | null) => void;
  setSupportingThemes: (themes: Theme[]) => void;
  setPrimaryExpressions: (expressions: ThemeExpressions[]) => void;
  setSupportingExpressions: (expressions: ThemeExpressions[]) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  primaryTheme: null,
  supportingThemes: [],
  primaryExpressions: [],
  supportingExpressions: [],
  setPrimaryTheme: (theme) => set({ primaryTheme: theme }),
  setSupportingThemes: (themes) => set({ supportingThemes: themes }),
  setPrimaryExpressions: (expressions) => set({ primaryExpressions: expressions }),
  setSupportingExpressions: (expressions) => set({ supportingExpressions: expressions }),
})); 