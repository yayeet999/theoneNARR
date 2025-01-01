import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronDown,
  Activity,
  Circle,
  GitBranch,
  Layers,
  Compass,
  Network,
  Mountain,
  Building2,
  Brain,
  Laptop2,
  RotateCcw as Rewind,
  RefreshCw as Repeat,
  BookOpen,
  Flame,
  Sword,
  Zap,
  Scale,
  Flag
} from 'lucide-react';
import { usePlotStructureStore } from '@/stores/plotStructureStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, ReferenceDot, ResponsiveContainer, ReferenceArea } from 'recharts';

interface StoryStructure {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  isAdvanced?: boolean;
  isRecommended?: boolean;
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

const BASIC_STRUCTURES: StoryStructure[] = [
  {
    id: 'three-act',
    name: 'Three-Act Structure',
    icon: Building2,
    description: 'The classic storytelling framework divided into setup, confrontation, and resolution.',
    isRecommended: true,
    beats: [
      {
        name: 'Act 1: Setup',
        percentage: '0-25%',
        description: 'Introduce main character(s), establish normal world, present inciting incident, first plot point'
      },
      {
        name: 'Act 2: Confrontation',
        percentage: '25-75%',
        description: 'Rising challenges, midpoint twist, escalating stakes, second plot point'
      },
      {
        name: 'Act 3: Resolution',
        percentage: '75-100%',
        description: 'Climactic sequence, final battle/confrontation, resolution, new normal established'
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
      },
      {
        title: 'The Hunger Games',
        explanation: 'Strong three-act progression from District 12 to the Games to the final victory'
      },
      {
        title: 'Gone Girl',
        explanation: 'Modern thriller utilizing three-act structure to build suspense and revelation'
      }
    ]
  },
  {
    id: 'hero-journey',
    name: 'Hero\'s Journey',
    icon: Mountain,
    description: 'A transformative adventure where the protagonist leaves their normal world, faces challenges, and returns changed.',
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
      },
      {
        title: 'Harry Potter series',
        explanation: 'Classic hero\'s journey following Harry from ordinary world to magical destiny'
      },
      {
        title: 'The Matrix',
        explanation: 'Neo\'s transformation from office worker to humanity\'s savior follows the hero\'s journey pattern'
      }
    ]
  },
  {
    id: 'five-act',
    name: 'Five-Act Structure',
    icon: GitBranch,
    description: 'A dramatic structure offering more complex character development and plot progression than three acts.',
    beats: [
      {
        name: 'Exposition',
        percentage: '0-15%',
        description: 'Character introduction, world setup, initial conflict hint'
      },
      {
        name: 'Rising Action',
        percentage: '15-40%',
        description: 'Complications begin, stakes establish, relationships develop'
      },
      {
        name: 'Climax',
        percentage: '40-60%',
        description: 'Major confrontation, key decisions, point of no return'
      },
      {
        name: 'Falling Action',
        percentage: '60-85%',
        description: 'Consequences unfold, subplot resolution, character evolution'
      },
      {
        name: 'Denouement',
        percentage: '85-100%',
        description: 'Final resolution, loose ends tied, new status quo'
      }
    ],
    genres: ['Literary Fiction', 'Historical Fiction', 'Political Drama', 'Complex Family Sagas', 'Psychological Thrillers'],
    examples: [
      {
        title: 'Hamlet',
        explanation: 'Classic example of five-act structure in dramatic tragedy'
      },
      {
        title: 'The Great Gatsby',
        explanation: 'Five distinct phases of dramatic development and character revelation'
      },
      {
        title: 'Game of Thrones series',
        explanation: 'Complex narrative utilizing five-act structure across multiple storylines'
      },
      {
        title: 'Breaking Bad (TV)',
        explanation: 'Modern example of five-act structure in long-form storytelling'
      }
    ]
  },
  {
    id: 'seven-point',
    name: 'Seven-Point Story',
    icon: Circle,
    description: 'A plot-focused structure emphasizing key turning points and pinch moments.',
    beats: [
      {
        name: 'Hook',
        percentage: '0-10%',
        description: 'Engaging opening, character introduction, world establishment'
      },
      {
        name: 'Plot Turn 1',
        percentage: '10-25%',
        description: 'First major event, story direction change, new goal established'
      },
      {
        name: 'Pinch Point 1',
        percentage: '25-37%',
        description: 'First major pressure, antagonist power shown, stakes raised'
      },
      {
        name: 'Midpoint',
        percentage: '37-62%',
        description: 'Major revelation, character transformation, direction shift'
      },
      {
        name: 'Pinch Point 2',
        percentage: '62-75%',
        description: 'Maximum pressure, all seems lost, major setback'
      },
      {
        name: 'Plot Turn 2',
        percentage: '75-90%',
        description: 'Final preparation, character ready, resolution setup'
      },
      {
        name: 'Resolution',
        percentage: '90-100%',
        description: 'Final conflict, story conclusion, character transformation complete'
      }
    ],
    genres: ['Mystery', 'Thriller', 'Science Fiction', 'Adventure', 'Crime Fiction'],
    examples: [
      {
        title: 'Die Hard',
        explanation: 'Action thriller with clear seven-point progression'
      },
      {
        title: 'Ender\'s Game',
        explanation: 'Science fiction utilizing seven key story points'
      },
      {
        title: 'The Da Vinci Code',
        explanation: 'Mystery thriller following seven-point structure'
      },
      {
        title: 'Mission: Impossible',
        explanation: 'Action series with distinct plot points and pinch moments'
      }
    ]
  },
  {
    id: 'save-the-cat',
    name: 'Save the Cat',
    icon: Activity,
    description: 'A modern, beat-driven framework ensuring strong pacing and character development.',
    beats: [
      {
        name: 'Opening Image to Theme Stated',
        percentage: '0-5%',
        description: 'Establish tone/mood, hint at theme, key thematic message'
      },
      {
        name: 'Setup to Catalyst',
        percentage: '5-10%',
        description: 'Introduce hero, show status quo, inciting incident'
      },
      {
        name: 'Debate to Break into Two',
        percentage: '10-20%',
        description: 'Hero hesitates, stakes considered, leave comfort zone'
      },
      {
        name: 'B Story to Fun and Games',
        percentage: '20-50%',
        description: 'Subplot begins, promise of premise, core entertainment'
      },
      {
        name: 'Midpoint to Bad Guys Close In',
        percentage: '50-75%',
        description: 'False victory/defeat, complications rise, pressure increases'
      },
      {
        name: 'All Is Lost to Break into Three',
        percentage: '75-80%',
        description: 'Major setback, dark moment, solution found'
      },
      {
        name: 'Finale to Final Image',
        percentage: '80-100%',
        description: 'Climactic sequence, hero succeeds, mirror opening'
      }
    ],
    genres: ['Commercial Fiction', 'Young Adult', 'Romantic Comedy', 'Action', 'Family Films'],
    examples: [
      {
        title: 'Legally Blonde',
        explanation: 'Perfect example of Save the Cat beats in romantic comedy'
      },
      {
        title: 'Finding Nemo',
        explanation: 'Animation following Save the Cat structure'
      },
      {
        title: 'Miss Congeniality',
        explanation: 'Comedy utilizing clear beat progression'
      },
      {
        title: 'Bridesmaids',
        explanation: 'Modern comedy following Save the Cat framework'
      }
    ]
  },
  {
    id: 'fichtean',
    name: 'Fichtean Curve',
    icon: Activity,
    description: 'A structure focused on constant rising action through multiple crises.',
    beats: [
      {
        name: 'Initial Crisis',
        percentage: '0-10%',
        description: 'Immediate tension, character challenge, story launch'
      },
      {
        name: 'Rising Action & Crisis 1',
        percentage: '10-30%',
        description: 'Complications, first major obstacle, stakes established'
      },
      {
        name: 'Rising Action & Crisis 2',
        percentage: '30-50%',
        description: 'Increased difficulty, character tested, stakes escalate'
      },
      {
        name: 'Rising Action & Crisis 3',
        percentage: '50-75%',
        description: 'Maximum pressure, major setback, final test setup'
      },
      {
        name: 'Climactic Crisis',
        percentage: '75-90%',
        description: 'Ultimate challenge, character decision, final confrontation'
      },
      {
        name: 'Resolution',
        percentage: '90-100%',
        description: 'Quick wrap-up, new equilibrium'
      }
    ],
    genres: ['Thrillers', 'Horror', 'Suspense', 'Mystery', 'Action-Adventure'],
    examples: [
      {
        title: 'The Da Vinci Code',
        explanation: 'Thriller with constant rising tension and multiple crises'
      },
      {
        title: 'Jurassic Park',
        explanation: 'Action-adventure with escalating danger'
      },
      {
        title: 'Alien',
        explanation: 'Horror with increasing intensity and multiple crisis points'
      },
      {
        title: 'Die Hard',
        explanation: 'Action film with continuous escalation'
      }
    ]
  }
];

const ADVANCED_STRUCTURES: StoryStructure[] = [
  {
    id: 'multiple-timelines',
    name: 'Multiple Timelines',
    icon: GitBranch,
    description: 'Weaves together distinct storylines from different time periods.',
    isAdvanced: true,
    beats: [
      {
        name: 'Timeline A Opening',
        percentage: '0-10%',
        description: 'First period setup, initial characters, core mystery/conflict'
      },
      {
        name: 'Timeline B Introduction',
        percentage: '10-20%',
        description: 'Second period launch, connection hints, new perspective'
      },
      {
        name: 'Early Connections',
        percentage: '20-40%',
        description: 'First intersections, shared elements, mystery deepens'
      },
      {
        name: 'Timeline Developments',
        percentage: '40-70%',
        description: 'Parallel complications, revelations, growing connections'
      },
      {
        name: 'Major Convergence',
        percentage: '70-90%',
        description: 'Timelines intersect, key revelations, past affects present'
      },
      {
        name: 'Resolution',
        percentage: '90-100%',
        description: 'All threads resolved, connections clear, impact understood'
      }
    ],
    genres: ['Historical Fiction', 'Literary Fiction', 'Family Sagas', 'Mystery', 'Time-Travel Fiction'],
    examples: [
      {
        title: 'Cloud Atlas',
        explanation: 'Multiple interconnected stories across different time periods'
      },
      {
        title: 'The Seven Husbands of Evelyn Hugo',
        explanation: 'Past and present narratives revealing a complex life story'
      },
      {
        title: 'The Hours',
        explanation: 'Three interconnected timelines exploring parallel themes'
      },
      {
        title: 'Atonement',
        explanation: 'Past and present weaving together for final revelation'
      }
    ]
  },
  {
    id: 'in-media-res',
    name: 'In Media Res',
    icon: Activity,
    description: 'Starts in the middle of action, then reveals how we got there.',
    isAdvanced: true,
    beats: [
      {
        name: 'Action Opening',
        percentage: '0-10%',
        description: 'Dramatic scene, hook audience, create questions'
      },
      {
        name: 'First Flashback',
        percentage: '10-30%',
        description: 'Context reveal, character background, setup explanation'
      },
      {
        name: 'Return to Present',
        percentage: '30-40%',
        description: 'Continue opening scene, new understanding, forward momentum'
      },
      {
        name: 'Development',
        percentage: '40-75%',
        description: 'Mix past/present, build complexity, reveal connections'
      },
      {
        name: 'Crisis',
        percentage: '75-90%',
        description: 'Past/present converge, major revelation, final confrontation'
      },
      {
        name: 'Resolution',
        percentage: '90-100%',
        description: 'Past impact clear, present resolved, future implied'
      }
    ],
    genres: ['Literary Fiction', 'Crime Fiction', 'Mystery', 'Psychological Thrillers', 'War Stories'],
    examples: [
      {
        title: 'Fight Club',
        explanation: 'Opens at climax before exploring how we got there'
      },
      {
        title: 'Pulp Fiction',
        explanation: 'Non-linear narrative starting in media res'
      },
      {
        title: 'The Usual Suspects',
        explanation: 'Story revealed through complex flashback structure'
      },
      {
        title: 'Memento',
        explanation: 'Unique in media res structure with reverse chronology'
      }
    ]
  }
];

const data = [
  { x: 0, tension: 20, label: 'Start' },
  { x: 15, tension: 25, label: '' },
  { x: 25, tension: 40, label: 'Inciting Incident' },
  { x: 35, tension: 45, label: '' },
  { x: 50, tension: 60, label: 'Midpoint' },
  { x: 65, tension: 70, label: '' },
  { x: 75, tension: 90, label: 'Climax' },
  { x: 85, tension: 50, label: '' },
  { x: 100, tension: 30, label: 'Resolution' }
];

const keyPoints = [
  { x: 25, tension: 40, label: 'Inciting Incident', description: 'Event that sets the story in motion' },
  { x: 50, tension: 60, label: 'Midpoint', description: 'Major shift in the story direction' },
  { x: 75, tension: 90, label: 'Climax', description: 'Peak of conflict and tension' },
  { x: 100, tension: 30, label: 'Resolution', description: 'Story conclusion and new equilibrium' }
];

interface PreviewProps {
  isOpen: boolean;
  onClose: () => void;
  structure: StoryStructure;
  onSelect: (structure: StoryStructure) => void;
}

const ThreeActStructureVisual: React.FC = () => {
  const styles = {
    container: {
      padding: '0',
      backgroundColor: 'white',
      borderRadius: '16px',
      width: '100%',
      margin: '0 auto'
    },
    chartWrapper: {
      position: 'relative' as const,
      height: '400px',
      backgroundColor: 'white'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
          >
            {/* Background sections for acts */}
            <ReferenceArea x1={0} x2={25} fill="#EFF6FF" />
            <ReferenceArea x1={25} x2={75} fill="#DBEAFE" />
            <ReferenceArea x1={75} x2={100} fill="#EFF6FF" />
            
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#94a3b8"
              fontSize={12}
            />
            <YAxis hide domain={[0, 100]} />

            {/* Main tension curve */}
            <Area
              type="monotone"
              dataKey="tension"
              stroke="#2563EB"
              strokeWidth={3}
              fill="none"
              activeDot={false}
            />

            {/* Key points without tooltips */}
            {keyPoints.map((point, index) => (
              <ReferenceDot
                key={index}
                x={point.x}
                y={point.tension}
                r={6}
                fill="#2563EB"
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>

        {/* Act Labels */}
        <div style={{
          position: 'absolute',
          bottom: '4px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px',
          fontSize: '20px',
          fontWeight: '500',
          color: '#1a2b3c'
        }}>
          <div style={{ width: '25%', textAlign: 'center' }}>Setup</div>
          <div style={{ width: '50%', textAlign: 'center' }}>Confrontation</div>
          <div style={{ width: '25%', textAlign: 'center' }}>Resolution</div>
        </div>
      </div>
    </div>
  );
};

const HeroJourneyVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 700" className="w-full h-auto">
        {/* Background circle */}
        <circle cx="400" cy="380" r="280" fill="white"/>
        <path d="M 120 380 L 680 380 A 280 280 0 0 1 120 380" fill="#1F3A54"/>

        {/* Main circle outline with 6s animation */}
        <circle cx="400" cy="380" r="280" fill="none" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1760" strokeDashoffset="1760" transform="rotate(-90 400 380)">
          <animate attributeName="stroke-dashoffset" from="1760" to="0" dur="6s" fill="freeze"/>
        </circle>

        {/* Phase 1 - Departure (0.0s) */}
        <g opacity="0">
          <circle cx="400" cy="100" r="20" fill="#3730A3"/>
          <text x="400" y="108" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">1</text>
          <rect x="330" y="25" width="150" height="50" rx="10" fill="#3730A3" fillOpacity="0.9"/>
          <text x="405" y="48" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">DEPARTURE</text>
          <text x="405" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">(0-33%)</text>
          <animate attributeName="opacity" from="0" to="1" begin="0s" dur="0.5s" fill="freeze"/>
        </g>
        
        {/* Call to Adventure (0.5s) */}
        <g opacity="0">
          <circle cx="545" cy="140" r="14" fill="#6366F1"/>
          <rect x="568" y="108" width="130" height="40" rx="8" fill="#6366F1" fillOpacity="0.9"/>
          <text x="633" y="133" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Call to Adventure</text>
          <animate attributeName="opacity" from="0" to="1" begin="0.5s" dur="0.5s" fill="freeze"/>
        </g>
        
        {/* Refusal of Call (1.0s) */}
        <g opacity="0">
          <circle cx="650" cy="250" r="14" fill="#6366F1"/>
          <rect x="670" y="230" width="130" height="40" rx="8" fill="#6366F1" fillOpacity="0.9"/>
          <text x="735" y="255" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Refusal of Call</text>
          <animate attributeName="opacity" from="0" to="1" begin="1s" dur="0.5s" fill="freeze"/>
        </g>

        {/* Meeting the Mentor (1.5s) */}
        <g opacity="0">
          <circle cx="680" cy="380" r="14" fill="#6366F1"/>
          <rect x="700" y="360" width="105" height="40" rx="8" fill="#6366F1" fillOpacity="0.9"/>
          <text x="753" y="377" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Meeting</text>
          <text x="753" y="394" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">the Mentor</text>
          <animate attributeName="opacity" from="0" to="1" begin="1.5s" dur="0.5s" fill="freeze"/>
        </g>

        {/* Phase 2 - Initiation (2.0s) */}
        <g opacity="0">
          <circle cx="635" cy="525" r="20" fill="#3730A3"/>
          <text x="635" y="533" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">2</text>
          <rect x="655" y="523" width="150" height="50" rx="10" fill="#3730A3" fillOpacity="0.9"/>
          <text x="730" y="546" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">INITIATION</text>
          <text x="730" y="563" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">(33-75%)</text>
          <animate attributeName="opacity" from="0" to="1" begin="2s" dur="0.5s" fill="freeze"/>
        </g>

        {/* Tests & Allies (2.5s) */}
        <g opacity="0">
          <circle cx="525" cy="628" r="14" fill="#6366F1"/>
          <rect x="545" y="623" width="105" height="40" rx="8" fill="#6366F1" fillOpacity="0.9"/>
          <text x="598" y="641" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Tests &</text>
          <text x="598" y="658" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Allies</text>
          <animate attributeName="opacity" from="0" to="1" begin="2.5s" dur="0.5s" fill="freeze"/>
        </g>

        {/* Descend to Depths (3.0s) */}
        <g opacity="0">
          <circle cx="400" cy="660" r="14" fill="#6366F1"/>
          <rect x="330" y="676" width="150" height="21" rx="8" fill="#6366F1" fillOpacity="0.9"/>
          <text x="405" y="692" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Descend to Depths</text>
          <animate attributeName="opacity" from="0" to="1" begin="3s" dur="0.5s" fill="freeze"/>
        </g>

        {/* Supreme Ordeal (3.5s) */}
        <g opacity="0">
          <circle cx="275" cy="628" r="14" fill="#6366F1"/>
          <rect x="150" y="628" width="105" height="40" rx="8" fill="#6366F1" fillOpacity="0.9"/>
          <text x="203" y="645" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Supreme</text>
          <text x="203" y="662" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Ordeal</text>
          <animate attributeName="opacity" from="0" to="1" begin="3.5s" dur="0.5s" fill="freeze"/>
        </g>

        {/* Transformation (4.0s) */}
        <g opacity="0">
          <circle cx="160" cy="518" r="14" fill="#6366F1"/>
          <rect x="16" y="508" width="125" height="30" rx="8" fill="#6366F1" fillOpacity="0.9"/>
          <text x="79" y="528" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Transformation</text>
          <animate attributeName="opacity" from="0" to="1" begin="4s" dur="0.5s" fill="freeze"/>
        </g>

        {/* Phase 3 - Return (4.5s) */}
        <g opacity="0">
          <circle cx="120" cy="380" r="20" fill="#3730A3"/>
          <text x="120" y="388" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">3</text>
          <rect x="-6" y="307" width="120" height="50" rx="10" fill="#3730A3" fillOpacity="0.9"/>
          <text x="54" y="330" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">RETURN</text>
          <text x="54" y="347" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">(75-100%)</text>
          <animate attributeName="opacity" from="0" to="1" begin="4.5s" dur="0.5s" fill="freeze"/>
        </g>

        {/* The Road Back (5.0s) */}
        <g opacity="0">
          <circle cx="153" cy="250" r="14" fill="#6366F1"/>
          <rect x="33" y="210" width="105" height="40" rx="8" fill="#6366F1" fillOpacity="0.9"/>
          <text x="86" y="227" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">The Road</text>
          <text x="86" y="244" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Back</text>
          <animate attributeName="opacity" from="0" to="1" begin="5s" dur="0.5s" fill="freeze"/>
        </g>

        {/* Reintegration (5.5s) */}
        <g opacity="0">
          <circle cx="255" cy="140" r="14" fill="#6366F1"/>
          <rect x="120" y="100" width="125" height="30" rx="8" fill="#6366F1" fillOpacity="0.9"/>
          <text x="183" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">Reintegration</text>
          <animate attributeName="opacity" from="0" to="1" begin="5.5s" dur="0.5s" fill="freeze"/>
        </g>

        {/* Static text labels */}
        <text x="400" y="230" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1F3A54" fontFamily="Arial, sans-serif">KNOWN</text>
        <text x="400" y="260" textAnchor="middle" fontSize="20" fill="#1F3A54" fontFamily="Arial, sans-serif">(Ordinary World)</text>
        
        <text x="400" y="500" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">UNKNOWN</text>
        <text x="400" y="530" textAnchor="middle" fontSize="20" fill="white" fontFamily="Arial, sans-serif">(Uncharted Territory)</text>
        
        {/* Center figure */}
        <g transform="translate(350, 300)">
          <circle cx="50" cy="0" r="16" fill="#1F3A54"/>
          <path d="M 25 20 L 75 20 L 65 90 L 35 90 Z" fill="#1F3A54"/>
          <rect x="15" y="25" width="70" height="12" fill="#1F3A54"/>
        </g>
      </svg>
    </div>
  );
};

const FiveActStructureVisual: React.FC = () => {
  const data = [
    { x: 0, tension: 20, label: 'Start' },
    { x: 7, tension: 25, label: '' },
    { x: 15, tension: 35, label: 'Initial Conflict' },
    { x: 25, tension: 45, label: '' },
    { x: 40, tension: 60, label: 'Major Complication' },
    { x: 50, tension: 85, label: 'Climax' },
    { x: 60, tension: 75, label: '' },
    { x: 75, tension: 55, label: 'Key Resolution' },
    { x: 85, tension: 40, label: '' },
    { x: 100, tension: 25, label: 'Final State' }
  ];

  const CustomizedDot = (props: any) => {
    const { cx, cy } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={8}
        fill="#4B8BF4"
        stroke="#FFFFFF"
        strokeWidth={2.5}
        style={{ transition: 'all 0.3s ease' }}
      />
    );
  };

  return (
    <div className="p-8 bg-white rounded-xl max-w-6xl mx-auto">
      <div className="relative h-96 bg-white mb-4" style={{ marginTop: '-1rem' }}>
        <svg style={{ width: 0, height: 0, position: 'absolute' }}>
          <defs>
            <linearGradient id="gradientExposition" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E3F2FD" />
              <stop offset="100%" stopColor="#BBDEFB" />
            </linearGradient>
            <linearGradient id="gradientRising" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BBDEFB" />
              <stop offset="100%" stopColor="#90CAF9" />
            </linearGradient>
            <linearGradient id="gradientClimax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#90CAF9" />
              <stop offset="100%" stopColor="#64B5F6" />
            </linearGradient>
            <linearGradient id="gradientFalling" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BBDEFB" />
              <stop offset="100%" stopColor="#90CAF9" />
            </linearGradient>
            <linearGradient id="gradientResolution" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E3F2FD" />
              <stop offset="100%" stopColor="#BBDEFB" />
            </linearGradient>
          </defs>
        </svg>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
          >
            {/* Background sections with gradients */}
            <ReferenceArea x1={0} x2={15} fill="url(#gradientExposition)" />
            <ReferenceArea x1={15} x2={40} fill="url(#gradientRising)" />
            <ReferenceArea x1={40} x2={60} fill="url(#gradientClimax)" />
            <ReferenceArea x1={60} x2={85} fill="url(#gradientFalling)" />
            <ReferenceArea x1={85} x2={100} fill="url(#gradientResolution)" />
            
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 100]}
              ticks={[0, 15, 40, 60, 85, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#7C8BA1"
              fontSize={16}
            />
            <YAxis hide domain={[0, 100]} />

            <Area
              type="monotone"
              dataKey="tension"
              stroke="#4B8BF4"
              strokeWidth={4.5}
              fill="none"
              dot={<CustomizedDot />}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="absolute bottom-0 w-full flex items-start justify-between text-gray-800 transition-all duration-300 ease-in-out" 
             style={{ transform: 'translateY(75px)' }}>
          <div className="relative flex w-full">
            {[
              { name: 'Exposition', points: ['Establish setting', 'Introduce characters', 'Present initial situation'], width: '15%' },
              { name: 'Rising Action', points: ['Develop conflicts', 'Raise stakes', 'Build complications'], width: '25%' },
              { name: 'Climax', points: ['Peak tension', 'Major decisions', 'Critical moment'], width: '20%' },
              { name: 'Falling Action', points: ['Show consequences', 'Begin resolution', 'Address subplots'], width: '25%' },
              { name: 'Resolution', points: ['Resolve conflicts', 'New equilibrium', 'Final outcome'], width: '15%' }
            ].map((act, index) => (
              <div key={index} 
                   style={{ width: act.width }} 
                   className="flex flex-col items-center transition-all duration-300 ease-in-out">
                <div className="font-medium text-lg mb-2">{act.name}</div>
                <ul className="text-sm list-disc pl-4 text-gray-600">
                  {act.points.map((point, i) => (
                    <li key={i} className="mb-1 transition-all duration-300 ease-in-out">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
            
            {[0, 1, 2, 3].map(index => (
              <div
                key={`arrow-${index}`}
                className="absolute top-1 transition-all duration-300 ease-in-out"
                style={{
                  left: index === 0 ? '13%' :
                        index === 1 ? '38%' :
                        index === 2 ? '58%' :
                        '83%',
                  transform: 'translateX(-50%)'
                }}
              >
                <ArrowRight className="text-gray-600" size={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SevenPointStructureVisual: React.FC = () => {
  const data = [
    { x: 0, tension: 10, label: 'Start' },
    { x: 10, tension: 17, label: 'Hook' },
    { x: 25, tension: 40, label: 'Plot Turn 1' },
    { x: 37, tension: 30, label: 'Pinch Point 1' },
    { x: 50, tension: 55, label: 'Midpoint' },
    { x: 62, tension: 45, label: 'Pinch Point 2' },
    { x: 75, tension: 74, label: 'Plot Turn 2' },
    { x: 90, tension: 85, label: 'Resolution' },
    { x: 100, tension: 75, label: 'End' }
  ];

  const keyPoints = [
    { x: 10, tension: 17, label: 'Hook' },
    { x: 25, tension: 40, label: 'Plot Turn 1' },
    { x: 37, tension: 30, label: 'Pinch Point 1' },
    { x: 50, tension: 55, label: 'Midpoint' },
    { x: 62, tension: 45, label: 'Pinch Point 2' },
    { x: 75, tension: 74, label: 'Plot Turn 2' },
    { x: 90, tension: 85, label: 'Resolution' }
  ];

  const actInfo = [
    {
      name: 'Hook',
      points: ['Protagonist', 'Setting'],
      width: '10%'
    },
    {
      name: 'Plot Turn 1',
      points: ['Catalyst', 'Quest'],
      width: '15%'
    },
    {
      name: 'Pinch Point 1',
      points: ['Challenge', 'Risk'],
      width: '12%'
    },
    {
      name: 'Midpoint',
      points: ['Discovery', 'Change'],
      width: '25%'
    },
    {
      name: 'Pinch Point 2',
      points: ['Crisis', 'Doubt'],
      width: '13%'
    },
    {
      name: 'Plot Turn 2',
      points: ['Resolve', 'Ready'],
      width: '15%'
    },
    {
      name: 'Resolution',
      points: ['Confront', 'Transform'],
      width: '10%'
    }
  ];

  const CustomizedDot = (props: any) => {
    const { cx, cy } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={8}
        fill="#4B8BF4"
        stroke="#FFFFFF"
        strokeWidth={2.5}
        style={{ transition: 'all 0.3s ease' }}
      />
    );
  };

  return (
    <div className="p-8 bg-white rounded-xl max-w-6xl mx-auto">
      <div className="relative h-96 bg-white mb-4" style={{ marginTop: '-1rem' }}>
        <svg style={{ width: 0, height: 0, position: 'absolute' }}>
          <defs>
            <linearGradient id="gradientHook" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E3F2FD" />
              <stop offset="100%" stopColor="#BBDEFB" />
            </linearGradient>
            <linearGradient id="gradientPlotTurn1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BBDEFB" />
              <stop offset="100%" stopColor="#90CAF9" />
            </linearGradient>
            <linearGradient id="gradientPinch1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#90CAF9" />
              <stop offset="100%" stopColor="#64B5F6" />
            </linearGradient>
            <linearGradient id="gradientMidpoint" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64B5F6" />
              <stop offset="100%" stopColor="#42A5F5" />
            </linearGradient>
            <linearGradient id="gradientPinch2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#90CAF9" />
              <stop offset="100%" stopColor="#64B5F6" />
            </linearGradient>
            <linearGradient id="gradientPlotTurn2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BBDEFB" />
              <stop offset="100%" stopColor="#90CAF9" />
            </linearGradient>
            <linearGradient id="gradientResolution" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E3F2FD" />
              <stop offset="100%" stopColor="#BBDEFB" />
            </linearGradient>
          </defs>
        </svg>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
          >
            <ReferenceArea x1={0} x2={10} fill="url(#gradientHook)" />
            <ReferenceArea x1={10} x2={25} fill="url(#gradientPlotTurn1)" />
            <ReferenceArea x1={25} x2={37} fill="url(#gradientPinch1)" />
            <ReferenceArea x1={37} x2={62} fill="url(#gradientMidpoint)" />
            <ReferenceArea x1={62} x2={75} fill="url(#gradientPinch2)" />
            <ReferenceArea x1={75} x2={90} fill="url(#gradientPlotTurn2)" />
            <ReferenceArea x1={90} x2={100} fill="url(#gradientResolution)" />
            
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 100]}
              ticks={[0, 10, 25, 37, 50, 62, 75, 90, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#7C8BA1"
              fontSize={16}
            />
            <YAxis hide domain={[0, 100]} />

            <Area
              type="monotone"
              dataKey="tension"
              stroke="#4B8BF4"
              strokeWidth={4.5}
              fill="none"
              dot={<CustomizedDot />}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="absolute bottom-0 w-full flex items-start justify-between text-gray-800 transition-all duration-300 ease-in-out" 
             style={{ transform: 'translateY(50px)' }}>
          <div className="relative flex w-full">
            {actInfo.map((act, index) => (
              <div key={index} 
                   style={{ width: act.width }} 
                   className="flex flex-col items-center transition-all duration-300 ease-in-out">
                <div className="font-medium text-base mb-2">{act.name}</div>
                <ul className="text-sm list-disc pl-7 text-gray-600">
                  {act.points.map((point, i) => (
                    <li key={i} className="mb-1 transition-all duration-300 ease-in-out">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
            
            {[0, 1, 2, 3, 4, 5].map(index => (
              <div
                key={`arrow-${index}`}
                className="absolute top-1 transition-all duration-300 ease-in-out"
                style={{
                  left: index === 0 ? '10%' :
                        index === 1 ? '24%' :
                        index === 2 ? '41%' :
                        index === 3 ? '57%' :
                        index === 4 ? '76%' :
                        '89%',
                  transform: 'translateX(-50%)'
                }}
              >
                <ArrowRight className="text-gray-600" size={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SaveTheCatVisual: React.FC = () => {
  return (
    <div className="pb-8 px-8 pt-4 bg-white rounded-xl max-w-6xl mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 206" className="w-full h-auto">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#1F3A54', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#2a4e71', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1F3A54', stopOpacity: 1 }} />
          </linearGradient>
          <marker id="arrowhead-right" markerWidth="10" markerHeight="7" 
            refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#1F3A54"/>
          </marker>
          <marker id="arrowhead-left" markerWidth="10" markerHeight="7" 
            refX="0" refY="3.5" orient="auto">
            <polygon points="10 0, 0 3.5, 10 7" fill="#1F3A54"/>
          </marker>
        </defs>

        <rect x="83" y="15" width="70" height="23" rx="4" className="animate-fade-in-delayed fill-[#4A90E2]"/>
        <text x="120" y="30" textAnchor="middle" fill="white" className="animate-fade-in-delayed text-[10px] font-medium">Catalyst</text>

        <rect x="203" y="15" width="70" height="23" rx="4" className="animate-fade-in-delayed fill-[#4A90E2]"/>
        <text x="240" y="30" textAnchor="middle" fill="white" className="animate-fade-in-delayed text-[10px] font-medium">Midpoint</text>

        <rect x="329" y="15" width="60" height="23" rx="4" className="animate-fade-in-delayed fill-[#4A90E2]"/>
        <text x="360" y="30" textAnchor="middle" fill="white" className="animate-fade-in-delayed text-[10px] font-medium">Act 3</text>

        <rect x="148" y="138" width="61" height="23" rx="4" className="animate-fade-in-delayed fill-[#4A90E2]"/>
        <text x="180" y="153" textAnchor="middle" fill="white" className="animate-fade-in-delayed text-[10px] font-medium">B Story</text>

        <rect x="259" y="138" width="79" height="23" rx="4" className="animate-fade-in-delayed fill-[#4A90E2]"/>
        <text x="300" y="153" textAnchor="middle" fill="white" className="animate-fade-in-delayed text-[10px] font-medium">All is lost</text>

        <rect x="7" y="165" width="103" height="23" rx="4" className="animate-fade-in-delayed fill-[#4A90E2]"/>
        <text x="60" y="180" textAnchor="middle" fill="white" className="animate-fade-in-delayed text-[10px] font-medium">Opening Image</text>

        <rect x="374" y="165" width="90" height="23" rx="4" className="animate-fade-in-delayed fill-[#4A90E2]"/>
        <text x="420" y="180" textAnchor="middle" fill="white" className="animate-fade-in-delayed text-[10px] font-medium">Final Image</text>

        <line x1="142" y1="178" x2="335" y2="178" 
          stroke="#1F3A54" 
          strokeWidth="1.5"
          strokeDasharray="6,4"
          opacity="0.6"
          markerEnd="url(#arrowhead-right)"
          markerStart="url(#arrowhead-left)"
          className="animate-fade-in-subtitle"/>

        <text x="238" y="197" textAnchor="middle" className="animate-fade-in-subtitle text-[12px] italic fill-[#666666]">
          Opening and Closing Images Can Rhyme
        </text>

        <path 
          className="animate-draw-line"
          d="M 60,150
             C 78,90 102,54 120,54
             C 138,54 162,126 180,126
             C 198,126 222,54 240,54
             C 258,54 282,126 300,126
             C 318,126 342,54 360,54
             C 378,54 402,126 420,150"
          fill="none" 
          stroke="url(#blueGradient)" 
          strokeWidth="5.4" 
          strokeLinecap="round"
          strokeLinejoin="round"/>

        <circle className="animate-fade-in-dot" cx="60" cy="150" r="4.3" fill="#4A90E2"/>
        <circle className="animate-fade-in-dot" cx="120" cy="54" r="4.3" fill="#4A90E2"/>
        <circle className="animate-fade-in-dot" cx="180" cy="126" r="4.3" fill="#4A90E2"/>
        <circle className="animate-fade-in-dot" cx="240" cy="54" r="4.3" fill="#4A90E2"/>
        <circle className="animate-fade-in-dot" cx="300" cy="126" r="4.3" fill="#4A90E2"/>
        <circle className="animate-fade-in-dot" cx="360" cy="54" r="4.3" fill="#4A90E2"/>
        <circle className="animate-fade-in-dot" cx="420" cy="150" r="4.3" fill="#4A90E2"/>
      </svg>

      <style>{`
        .animate-draw-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 3.5s ease-out forwards;
        }

        .animate-fade-in-dot {
          opacity: 0;
          animation: appearDot 3.5s ease-out 0.5s forwards;
        }

        .animate-fade-in-delayed {
          opacity: 0;
          animation: appearLabel 4s ease-out forwards;
        }

        .animate-fade-in-subtitle {
          opacity: 0;
          animation: appearSubtitle 2s ease-out 3s forwards;
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes appearDot {
          0% { opacity: 0; }
          30% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes appearLabel {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          75% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes appearSubtitle {
          0% {
            opacity: 0;
            transform: translateY(-5px);
          }
          100% {
            opacity: 0.6;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const StructurePreview: React.FC<PreviewProps> = ({ isOpen, onClose, structure, onSelect }) => {
  const getEnhancedDescription = (structureId: string, originalDescription: string) => {
    if (structureId === 'three-act') {
      return `The Three-Act Structure is a time-tested framework that divides a story into three distinct parts: Setup, Confrontation, and Resolution. This powerful structure mirrors the natural flow of human experience and storytelling, making it highly effective for both traditional and contemporary narratives.

The balanced distribution of story elements (25% for Setup, 50% for Confrontation, and 25% for Resolution) creates a satisfying rhythm that resonates with readers across genres. Each act serves a crucial purpose: Act 1 establishes the world and characters while introducing the central conflict, Act 2 escalates tension through rising action and complications, and Act 3 brings everything to a climactic resolution.

This structure is particularly effective for character-driven stories where personal growth parallels plot development. Its flexibility allows for various pacing strategies while maintaining clear narrative progression. The structure's enduring popularity stems from its ability to create engaging narratives that satisfy audience expectations while leaving room for creative innovation.`;
    }
    return originalDescription;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1200px] h-[80vh] p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-semibold">{structure.name}</DialogTitle>
          <Button 
            onClick={() => onSelect(structure)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white mr-8"
          >
            Select this structure
          </Button>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(80vh-4rem)]">
          <div className="p-6">
            <Tabs defaultValue="beats" className="h-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="beats">Beat Breakdown</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="beats" className="mt-1">
                {structure.id === 'three-act' ? (
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg shadow-sm">
                      <ThreeActStructureVisual />
                    </div>
                  </div>
                ) : structure.id === 'hero-journey' ? (
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left column - Visual */}
                    <div className="bg-white rounded-lg shadow-sm">
                      <HeroJourneyVisual />
                    </div>

                    {/* Right column - Beat Breakdown */}
                    <div className="space-y-4">
                      {structure.beats.map((beat, index) => (
                        <motion.div
                          key={beat.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-lg p-4 shadow-sm"
                        >
                          <div className="text-sm text-slate-600">
                            {beat.description.split(', ').map((item, i) => (
                              <div key={i} className="mt-2 first:mt-0">{item}</div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : structure.id === 'five-act' ? (
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg">
                      <FiveActStructureVisual />
                    </div>
                  </div>
                ) : structure.id === 'seven-point' ? (
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg">
                      <SevenPointStructureVisual />
                    </div>
                  </div>
                ) : structure.id === 'save-the-cat' ? (
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg">
                      <SaveTheCatVisual />
                    </div>
                  </div>
                ) : structure.id === 'fichtean' ? (
                  <div className="space-y-4">
                    {/* Visual Section */}
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 800 330"
                        style={{
                          width: '100%',
                          height: 'auto'
                        }}
                      >
                        <rect width="800" height="330" fill="white"/>
                        
                        <style>
                          {`
                            @keyframes drawPath {
                              from { stroke-dashoffset: 1000; }
                              to { stroke-dashoffset: 0; }
                            }
                            @keyframes fadeIn {
                              from { opacity: 0; }
                              to { opacity: 1; }
                            }
                            .main-curve {
                              stroke-dasharray: 1000;
                              stroke-dashoffset: 1000;
                              animation: drawPath 3s ease-out forwards;
                            }
                            .label-2 { animation: fadeIn 0.5s ease-out 1s forwards; }
                            .label-3 { animation: fadeIn 0.5s ease-out 1.5s forwards; }
                            .label-4 { animation: fadeIn 0.5s ease-out 2s forwards; }
                            .label-5 { animation: fadeIn 0.5s ease-out 2.5s forwards; }
                            .arrow { animation: fadeIn 0.5s ease-out 3s forwards; }
                          `}
                        </style>
                        
                        <path 
                          className="main-curve"
                          d="M 100 230 
                             C 130 230, 150 210, 170 200
                             C 190 190, 200 220, 220 210
                             C 240 200, 250 180, 270 170
                             C 290 160, 300 190, 320 180
                             C 340 170, 350 150, 370 140
                             C 390 130, 400 160, 420 150
                             C 440 140, 450 120, 470 110
                             C 490 100, 500 130, 520 120
                             L 520 120
                             C 540 110, 560 70, 580 60
                             C 650 80, 680 230, 700 250" 
                          fill="none" 
                          stroke="#FF4466" 
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        
                        <text x="160" y="180" className="label-2" style={{ fontFamily: 'serif', fontSize: '20px', opacity: 0 }}>Crisis</text>
                        <text x="260" y="150" className="label-2" style={{ fontFamily: 'serif', fontSize: '20px', opacity: 0 }}>Crisis</text>
                        <text x="360" y="120" className="label-2" style={{ fontFamily: 'serif', fontSize: '20px', opacity: 0 }}>Crisis</text>
                        <text x="460" y="90" className="label-2" style={{ fontFamily: 'serif', fontSize: '20px', opacity: 0 }}>Crisis</text>
                        
                        <text x="530" y="48" className="label-3" style={{ fontFamily: 'serif', fontSize: '20px', opacity: 0 }}>Climax</text>
                        
                        <g className="label-4" style={{ opacity: 0 }}>
                          <text x="130" y="281" style={{ fontFamily: 'serif', fontSize: '20px' }}>Fast Tension</text>
                          <path d="M 150 260 Q 160 240 180 220" fill="none" stroke="#FFA500" strokeWidth="2" markerEnd="url(#arrowhead)" className="arrow"/>
                        </g>
                        
                        <g className="label-4" style={{ opacity: 0 }}>
                          <text x="320" y="226" style={{ fontFamily: 'serif', fontSize: '20px' }}>Worsening Problems</text>
                          <path d="M 360 205 Q 380 185 400 165" fill="none" stroke="#FFA500" strokeWidth="2" markerEnd="url(#arrowhead)" className="arrow"/>
                        </g>
                        
                        <g className="label-5" style={{ opacity: 0 }}>
                          <text x="605" y="25" style={{ fontFamily: 'serif', fontSize: '20px' }}>Height of Tension</text>
                          <path d="M 635 41 Q 625 51 615 61" fill="none" stroke="#FFA500" strokeWidth="2" markerEnd="url(#arrowhead)" className="arrow"/>
                        </g>
                        
                        <text x="678" y="180" className="label-5" style={{ fontFamily: 'serif', fontSize: '20px', opacity: 0 }}>Resolution</text>
                        
                        <defs>
                          <marker 
                            id="arrowhead" 
                            markerWidth="10" 
                            markerHeight="7" 
                            refX="9" 
                            refY="3.5" 
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#FFA500"/>
                          </marker>
                        </defs>
                      </svg>
                    </div>

                    {/* Beat Descriptions - Horizontal Layout */}
                    <div className="grid grid-cols-3 gap-4">
                      {structure.beats.map((beat, index) => (
                        <motion.div
                          key={beat.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-lg p-4 shadow-sm"
                        >
                          <h3 className="font-medium text-lg mb-2">{beat.name} ({beat.percentage})</h3>
                          <div className="text-sm text-slate-600">
                            {beat.description}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : structure.id === 'multiple-timelines' ? (
                  <div className="space-y-6">
                    {structure.beats.map((beat, index) => (
                      <motion.div
                        key={beat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg p-4 shadow-sm"
                      >
                        <h3 className="font-medium text-lg mb-2">{beat.name} ({beat.percentage})</h3>
                        <div className="text-sm text-slate-600">
                          {beat.description.split(', ').map((item, i) => (
                            <div key={i} className="mt-2 first:mt-0">{item}</div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : structure.id === 'in-media-res' ? (
                  <div className="space-y-4">
                    {/* Visual Section */}
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="40 160 680 290" style={{backgroundColor: 'white'}}>
                        <rect width="100%" height="100%" fill="white"/>
                        
                        {/* Main plot line segments with draw animation */}
                        {/* First segment (dashed and grey) */}
                        <path d="M 80 400 L 280 320" 
                              stroke="#808080" 
                              stroke-width="1.5" 
                              fill="none"
                              stroke-dasharray="5,5"
                              opacity="0">
                          <animate 
                            attributeName="opacity"
                            from="0"
                            to="1"
                            dur="0.5s"
                            begin="1s"
                            fill="freeze"/>
                        </path>
                        {/* Remaining segments */}
                        <path d="M 280 320 L 480 200 L 580 280 L 680 280" 
                              stroke="black" 
                              stroke-width="1.5" 
                              fill="none"
                              stroke-dasharray="1000"
                              stroke-dashoffset="1000">
                          <animate 
                            attributeName="stroke-dashoffset"
                            from="1000"
                            to="0"
                            dur="1.5s"
                            begin="1.5s"
                            fill="freeze"/>
                        </path>
                        
                        {/* Plot points (circles) with pop-in animation */}
                        <g opacity="0">
                          <animate 
                            attributeName="opacity"
                            from="0"
                            to="1"
                            dur="0.5s"
                            begin="3s"
                            fill="freeze"/>
                          <circle cx="80" cy="400" r="6" fill="#ffb6c1"/>
                          <circle cx="280" cy="320" r="6" fill="#ffb6c1"/>
                          <circle cx="480" cy="200" r="6" fill="#ffb6c1"/>
                          <circle cx="580" cy="280" r="6" fill="#ffb6c1"/>
                          <circle cx="680" cy="280" r="6" fill="#ffb6c1"/>
                        </g>
                        
                        {/* Labels with fade-in */}
                        <g opacity="0">
                          <animate 
                            attributeName="opacity"
                            from="0"
                            to="1"
                            dur="1s"
                            begin="3.5s"
                            fill="freeze"/>
                          <text x="50" y="430" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="400">Inciting Incident</text>
                          <text x="460" y="180" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="400">Climax</text>
                          <text x="635" y="305" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="400">Resolution</text>
                        </g>
                        
                        {/* Starting point arrow and label */}
                        <g opacity="0">
                          <animate 
                            attributeName="opacity"
                            from="0"
                            to="1"
                            dur="1s"
                            begin="2.5s"
                            fill="freeze"/>
                          <text x="118" y="294" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="400">Story might start here</text>
                          <path d="M 280 290 L 280 310" stroke="black" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                        </g>
                        
                        {/* Straight arrow for flashbacks with draw animation */}
                        <path d="M 270 350 L 370 350" 
                              stroke="black" 
                              strokeWidth="1.5"
                              fill="none"
                              markerEnd="url(#arrowhead)"
                              strokeDasharray="100"
                              strokeDashoffset="100">
                          <animate 
                            attributeName="stroke-dashoffset"
                            from="100"
                            to="0"
                            dur="1s"
                            begin="3s"
                            fill="freeze"/>
                        </path>
                        
                        {/* Arrowhead definition */}
                        <defs>
                          <marker id="arrowhead" markerWidth="8" markerHeight="6" 
                                  refX="8" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="black"/>
                          </marker>
                        </defs>
                        
                        {/* Flashback explanation text with fade-in */}
                        <g opacity="0">
                          <animate 
                            attributeName="opacity"
                            from="0"
                            to="1"
                            dur="1s"
                            begin="3.5s"
                            fill="freeze"/>
                          <text x="205" y="380" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="400">
                            <tspan x="220" dy="0">Events before the starting point</tspan>
                            <tspan x="220" dy="22">are revealed as flashbacks</tspan>
                            <tspan x="220" dy="22">later in the story</tspan>
                          </text>
                        </g>
                      </svg>
                    </div>

                    {/* Beat Descriptions - Horizontal Layout */}
                    <div className="grid grid-cols-3 gap-4">
                      {structure.beats.map((beat, index) => (
                        <motion.div
                          key={beat.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-lg p-4 shadow-sm"
                        >
                          <h3 className="font-medium text-lg mb-2">{beat.name} ({beat.percentage})</h3>
                          <div className="text-sm text-slate-600">
                            {beat.description.split(', ').map((item, i) => (
                              <div key={i} className="mt-2 first:mt-0">{item}</div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {structure.beats.map((beat, index) => (
                      <motion.div
                        key={beat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg p-4 shadow-sm"
                      >
                        <div className="text-sm text-slate-600">
                          {beat.description.split(', ').map((item, i) => (
                            <div key={i} className="mt-2 first:mt-0">{item}</div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="examples" className="mt-6">
                <div className="space-y-6">
                  {structure.examples.map((example, index) => (
                    <motion.div
                      key={example.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg p-4 shadow-sm"
                    >
                      <h3 className="font-medium text-lg mb-2">{example.title}</h3>
                      <p className="text-slate-600">{example.explanation}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <div className="space-y-6">
                  <div className="prose prose-slate max-w-none bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-slate-600 whitespace-pre-line">
                      {getEnhancedDescription(structure.id, structure.description)}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Recommended Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {structure.genres.map((genre) => (
                        <Badge key={genre} variant="secondary" className="bg-indigo-50 text-indigo-700">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const PlotStructure: React.FC = () => {
  const [, navigate] = useLocation();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [previewStructure, setPreviewStructure] = useState<StoryStructure | null>(null);
  const { selectedStructure, setSelectedStructure } = usePlotStructureStore();

  const handleStructureClick = (structure: StoryStructure) => {
    setPreviewStructure(structure);
  };

  const handleStructureSelect = (structure: StoryStructure) => {
    setSelectedStructure(structure);
    setPreviewStructure(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[80%] mx-auto py-16"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Choose Your Plot Structure</h2>
        <p className="text-slate-600 mt-2">
          Select a structure that best fits your story's needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {BASIC_STRUCTURES.map(structure => (
          <motion.div
            key={structure.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 ${
                selectedStructure?.id === structure.id
                  ? 'ring-2 ring-indigo-500 bg-indigo-50'
                  : 'hover:bg-slate-50'
              }`}
              onClick={() => handleStructureClick(structure)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedStructure?.id === structure.id
                      ? 'bg-indigo-100'
                      : 'bg-slate-100'
                  }`}>
                    {React.createElement(structure.icon, {
                      className: `w-6 h-6 ${
                        selectedStructure?.id === structure.id
                          ? 'text-indigo-600'
                          : 'text-slate-600'
                      }`
                    })}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">
                      {structure.name}
                      {structure.isRecommended && (
                        <span className="ml-2 text-xs text-indigo-600 font-normal">
                          Recommended
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">{structure.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-slate-600 hover:text-slate-900"
        >
          <ChevronDown className={`w-4 h-4 mr-2 transition-transform duration-300 ${
            showAdvanced ? 'rotate-180' : ''
          }`} />
          {showAdvanced ? 'Hide Advanced Structures' : 'Show Advanced Structures'}
        </Button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: showAdvanced ? 'auto' : 0, opacity: showAdvanced ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {ADVANCED_STRUCTURES.map(structure => (
            <motion.div
              key={structure.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 ${
                  selectedStructure?.id === structure.id
                    ? 'ring-2 ring-indigo-500 bg-indigo-50'
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => handleStructureClick(structure)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedStructure?.id === structure.id
                        ? 'bg-indigo-100'
                        : 'bg-slate-100'
                    }`}>
                      {React.createElement(structure.icon, {
                        className: `w-6 h-6 ${
                          selectedStructure?.id === structure.id
                            ? 'text-indigo-600'
                            : 'text-slate-600'
                        }`
                      })}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">{structure.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">{structure.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedStructure && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 flex justify-end"
        >
          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
            size="lg"
            onClick={() => navigate("/plot-structure/core-elements")}
          >
            Continue to Core Elements
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      )}

      {previewStructure && (
        <StructurePreview
          isOpen={!!previewStructure}
          onClose={() => setPreviewStructure(null)}
          structure={previewStructure}
          onSelect={handleStructureSelect}
        />
      )}
    </motion.div>
  );
};

export default PlotStructure; 