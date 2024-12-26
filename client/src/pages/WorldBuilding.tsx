import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

const WorldBuilding = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<'contained' | 'expansive' | null>(null);
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [animate, setAnimate] = useState(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
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

      {/* Main Content */}
      <div className="pt-28 pb-16 max-w-6xl mx-auto px-6">
        {/* Category Selection */}
        {!selectedMainCategory && (
          <div className={cn(
            "space-y-8 transition-all duration-500",
            animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          )}>
            <div className="space-y-6">
              <Label className="text-lg font-medium text-slate-900">Choose your setting category</Label>
              <div className="grid grid-cols-2 gap-8">
                <button
                  onClick={() => handleCategorySelect('contained')}
                  className="group relative p-8 rounded-xl border border-slate-200 bg-white/50 backdrop-blur
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
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleCategorySelect('expansive')}
                  className="group relative p-8 rounded-xl border border-slate-200 bg-white/50 backdrop-blur
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
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Setting Options */}
        {selectedMainCategory && (
          <div className={cn(
            "space-y-8 transition-all duration-500",
            animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          )}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldBuilding;