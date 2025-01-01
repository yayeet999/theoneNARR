import { Users, Mountain, Building2, Brain, Compass, Laptop2, Clock, GitBranch, BookOpen, Rewind, Repeat } from 'lucide-react';

export interface PlotStructure {
  id: string;
  name: string;
  description: string;
  icon: any; // Lucide icon component
  beats: Array<{
    name: string;
    percentage: string;
    description: string;
  }>;
  genres: Array<string>;
  examples: Array<{
    title: string;
    explanation: string;
  }>;
}

export const PLOT_STRUCTURES: PlotStructure[] = [
  {
    id: 'three-act',
    name: 'Three-Act Structure',
    description: 'The classic storytelling framework divided into setup, confrontation, and resolution.',
    icon: Building2,
    beats: [
      {
        name: 'Act 1: Setup',
        percentage: '0-25%',
        description: 'Introduce main character(s), establish normal world, present inciting incident, and first plot point'
      },
      {
        name: 'Act 2: Confrontation',
        percentage: '25-75%',
        description: 'Rising challenges, midpoint twist, escalating stakes, and second plot point'
      },
      {
        name: 'Act 3: Resolution',
        percentage: '75-100%',
        description: 'Climactic sequence, final battle/confrontation, resolution, and new normal established'
      }
    ],
    genres: ['Action/Adventure', 'Romance', 'Mystery', 'Thriller', 'Contemporary Fiction'],
    examples: [
      {
        title: 'The Lion King',
        explanation: 'Perfect example of three-act structure with clear setup (Simba\'s birth and early life), confrontation (exile and growth), and resolution (return and defeat of Scar)'
      },
      {
        title: 'Pride and Prejudice',
        explanation: 'Classic three-act structure in romance, from initial prejudices through complications to final resolution'
      }
    ]
  },
  {
    id: 'hero-journey',
    name: 'Hero\'s Journey',
    description: 'A transformative adventure where the protagonist leaves their normal world, faces challenges, and returns changed.',
    icon: Mountain,
    beats: [
      {
        name: 'Departure',
        percentage: '0-33%',
        description: 'Ordinary World, Call to Adventure, Refusal of Call, Meeting the Mentor, Crossing the Threshold'
      },
      {
        name: 'Initiation',
        percentage: '33-75%',
        description: 'Tests & Allies, Approach to Inmost Cave, Central Ordeal, Seizing the Reward'
      },
      {
        name: 'Return',
        percentage: '75-100%',
        description: 'The Road Back, Resurrection, Return with Elixir'
      }
    ],
    genres: ['Fantasy', 'Science Fiction', 'Coming-of-age', 'Epic Adventure', 'Mythological Fiction'],
    examples: [
      {
        title: 'Star Wars: A New Hope',
        explanation: 'Luke Skywalker\'s journey from farm boy to hero follows the classic hero\'s journey structure'
      },
      {
        title: 'The Lord of the Rings',
        explanation: 'Frodo\'s journey from the Shire to Mount Doom exemplifies each stage of the hero\'s journey'
      }
    ]
  },
  // Add more structures following the same pattern...
];

// Helper function to get structure by ID
export const getStructureById = (id: string): PlotStructure | undefined => {
  return PLOT_STRUCTURES.find(structure => structure.id === id);
}; 