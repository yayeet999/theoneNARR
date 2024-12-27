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
  AlertTriangle,
  Plus,
  Trash2,
  ShieldPlus,
  ShieldX,
  AlertCircle
} from "lucide-react";

interface Trait {
  id: string;
  description: string;
  impact: string;
}

interface Props {
  majorStrengths: Trait[];
  minorStrengths: Trait[];
  majorFlaws: Trait[];
  minorFlaws: Trait[];
  onAddTrait: (type: 'majorStrength' | 'minorStrength' | 'majorFlaw' | 'minorFlaw', trait: Trait) => void;
  onRemoveTrait: (type: 'majorStrength' | 'minorStrength' | 'majorFlaw' | 'minorFlaw', id: string) => void;
}

const MAX_MAJOR_TRAITS = 3;
const MAX_MINOR_TRAITS = 5;

export const StrengthsFlaws: React.FC<Props> = ({
  majorStrengths,
  minorStrengths,
  majorFlaws,
  minorFlaws,
  onAddTrait,
  onRemoveTrait,
}) => {
  const [newTrait, setNewTrait] = useState({ description: '', impact: '' });

  const handleAddTrait = (type: 'majorStrength' | 'minorStrength' | 'majorFlaw' | 'minorFlaw') => {
    if (newTrait.description && newTrait.impact) {
      const trait: Trait = {
        id: Math.random().toString(36).substr(2, 9),
        description: newTrait.description,
        impact: newTrait.impact,
      };
      onAddTrait(type, trait);
      setNewTrait({ description: '', impact: '' });
    }
  };

  const getTraitLimitWarning = (type: 'major' | 'minor', traits: Trait[]) => {
    const limit = type === 'major' ? MAX_MAJOR_TRAITS : MAX_MINOR_TRAITS;
    const remaining = limit - traits.length;
    
    if (remaining === 0) {
      return `Maximum ${limit} traits reached`;
    }
    return `${remaining} more trait${remaining === 1 ? '' : 's'} can be added`;
  };

  const calculateBalance = () => {
    const strengthsCount = majorStrengths.length * 2 + minorStrengths.length;
    const flawsCount = majorFlaws.length * 2 + minorFlaws.length;
    const ratio = strengthsCount / (flawsCount || 1);

    if (ratio > 1.5) {
      return {
        message: "Character may be too powerful - consider adding more flaws",
        color: "text-yellow-500"
      };
    } else if (ratio < 0.67) {
      return {
        message: "Character may be too flawed - consider adding more strengths",
        color: "text-yellow-500"
      };
    }
    return {
      message: "Character traits are well balanced",
      color: "text-green-500"
    };
  };

  const balance = calculateBalance();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">Strengths & Flaws</h2>
        <div className="flex items-center space-x-2">
          <AlertCircle className={`w-5 h-5 ${balance.color}`} />
          <span className={`text-sm ${balance.color}`}>{balance.message}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShieldPlus className="w-5 h-5 text-emerald-500" />
              <span>Strengths</span>
            </CardTitle>
            <CardDescription>Define your character's major and minor strengths</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Major Strengths */}
            <div>
              <Label className="text-sm font-medium text-slate-900">Major Strengths</Label>
              <p className="text-xs text-slate-500 mb-2">
                {getTraitLimitWarning('major', majorStrengths)}
              </p>
              <div className="space-y-2">
                {majorStrengths.map((trait) => (
                  <motion.div
                    key={trait.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-2 bg-slate-50 p-3 rounded-md"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{trait.description}</p>
                      <p className="text-xs text-slate-500">{trait.impact}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveTrait('majorStrength', trait.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </motion.div>
                ))}
                {majorStrengths.length < MAX_MAJOR_TRAITS && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Strength description"
                      value={newTrait.description}
                      onChange={(e) => setNewTrait(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <Input
                      placeholder="Impact on story/relationships"
                      value={newTrait.impact}
                      onChange={(e) => setNewTrait(prev => ({ ...prev, impact: e.target.value }))}
                    />
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleAddTrait('majorStrength')}
                      disabled={!newTrait.description || !newTrait.impact}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Major Strength
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Minor Strengths */}
            <div>
              <Label className="text-sm font-medium text-slate-900">Minor Strengths</Label>
              <p className="text-xs text-slate-500 mb-2">
                {getTraitLimitWarning('minor', minorStrengths)}
              </p>
              <div className="space-y-2">
                {minorStrengths.map((trait) => (
                  <motion.div
                    key={trait.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-2 bg-slate-50 p-3 rounded-md"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{trait.description}</p>
                      <p className="text-xs text-slate-500">{trait.impact}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveTrait('minorStrength', trait.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </motion.div>
                ))}
                {minorStrengths.length < MAX_MINOR_TRAITS && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Strength description"
                      value={newTrait.description}
                      onChange={(e) => setNewTrait(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <Input
                      placeholder="Impact on story/relationships"
                      value={newTrait.impact}
                      onChange={(e) => setNewTrait(prev => ({ ...prev, impact: e.target.value }))}
                    />
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleAddTrait('minorStrength')}
                      disabled={!newTrait.description || !newTrait.impact}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Minor Strength
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flaws Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShieldX className="w-5 h-5 text-red-500" />
              <span>Flaws</span>
            </CardTitle>
            <CardDescription>Define your character's major and minor flaws</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Major Flaws */}
            <div>
              <Label className="text-sm font-medium text-slate-900">Major Flaws</Label>
              <p className="text-xs text-slate-500 mb-2">
                {getTraitLimitWarning('major', majorFlaws)}
              </p>
              <div className="space-y-2">
                {majorFlaws.map((trait) => (
                  <motion.div
                    key={trait.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-2 bg-slate-50 p-3 rounded-md"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{trait.description}</p>
                      <p className="text-xs text-slate-500">{trait.impact}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveTrait('majorFlaw', trait.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </motion.div>
                ))}
                {majorFlaws.length < MAX_MAJOR_TRAITS && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Flaw description"
                      value={newTrait.description}
                      onChange={(e) => setNewTrait(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <Input
                      placeholder="Impact on story/relationships"
                      value={newTrait.impact}
                      onChange={(e) => setNewTrait(prev => ({ ...prev, impact: e.target.value }))}
                    />
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleAddTrait('majorFlaw')}
                      disabled={!newTrait.description || !newTrait.impact}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Major Flaw
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Minor Flaws */}
            <div>
              <Label className="text-sm font-medium text-slate-900">Minor Flaws</Label>
              <p className="text-xs text-slate-500 mb-2">
                {getTraitLimitWarning('minor', minorFlaws)}
              </p>
              <div className="space-y-2">
                {minorFlaws.map((trait) => (
                  <motion.div
                    key={trait.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-2 bg-slate-50 p-3 rounded-md"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{trait.description}</p>
                      <p className="text-xs text-slate-500">{trait.impact}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveTrait('minorFlaw', trait.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </motion.div>
                ))}
                {minorFlaws.length < MAX_MINOR_TRAITS && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Flaw description"
                      value={newTrait.description}
                      onChange={(e) => setNewTrait(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <Input
                      placeholder="Impact on story/relationships"
                      value={newTrait.impact}
                      onChange={(e) => setNewTrait(prev => ({ ...prev, impact: e.target.value }))}
                    />
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleAddTrait('minorFlaw')}
                      disabled={!newTrait.description || !newTrait.impact}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Minor Flaw
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrengthsFlaws;
