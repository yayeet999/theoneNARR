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
  Building,
  HomeIcon,
  Ship,
  Underground,
  Stars,
  Globe2,
  ScrollText,
  Combine
} from 'lucide-react';

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
  const [animate, setAnimate] = useState(true);

  const containedSettings: SettingOption[] = [
    {
      id: 'urban',
      label: 'Urban',
      description: 'City-based environments',
      icon: Building2,
      variants: [
        { id: 'modern-city', name: 'Modern City', description: 'Contemporary/Thriller' },
        { id: 'cyberpunk-metropolis', name: 'Cyberpunk Metropolis', description: 'Sci-Fi' },
        { id: 'medieval-town', name: 'Medieval Town', description: 'Fantasy/Historical' },
        { id: 'steampunk-city', name: 'Steampunk City', description: 'Alternative' },
        { id: 'underground-city', name: 'Underground City', description: 'Speculative' },
        { id: 'ghost-town', name: 'Ghost Town', description: 'Horror' }
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
    setTimeout(() => {
      setSelectedMainCategory(category);
      setAnimate(true);
    }, 300);
  };

  const handleSettingSelect = (settingId: string) => {
    setAnimate(false);
    setTimeout(() => {
      setSelectedSetting(settingId);
      setAnimate(true);
    }, 300);
  };

  const renderSettingOptions = (settings: SettingOption[]) => (
    <div className="grid grid-cols-2 gap-6">
      {settings.map((setting) => {
        const Icon = setting.icon;
        return (
          <button
            key={setting.id}
            onClick={() => handleSettingSelect(setting.id)}
            className={`group relative p-6 rounded-xl border bg-white transition-all duration-500 transform hover:scale-[1.02] hover:shadow-lg ${
              selectedSetting === setting.id
                ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-md scale-[1.02]'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Icon className={`w-8 h-8 ${
                  selectedSetting === setting.id
                    ? 'text-indigo-600'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-lg font-medium ${
                  selectedSetting === setting.id ? 'text-indigo-600' : 'text-slate-900'
                }`}>
                  {setting.label}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{setting.description}</p>
                {selectedSetting === setting.id && (
                  <div className="mt-4 space-y-2 animate-in slide-in-from-bottom duration-500">
                    {setting.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="p-2 rounded-lg bg-slate-50 border border-slate-200"
                      >
                        <div className="font-medium text-sm text-slate-900">{variant.name}</div>
                        <div className="text-xs text-slate-500">{variant.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                selectedSetting === setting.id ? 'rotate-90 text-indigo-600' : 'text-slate-400'
              }`} />
            </div>
          </button>
        )
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-slate-900">World Building</h1>
              <p className="text-sm text-slate-600">Design your story's setting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-12 max-w-5xl mx-auto px-6">
        {/* Category Selection */}
        {!selectedMainCategory && (
          <div className={`space-y-8 transition-all duration-500 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
            <div className="space-y-4">
              <Label className="text-lg text-slate-900">Choose your setting category</Label>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => handleCategorySelect('contained')}
                  className="group relative p-6 rounded-xl border bg-white transition-all duration-500 hover:shadow-lg hover:scale-[1.02]"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <Building2 className="w-12 h-12 text-slate-400 group-hover:text-slate-600" />
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
                  className="group relative p-6 rounded-xl border bg-white transition-all duration-500 hover:shadow-lg hover:scale-[1.02]"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <Globe2 className="w-12 h-12 text-slate-400 group-hover:text-slate-600" />
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
          <div className={`space-y-8 transition-all duration-500 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
            <div className="flex items-center justify-between">
              <Label className="text-lg text-slate-900">
                {selectedMainCategory === 'contained' ? 'Choose your contained setting' : 'Choose your expansive setting'}
              </Label>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedMainCategory(null);
                  setSelectedSetting(null);
                }}
                className="text-slate-600"
              >
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
