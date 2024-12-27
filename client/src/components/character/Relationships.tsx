import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Users,
  HeartHandshake,
  Swords,
  GraduationCap,
  UserPlus,
  Shield,
  Skull,
  Heart,
  Save
} from 'lucide-react';
import cn from 'classnames';

interface Relationship {
  id: string;
  type: 'family' | 'friend' | 'rival' | 'mentor' | 'student' | 'ally' | 'enemy' | 'romantic';
  targetCharacter: string;
  attributes: {
    trustLevel: number;
    loyaltyScale: number;
    conflictPotential: number;
    powerDynamic: number;
    emotionalBond: number;
  };
}

interface RelationshipsProps {
  relationships: Relationship[];
  onRelationshipAdd: (relationship: Relationship) => void;
  onRelationshipUpdate: (id: string, updates: Partial<Relationship>) => void;
  availableCharacters: { id: string; name: string }[];
}

const relationshipTypes = {
  family: {
    label: 'Family',
    icon: Users,
    description: 'Blood relations or chosen family'
  },
  friend: {
    label: 'Friend',
    icon: HeartHandshake,
    description: 'Close companions and confidants'
  },
  rival: {
    label: 'Rival',
    icon: Swords,
    description: 'Competitive or opposing relationship'
  },
  mentor: {
    label: 'Mentor',
    icon: GraduationCap,
    description: 'Teacher or guide'
  },
  student: {
    label: 'Student',
    icon: UserPlus,
    description: 'Learning from or guided by'
  },
  ally: {
    label: 'Ally',
    icon: Shield,
    description: 'Strategic or beneficial alliance'
  },
  enemy: {
    label: 'Enemy',
    icon: Skull,
    description: 'Direct opposition or antagonist'
  },
  romantic: {
    label: 'Romantic',
    icon: Heart,
    description: 'Love interest or partner'
  }
};

const Relationships: React.FC<RelationshipsProps> = ({
  relationships,
  onRelationshipAdd,
  onRelationshipUpdate,
  availableCharacters
}) => {
  const [newRelationship, setNewRelationship] = useState<Partial<Relationship>>({
    type: 'friend',
    attributes: {
      trustLevel: 50,
      loyaltyScale: 50,
      conflictPotential: 25,
      powerDynamic: 0,
      emotionalBond: 50
    }
  });

  const handleSaveRelationship = () => {
    if (!newRelationship.targetCharacter) {
      return;
    }

    onRelationshipAdd({
      id: Math.random().toString(36).substr(2, 9),
      type: newRelationship.type as Relationship['type'],
      targetCharacter: newRelationship.targetCharacter,
      attributes: newRelationship.attributes as Relationship['attributes']
    });

    // Reset form
    setNewRelationship({
      type: 'friend',
      attributes: {
        trustLevel: 50,
        loyaltyScale: 50,
        conflictPotential: 25,
        powerDynamic: 0,
        emotionalBond: 50
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Character Relationships</h3>
      </div>

      {/* Relationship Graph Visualization */}
      <div className="bg-slate-50 p-6 rounded-lg mb-6">
        <h4 className="text-sm font-medium text-slate-700 mb-4">Character Relationship Network</h4>
        <div className="relative h-[400px] border border-slate-200 rounded-lg bg-white overflow-hidden">
          {/* Central character */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-indigo-100 p-3 rounded-full border-2 border-indigo-500 shadow-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>

          {/* Relationship connections */}
          {relationships.map((rel, index) => {
            const targetChar = availableCharacters.find(c => c.id === rel.targetCharacter);
            if (!targetChar) return null;

            const angle = (2 * Math.PI * index) / relationships.length;
            const radius = 160; // Increased radius for better spacing
            const x = 200 + radius * Math.cos(angle);
            const y = 200 + radius * Math.sin(angle);

            // Calculate connection strength for line thickness
            const strength = (rel.attributes.trustLevel + rel.attributes.emotionalBond) / 2;
            const lineThickness = 1 + (strength / 100) * 4; // 1-5px based on strength

            // Calculate connection color based on relationship type
            const getConnectionColor = (type: string) => {
              switch (type) {
                case 'family': return 'rgba(59, 130, 246, 0.5)'; // blue
                case 'friend': return 'rgba(16, 185, 129, 0.5)'; // green
                case 'rival': return 'rgba(239, 68, 68, 0.5)'; // red
                case 'mentor': return 'rgba(139, 92, 246, 0.5)'; // purple
                case 'student': return 'rgba(245, 158, 11, 0.5)'; // amber
                case 'ally': return 'rgba(14, 165, 233, 0.5)'; // sky
                case 'enemy': return 'rgba(190, 18, 60, 0.5)'; // rose
                case 'romantic': return 'rgba(236, 72, 153, 0.5)'; // pink
                default: return 'rgba(156, 163, 175, 0.5)'; // gray
              }
            };

            return (
              <React.Fragment key={rel.id}>
                {/* Connection line */}
                <div
                  className="absolute top-1/2 left-1/2 origin-left h-px transform -translate-y-1/2"
                  style={{
                    width: `${radius}px`,
                    transform: `rotate(${angle}rad)`,
                    backgroundColor: getConnectionColor(rel.type),
                    height: `${lineThickness}px`,
                    opacity: 0.8,
                  }}
                />

                {/* Character node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div className="relative group">
                    <div className={cn(
                      "bg-white p-3 rounded-lg shadow-md border-2",
                      "transform transition-transform duration-200 group-hover:scale-110",
                      rel.attributes.powerDynamic > 25 ? "border-green-400" :
                      rel.attributes.powerDynamic < -25 ? "border-red-400" :
                      "border-slate-200"
                    )}>
                      <div className="flex items-center space-x-2">
                        {React.createElement(relationshipTypes[rel.type].icon, {
                          className: "w-4 h-4 text-slate-600"
                        })}
                        <span className="text-sm font-medium">{targetChar.name}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{relationshipTypes[rel.type].label}</div>
                    </div>

                    {/* Relationship details tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-white rounded-lg shadow-lg p-3 text-sm w-48">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Trust:</span>
                            <span className="font-medium">{rel.attributes.trustLevel}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Power:</span>
                            <span className={cn(
                              "font-medium",
                              rel.attributes.powerDynamic > 0 ? "text-green-600" :
                              rel.attributes.powerDynamic < 0 ? "text-red-600" :
                              "text-slate-600"
                            )}>
                              {rel.attributes.powerDynamic > 0 ? "+" : ""}{rel.attributes.powerDynamic}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Bond:</span>
                            <span className="font-medium">{rel.attributes.emotionalBond}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </React.Fragment>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-lg shadow-sm text-xs">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {Object.entries(relationshipTypes).map(([type, { label, icon: Icon }]) => (
                <div key={type} className="flex items-center space-x-1">
                  <Icon className="w-3 h-3" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add New Relationship Form */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <Label>Relationship Type</Label>
              <select
                className="w-full mt-1 rounded-md border border-slate-200 p-2"
                value={newRelationship.type}
                onChange={(e) => setNewRelationship(prev => ({
                  ...prev,
                  type: e.target.value as Relationship['type']
                }))}
              >
                {Object.entries(relationshipTypes).map(([value, { label }]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-3">
              <Label>With Character</Label>
              <select
                className="w-full mt-1 rounded-md border border-slate-200 p-2"
                value={newRelationship.targetCharacter}
                onChange={(e) => setNewRelationship(prev => ({
                  ...prev,
                  targetCharacter: e.target.value
                }))}
              >
                <option value="">Select character...</option>
                {availableCharacters.map((char) => (
                  <option key={char.id} value={char.id}>
                    {char.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-6">
              <div className="space-y-4">
                <div>
                  <Label>Trust Level ({newRelationship.attributes?.trustLevel || 50})</Label>
                  <Slider
                    value={[newRelationship.attributes?.trustLevel || 50]}
                    onValueChange={([value]) => setNewRelationship(prev => ({
                      ...prev,
                      attributes: {
                        ...prev.attributes!,
                        trustLevel: value
                      }
                    }))}
                    min={0}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Power Dynamic ({newRelationship.attributes?.powerDynamic || 0})</Label>
                  <Slider
                    value={[newRelationship.attributes?.powerDynamic || 0]}
                    onValueChange={([value]) => setNewRelationship(prev => ({
                      ...prev,
                      attributes: {
                        ...prev.attributes!,
                        powerDynamic: value
                      }
                    }))}
                    min={-50}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Emotional Bond ({newRelationship.attributes?.emotionalBond || 50})</Label>
                  <Slider
                    value={[newRelationship.attributes?.emotionalBond || 50]}
                    onValueChange={([value]) => setNewRelationship(prev => ({
                      ...prev,
                      attributes: {
                        ...prev.attributes!,
                        emotionalBond: value
                      }
                    }))}
                    min={0}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleSaveRelationship}
              disabled={!newRelationship.targetCharacter}
              className="bg-green-600 hover:bg-green-500 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Relationship
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Relationships */}
      <div className="space-y-4">
        {relationships.map((relationship) => {
          const targetChar = availableCharacters.find(c => c.id === relationship.targetCharacter);
          if (!targetChar) return null;

          return (
            <motion.div
              key={relationship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {React.createElement(relationshipTypes[relationship.type].icon, {
                        className: "w-5 h-5 text-slate-600"
                      })}
                      <div>
                        <h4 className="font-medium">{targetChar.name}</h4>
                        <p className="text-sm text-slate-500">{relationshipTypes[relationship.type].label}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Trust Level ({relationship.attributes.trustLevel})</Label>
                      <Slider
                        value={[relationship.attributes.trustLevel]}
                        onValueChange={([value]) => onRelationshipUpdate(relationship.id, {
                          attributes: {
                            ...relationship.attributes,
                            trustLevel: value
                          }
                        })}
                        min={0}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Power Dynamic ({relationship.attributes.powerDynamic})</Label>
                      <Slider
                        value={[relationship.attributes.powerDynamic]}
                        onValueChange={([value]) => onRelationshipUpdate(relationship.id, {
                          attributes: {
                            ...relationship.attributes,
                            powerDynamic: value
                          }
                        })}
                        min={-50}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Emotional Bond ({relationship.attributes.emotionalBond})</Label>
                      <Slider
                        value={[relationship.attributes.emotionalBond]}
                        onValueChange={([value]) => onRelationshipUpdate(relationship.id, {
                          attributes: {
                            ...relationship.attributes,
                            emotionalBond: value
                          }
                        })}
                        min={0}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Relationships;