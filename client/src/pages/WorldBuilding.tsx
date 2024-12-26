import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Building2,
  Trees,
  Anchor,
  Mountain,
  Castle,
  Rocket,
  Clock,
  Boxes,
  ChevronRight,
  Globe2,
  ArrowLeft,
  Home,
  Map as MapIcon,
  Compass,
  Building,
  LayoutGrid,
  Trees as TreesIcon,
  CalendarDays,
  Calendar,
  History,
  TimerReset,
  Wand2,
  Cpu,
  Users,
  TreePine,
  Globe,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from "framer-motion";

interface SettingOption {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  variants: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

interface CategoryVisualProps {
  type: 'contained' | 'expansive';
}

const CategoryVisual: React.FC<CategoryVisualProps> = ({ type }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  if (type === 'contained') {
    return (
      <motion.div
        className="relative h-48 mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-50 to-slate-50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <motion.div variants={itemVariants} className="absolute left-1/4 top-0">
              <Building className="w-12 h-12 text-indigo-400" />
            </motion.div>
            <motion.div variants={itemVariants} className="absolute left-1/2 top-1/4">
              <Home className="w-10 h-10 text-indigo-500" />
            </motion.div>
            <motion.div variants={itemVariants} className="absolute right-1/4 top-0">
              <LayoutGrid className="w-12 h-12 text-indigo-600" />
            </motion.div>
            <motion.div variants={itemVariants} className="absolute left-1/3 bottom-0">
              <TreesIcon className="w-10 h-10 text-indigo-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative h-48 mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-violet-50 to-slate-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-md">
          <motion.div variants={itemVariants} className="absolute left-1/4 top-0">
            <Globe2 className="w-12 h-12 text-violet-400" />
          </motion.div>
          <motion.div variants={itemVariants} className="absolute left-1/2 top-1/4">
            <Compass className="w-10 h-10 text-violet-500" />
          </motion.div>
          <motion.div variants={itemVariants} className="absolute right-1/4 top-0">
            <MapIcon className="w-12 h-12 text-violet-600" />
          </motion.div>
          <motion.div variants={itemVariants} className="absolute left-1/3 bottom-0">
            <Rocket className="w-10 h-10 text-violet-400" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TimeLineButton: React.FC<{
  label: string;
  description: string;
  icon: React.ElementType;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, description, icon: Icon, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      "w-full p-6 rounded-xl border bg-white/50 backdrop-blur transition-all duration-300",
      "hover:shadow-lg hover:scale-[1.02] cursor-pointer",
      isSelected
        ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-md scale-[1.02]'
        : 'border-slate-200 hover:border-slate-300'
    )}
  >
    <div className="flex items-center space-x-4">
      <Icon className={cn(
        "w-8 h-8 transition-colors duration-300",
        isSelected ? 'text-indigo-600' : 'text-slate-400'
      )} />
      <div>
        <h3 className={cn(
          "font-medium text-lg transition-colors duration-300",
          isSelected ? 'text-indigo-600' : 'text-slate-900'
        )}>
          {label}
        </h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  </div>
);

interface WorldSystemState {
  magicLevel: number;
  technologyLevel: number;
  socialComplexity: number;
  environmentalDiversity: number;
  culturalRange: number;
  supernaturalPresence: number;
}

const WorldBuilding: React.FC = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<'contained' | 'expansive' | null>(null);
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [animate, setAnimate] = useState(true);
  const [currentStep, setCurrentStep] = useState<'category' | 'time_period' | 'world_system'>('category');
  const [selectedTimelineType, setSelectedTimelineType] = useState<'linear' | 'nonlinear' | null>(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string | null>(null);
  const [selectedSubPeriod, setSelectedSubPeriod] = useState<string | null>(null);
  const [worldSystem, setWorldSystem] = useState<WorldSystemState>({
    magicLevel: 0,
    technologyLevel: 50,
    socialComplexity: 50,
    environmentalDiversity: 50,
    culturalRange: 50,
    supernaturalPresence: 0
  });

  const containedSettings: SettingOption[] = [
    {
      id: 'urban',
      label: 'Urban',
      description: 'City-based environments ranging from modern metropolises to ancient towns',
      icon: Building2,
      variants: [
        { id: 'modern-city', name: 'Modern City', description: 'Contemporary/Thriller setting in a bustling metropolis' },
        { id: 'cyberpunk-metropolis', name: 'Cyberpunk Metropolis', description: 'Futuristic city with advanced technology' },
        { id: 'medieval-town', name: 'Medieval Town', description: 'Historical urban setting with period architecture' },
        { id: 'steampunk-city', name: 'Steampunk City', description: 'Victorian-era city with retrofuturistic elements' },
        { id: 'underground-city', name: 'Underground City', description: 'Hidden metropolis beneath the surface' },
        { id: 'ghost-town', name: 'Ghost Town', description: 'Abandoned urban setting with supernatural elements' }
      ]
    },
    {
      id: 'rural',
      label: 'Rural',
      description: 'Countryside and wilderness',
      icon: Trees,
      variants: [
        { id: 'modern-countryside', name: 'Modern Countryside', description: 'Contemporary' },
        { id: 'frontier-settlement', name: 'Frontier Settlement', description: 'Historical' },
        { id: 'enchanted-forest', name: 'Enchanted Forest', description: 'Fantasy' },
        { id: 'agricultural-colony', name: 'Agricultural Colony', description: 'Sci-Fi' },
        { id: 'cursed-village', name: 'Cursed Village', description: 'Horror' },
        { id: 'post-apocalyptic', name: 'Post-apocalyptic Wilderness', description: 'Speculative' }
      ]
    },
    {
      id: 'maritime',
      label: 'Maritime',
      description: 'Ocean and water-based settings',
      icon: Anchor,
      variants: [
        { id: 'modern-port', name: 'Modern Port City', description: 'Contemporary' },
        { id: 'pirate-haven', name: 'Pirate Haven', description: 'Historical/Adventure' },
        { id: 'underwater-city', name: 'Underwater City', description: 'Sci-Fi/Fantasy' },
        { id: 'flying-ship-port', name: 'Flying Ship Port', description: 'Fantasy' },
        { id: 'haunted-harbor', name: 'Haunted Harbor', description: 'Horror' },
        { id: 'arctic-research', name: 'Arctic Research Station', description: 'Thriller' }
      ]
    },
    {
      id: 'underground',
      label: 'Underground',
      description: 'Below-surface environments',
      icon: Mountain,
      variants: [
        { id: 'modern-subway', name: 'Modern Subway System', description: 'Contemporary' },
        { id: 'ancient-catacombs', name: 'Ancient Catacombs', description: 'Historical' },
        { id: 'dwarven-kingdom', name: 'Dwarven Kingdom', description: 'Fantasy' },
        { id: 'subterranean-colony', name: 'Subterranean Colony', description: 'Sci-Fi' },
        { id: 'horror-tunnels', name: 'Horror Tunnels', description: 'Horror' },
        { id: 'secret-bunker', name: 'Secret Bunker Network', description: 'Thriller' }
      ]
    }
  ];

  const expansiveSettings: SettingOption[] = [
    {
      id: 'fantasy-realms',
      label: 'Fantasy Realms',
      description: 'Magical and mythical worlds',
      icon: Castle,
      variants: [
        { id: 'high-fantasy', name: 'High Fantasy Kingdom', description: 'Classic fantasy setting' },
        { id: 'floating-islands', name: 'Floating Islands', description: 'Sky-bound realms' },
        { id: 'mythical-lands', name: 'Mythical Lands', description: 'Legendary territories' },
        { id: 'parallel-magic', name: 'Parallel Magic World', description: 'Alternative magical reality' },
        { id: 'elemental-planes', name: 'Elemental Planes', description: 'Primal force realms' },
        { id: 'spirit-realm', name: 'Spirit Realm', description: 'Metaphysical domain' }
      ]
    },
    {
      id: 'scifi-environments',
      label: 'Science Fiction Environments',
      description: 'Futuristic and technological settings',
      icon: Rocket,
      variants: [
        { id: 'space-station', name: 'Space Station', description: 'Orbital facility' },
        { id: 'colony-world', name: 'Colony World', description: 'Terraformed planet' },
        { id: 'virtual-reality', name: 'Virtual Reality', description: 'Digital universe' },
        { id: 'dyson-sphere', name: 'Dyson Sphere', description: 'Megastructure' },
        { id: 'generation-ship', name: 'Generation Ship', description: 'Space ark' },
        { id: 'alien-homeworld', name: 'Alien Homeworld', description: 'Exotic planet' }
      ]
    },
    {
      id: 'historical-periods',
      label: 'Historical Periods',
      description: 'Past eras and epochs',
      icon: Clock,
      variants: [
        { id: 'ancient-empire', name: 'Ancient Empire', description: 'Classical civilization' },
        { id: 'medieval-kingdom', name: 'Medieval Kingdom', description: 'Middle Ages' },
        { id: 'renaissance-city', name: 'Renaissance City-State', description: 'Cultural rebirth' },
        { id: 'colonial-territory', name: 'Colonial Territory', description: 'Age of exploration' },
        { id: 'industrial-revolution', name: 'Industrial Revolution', description: 'Technological boom' },
        { id: 'world-war-era', name: 'World War Era', description: 'Global conflict' }
      ]
    },
    {
      id: 'alternative-worlds',
      label: 'Alternative Worlds',
      description: 'Different realities and dimensions',
      icon: Boxes,
      variants: [
        { id: 'parallel-universe', name: 'Parallel Universe', description: 'Alternative timeline' },
        { id: 'alternate-timeline', name: 'Alternate Timeline', description: 'Changed history' },
        { id: 'pocket-dimension', name: 'Pocket Dimension', description: 'Contained reality' },
        { id: 'dream-world', name: 'Dream World', description: 'Subconscious realm' },
        { id: 'mirror-reality', name: 'Mirror Reality', description: 'Reflected existence' },
        { id: 'quantum-realm', name: 'Quantum Realm', description: 'Microscopic universe' }
      ]
    }
  ];

  const timePeriods = {
    prehistoric: {
      label: 'Prehistoric',
      period: 'Before 3000 BCE',
      subPeriods: [
        { id: 'stone-age', name: 'Stone Age', options: ['Early Hunter-Gatherer', 'First Settlements', 'Cave Painting Era'] },
        { id: 'bronze-age', name: 'Bronze Age', options: ['Early Metallurgy', 'First Cities', 'Trade Networks'] },
        { id: 'iron-age', name: 'Iron Age', options: ['Warrior Cultures', 'Empire Building', 'Technological Revolution'] }
      ]
    },
    ancient: {
      label: 'Ancient',
      period: '3000 BCE - 500 CE',
      subPeriods: [
        { id: 'early-civilizations', name: 'Early Civilizations', options: ['Mesopotamian Era', 'Egyptian Dynasties', 'Indus Valley'] },
        { id: 'classical-period', name: 'Classical Period', options: ['Greek City-States', 'Roman Republic', 'Han Dynasty'] },
        { id: 'late-antiquity', name: 'Late Antiquity', options: ['Empire Decline', 'Religious Shifts', 'Barbarian Migrations'] }
      ]
    },
    medieval: {
      label: 'Medieval',
      period: '500 - 1500 CE',
      subPeriods: [
        { id: 'early-medieval', name: 'Early Medieval', options: ['Dark Ages', 'Byzantine Empire', 'Islamic Golden Age'] },
        { id: 'high-medieval', name: 'High Medieval', options: ['Crusader Kingdoms', 'Mongol Empire', 'Feudal Japan'] },
        { id: 'late-medieval', name: 'Late Medieval', options: ['Black Death', 'Hundred Years War', 'Pre-Renaissance'] }
      ]
    },
    earlyModern: {
      label: 'Early Modern',
      period: '1500 - 1800',
      subPeriods: [
        { id: 'renaissance', name: 'Renaissance', options: ['Italian City-States', 'Northern Renaissance', 'Age of Art'] },
        { id: 'age-of-exploration', name: 'Age of Exploration', options: ['New World Discovery', 'Maritime Empires', 'Cultural Exchange'] },
        { id: 'colonial-era', name: 'Colonial Era', options: ['Empire Building', 'Trade Routes', 'Revolutionary Period'] }
      ]
    },
    modern: {
      label: 'Modern',
      period: '1800 - Present',
      subPeriods: [
        { id: 'industrial-age', name: 'Industrial Age', options: ['Steam Power', 'Mass Production', 'Urban Growth'] },
        { id: 'world-wars', name: 'World Wars', options: ['Pre-War Tension', 'Wartime', 'Post-War Recovery'] },
        { id: 'contemporary', name: 'Contemporary', options: ['Digital Age', 'Globalization', 'Current Events'] }
      ]
    },
    nearFuture: {
      label: 'Near Future',
      period: 'Next 100 years',
      subPeriods: [
        { id: 'early-21st', name: 'Early 21st Century', options: ['Tech Revolution', 'Climate Change', 'Social Shifts'] },
        { id: 'mid-21st', name: 'Mid 21st Century', options: ['AI Integration', 'Space Colonization', 'Genetic Engineering'] },
        { id: 'late-21st', name: 'Late 21st Century', options: ['Post-Scarcity', 'Global Transformation', 'Transhumanism'] }
      ]
    },
    farFuture: {
      label: 'Far Future',
      period: 'Beyond 100 years',
      subPeriods: [
        { id: 'solar-system', name: 'Solar System Era', options: ['Mars Colonies', 'Asteroid Mining', 'Solar Engineering'] },
        { id: 'interstellar', name: 'Interstellar Period', options: ['First Contact', 'Colony Ships', 'Alien Relations'] },
        { id: 'galactic', name: 'Galactic Era', options: ['Multiple Species', 'FTL Travel', 'Advanced Tech'] }
      ]
    }
  };

  const nonLinearOptions = {
    multipleTimePeriods: {
      label: 'Multiple Time Periods',
      options: [
        'Dual Timeline (Past/Present)',
        'Multiple Eras',
        'Time Loops'
      ]
    },
    timeTravel: {
      label: 'Time Travel',
      options: [
        'Fixed Timeline',
        'Branching Timeline',
        'Paradox-free'
      ]
    },
    alternativeHistory: {
      label: 'Alternative History',
      options: [
        'Minor Deviation',
        'Major Divergence',
        'Complete Reimagining'
      ]
    }
  };

  const handleContinue = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrentStep('time_period');
      setAnimate(true);
    }, 300);
  };

  const handleCategorySelect = (category: 'contained' | 'expansive') => {
    setAnimate(false);
    setSelectedVariant(null);
    setSelectedSetting(null);
    setTimeout(() => {
      setSelectedMainCategory(category);
      setAnimate(true);
    }, 300);
  };

  const handleSettingSelect = (settingId: string) => {
    if (selectedSetting === settingId) {
      setSelectedSetting(null);
      setSelectedVariant(null);
      return;
    }

    setAnimate(false);
    setSelectedVariant(null);
    setTimeout(() => {
      setSelectedSetting(settingId);
      setAnimate(true);
    }, 300);
  };

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariant(variantId);
  };

  const renderSettingOptions = (settings: SettingOption[]) => (
    <div className="grid grid-cols-2 gap-8">
      {settings.map((setting, index) => {
        const Icon = setting.icon;
        const isSelected = selectedSetting === setting.id;

        return (
          <div
            key={setting.id}
            className={cn(
              "transition-all duration-500 transform",
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              isSelected ? 'col-span-2' : ''
            )}
            style={{
              transitionDelay: animate ? `${index * 100}ms` : '0ms'
            }}
          >
            <button
              onClick={() => handleSettingSelect(setting.id)}
              className={cn(
                "w-full group relative p-6 rounded-xl border bg-white/50 backdrop-blur transition-all duration-500",
                "hover:shadow-lg hover:scale-[1.02]",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-lg scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Icon className={cn(
                    "w-8 h-8 transition-colors duration-300",
                    isSelected
                      ? 'text-indigo-600'
                      : 'text-slate-400 group-hover:text-slate-600'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "text-lg font-medium transition-colors duration-300",
                    isSelected ? 'text-indigo-600' : 'text-slate-900'
                  )}>
                    {setting.label}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{setting.description}</p>
                </div>
                <ChevronRight className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isSelected ? 'rotate-90 text-indigo-600' : 'text-slate-400'
                )} />
              </div>

              {isSelected && (
                <div className="mt-6 grid grid-cols-2 gap-4 animate-in slide-in-from-top duration-500">
                  {setting.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVariantSelect(variant.id);
                      }}
                      className={cn(
                        "p-4 rounded-lg text-left transition-all duration-300",
                        "hover:shadow-md hover:scale-[1.02]",
                        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                        selectedVariant === variant.id
                          ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                          : 'bg-white border border-slate-200'
                      )}
                    >
                      <div className="font-medium text-sm text-slate-900">{variant.name}</div>
                      <div className="mt-1 text-xs text-slate-500">{variant.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );

  const renderSubPeriodOptions = () => {
    if (!selectedTimePeriod) return null;

    const periodKey = selectedTimePeriod as keyof typeof timePeriods;
    const period = timePeriods[periodKey];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 space-y-6"
      >
        <Label className="text-lg font-medium text-slate-900">
          Select a specific era within {period.label}
        </Label>
        <div className="grid grid-cols-1 gap-4">
          {period.subPeriods.map((subPeriod) => (
            <motion.div
              key={subPeriod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                onClick={() => setSelectedSubPeriod(subPeriod.id)}
                className={cn(
                  "p-6 rounded-xl border bg-white/50 backdrop-blur transition-all duration-300",
                  "hover:shadow-lg hover:scale-[1.02] cursor-pointer",
                  selectedSubPeriod === subPeriod.id
                    ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <h4 className="font-medium text-lg mb-2">{subPeriod.name}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {subPeriod.options.map((option, idx) => (
                    <div
                      key={idx}
                      className="text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-600"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderNonLinearOptions = () => {
    if (!selectedTimePeriod) return null;

    const option = nonLinearOptions[selectedTimePeriod as keyof typeof nonLinearOptions];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 space-y-6"
      >
        <Label className="text-lg font-medium text-slate-900">
          Select a variation of {option.label}
        </Label>
        <div className="grid grid-cols-1 gap-4">
          {option.options.map((opt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                onClick={() => setSelectedSubPeriod(opt)}
                className={cn(
                  "p-6 rounded-xl border bg-white/50 backdrop-blur transition-all duration-300",
                  "hover:shadow-lg hover:scale-[1.02] cursor-pointer",
                  selectedSubPeriod === opt
                    ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <h4 className="font-medium text-lg">{opt}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderTimePeriodFramework = () => (
    <div className="space-y-8">
      {!selectedTimelineType ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Label className="text-lg font-medium text-slate-900">Choose your timeline structure</Label>
          <div className="grid grid-cols-2 gap-8">
            <TimeLineButton
              label="Linear Timeline"
              description="Sequential progression through specific time periods"
              icon={CalendarDays}
              isSelected={selectedTimelineType === 'linear'}
              onClick={() => setSelectedTimelineType('linear')}
            />
            <TimeLineButton
              label="Non-Linear Timeline"
              description="Complex time structures with multiple periods or alternative histories"
              icon={History}
              isSelected={selectedTimelineType === 'nonlinear'}
              onClick={() => setSelectedTimelineType('nonlinear')}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <Label className="text-lg font-medium text-slate-900">
              Select your {selectedTimelineType === 'linear' ? 'time period' : 'temporal structure'}
            </Label>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedTimelineType(null);
                setSelectedTimePeriod(null);
                setSelectedSubPeriod(null);
              }}
              className="text-slate-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Timeline Type
            </Button>
          </div>

          {selectedTimelineType === 'linear' ? (
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(timePeriods).map(([key, period]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-1"
                >
                  <TimeLineButton
                    label={period.label}
                    description={`${period.period}`}
                    icon={Calendar}
                    isSelected={selectedTimePeriod === key}
                    onClick={() => {
                      setSelectedTimePeriod(key);
                      setSelectedSubPeriod(null);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(nonLinearOptions).map(([key, option]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-1"
                >
                  <TimeLineButton
                    label={option.label}
                    description="Choose this temporal structure"
                    icon={History}
                    isSelected={selectedTimePeriod === key}
                    onClick={() => {
                      setSelectedTimePeriod(key);
                      setSelectedSubPeriod(null);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {selectedTimelineType === 'linear' ? renderSubPeriodOptions() : renderNonLinearOptions()}

          {selectedTimePeriod && selectedSubPeriod && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end mt-8"
            >
              <Button
                onClick={() => {
                  setCurrentStep('world_system');
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
              >
                Continue
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );

  const getMagicLevelDescription = (value: number) => {
    if (value <= 10) return "No magic, purely mundane world";
    if (value <= 25) return "Folk tales and superstition only";
    if (value <= 50) return "Limited magic, rare but powerful";
    if (value <= 75) return "Common magic, integrated into daily life";
    if (value <= 90) return "High magic shapes society and culture";
    return "Reality-bending magical saturation";
  };

  const getTechnologyLevelDescription = (value: number) => {
    if (value <= 10) return "Stone tools and basic crafts";
    if (value <= 25) return "Early metallurgy and simple machines";
    if (value <= 50) return "Industrial age equivalency";
    if (value <= 75) return "Modern to near-future technology";
    if (value <= 90) return "Advanced sci-fi tech";
    return "Clarke's Law tech indistinguishable from magic";
  };

  const renderWorldSystemSliders = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-medium text-slate-900">
            Configure World System Parameters
          </Label>
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentStep('time_period');
            }}
            className="text-slate-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Timeline
          </Button>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wand2 className="w-5 h-5 text-indigo-600" />
                <Label>Magic Level</Label>
              </div>
              <span className="text-sm text-slate-600">{worldSystem.magicLevel}%</span>
            </div>
            <Slider
              value={[worldSystem.magicLevel]}
              onValueChange={([value]) => setWorldSystem(prev => ({ ...prev, magicLevel: value }))}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-slate-600">{getMagicLevelDescription(worldSystem.magicLevel)}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-indigo-600" />
                <Label>Technology Level</Label>
              </div>
              <span className="text-sm text-slate-600">{worldSystem.technologyLevel}%</span>
            </div>
            <Slider
              value={[worldSystem.technologyLevel]}
              onValueChange={([value]) => setWorldSystem(prev => ({ ...prev, technologyLevel: value }))}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-slate-600">{getTechnologyLevelDescription(worldSystem.technologyLevel)}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <Label>Social Complexity</Label>
              </div>
              <span className="text-sm text-slate-600">{worldSystem.socialComplexity}%</span>
            </div>
            <Slider
              value={[worldSystem.socialComplexity]}
              onValueChange={([value]) => setWorldSystem(prev => ({ ...prev, socialComplexity: value }))}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-slate-600">Placeholder description</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TreePine className="w-5 h-5 text-indigo-600" />
                <Label>Environmental Diversity</Label>
              </div>
              <span className="text-sm text-slate-600">{worldSystem.environmentalDiversity}%</span>
            </div>
            <Slider
              value={[worldSystem.environmentalDiversity]}
              onValueChange={([value]) => setWorldSystem(prev => ({ ...prev, environmentalDiversity: value }))}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-slate-600">Placeholder description</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                <Label>Cultural Range</Label>
              </div>
              <span className="text-sm text-slate-600">{worldSystem.culturalRange}%</span>
            </div>
            <Slider
              value={[worldSystem.culturalRange]}
              onValueChange={([value]) => setWorldSystem(prev => ({ ...prev, culturalRange: value }))}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-slate-600">Placeholder description</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <Label>Supernatural Presence</Label>
              </div>
              <span className="text-sm text-slate-600">{worldSystem.supernaturalPresence}%</span>
            </div>
            <Slider
              value={[worldSystem.supernaturalPresence]}
              onValueChange={([value]) => setWorldSystem(prev => ({ ...prev, supernaturalPresence: value }))}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-slate-600">Placeholder description</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end mt-8"
          >
            <Button
              onClick={() => {
                console.log('Continue to Cultural Elements');
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
            >
              Continue to Cultural Elements
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                World Building
              </h1>
              <p className="text-sm text-slate-600">Design your story's setting and environment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-28 pb-16 max-w-6xl mx-auto px-6">
        {currentStep === 'category' ? (
          <>
            {!selectedMainCategory && (
              <motion.div
                className={cn(
                  "space-y-8 transition-all duration-500",
                  animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                )}
              >
                <div className="space-y-6">
                  <Label className="text-lg font-medium text-slate-900">Choose your setting category</Label>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <CategoryVisual type="contained" />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <button
                          onClick={() => handleCategorySelect('contained')}
                          className="w-full group relative p-8 rounded-xl border border-slate-200 bg-white/50 backdrop-blur
                            transition-all duration-500 hover:shadow-lg hover:scale-[1.02] hover:border-slate-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <div className="flex flex-col items-center space-y-4">
                            <Building2 className="w-12 h-12 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                            <div className="text-center">
                              <h3 className="text-lg font-medium text-slate-900">Contained Settings</h3>
                              <p className="mt-2 text-sm text-slate-500">
                                Focused, well-defined locations perfect for intimate storytelling
                              </p>
                              <ul className="mt-4 text-sm text-slate-600 space-y-2">
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2" />
                                  Single location focus
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2" />
                                  Detailed environment
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2" />
                                  Character-driven narratives
                                </li>
                              </ul>
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    </div>

                    <div className="space-y-6">
                      <CategoryVisual type="expansive" />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <button
                          onClick={() => handleCategorySelect('expansive')}
                          className="w-full group relative p-8 rounded-xl border border-slate-200 bg-white/50 backdrop-blur
                            transition-all duration-500 hover:shadow-lg hover:scale-[1.02] hover:border-slate-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <div className="flex flex-col items-center space-y-4">
                            <Globe2 className="w-12 h-12 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                            <div className="text-center">
                              <h3 className="text-lg font-medium text-slate-900">Expansive Settings</h3>
                              <p className="mt-2 text-sm text-slate-500">
                                Broad, encompassing worlds ideal for epic narratives
                              </p>
                              <ul className="mt-4 text-sm text-slate-600 space-y-2">
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-2" />
                                  Multiple interconnected locations
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-2" />
                                  Rich world-building opportunities
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-2" />
                                  Epic-scale adventures
                                </li>
                              </ul>
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedMainCategory && (
              <motion.div
                className={cn(
                  "space-y-8 transition-all duration-500",
                  animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                )}
              >
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium text-slate-900">
                    {selectedMainCategory === 'contained' ? 'Choose your contained setting' : 'Choose your expansive setting'}
                  </Label>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedMainCategory(null);
                      setSelectedSetting(null);
                      setSelectedVariant(null);
                    }}
                    className="text-slate-600"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </div>
                {renderSettingOptions(selectedMainCategory === 'contained' ? containedSettings : expansiveSettings)}

                {selectedSetting && selectedVariant && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex justify-end"
                  >
                    <Button
                      onClick={handleContinue}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
                    >
                      Continue to Time Period
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </>
        ) : currentStep === 'time_period' ? (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium text-slate-900">
                Choose your time period
              </Label>
              <Button
                variant="ghost"
                onClick={() => {
                  setAnimate(false);
                  setTimeout(() => {
                    setCurrentStep('category');
                    setSelectedTimelineType(null);
                    setSelectedTimePeriod(null);
                    setSelectedSubPeriod(null);
                    setAnimate(true);
                  }, 300);
                }}
                className="text-slate-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Settings
              </Button>
            </div>
            {renderTimePeriodFramework()}
          </motion.div>
        ) : (
          renderWorldSystemSliders()
        )}
      </div>
    </div>
  );
};

export default WorldBuilding;