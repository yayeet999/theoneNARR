import React, { useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Position,
  MarkerType,
  ConnectionLineType,
  PanOnScrollMode,
  Handle
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Flame,
  Swords,
  Scale,
  HeartHandshake,
  Eye,
  Binary,
  Users,
  CircleUserRound,
  Waypoints,
  ArrowBigRightDash,
  Mountain,
  Target,
  Puzzle,
  Network,
  Glasses,
  Workflow,
  Building2,
  TreePine,
  Sparkles,
  Lightbulb,
  Shapes,
  MessageSquare,
  Landmark,
  Cloud
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ThemeCategory = 
  | 'thematicConflict'
  | 'characterTruth'
  | 'storyEvolution'
  | 'parallelElements'
  | 'worldImpact'
  | 'thematicEchoes';

interface ThemeHierarchyProps {
  width: number;
  height: number;
  theme: {
    id: string;
    name: string;
  } | null;
  isPrimary: boolean;
  selectedExpressions: Record<ThemeCategory, string[]>;
  expressionOptions: {
    [key in ThemeCategory]: { id: string; text: string; category: string; }[];
  };
}

const ThemeNode = ({ data }: { data: any }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: data.isPrimary ? '#818cf8' : '#34d399' }}
      />
      <div className={cn(
        "px-3 py-2 rounded-lg shadow-sm text-center w-[132px]",
        data.isRoot && data.isPrimary && "bg-indigo-50 border-2 border-indigo-200 text-indigo-700",
        data.isRoot && !data.isPrimary && "bg-emerald-50 border-2 border-emerald-200 text-emerald-700",
        data.isCategory && data.isPrimary && "bg-indigo-50/50 border border-indigo-100 text-indigo-600",
        data.isCategory && !data.isPrimary && "bg-emerald-50/50 border border-emerald-100 text-emerald-600",
        !data.isRoot && !data.isCategory && "bg-white border border-slate-200 text-slate-600"
      )}>
        {data.icon && (
          <div className="flex items-start gap-2">
            <data.icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-sm line-clamp-2 text-left">{data.label}</span>
          </div>
        )}
        {!data.icon && (
          <span className="text-sm line-clamp-2">{data.label}</span>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: data.isPrimary ? '#818cf8' : '#34d399' }}
      />
    </>
  );
};

const nodeTypes = {
  themeNode: ThemeNode,
};

export const ThemeHierarchy: React.FC<ThemeHierarchyProps> = ({
  width,
  height,
  theme,
  isPrimary,
  selectedExpressions,
  expressionOptions,
}) => {
  const getOptionIcon = (category: string, optionId: string) => {
    type IconMap = {
      [key: string]: {
        [key: string]: React.ElementType;
      };
    };

    const icons: IconMap = {
      thematicConflict: {
        'conflict1': Flame,      // Internal struggle
        'conflict2': Swords,     // External opposition
        'conflict3': Scale,      // Philosophical contradiction
        'conflict4': HeartHandshake, // Personal desire vs responsibility
        'conflict5': Eye,        // Truth vs perception
        'conflict6': Binary      // Idealism vs reality
      },
      characterTruth: {
        'truth1': CircleUserRound, // Core belief
        'truth2': Users,         // Identity
        'truth3': Waypoints,     // Value system
        'truth4': Network,       // Relationship dynamics
        'truth5': Mountain,      // Moral compass
        'truth6': Target         // Life purpose
      },
      storyEvolution: {
        'evolution1': Puzzle,    // Opening situation
        'evolution2': Glasses,   // Early challenge
        'evolution3': Workflow,  // Midpoint reversal
        'evolution4': ArrowBigRightDash, // Escalating consequences
        'evolution5': Mountain,  // Climactic confrontation
        'evolution6': Target     // Resolution
      },
      parallelElements: {
        'parallel1': Users,      // Character foils
        'parallel2': Workflow,   // Subplot reflections
        'parallel3': Glasses,    // Contrasting perspectives
        'parallel4': Network,    // Supporting relationships
        'parallel5': TreePine,   // Environmental parallels
        'parallel6': Sparkles    // Symbolic connections
      },
      worldImpact: {
        'impact1': Network,      // Social ripples
        'impact2': Building2,    // Community transformation
        'impact3': Landmark,     // Cultural shifts
        'impact4': Scale,        // Power dynamics
        'impact5': Building2,    // Institutional responses
        'impact6': Cloud         // Environmental changes
      },
      thematicEchoes: {
        'echo1': Sparkles,       // Recurring symbols
        'echo2': Shapes,         // Metaphorical patterns
        'echo3': MessageSquare,  // Dialogue motifs
        'echo4': TreePine,       // Setting resonance
        'echo5': Lightbulb,      // Object significance
        'echo6': Workflow        // Ritual/routine meaning
      }
    };
    
    return icons[category]?.[optionId] || Sparkles;
  };

  const { nodes, edges } = useMemo(() => {
    if (!theme) return { nodes: [], edges: [] };

    const categories = isPrimary 
      ? ['thematicConflict', 'characterTruth', 'storyEvolution']
      : ['parallelElements', 'worldImpact', 'thematicEchoes'];

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    
    // Constants for layout
    const categorySpacing = 154;
    const verticalSpacing = 100;
    const cardWidth = 132;
    const centerX = width / 2;
    const startY = 20;

    // Root node
    nodes.push({
      id: 'root',
      type: 'themeNode',
      position: { x: centerX - (cardWidth / 2), y: startY },
      data: { 
        label: theme.name,
        isRoot: true,
        isPrimary
      }
    });

    // Category nodes
    categories.forEach((category, index) => {
      const xOffset = (index - 1) * categorySpacing;
      const categoryId = `category-${index}`;
      
      nodes.push({
        id: categoryId,
        type: 'themeNode',
        position: { x: centerX - (cardWidth / 2) + xOffset, y: startY + verticalSpacing },
        data: {
          label: category.replace(/([A-Z])/g, ' $1').trim(),
          isCategory: true,
          isPrimary
        }
      });

      // Edge from root to category
      edges.push({
        id: `edge-root-${categoryId}`,
        source: 'root',
        target: categoryId,
        type: 'default',
        style: { stroke: isPrimary ? '#818cf8' : '#34d399', strokeWidth: 2 }
      });

      // Expression nodes
      selectedExpressions[category as ThemeCategory]?.forEach((id, expressionIndex) => {
        const option = expressionOptions[category as ThemeCategory].find(opt => opt.id === id);
        if (!option) return;

        const expressionId = `expression-${categoryId}-${expressionIndex}`;
        const IconComponent = getOptionIcon(category, id);
        
        nodes.push({
          id: expressionId,
          type: 'themeNode',
          position: { 
            x: centerX - (cardWidth / 2) + xOffset, 
            y: startY + (verticalSpacing * 2) + (expressionIndex * 70)
          },
          data: {
            label: option.text,
            icon: IconComponent,
            isPrimary
          }
        });

        edges.push({
          id: `edge-${categoryId}-${expressionId}`,
          source: categoryId,
          target: expressionId,
          type: 'default',
          style: { stroke: isPrimary ? '#818cf8' : '#34d399', strokeWidth: 2 }
        });
      });
    });

    return { nodes, edges };
  }, [theme, selectedExpressions, expressionOptions, isPrimary, width]);

  if (!theme) return null;

  return (
    <div className="w-full h-full bg-slate-50/50 rounded-xl border border-slate-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: 'default',
          style: { stroke: isPrimary ? '#818cf8' : '#34d399', strokeWidth: 2 }
        }}
        fitView={true}
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.8,
          maxZoom: 0.8
        }}
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-left"
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll={true}
        panOnScrollMode={PanOnScrollMode.Vertical}
        panOnDrag={true}
        zoomOnScroll={false}
        preventScrolling={false}
        className="w-full h-full"
      />
    </div>
  );
}; 