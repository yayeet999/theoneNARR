import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Swords,
  Heart,
  UserMinus,
  BookOpen,
  UserPlus,
  HandshakeIcon,
  Skull,
  Crown,
  Shield,
  Brain,
  Database,
  AlertCircle
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface Character {
  id: string;
  name: string;
}

interface SceneInteraction {
  id: string;
  type: 'Conflict' | 'Alliance' | 'Romance' | 'Rivalry' | 'Mentorship' | 'Betrayal';
  intensity: number;
  participants: string[];
  description: string;
}

interface PowerDynamic {
  id: string;
  character: string;
  authorityLevel: 'Dominant' | 'Equal' | 'Subordinate';
  influenceType: 'Direct' | 'Social' | 'Knowledge' | 'Resource';
  description: string;
}

interface Props {
  sceneInteractions: SceneInteraction[];
  powerDynamics: PowerDynamic[];
  onAddInteraction: (interaction: SceneInteraction) => void;
  onRemoveInteraction: (id: string) => void;
  onAddPowerDynamic: (dynamic: PowerDynamic) => void;
  onRemovePowerDynamic: (id: string) => void;
  availableCharacters: Character[];
}

const INTERACTION_TYPES = [
  { value: 'Conflict', icon: Swords, color: 'text-red-500' },
  { value: 'Alliance', icon: HandshakeIcon, color: 'text-green-500' },
  { value: 'Romance', icon: Heart, color: 'text-pink-500' },
  { value: 'Rivalry', icon: UserMinus, color: 'text-orange-500' },
  { value: 'Mentorship', icon: BookOpen, color: 'text-blue-500' },
  { value: 'Betrayal', icon: Skull, color: 'text-purple-500' }
];

const INFLUENCE_TYPES = [
  { value: 'Direct', icon: Crown, description: 'Direct control or authority' },
  { value: 'Social', icon: Users, description: 'Social manipulation or influence' },
  { value: 'Knowledge', icon: Brain, description: 'Power through information or expertise' },
  { value: 'Resource', icon: Database, description: 'Control over important resources' }
];

export const SceneDynamics: React.FC<Props> = ({
  sceneInteractions,
  powerDynamics,
  onAddInteraction,
  onRemoveInteraction,
  onAddPowerDynamic,
  onRemovePowerDynamic,
  availableCharacters
}) => {
  const [newInteraction, setNewInteraction] = useState<Partial<SceneInteraction>>({});
  const [newPowerDynamic, setNewPowerDynamic] = useState<Partial<PowerDynamic>>({});
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const handleInteractionAdd = () => {
    if (newInteraction.type && newInteraction.intensity && selectedParticipants.length > 0 && newInteraction.description) {
      onAddInteraction({
        id: Math.random().toString(36).substr(2, 9),
        type: newInteraction.type as SceneInteraction['type'],
        intensity: newInteraction.intensity,
        participants: selectedParticipants,
        description: newInteraction.description
      });
      setNewInteraction({});
      setSelectedParticipants([]);
    }
  };

  const handlePowerDynamicAdd = () => {
    if (newPowerDynamic.character && newPowerDynamic.authorityLevel && 
        newPowerDynamic.influenceType && newPowerDynamic.description) {
      onAddPowerDynamic({
        id: Math.random().toString(36).substr(2, 9),
        character: newPowerDynamic.character,
        authorityLevel: newPowerDynamic.authorityLevel as PowerDynamic['authorityLevel'],
        influenceType: newPowerDynamic.influenceType as PowerDynamic['influenceType'],
        description: newPowerDynamic.description
      });
      setNewPowerDynamic({});
    }
  };

  const handleParticipantSelect = (characterId: string) => {
    setSelectedParticipants(prev => {
      if (prev.includes(characterId)) {
        return prev.filter(id => id !== characterId);
      }
      return [...prev, characterId];
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-slate-900">Scene Dynamics</h2>

      {/* Scene Interactions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span>Scene Interactions</span>
          </CardTitle>
          <CardDescription>Define how characters interact in different scenes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {sceneInteractions.map(interaction => (
            <motion.div
              key={interaction.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-2 bg-slate-50 p-3 rounded-md"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  {React.createElement(
                    INTERACTION_TYPES.find(t => t.value === interaction.type)?.icon || Users,
                    { className: `w-4 h-4 ${INTERACTION_TYPES.find(t => t.value === interaction.type)?.color}` }
                  )}
                  <p className="text-sm font-medium">{interaction.type}</p>
                </div>
                <p className="text-xs text-slate-500">Intensity: {interaction.intensity}/10</p>
                <p className="text-xs text-slate-500">
                  Participants: {interaction.participants.map(id => 
                    availableCharacters.find(c => c.id === id)?.name
                  ).join(', ')}
                </p>
                <p className="text-xs text-slate-500">{interaction.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveInteraction(interaction.id)}
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
              </Button>
            </motion.div>
          ))}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Interaction Type</Label>
                <Select
                  value={newInteraction.type}
                  onValueChange={(value) => setNewInteraction(prev => ({ 
                    ...prev, 
                    type: value as SceneInteraction['type']
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERACTION_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          {React.createElement(type.icon, { 
                            className: `w-4 h-4 ${type.color}` 
                          })}
                          <span>{type.value}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Intensity (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newInteraction.intensity || ''}
                  onChange={(e) => setNewInteraction(prev => ({ 
                    ...prev, 
                    intensity: parseInt(e.target.value) 
                  }))}
                />
              </div>
            </div>
            <div>
              <Label>Participants</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableCharacters.map(character => (
                  <Button
                    key={character.id}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "w-full justify-start",
                      selectedParticipants.includes(character.id) && 
                      "bg-indigo-50 border-indigo-600 text-indigo-600"
                    )}
                    onClick={() => handleParticipantSelect(character.id)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    {character.name}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={newInteraction.description || ''}
                onChange={(e) => setNewInteraction(prev => ({ 
                  ...prev, 
                  description: e.target.value
                }))}
                placeholder="Describe the interaction"
              />
            </div>
            <Button
              onClick={handleInteractionAdd}
              className="w-full"
              disabled={!newInteraction.type || !newInteraction.intensity || 
                       selectedParticipants.length === 0 || !newInteraction.description}
            >
              Add Scene Interaction
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Power Dynamics Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <span>Power Dynamics</span>
          </CardTitle>
          <CardDescription>Define authority levels and influence types between characters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {powerDynamics.map(dynamic => (
            <motion.div
              key={dynamic.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-2 bg-slate-50 p-3 rounded-md"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {availableCharacters.find(c => c.id === dynamic.character)?.name}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Shield className={cn(
                    "w-4 h-4",
                    dynamic.authorityLevel === 'Dominant' ? 'text-green-500' :
                    dynamic.authorityLevel === 'Equal' ? 'text-blue-500' : 'text-red-500'
                  )} />
                  <p className="text-xs text-slate-500">{dynamic.authorityLevel}</p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  {React.createElement(
                    INFLUENCE_TYPES.find(t => t.value === dynamic.influenceType)?.icon || Crown,
                    { className: "w-4 h-4 text-purple-500" }
                  )}
                  <p className="text-xs text-slate-500">{dynamic.influenceType}</p>
                </div>
                <p className="text-xs text-slate-500 mt-1">{dynamic.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemovePowerDynamic(dynamic.id)}
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
              </Button>
            </motion.div>
          ))}

          <div className="space-y-4">
            <div>
              <Label>Character</Label>
              <Select
                value={newPowerDynamic.character || ''}
                onValueChange={(value) => setNewPowerDynamic(prev => ({ 
                  ...prev, 
                  character: value
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select character" />
                </SelectTrigger>
                <SelectContent>
                  {availableCharacters.map(character => (
                    <SelectItem key={character.id} value={character.id}>
                      {character.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Authority Level</Label>
                <Select
                  value={newPowerDynamic.authorityLevel}
                  onValueChange={(value) => setNewPowerDynamic(prev => ({ 
                    ...prev, 
                    authorityLevel: value as PowerDynamic['authorityLevel']
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Dominant', 'Equal', 'Subordinate'].map(level => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Influence Type</Label>
                <Select
                  value={newPowerDynamic.influenceType}
                  onValueChange={(value) => setNewPowerDynamic(prev => ({ 
                    ...prev, 
                    influenceType: value as PowerDynamic['influenceType']
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {INFLUENCE_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          {React.createElement(type.icon, { 
                            className: "w-4 h-4 text-slate-500" 
                          })}
                          <span>{type.value}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={newPowerDynamic.description || ''}
                onChange={(e) => setNewPowerDynamic(prev => ({ 
                  ...prev, 
                  description: e.target.value
                }))}
                placeholder="Describe the power dynamic"
              />
            </div>
            <Button
              onClick={handlePowerDynamicAdd}
              className="w-full"
              disabled={!newPowerDynamic.character || !newPowerDynamic.authorityLevel || 
                       !newPowerDynamic.influenceType || !newPowerDynamic.description}
            >
              Add Power Dynamic
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SceneDynamics;