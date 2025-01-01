import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Scale,
  Heart,
  Shield,
  Crown,
  Sword,
  BookOpen,
  Users,
  Star,
  Sparkles,
  AlertCircle,
  Plus,
  X,
  Hammer,
  Eye,
  Feather,
  Flame,
  Leaf,
  Moon,
  Mountain,
  Skull,
  Sun,
  Swords,
  Target,
  Trees,
  Trophy,
  Waves,
  Wind,
  Zap,
  BadgeCheck,
  BrainCircuit,
  Coins,
  Handshake,
  HeartCrack,
  History,
  Lock,
  Milestone,
  Orbit,
  Puzzle,
  Radar,
  Scroll,
  Shapes,
  Shuffle,
  Snowflake,
  Sprout
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

// Predefined belief categories with their associated beliefs
const BELIEF_CATEGORIES = [
  {
    id: 'justice',
    name: 'Justice & Morality',
    description: 'Principles of right and wrong',
    icon: Scale,
    color: 'amber',
    beliefs: [
      { belief: 'Unwavering Justice', impact: 'Always seeks fair and just solutions', icon: Hammer },
      { belief: 'Moral Flexibility', impact: 'Adapts ethics to circumstances', icon: Shuffle },
      { belief: 'Honor Code', impact: 'Lives by strict personal rules', icon: Shield },
      { belief: 'Greater Good', impact: 'Prioritizes collective benefit over individual needs', icon: Users },
      { belief: 'Personal Ethics', impact: 'Follows own moral compass', icon: Star }
    ]
  },
  {
    id: 'relationships',
    name: 'Relationships & Loyalty',
    description: 'Bonds with others',
    icon: Heart,
    color: 'rose',
    beliefs: [
      { belief: 'Family First', impact: 'Prioritizes family above all else', icon: Users },
      { belief: 'True Friendship', impact: 'Values deep, lasting bonds', icon: Handshake },
      { belief: 'Trust Must be Earned', impact: 'Cautious with new relationships', icon: Lock },
      { belief: 'Loyalty to Ideals', impact: 'Principles over personal ties', icon: Target },
      { belief: 'Community Bonds', impact: 'Values collective harmony', icon: Shapes }
    ]
  },
  {
    id: 'power',
    name: 'Power & Authority',
    description: 'Views on leadership and control',
    icon: Crown,
    color: 'purple',
    beliefs: [
      { belief: 'Strength Through Unity', impact: 'Believes in collective power', icon: Users },
      { belief: 'Individual Authority', impact: 'Values personal autonomy', icon: BadgeCheck },
      { belief: 'Power Corrupts', impact: 'Distrusts concentrated authority', icon: HeartCrack },
      { belief: 'Rightful Leadership', impact: 'Believes in earned authority', icon: Trophy },
      { belief: 'Shared Power', impact: 'Advocates for distributed control', icon: Handshake }
    ]
  },
  {
    id: 'destiny',
    name: 'Destiny & Purpose',
    description: 'Life\'s meaning and direction',
    icon: Star,
    color: 'blue',
    beliefs: [
      { belief: 'Forge Own Path', impact: 'Takes control of destiny', icon: Sword },
      { belief: 'Higher Purpose', impact: 'Guided by greater calling', icon: Sun },
      { belief: 'Legacy Matters', impact: 'Focused on lasting impact', icon: Milestone },
      { belief: 'Live in Present', impact: 'Values immediate experience', icon: Eye },
      { belief: 'Destiny Calls', impact: 'Believes in predetermined fate', icon: Orbit }
    ]
  },
  {
    id: 'change',
    name: 'Change & Growth',
    description: 'Attitude toward transformation',
    icon: Sparkles,
    color: 'emerald',
    beliefs: [
      { belief: 'Constant Growth', impact: 'Always seeks improvement', icon: Sprout },
      { belief: 'Tradition Matters', impact: 'Values established ways', icon: Scroll },
      { belief: 'Embrace Change', impact: 'Welcomes new possibilities', icon: Wind },
      { belief: 'Learn from Past', impact: 'History guides future', icon: History },
      { belief: 'Adaptability', impact: 'Thrives on transformation', icon: Shuffle }
    ]
  },
  {
    id: 'knowledge',
    name: 'Knowledge & Truth',
    description: 'Pursuit of understanding',
    icon: BookOpen,
    color: 'cyan',
    beliefs: [
      { belief: 'Eternal Student', impact: 'Never stops learning', icon: BrainCircuit },
      { belief: 'Truth Seeker', impact: 'Pursues absolute truth', icon: Eye },
      { belief: 'Practical Wisdom', impact: 'Values applicable knowledge', icon: Puzzle },
      { belief: 'Question Everything', impact: 'Challenges accepted truths', icon: AlertCircle },
      { belief: 'Hidden Knowledge', impact: 'Seeks secret understanding', icon: Lock }
    ]
  },
  {
    id: 'nature',
    name: 'Nature & Balance',
    description: 'Connection with natural world',
    icon: Leaf,
    color: 'teal',
    beliefs: [
      { belief: 'Natural Harmony', impact: 'Seeks balance with nature', icon: Trees },
      { belief: 'Wild Spirit', impact: 'Embraces primal forces', icon: Wind },
      { belief: 'Cycle of Life', impact: 'Accepts natural order', icon: Orbit },
      { belief: 'Environmental Guardian', impact: 'Protects natural world', icon: Shield },
      { belief: 'Nature\'s Wisdom', impact: 'Learns from natural patterns', icon: Leaf }
    ]
  },
  {
    id: 'chaos',
    name: 'Chaos & Order',
    description: 'Views on structure and disorder',
    icon: Swords,
    color: 'slate',
    beliefs: [
      { belief: 'Embrace Chaos', impact: 'Thrives in disorder', icon: Zap },
      { belief: 'Perfect Order', impact: 'Seeks absolute control', icon: Shapes },
      { belief: 'Creative Destruction', impact: 'Values necessary upheaval', icon: Flame },
      { belief: 'Balance Keeper', impact: 'Maintains equilibrium', icon: Scale },
      { belief: 'Calculated Risk', impact: 'Manages uncertainty', icon: Target }
    ]
  }
];

interface Belief {
  id: string;
  belief: string;
  strength: number;
  impact: string;
}

interface Props {
  beliefs: Belief[];
  onAddBelief: (belief: Belief) => void;
  onRemoveBelief: (id: string) => void;
}

export const CoreBeliefs: React.FC<Props> = ({
  beliefs,
  onAddBelief,
  onRemoveBelief
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBelief, setSelectedBelief] = useState<{
    belief: string;
    impact: string;
  } | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [newBelief, setNewBelief] = useState<Partial<Belief>>({
    strength: 5
  });
  const [strengthValue, setStrengthValue] = useState(5);

  const handleBeliefSelect = (belief: string, impact: string) => {
    setSelectedBelief({ belief, impact });
  };

  const handleStrengthConfirm = () => {
    if (selectedBelief) {
      onAddBelief({
        id: Math.random().toString(36).substr(2, 9),
        belief: selectedBelief.belief,
        strength: strengthValue,
        impact: selectedBelief.impact
      });
      setSelectedBelief(null);
      setStrengthValue(5);
    }
  };

  const handleCustomBeliefAdd = () => {
    if (newBelief.belief && newBelief.strength && newBelief.impact) {
      onAddBelief({
        id: Math.random().toString(36).substr(2, 9),
        belief: newBelief.belief,
        strength: newBelief.strength,
        impact: newBelief.impact
      });
      setNewBelief({ strength: 5 });
      setIsCustomizing(false);
    }
  };

  const getColorClass = (color: string) => {
    const baseClasses = {
      amber: 'bg-amber-50 border-amber-200 hover:border-amber-300',
      rose: 'bg-rose-50 border-rose-200 hover:border-rose-300',
      purple: 'bg-purple-50 border-purple-200 hover:border-purple-300',
      blue: 'bg-blue-50 border-blue-200 hover:border-blue-300',
      emerald: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
      cyan: 'bg-cyan-50 border-cyan-200 hover:border-cyan-300',
      teal: 'bg-teal-50 border-teal-200 hover:border-teal-300',
      slate: 'bg-slate-50 border-slate-200 hover:border-slate-300'
    };
    return baseClasses[color as keyof typeof baseClasses] || baseClasses.amber;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Core Beliefs & Values</h2>
          <p className="text-sm text-slate-500 mt-1">Define what your character believes in and values most</p>
        </div>
        <div className="text-sm text-slate-500">
          Select up to 10 beliefs
        </div>
      </div>

      {/* Belief Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BELIEF_CATEGORIES.map(category => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={cn(
                "cursor-pointer transition-all duration-300 hover:scale-[1.02] h-[120px]",
                getColorClass(category.color),
                selectedCategory === category.id && "ring-2",
                selectedCategory === category.id ? `ring-${category.color}-400` : ""
              )}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-5 h-full flex flex-col justify-between">
                <div className="flex items-start space-x-4">
                  {React.createElement(category.icon, {
                    className: `w-7 h-7 text-${category.color}-500 flex-shrink-0`
                  })}
                  <div>
                    <h3 className="font-medium text-base text-slate-900">{category.name}</h3>
                    <p className="text-xs text-slate-500">{category.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Custom Belief Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className={cn(
              "cursor-pointer transition-all duration-300 hover:scale-[1.02]",
              "border-dashed border-2 border-slate-200 hover:border-slate-300"
            )}
            onClick={() => setIsCustomizing(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Plus className="w-7 h-7 text-slate-400" />
                <div>
                  <h3 className="font-medium text-base text-slate-900">Create Custom Belief</h3>
                  <p className="text-xs text-slate-500">Define your own unique belief</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Custom Belief Popup */}
      <AnimatePresence>
        {isCustomizing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
            onClick={() => setIsCustomizing(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Create Custom Belief</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCustomizing(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <Input
                    value={newBelief.belief || ''}
                    onChange={(e) => setNewBelief(prev => ({ ...prev, belief: e.target.value }))}
                    placeholder="Enter your belief"
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label className="text-sm text-slate-700">Belief Strength: {newBelief.strength}</Label>
                  <Slider
                    value={[newBelief.strength || 5]}
                    onValueChange={([value]) => setNewBelief(prev => ({ ...prev, strength: value }))}
                    min={1}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Weak</span>
                    <span>Strong</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsCustomizing(false);
                      setNewBelief({ strength: 5 });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleCustomBeliefAdd}
                    disabled={!newBelief.belief}
                  >
                    Add Belief
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Belief Options Popup */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                {selectedCategory && (
                  <>
                    {React.createElement(
                      BELIEF_CATEGORIES.find(c => c.id === selectedCategory)?.icon || Scale,
                      { className: `w-5 h-5 text-${BELIEF_CATEGORIES.find(c => c.id === selectedCategory)?.color}-500 mr-2` }
                    )}
                    <h3 className="text-lg font-medium">
                      {BELIEF_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                    </h3>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {BELIEF_CATEGORIES.find(c => c.id === selectedCategory)?.beliefs.map((belief, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.05 }
                    }}
                  >
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-200",
                        "hover:scale-[1.02] hover:shadow-md",
                        selectedBelief?.belief === belief.belief && "ring-2",
                        `bg-${BELIEF_CATEGORIES.find(c => c.id === selectedCategory)?.color}-50`,
                        `border-${BELIEF_CATEGORIES.find(c => c.id === selectedCategory)?.color}-200`,
                        `hover:border-${BELIEF_CATEGORIES.find(c => c.id === selectedCategory)?.color}-300`,
                        selectedBelief?.belief === belief.belief && `ring-${BELIEF_CATEGORIES.find(c => c.id === selectedCategory)?.color}-400`
                      )}
                      onClick={() => handleBeliefSelect(belief.belief, belief.impact)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          {React.createElement(belief.icon, {
                            className: `w-5 h-5 text-${BELIEF_CATEGORIES.find(c => c.id === selectedCategory)?.color}-500`
                          })}
                          <div>
                            <h4 className="font-medium">{belief.belief}</h4>
                            <p className="text-sm text-slate-500 mt-1">{belief.impact}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Strength Selection Popup */}
      <AnimatePresence>
        {selectedBelief && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
            onClick={() => setSelectedBelief(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium mb-4">{selectedBelief.belief}</h3>
              <p className="text-sm text-slate-500 mb-4">{selectedBelief.impact}</p>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-slate-700">Belief Strength: {strengthValue}</Label>
                  <Slider
                    value={[strengthValue]}
                    onValueChange={([value]) => setStrengthValue(value)}
                    min={1}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Weak</span>
                    <span>Strong</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedBelief(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleStrengthConfirm}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Beliefs Display */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {beliefs.map(belief => (
            <motion.div
              key={belief.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-slate-900">{belief.belief}</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Scale className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-slate-600">Strength: {belief.strength}/10</span>
                    </div>
                    <p className="text-sm text-slate-500">{belief.impact}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveBelief(belief.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CoreBeliefs; 