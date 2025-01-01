import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeProps,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  Users,
  Network,
  Swords,
  Heart,
  UserMinus,
  BookOpen,
  HandshakeIcon,
  Skull,
  Crown,
  Shield,
  Brain,
  Plus,
  X,
  ChevronDown,
  Link,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "wouter";

interface Character {
  id: string;
  name: string;
  role: string;
}

interface Interaction {
  id: string;
  type: 'Conflict' | 'Alliance' | 'Romance' | 'Rivalry' | 'Mentorship' | 'Betrayal';
  sourceCharacter: string;
  targetCharacter: string;
  intensity: number;
  description: string;
  dynamics: ConnectionDynamics;
  timeline: ConnectionTimeline;
}

interface Props {
  characters: Character[];
}

const INTERACTION_TYPES = [
  { value: 'Alliance', icon: HandshakeIcon, color: '#10B981', description: 'Cooperative relationship' },
  { value: 'Romance', icon: Heart, color: '#F43F5E', description: 'Romantic connection' },
  { value: 'Family', icon: Users, color: '#8B5CF6', description: 'Family relationship' },
  { value: 'Power', icon: Crown, color: '#6366F1', description: 'Power dynamic' },
  { value: 'Dependency', icon: Link, color: '#EC4899', description: 'Reliance relationship' },
  { value: 'Past', icon: Clock, color: '#14B8A6', description: 'Historical connection' },
  { value: 'Manipulation', icon: Brain, color: '#9333EA', description: 'Manipulative dynamic' },
  { value: 'Trust', icon: Shield, color: '#0EA5E9', description: 'Trust relationship' },
  { value: 'Rivalry', icon: Swords, color: '#F59E0B', description: 'Competitive dynamic' },
  { value: 'Mentorship', icon: BookOpen, color: '#3B82F6', description: 'Teaching relationship' },
  { value: 'Conflict', icon: UserMinus, color: '#EF4444', description: 'Direct opposition' },
  { value: 'Betrayal', icon: Skull, color: '#A855F7', description: 'Trust violation' }
];

const getConnectionDescription = (interaction: { source: string; target: string; type: string }) => {
  const descriptions = {
    alliance: `${interaction.source} and ${interaction.target} are allies`,
    romance: `${interaction.source} and ${interaction.target} share a romantic connection`,
    rivalry: `${interaction.source} and ${interaction.target} are rivals`,
    mentorship: `${interaction.source} mentors ${interaction.target}`,
    conflict: `${interaction.source} is in conflict with ${interaction.target}`,
    betrayal: `${interaction.source} betrayed ${interaction.target}`
  };

  return descriptions[interaction.type.toLowerCase() as keyof typeof descriptions];
};

const CharacterNode = ({ data }: NodeProps) => {
  const Icon = data.icon || Users;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} style={{ visibility: 'hidden' }} />
      <Handle type="source" position={Position.Right} style={{ visibility: 'hidden' }} />
      {data.selected ? (
        // Center character card (larger)
  <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-[180px] bg-white rounded-lg shadow-md border-2 transition-all duration-200"
          style={{ borderColor: data.borderColor || '#6366f1' }}
        >
          <div className="p-3">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${data.color || '#e0e7ff'}, ${data.color}dd || '#d1d9ff')`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <Icon className="w-6 h-6" style={{ color: data.iconColor || '#4f46e5' }} />
              </div>
      <div>
                <div className="font-medium text-sm text-slate-900">{data.label}</div>
              </div>
      </div>
    </div>
  </motion.div>
      ) : (
        // Connected character card with relationship info
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-[280px] bg-white rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg group"
          style={{ 
            borderColor: data.borderColor || '#93c5fd',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
          }}
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${data.iconColor}15, ${data.iconColor}25)`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: data.iconColor || '#3b82f6' }} />
                </div>
                <div>
                  <div className="font-medium text-sm text-slate-900">{data.label}</div>
                  <div 
                    className="text-xs"
                    style={{ color: data.iconColor }}
                  >
                    {getConnectionDescription({
                      source: data.sourceCharacter || '',
                      target: data.label,
                      type: data.connectionType
                    })}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div 
              className="border-t pt-2 space-y-2"
              style={{ borderColor: `${data.iconColor}15` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="h-1.5 w-1.5 rounded-full mr-1.5"
                    style={{ background: data.iconColor }}
                  />
                  <span className="text-xs text-slate-600">
                    Intensity
                  </span>
                </div>
                <div className="flex-1 mx-2">
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.intensity / 10) * 100}%` }}
                      className="h-full rounded-full"
                      style={{ background: data.iconColor }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <span className="text-xs font-medium" style={{ color: data.iconColor }}>
                  {data.intensity}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-600 capitalize">
                    {data.timeline?.start || 'present'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 justify-end">
                  <span className="text-slate-600 capitalize">
                    {data.dynamics?.nature || 'stable'}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-slate-600">
                    {data.dynamics?.mutual ? 'Mutual' : 'One-sided'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 justify-end">
                  <span className="text-slate-600 capitalize">
                    {data.dynamics?.plotImpact || 'low'} Impact
                  </span>
                </div>
              </div>

              {data.description && (
                <div className="text-xs text-slate-500 leading-relaxed italic">
                  "{data.description}"
                </div>
              )}
            </div>
          </div>

          {/* Delete Confirmation Popup */}
          <AnimatePresence>
            {showDeleteConfirm && (
  <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute -right-2 top-0 w-48 bg-white rounded-lg shadow-lg border border-slate-200 p-3 z-50"
              >
                <div className="text-sm font-medium text-slate-900 mb-2">Delete Connection?</div>
                <div className="text-xs text-slate-500 mb-3">
                  This action cannot be undone.
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs hover:bg-slate-100"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-red-500 hover:bg-red-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Implement delete functionality
                      data.onDelete?.(data.id);
                      setShowDeleteConfirm(false);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

const nodeTypes = {
  character: CharacterNode,
};

// Add new helper function for grouping characters
const groupCharactersByRole = (characters: Character[]) => {
  const groups = characters.reduce((acc, character) => {
    const role = character.role;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(character);
    return acc;
  }, {} as Record<string, Character[]>);
  return groups;
};

// Add new component for Connections List
const ConnectionsList = ({ 
  interactions, 
  characters,
  onClose
}: { 
  interactions: Interaction[], 
  characters: Character[],
  onClose: () => void
}) => {
  const getCharacterName = (id: string) => {
    return characters.find(c => c.id === id)?.name || 'Unknown';
  };

  const getConnectionDescription = (interaction: { source: string; target: string; type: string }) => {
    const descriptions = {
      alliance: `${interaction.source} and ${interaction.target} are allies`,
      romance: `${interaction.source} and ${interaction.target} share a romantic connection`,
      rivalry: `${interaction.source} and ${interaction.target} are rivals`,
      mentorship: `${interaction.source} mentors ${interaction.target}`,
      conflict: `${interaction.source} is in conflict with ${interaction.target}`,
      betrayal: `${interaction.source} betrayed ${interaction.target}`
    };

    return descriptions[interaction.type.toLowerCase() as keyof typeof descriptions];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-start justify-center"
      style={{ marginTop: '20vh' }}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-[500px] max-h-[60vh] overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-slate-900">All Connections</h3>
              <p className="text-sm text-slate-500">View all character relationships</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-slate-100"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="p-4 space-y-3 max-h-[calc(60vh-80px)] overflow-y-auto">
          {interactions.map(interaction => (
            <div 
              key={interaction.id}
              className="bg-white rounded-lg border border-slate-200 p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {React.createElement(
                    INTERACTION_TYPES.find(t => t.value === interaction.type)?.icon || Users,
                    { 
                      className: "w-4 h-4",
                      style: { color: INTERACTION_TYPES.find(t => t.value === interaction.type)?.color }
                    }
                  )}
                  <div className="text-sm">
                    <div className="font-medium text-slate-900">
                      {getConnectionDescription({
                        source: getCharacterName(interaction.sourceCharacter),
                        target: getCharacterName(interaction.targetCharacter),
                        type: interaction.type
                      })}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 space-x-2">
                      <span>Intensity: {interaction.intensity}/10</span>
                      <span>•</span>
                      <span>{interaction.dynamics.mutual ? 'Mutual' : 'One-sided'}</span>
                      <span>•</span>
                      <span className="capitalize">{interaction.dynamics.plotImpact} Impact</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-6 space-y-1.5">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-600 capitalize">
                      {interaction.timeline.start} • {interaction.dynamics.nature}
                    </span>
                  </div>
                </div>
                {interaction.description && (
                  <div className="text-xs text-slate-600 leading-relaxed italic">
                    "{interaction.description}"
                  </div>
                )}
              </div>
            </div>
          ))}
          {interactions.length === 0 && (
            <div className="text-sm text-slate-500 text-center py-8">
              No connections yet
            </div>
          )}
        </div>
      </div>
  </motion.div>
);
};

const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #e2e8f0;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #cbd5e1;
  }
` as const;

// Add new interfaces for enhanced connection features
interface ConnectionTimeline {
  start: 'past' | 'present' | 'future';
  duration?: string;
}

interface ConnectionDynamics {
  mutual: boolean;
  plotImpact: 'low' | 'medium' | 'high';
  nature: 'evolving' | 'stable' | 'deteriorating';
}

export const AdvancedCharacterFeatures: React.FC<Props> = ({ characters }) => {
  const [, navigate] = useLocation();
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    characters.length > 0 ? characters[0].id : null
  );
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [newInteraction, setNewInteraction] = useState<Partial<Interaction>>({
    dynamics: {
      mutual: true,
      plotImpact: 'low' as const,
      nature: 'stable' as const
    },
    timeline: {
      start: 'present' as const
    }
  });
  const [showConnectionsList, setShowConnectionsList] = useState(false);

  const getInteractionColor = (type: string) => {
    const interactionType = INTERACTION_TYPES.find(t => t.value === type);
    return interactionType?.color || '#64748B';
  };

  const getInteractionIcon = (type: string) => {
    return INTERACTION_TYPES.find(t => t.value === type)?.icon || Users;
  };

  const handleDeleteConnection = useCallback((nodeId: string) => {
    const [targetCharId, interactionId] = nodeId.split('-');
    setInteractions(prev => prev.filter(i => i.id !== interactionId));
  }, []);

  const generateNodes = useCallback(() => {
    if (!selectedCharacter) return [];
    
    const centerChar = characters.find(c => c.id === selectedCharacter);
    if (!centerChar) return [];

    const nodes: Node[] = [
      {
        id: centerChar.id,
        type: 'character',
        position: { x: 250, y: 250 },
        data: {
          label: centerChar.name,
          description: centerChar.role,
          color: '#e0e7ff',
          borderColor: '#6366f1',
          iconColor: '#4f46e5',
          icon: Users,
          selected: true
        }
      }
    ];

    const relatedInteractions = interactions.filter(
      i => i.sourceCharacter === selectedCharacter || i.targetCharacter === selectedCharacter
    );

    relatedInteractions.forEach((interaction, index) => {
      const angle = (2 * Math.PI * index) / relatedInteractions.length;
      const radius = 200;
      const x = 250 + Math.cos(angle) * radius;
      const y = 250 + Math.sin(angle) * radius;

      const targetChar = characters.find(c => 
        c.id === (interaction.sourceCharacter === selectedCharacter 
          ? interaction.targetCharacter 
          : interaction.sourceCharacter)
      );

      if (targetChar) {
        const sourceCharName = characters.find(c => c.id === interaction.sourceCharacter)?.name || '';
        nodes.push({
          id: targetChar.id + '-' + interaction.id,
          type: 'character',
          position: { x, y },
          data: {
            id: targetChar.id + '-' + interaction.id,
            label: targetChar.name,
            description: interaction.description,
            connectionType: interaction.type,
            intensity: interaction.intensity,
            color: `${getInteractionColor(interaction.type)}15`,
            borderColor: getInteractionColor(interaction.type),
            iconColor: getInteractionColor(interaction.type),
            icon: getInteractionIcon(interaction.type),
            selected: false,
            onDelete: handleDeleteConnection,
            sourceCharacter: sourceCharName,
            dynamics: interaction.dynamics,
            timeline: interaction.timeline
          }
        });
      }
    });

    return nodes;
  }, [selectedCharacter, interactions, characters, handleDeleteConnection]);

  const generateEdges = useCallback(() => {
    if (!selectedCharacter) return [];

    return interactions
      .filter(i => i.sourceCharacter === selectedCharacter || i.targetCharacter === selectedCharacter)
      .map(interaction => {
        const targetChar = characters.find(c => 
          c.id === (interaction.sourceCharacter === selectedCharacter 
            ? interaction.targetCharacter 
            : interaction.sourceCharacter)
        );

        if (!targetChar) return null;

        const color = getInteractionColor(interaction.type);
        return {
          id: interaction.id,
          source: selectedCharacter,
          target: targetChar.id + '-' + interaction.id,
          type: 'smoothstep',
          animated: true,
          style: { 
            stroke: color,
            strokeWidth: Math.max(1, interaction.intensity / 3),
            opacity: 0.6,
            strokeDasharray: interaction.type === 'Betrayal' ? '5, 5' : undefined,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: color,
            width: 20,
            height: 20,
          },
          data: {
            type: interaction.type,
          }
        };
      })
      .filter(Boolean) as Edge[];
  }, [selectedCharacter, interactions, characters]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(generateNodes());
    setEdges(generateEdges());
  }, [selectedCharacter, interactions, characters]);

  const handleAddInteraction = () => {
    if (!newInteraction.type || !newInteraction.targetCharacter || !selectedCharacter) return;

    const interaction: Interaction = {
      id: uuidv4(),
      type: newInteraction.type,
      sourceCharacter: selectedCharacter,
      targetCharacter: newInteraction.targetCharacter,
      intensity: newInteraction.intensity || 5,
      description: newInteraction.description || '',
      dynamics: newInteraction.dynamics || {
        mutual: true,
        plotImpact: 'low',
        nature: 'stable'
      },
      timeline: newInteraction.timeline || {
        start: 'present'
      }
    };

    setInteractions(prev => [...prev, interaction]);
    setShowAddPanel(false);
    setNewInteraction({
      dynamics: {
        mutual: true,
        plotImpact: 'low' as const,
        nature: 'stable' as const
      },
      timeline: {
        start: 'present' as const
      }
    });
  };

  const updateDynamics = (updates: Partial<ConnectionDynamics>) => {
    setNewInteraction(prev => ({
      ...prev,
      dynamics: {
        ...prev.dynamics!,
        ...updates
      }
    }));
  };

  const updateTimeline = (updates: Partial<ConnectionTimeline>) => {
    setNewInteraction(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline!,
        ...updates
      }
    }));
  };

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16"
    >
      <div className="border-t border-slate-200 pt-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Character Network</h2>
          <p className="text-slate-600 mt-2">
            Visualize and manage character relationships and interactions
          </p>
        </div>

        {characters.length === 1 && (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Add more characters to unlock the full potential of the character network.
              Relationships and dynamics become more meaningful with a larger cast!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Character Selection Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Characters</CardTitle>
              <CardDescription>Select a character to view their connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                {characters.map((character) => {
                  const connectionCount = interactions.filter(
                    i => i.sourceCharacter === character.id || i.targetCharacter === character.id
                  ).length;
                  
                  return (
                    <motion.div
                  key={character.id}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgb(248, 250, 252)' }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "p-3 rounded-lg cursor-pointer transition-all duration-200",
                        selectedCharacter === character.id
                          ? "bg-indigo-50 border-2 border-indigo-500"
                          : "bg-white border border-slate-200 hover:border-slate-300"
                      )}
                  onClick={() => setSelectedCharacter(character.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            selectedCharacter === character.id
                              ? "bg-indigo-100"
                              : "bg-slate-100"
                          )}>
                            <Users className={cn(
                              "w-4 h-4",
                              selectedCharacter === character.id
                                ? "text-indigo-600"
                                : "text-slate-500"
                            )} />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{character.name}</h4>
            </div>
                        </div>
                        {connectionCount > 0 && (
                          <div className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-1 rounded-full">
                            {connectionCount}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
          </div>

              {/* Collapsible Connections List */}
              <div className="pt-4 border-t border-slate-200">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  onClick={() => setShowConnectionsList(prev => !prev)}
                >
                  View All Connections
                  <div className="flex items-center space-x-1">
                    <div className="text-xs bg-indigo-50 text-indigo-600 px-1.5 rounded">
                      {interactions.length}
                    </div>
                    <Network className="w-4 h-4" />
                  </div>
                </Button>

                <AnimatePresence>
                  {showConnectionsList && (
                    <ConnectionsList 
                      interactions={interactions}
                      characters={characters}
                      onClose={() => setShowConnectionsList(false)}
                    />
                  )}
                </AnimatePresence>
              </div>
                  </CardContent>
                </Card>

          {/* Network Visualization */}
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Character Network</CardTitle>
                    <CardDescription>
                  {selectedCharacter 
                    ? `Viewing connections for ${characters.find(c => c.id === selectedCharacter)?.name}`
                    : 'Select a character to view their connections'}
                    </CardDescription>
              </div>
              {selectedCharacter && (
                <Button
                  onClick={() => setShowAddPanel(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Connection
                </Button>
              )}
                  </CardHeader>
                  <CardContent>
              <div className="relative h-[500px] bg-slate-50/50 rounded-lg overflow-hidden">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  nodeTypes={nodeTypes}
                  fitView
                  attributionPosition="bottom-left"
                  minZoom={0.5}
                  maxZoom={1.5}
                  defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                  className="transition-all duration-300"
                  zoomOnScroll={true}
                  zoomOnPinch={true}
                  panOnScroll={false}
                  panOnDrag={true}
                  preventScrolling={true}
                  snapToGrid={false}
                  nodesDraggable={true}
                  nodesConnectable={false}
                  elementsSelectable={true}
                >
                  <Background 
                    color="#94a3b8"
                    gap={12}
                    size={1}
                    style={{ opacity: 0.1 }}
                  />
                  <Controls 
                    className="bg-white border border-slate-200 shadow-sm rounded-lg p-1"
                    showInteractive={false}
                  />
                </ReactFlow>

                {/* Add Connection Panel */}
                <AnimatePresence>
                  {showAddPanel && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="fixed inset-0 z-50 overflow-y-auto"
                      style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingTop: '2vh',
                        paddingBottom: '2vh'
                      }}
                    >
                      <div className="relative w-[800px] bg-white rounded-lg shadow-lg border border-slate-200 p-6 m-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-medium text-slate-900">Add Connection</h4>
                            <p className="text-sm text-slate-500 mt-0.5">Create a new character relationship</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-slate-100"
                            onClick={() => setShowAddPanel(false)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-6">
                          {/* Left Column - Basic Info */}
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium text-slate-700">Character</Label>
                              <Select
                                value={newInteraction.targetCharacter}
                                onValueChange={(value) => setNewInteraction(prev => ({
                                  ...prev,
                                  targetCharacter: value
                                }))}
                              >
                                <SelectTrigger className="mt-1.5">
                                  <SelectValue placeholder="Select character" />
                                </SelectTrigger>
                                <SelectContent>
                                  <div className="p-1">
                                    {characters
                                      .filter(c => c.id !== selectedCharacter)
                                      .map(character => (
                                        <SelectItem key={character.id} value={character.id}>
                                          <div className="flex items-center space-x-2 py-1">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                              <Users className="w-3 h-3 text-slate-600" />
                                            </div>
                                            <span>{character.name}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                  </div>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="text-sm font-medium text-slate-700">Connection Type</Label>
                              <div className="mt-2 grid grid-cols-4 gap-2">
                                {INTERACTION_TYPES.map(type => (
                                  <motion.button
                                    key={type.value}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setNewInteraction(prev => ({
                                      ...prev,
                                      type: type.value as Interaction['type']
                                    }))}
                                    className={cn(
                                      "p-2 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-1",
                                      newInteraction.type === type.value
                                        ? "border-current bg-opacity-10"
                                        : "border-transparent hover:border-slate-200"
                                    )}
                                    style={{ 
                                      color: type.color,
                                      backgroundColor: newInteraction.type === type.value 
                                        ? `${type.color}15`
                                        : undefined
                                    }}
                                  >
                                    {React.createElement(type.icon, { className: "w-5 h-5" })}
                                    <span className="text-xs font-medium text-slate-700">
                                      {type.value}
                                    </span>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium text-slate-700">Intensity</Label>
                                <span className="text-sm" style={{ 
                                  color: newInteraction.type ? 
                                    getInteractionColor(newInteraction.type) : 
                                    '#64748B' 
                                }}>
                                  {newInteraction.intensity || 5}
                                </span>
                              </div>
                              <Slider
                                value={[newInteraction.intensity || 5]}
                                onValueChange={([value]) => setNewInteraction(prev => ({
                                  ...prev,
                                  intensity: value
                                }))}
                                min={1}
                                max={10}
                                step={1}
                                className="mt-2"
                              />
                            </div>
                          </div>

                          {/* Right Column - Advanced Options */}
                          <div className="space-y-4">
                            <div className="flex space-x-4">
                              <div className="flex-1">
                                <Label className="text-sm font-medium text-slate-700">Timeline</Label>
                                <Select
                                  value={newInteraction.timeline?.start}
                                  onValueChange={(value) => updateTimeline({ start: value as ConnectionTimeline['start'] })}
                                >
                                  <SelectTrigger className="mt-1.5">
                                    <SelectValue placeholder="When did it start?" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="past">Started in the Past</SelectItem>
                                    <SelectItem value="present">Starts in Present</SelectItem>
                                    <SelectItem value="future">Will Start Later</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex-1">
                                <Label className="text-sm font-medium text-slate-700">Dynamic Nature</Label>
                                <Select
                                  value={newInteraction.dynamics?.nature}
                                  onValueChange={(value) => updateDynamics({ nature: value as ConnectionDynamics['nature'] })}
                                >
                                  <SelectTrigger className="mt-1.5">
                                    <SelectValue placeholder="How does it change?" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="stable">Stable</SelectItem>
                                    <SelectItem value="evolving">Evolving</SelectItem>
                                    <SelectItem value="deteriorating">Deteriorating</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm font-medium text-slate-700">Plot Impact</Label>
                              <div className="mt-2 flex space-x-2">
                                {['low', 'medium', 'high'].map((impact) => (
                                  <Button
                                    key={impact}
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                      "flex-1",
                                      newInteraction.dynamics?.plotImpact === impact
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                                        : "hover:bg-slate-50"
                                    )}
                                    onClick={() => updateDynamics({ plotImpact: impact as ConnectionDynamics['plotImpact'] })}
                                  >
                                    {impact.charAt(0).toUpperCase() + impact.slice(1)}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm font-medium text-slate-700">Mutual Nature</Label>
                              <div className="mt-2 flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={cn(
                                    "flex-1",
                                    newInteraction.dynamics?.mutual
                                      ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                                      : "hover:bg-slate-50"
                                  )}
                                  onClick={() => updateDynamics({ mutual: true })}
                                >
                                  Mutual
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={cn(
                                    "flex-1",
                                    newInteraction.dynamics?.mutual === false
                                      ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                                      : "hover:bg-slate-50"
                                  )}
                                  onClick={() => updateDynamics({ mutual: false })}
                                >
                                  One-sided
                                </Button>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium text-slate-700">Description (Optional)</Label>
                                <span className="text-xs text-slate-400">
                                  {(newInteraction.description?.length || 0)}/300
                                </span>
                              </div>
                              <Input
                                value={newInteraction.description || ''}
                                onChange={(e) => {
                                  if (e.target.value.length <= 300) {
                                    setNewInteraction(prev => ({
                                      ...prev,
                                      description: e.target.value
                                    }));
                                  }
                                }}
                                placeholder="Brief description of the connection..."
                                className="mt-1.5"
                                maxLength={300}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                          <Button
                            variant="ghost"
                            onClick={() => setShowAddPanel(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddInteraction}
                            className={cn(
                              "text-white transition-all duration-200",
                              newInteraction.type ?
                                "bg-indigo-600 hover:bg-indigo-500" :
                                "bg-slate-400"
                            )}
                            disabled={!newInteraction.type || !newInteraction.targetCharacter}
                          >
                            <Plus className="w-4 h-4 mr-1.5" />
                            Add Connection
                          </Button>
                        </div>
                      </div>
              </motion.div>
            )}
          </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Continue Button Section */}
        <div className="mt-16 border-t border-slate-200 pt-8 flex justify-end">
          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
            size="lg"
            onClick={() => navigate("/plot-structure")}
          >
            Continue to Plot Structure
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedCharacterFeatures;