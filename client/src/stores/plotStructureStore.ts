import { create } from 'zustand';

interface StoryStructure {
  id: string;
  name: string;
  description: string;
  icon?: React.ElementType;
}

interface Conflict {
  type: string;
  selected: boolean;
}

interface Stakes {
  personal: number;
  professional: number;
  societal: number;
  existential: number;
}

interface Subplot {
  id: string;
  type: string;
  importance: 'Major' | 'Supporting' | 'Minor';
  description: string;
}

interface SceneType {
  type: 'action' | 'dialogue' | 'reflection' | 'worldbuilding';
  percentage: number;
}

interface SceneLength {
  type: 'short' | 'medium' | 'long';
  percentage: number;
}

interface TensionPoint {
  id: string;
  position: number;
  tension: number;
  label?: string;
  isMajorPeak?: boolean;
}

interface PlotStructureState {
  // Structure Selection
  selectedStructure: StoryStructure | null;
  setSelectedStructure: (structure: StoryStructure) => void;

  // Core Elements
  conflicts: Conflict[];
  setConflicts: (updater: Conflict[] | ((prev: Conflict[]) => Conflict[])) => void;
  stakes: Stakes;
  setStakes: (stakes: Stakes) => void;
  subplots: Subplot[];
  setSubplots: (updater: Subplot[] | ((prev: Subplot[]) => Subplot[])) => void;
  storySummary: string;
  setStorySummary: (summary: string) => void;

  // Pacing & Integration
  overallPace: number;
  setOverallPace: (pace: number) => void;
  sceneTypes: SceneType[];
  setSceneTypes: (types: SceneType[]) => void;
  sceneLengths: SceneLength[];
  setSceneLengths: (lengths: SceneLength[]) => void;
  tensionPoints: TensionPoint[];
  setTensionPoints: (points: TensionPoint[]) => void;

  // Integration Features
  showMomentumTracker: boolean;
  setShowMomentumTracker: (show: boolean) => void;
  showCharacterArcs: boolean;
  setShowCharacterArcs: (show: boolean) => void;
  showMultipleViewpoints: boolean;
  setShowMultipleViewpoints: (show: boolean) => void;
}

const DEFAULT_CONFLICTS: Conflict[] = [
  { type: 'person-vs-person', selected: false },
  { type: 'person-vs-nature', selected: false },
  { type: 'person-vs-society', selected: false },
  { type: 'person-vs-self', selected: false },
  { type: 'person-vs-fate', selected: false },
  { type: 'person-vs-technology', selected: false }
];

const DEFAULT_STAKES: Stakes = {
  personal: 5,
  professional: 5,
  societal: 5,
  existential: 5
};

const DEFAULT_SCENE_TYPES: SceneType[] = [
  { type: 'action', percentage: 25 },
  { type: 'dialogue', percentage: 25 },
  { type: 'reflection', percentage: 25 },
  { type: 'worldbuilding', percentage: 25 }
];

const DEFAULT_SCENE_LENGTHS: SceneLength[] = [
  { type: 'short', percentage: 30 },
  { type: 'medium', percentage: 50 },
  { type: 'long', percentage: 20 }
];

const DEFAULT_TENSION_POINTS: TensionPoint[] = [
  { id: '1', position: 0, tension: 3, label: 'Opening' },
  { id: '2', position: 25, tension: 6, label: 'First Major Conflict', isMajorPeak: true },
  { id: '3', position: 50, tension: 8, label: 'Midpoint Crisis', isMajorPeak: true },
  { id: '4', position: 75, tension: 7, label: 'Rising Action' },
  { id: '5', position: 90, tension: 10, label: 'Climax', isMajorPeak: true },
  { id: '6', position: 100, tension: 4, label: 'Resolution' }
];

export const usePlotStructureStore = create<PlotStructureState>((set) => ({
  // Structure Selection
  selectedStructure: null,
  setSelectedStructure: (structure) => set({ selectedStructure: structure }),

  // Core Elements
  conflicts: DEFAULT_CONFLICTS,
  setConflicts: (updater) => set((state) => ({ 
    conflicts: typeof updater === 'function' ? updater(state.conflicts) : updater 
  })),
  stakes: DEFAULT_STAKES,
  setStakes: (stakes) => set({ stakes }),
  subplots: [] as Subplot[],
  setSubplots: (updater) => set((state) => ({ 
    subplots: typeof updater === 'function' ? updater(state.subplots) : updater 
  })),
  storySummary: '',
  setStorySummary: (summary) => set({ storySummary: summary }),

  // Pacing & Integration
  overallPace: 5,
  setOverallPace: (pace) => set({ overallPace: pace }),
  sceneTypes: DEFAULT_SCENE_TYPES,
  setSceneTypes: (types) => set({ sceneTypes: types }),
  sceneLengths: DEFAULT_SCENE_LENGTHS,
  setSceneLengths: (lengths) => set({ sceneLengths: lengths }),
  tensionPoints: DEFAULT_TENSION_POINTS,
  setTensionPoints: (points) => set({ tensionPoints: points }),

  // Integration Features
  showMomentumTracker: false,
  setShowMomentumTracker: (show) => set({ showMomentumTracker: show }),
  showCharacterArcs: false,
  setShowCharacterArcs: (show) => set({ showCharacterArcs: show }),
  showMultipleViewpoints: false,
  setShowMultipleViewpoints: (show) => set({ showMultipleViewpoints: show })
})); 