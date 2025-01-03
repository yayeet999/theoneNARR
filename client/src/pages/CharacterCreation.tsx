import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import BackgroundStory from '@/components/character/BackgroundStory';
import MotivationsGoals from '@/components/character/MotivationsGoals';
import StrengthsFlaws from '@/components/character/StrengthsFlaws';
import PersonalitySystem from "@/components/character/PersonalitySystem";
import AdvancedCharacterFeatures from '@/components/character/AdvancedCharacterFeatures';
import {
  UserPlus,
  Users,
  User,
  Shield,
  Brain,
  ChevronRight,
  CheckCircle2,
  Crown,
  Sword,
  BookOpen,
  Zap,
  MessageCircle,
  Laugh
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

// Types
interface Character {
  id: string;
  name: string;
  age: number;
  gender: string;
  role: string;
  description: string;
  archetype?: string;
  traits?: {
    majorStrengths: Trait[];
    minorStrengths: Trait[];
    majorFlaws: Trait[];
    minorFlaws: Trait[];
  };
  personality?: {
    traits: PersonalityTrait[];
    beliefs: Belief[];
  };
}

interface LifeEvent {
  id: string;
  type: 'early_life' | 'defining_moment' | 'major_victory' | 'significant_loss';
  age: number;
  description: string;
}

interface Goal {
  id: string;
  type: 'primary' | 'secondary';
  description: string;
}

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

interface Trait {
  id: string;
  description: string;
  impact: string;
}

interface PersonalityTrait {
  id: string;
  trait: string;
  score: number;
  manifestation: string;
}

interface Belief {
  id: string;
  belief: string;
  strength: number;
  impact: string;
}


// Constants
const CHARACTER_ROLES: CharacterRole[] = [
  {
    id: 'protagonist',
    name: 'Protagonist',
    description: 'Main driver of the story',
    icon: Crown,
    typical_traits: ['Determined', 'Growth-oriented', 'Relatable']
  },
  {
    id: 'antagonist',
    name: 'Antagonist',
    description: 'Primary opposing force',
    icon: Sword,
    typical_traits: ['Challenging', 'Complex motivation', 'Formidable']
  },
  {
    id: 'mentor',
    name: 'Mentor',
    description: 'Guide or teacher',
    icon: BookOpen,
    typical_traits: ['Wise', 'Experienced', 'Supportive']
  },
  {
    id: 'catalyst',
    name: 'Catalyst',
    description: 'Triggers major change/events',
    icon: Zap,
    typical_traits: ['Impactful', 'Transformative', 'Dynamic']
  },
  {
    id: 'confidant',
    name: 'Confidant',
    description: 'Trusted ally/advisor',
    icon: MessageCircle,
    typical_traits: ['Loyal', 'Understanding', 'Trustworthy']
  },
  {
    id: 'comic_relief',
    name: 'Comic Relief',
    description: 'Tension breaker',
    icon: Laugh,
    typical_traits: ['Humorous', 'Light-hearted', 'Engaging']
  }
];

const CREATION_STEPS = [
  { id: 'role', label: 'Role & Basic Info' },
  { id: 'archetype', label: 'Archetype' },
  { id: 'background', label: 'Background' },
  { id: 'traits', label: 'Traits' },
  { id: 'personality', label: 'Personality' },
  { id: 'motivations', label: 'Motivations' }
];

const ARCHETYPES = [
  {
    id: 'hero',
    name: 'Hero',
    description: 'A brave and moral protagonist who rises to meet challenges',
    traits: ['Courageous', 'Noble', 'Determined']
  },
  {
    id: 'mentor',
    name: 'Sage',
    description: 'A wise guide who shares knowledge and wisdom',
    traits: ['Wise', 'Patient', 'Knowledgeable']
  },
  {
    id: 'rebel',
    name: 'Rebel',
    description: 'One who challenges the established order',
    traits: ['Independent', 'Passionate', 'Defiant']
  },
  {
    id: 'caregiver',
    name: 'Caregiver',
    description: 'Protects and nurtures others',
    traits: ['Compassionate', 'Selfless', 'Nurturing']
  },
  {
    id: 'trickster',
    name: 'Trickster',
    description: 'Uses wit and deception to achieve goals',
    traits: ['Clever', 'Adaptable', 'Unpredictable']
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Seeks out new experiences and challenges',
    traits: ['Curious', 'Adventurous', 'Independent']
  }
];

interface CharacterRole {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  typical_traits: string[];
}

// Components
const CharacterCard: React.FC<{ character: Character; onClick: () => void }> = ({ character, onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex-shrink-0 w-[280px]"
  >
    <Card
      className={cn(
        "h-[360px] cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02]"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-slate-600" />
          <h3 className="font-medium text-lg">{character.name}</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span className="text-sm text-slate-600">{character.role}</span>
          </div>
          <p className="text-sm text-slate-500 line-clamp-3">{character.description}</p>
          {character.archetype && (
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-violet-600" />
              <span className="text-sm text-slate-600">{character.archetype}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const AddCharacterCard: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex-shrink-0 w-[280px]"
  >
    <Card
      className={cn(
        "h-[360px] cursor-pointer transition-all duration-300 border-dashed",
        "hover:shadow-lg hover:scale-[1.02] hover:border-indigo-300",
        "flex items-center justify-center"
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center text-center p-6">
        <UserPlus className="w-12 h-12 text-slate-400 mb-4" />
        <h3 className="font-medium text-lg text-slate-900">Add Character</h3>
        <p className="text-sm text-slate-500 mt-2">Create a new character for your story</p>
      </CardContent>
    </Card>
  </motion.div>
);

const RoleCard: React.FC<{
  role: CharacterRole;
  isSelected: boolean;
  onClick: () => void;
}> = ({ role, isSelected, onClick }) => {
  const Icon = role.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "p-4 rounded-xl border transition-all duration-300 cursor-pointer",
        isSelected
          ? "border-indigo-600 bg-indigo-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300"
      )}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <Icon className={cn(
          "w-6 h-6",
          isSelected ? "text-indigo-600" : "text-slate-400"
        )} />
        <div>
          <h4 className={cn(
            "font-medium",
            isSelected ? "text-indigo-600" : "text-slate-900"
          )}>{role.name}</h4>
          <p className="text-sm text-slate-500 mt-1">{role.description}</p>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3"
            >
              <p className="text-xs font-medium text-slate-700 mb-2">Typical traits:</p>
              <div className="flex flex-wrap gap-2">
                {role.typical_traits.map((trait, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CharacterCreationHub: React.FC = () => {
  const { toast } = useToast();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    description: ''
  });
  const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([]);
  const [primaryMotivations, setPrimaryMotivations] = useState<string[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [majorStrengths, setMajorStrengths] = useState<Trait[]>([]);
  const [minorStrengths, setMinorStrengths] = useState<Trait[]>([]);
  const [majorFlaws, setMajorFlaws] = useState<Trait[]>([]);
  const [minorFlaws, setMinorFlaws] = useState<Trait[]>([]);
  const [personalityTraits, setPersonalityTraits] = useState<PersonalityTrait[]>([]);
  const [beliefs, setBeliefs] = useState<Belief[]>([]);


  const currentCharacterNumber = characters.length + 1;

  const handleCreateCharacter = () => {
    setIsCreating(true);
    setShowTutorial(false);
  };

  const handleEditCharacter = (characterId: string) => {
    console.log('Edit character:', characterId);
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleArchetypeSelect = (archetypeId: string) => {
    setSelectedArchetype(archetypeId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleAddLifeEvent = (event: LifeEvent) => {
    setLifeEvents(prev => [...prev, event]);
  };

  const handleUpdateLifeEvent = (id: string, updates: Partial<LifeEvent>) => {
    setLifeEvents(prev => prev.map(event =>
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  const handlePrimaryMotivationChange = (motivation: string) => {
    setPrimaryMotivations(prev => {
      if (prev.includes(motivation)) {
        return prev.filter(m => m !== motivation);
      }
      return [...prev, motivation];
    });
  };

  const handleGoalAdd = (goal: Goal) => {
    setGoals(prev => [...prev, goal]);
  };

  const handleGoalUpdate = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const handleGoalRemove = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const handleAddTrait = (
    type: 'majorStrength' | 'minorStrength' | 'majorFlaw' | 'minorFlaw',
    trait: Trait
  ) => {
    switch (type) {
      case 'majorStrength':
        setMajorStrengths(prev => [...prev, trait]);
        break;
      case 'minorStrength':
        setMinorStrengths(prev => [...prev, trait]);
        break;
      case 'majorFlaw':
        setMajorFlaws(prev => [...prev, trait]);
        break;
      case 'minorFlaw':
        setMinorFlaws(prev => [...prev, trait]);
        break;
    }
  };

  const handleRemoveTrait = (
    type: 'majorStrength' | 'minorStrength' | 'majorFlaw' | 'minorFlaw',
    id: string
  ) => {
    switch (type) {
      case 'majorStrength':
        setMajorStrengths(prev => prev.filter(t => t.id !== id));
        break;
      case 'minorStrength':
        setMinorStrengths(prev => prev.filter(t => t.id !== id));
        break;
      case 'majorFlaw':
        setMajorFlaws(prev => prev.filter(t => t.id !== id));
        break;
      case 'minorFlaw':
        setMinorFlaws(prev => prev.filter(t => t.id !== id));
        break;
    }
  };

  const handleAddPersonalityTrait = (trait: PersonalityTrait) => {
    setPersonalityTraits(prev => [...prev, trait]);
  };

  const handleRemovePersonalityTrait = (id: string) => {
    setPersonalityTraits(prev => prev.filter(t => t.id !== id));
  };

  const handleAddBelief = (belief: Belief) => {
    setBeliefs(prev => [...prev, belief]);
  };

  const handleRemoveBelief = (id: string) => {
    setBeliefs(prev => prev.filter(b => b.id !== id));
  };

  const isBasicInfoComplete = () => {
    return (
      selectedRole &&
      formData.name.trim() !== '' &&
      formData.age !== '' &&
      formData.gender !== ''
    );
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleCharacterComplete = () => {
    const newCharacter: Character = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      role: CHARACTER_ROLES.find(r => r.id === selectedRole)?.name || '',
      description: formData.description,
      archetype: ARCHETYPES.find(a => a.id === selectedArchetype)?.name,
      traits: {
        majorStrengths,
        minorStrengths,
        majorFlaws,
        minorFlaws
      },
      personality: {
        traits: personalityTraits,
        beliefs: beliefs
      }
    };

    setCharacters(prev => [...prev, newCharacter]);

    // Reset all states
    setIsCreating(false);
    setCurrentStep(0);
    setSelectedRole(null);
    setSelectedArchetype(null);
    setFormData({
      name: '',
      age: '',
      gender: '',
      description: ''
    });
    setLifeEvents([]);
    setPrimaryMotivations([]);
    setGoals([]);
    setMajorStrengths([]);
    setMinorStrengths([]);
    setMajorFlaws([]);
    setMinorFlaws([]);
    setPersonalityTraits([]);
    setBeliefs([]);

    // Show success notification
    toast({
      title: "Character Created",
      description: `${newCharacter.name} has been added to your cast of characters.`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Character Creation Hub</h1>
          <p className="text-slate-600 mt-2">Build your cast of characters</p>
        </div>

        {!isCreating ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {characters.length === 0 ? (
              <div className="text-center py-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleCreateCharacter}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-6 text-lg rounded-xl"
                  >
                    <UserPlus className="w-6 h-6 mr-2" />
                    Create Your First Character
                  </Button>
                </motion.div>
                <div className="mt-4 text-sm text-slate-500">
                  {characters.length}/7 Characters Created
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="flex space-x-6 overflow-x-auto pb-6">
                  {characters.map((character) => (
                    <CharacterCard
                      key={character.id}
                      character={character}
                      onClick={() => handleEditCharacter(character.id)}
                    />
                  ))}
                  {characters.length < 7 && (
                    <AddCharacterCard onClick={handleCreateCharacter} />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Character {currentCharacterNumber} Creation</h2>
              <p className="text-slate-500 mt-1">Step {currentStep + 1} of {CREATION_STEPS.length}</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="relative flex items-center justify-between px-2">
                {/* Background Line */}
                <div className="absolute left-0 top-[22px] w-full h-[2px]">
                  <div className="relative w-full h-full">
                    <div className="absolute w-full h-full bg-slate-200" />
                    <div 
                      className="absolute h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 ease-out"
                      style={{ width: `${(currentStep / (CREATION_STEPS.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Steps */}
                {CREATION_STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className="relative flex flex-col items-center"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        scale: index === currentStep ? 1 : 0.9,
                        opacity: index <= currentStep ? 1 : 0.7
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative mb-2"
                    >
                      <div
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
                          index < currentStep 
                            ? "bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-200" 
                            : index === currentStep
                              ? "bg-white border-2 border-indigo-500 shadow-md"
                              : "bg-white border border-slate-200",
                        )}
                      >
                        {index < currentStep ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </motion.div>
                        ) : (
                          <span 
                            className={cn(
                              "text-sm font-medium",
                              index === currentStep ? "text-indigo-600" : "text-slate-400"
                            )}
                          >
                            {index + 1}
                          </span>
                        )}
                      </div>
                      {index <= currentStep && (
                        <motion.div
                          className="absolute -inset-1 rounded-full bg-indigo-100/50 -z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.div>
                    
                    <motion.span
                      initial={false}
                      animate={{
                        opacity: index <= currentStep ? 1 : 0.5
                      }}
                      className={cn(
                        "text-xs font-medium whitespace-nowrap transition-colors duration-200",
                        index === currentStep 
                          ? "text-indigo-600"
                          : index < currentStep
                            ? "text-slate-700"
                            : "text-slate-400"
                      )}
                    >
                      {step.label}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Character Role</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {CHARACTER_ROLES.map((role) => (
                          <RoleCard
                            key={role.id}
                            role={role}
                            isSelected={selectedRole === role.id}
                            onClick={() => handleRoleSelect(role.id)}
                          />
                        ))}
                      </div>
                    </div>

                    {selectedRole && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-semibold text-slate-900">Basic Information</h2>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Character Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter character name"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="age">Age ({formData.age || 0})</Label>
                            <div className="pt-4">
                              <Slider
                                value={[parseInt(formData.age) || 0]}
                                onValueChange={([value]) => setFormData(prev => ({
                                  ...prev,
                                  age: value.toString()
                                }))}
                                min={0}
                                max={150}
                                step={1}
                                className="w-full"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="gender">Gender</Label>
                            <div className="grid grid-cols-4 gap-4 mt-1">
                              {['Male', 'Female', 'Non-binary', 'Other'].map((gender) => (
                                <Button
                                  key={gender}
                                  variant="outline"
                                  className={cn(
                                    "w-full",
                                    formData.gender === gender && "bg-indigo-50 border-indigo-600 text-indigo-600"
                                  )}
                                  onClick={() => setFormData(prev => ({ ...prev, gender }))}
                                >
                                  {gender}
                                </Button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="description">Initial Description</Label>
                            <textarea
                              id="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              className="w-full mt-1 rounded-md border border-slate-200 p-3"
                              rows={3}
                              placeholder="Add a brief description or concept for your character"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end mt-6">
                          <Button
                            onClick={handleNextStep}
                            className={cn(
                              "bg-indigo-600 hover:bg-indigo-500 text-white px-6",
                              "transition-all duration-200",
                              !isBasicInfoComplete() && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={!isBasicInfoComplete()}
                          >
                            Next Step
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Character Archetype</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {ARCHETYPES.map((archetype) => (
                          <motion.div
                            key={archetype.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                              "p-4 rounded-xl border transition-all duration-300 cursor-pointer",
                              selectedArchetype === archetype.id
                                ? "border-indigo-600 bg-indigo-50 shadow-sm"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            )}
                            onClick={() => handleArchetypeSelect(archetype.id)}
                          >
                            <h3 className={cn(
                              "font-medium text-lg",
                              selectedArchetype === archetype.id ? "text-indigo-600" : "text-slate-900"
                            )}>{archetype.name}</h3>
                            <p className="text-sm text-slate-500 mt-1">{archetype.description}</p>
                            {selectedArchetype === archetype.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3"
                              >
                                <p className="text-xs font-medium text-slate-700 mb-2">Typical traits:</p>
                                <div className="flex flex-wrap gap-2">
                                  {archetype.traits.map((trait, index) => (
                                    <span
                                      key={index}
                                      className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700"
                                    >
                                      {trait}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={handleNextStep}
                        className={cn(
                          "bg-indigo-600 hover:bg-indigo-500 text-white px-6",
                          "transition-all duration-200",
                          !selectedArchetype && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!selectedArchetype}
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <BackgroundStory
                      events={lifeEvents}
                      onEventAdd={handleAddLifeEvent}
                      onEventUpdate={handleUpdateLifeEvent}
                    />
                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={handleNextStep}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <StrengthsFlaws
                      majorStrengths={majorStrengths}
                      minorStrengths={minorStrengths}
                      majorFlaws={majorFlaws}
                      minorFlaws={minorFlaws}
                      onAddTrait={handleAddTrait}
                      onRemoveTrait={handleRemoveTrait}
                    />
                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={handleNextStep}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}
                {currentStep === 4 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <PersonalitySystem
                      personalityTraits={personalityTraits}
                      beliefs={beliefs}
                      onAddTrait={handleAddPersonalityTrait}
                      onRemoveTrait={handleRemovePersonalityTrait}
                      onAddBelief={handleAddBelief}
                      onRemoveBelief={handleRemoveBelief}
                    />
                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={handleNextStep}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 5 && (
                  <motion.div
                    key="step-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <MotivationsGoals
                      primaryMotivations={primaryMotivations}
                      onPrimaryMotivationChange={handlePrimaryMotivationChange}
                      goals={goals}
                      onGoalAdd={handleGoalAdd}
                      onGoalUpdate={handleGoalUpdate}
                      onGoalRemove={handleGoalRemove}
                    />
                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={handleCharacterComplete}
                        className="bg-green-600 hover:bg-green-500 text-white px-6"
                      >
                        Complete Character
                        <CheckCircle2 className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
        {characters.length > 0 && !isCreating && (
          <AdvancedCharacterFeatures characters={characters} />
        )}
      </div>
    </div>
  );
};

export default CharacterCreationHub;