import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  HeartHandshake,
  Swords,
  GraduationCap,
  UserPlus,
  Shield,
  Skull,
  Heart
} from 'lucide-react';

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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Character Relationships</h3>
        <Button
          variant="outline"
          onClick={() => {
            onRelationshipAdd({
              id: Math.random().toString(36).substr(2, 9),
              type: 'friend',
              targetCharacter: '',
              attributes: {
                trustLevel: 50,
                loyaltyScale: 50,
                conflictPotential: 25,
                powerDynamic: 0,
                emotionalBond: 50
              }
            });
          }}
          className="text-sm"
          disabled={relationships.length >= 8}
        >
          Add Relationship
        </Button>
      </div>

      <div className="space-y-4">
        {relationships.map((relationship, index) => (
          <motion.div
            key={relationship.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    <Label>Relationship Type</Label>
                    <select
                      className="w-full mt-1 rounded-md border border-slate-200 p-2"
                      value={relationship.type}
                      onChange={(e) => onRelationshipUpdate(relationship.id, {
                        type: e.target.value as Relationship['type']
                      })}
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
                      value={relationship.targetCharacter}
                      onChange={(e) => onRelationshipUpdate(relationship.id, {
                        targetCharacter: e.target.value
                      })}
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
                        <Label>Trust Level ({relationship.attributes.trustLevel})</Label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={relationship.attributes.trustLevel}
                          onChange={(e) => onRelationshipUpdate(relationship.id, {
                            attributes: {
                              ...relationship.attributes,
                              trustLevel: parseInt(e.target.value)
                            }
                          })}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label>Loyalty Scale ({relationship.attributes.loyaltyScale})</Label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={relationship.attributes.loyaltyScale}
                          onChange={(e) => onRelationshipUpdate(relationship.id, {
                            attributes: {
                              ...relationship.attributes,
                              loyaltyScale: parseInt(e.target.value)
                            }
                          })}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label>Power Dynamic ({relationship.attributes.powerDynamic})</Label>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={relationship.attributes.powerDynamic}
                          onChange={(e) => onRelationshipUpdate(relationship.id, {
                            attributes: {
                              ...relationship.attributes,
                              powerDynamic: parseInt(e.target.value)
                            }
                          })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  {relationshipTypes[relationship.type].description}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {relationships.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          Add relationships to define your character's connections
        </div>
      )}
    </div>
  );
};

export default Relationships;
