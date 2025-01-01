import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Moon, Coffee, Wind, Flame, Clock, Zap,
  ArrowRight, Shell
} from 'lucide-react';

export const StoryPacingDesigner: React.FC = () => {
  const [paceValue, setPaceValue] = useState(50);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);

  const getPaceDetails = (value: number) => {
    if (value < 25) return {
      text: "Deep & Contemplative",
      icon: Moon,
      description: "Perfect for introspective literary works focusing on character development",
      characteristics: [
        "Long, detailed scenes",
        "Rich internal monologues",
        "Elaborate world-building",
        "Deep character exploration"
      ]
    };
    if (value < 50) return {
      text: "Steady & Measured",
      icon: Coffee,
      description: "Balanced pacing suitable for drama and complex narratives",
      characteristics: [
        "Well-developed scenes",
        "Thoughtful dialogue",
        "Balanced action and reflection",
        "Gradual plot development"
      ]
    };
    if (value < 75) return {
      text: "Dynamic & Engaging",
      icon: Wind,
      description: "Energetic pacing ideal for adventure and mystery genres",
      characteristics: [
        "Brisk scene transitions",
        "Active dialogue",
        "Regular plot advancement",
        "Engaging action sequences"
      ]
    };
    return {
      text: "Swift & Intense",
      icon: Flame,
      description: "High-energy pacing perfect for thrillers and action stories",
      characteristics: [
        "Quick scene changes",
        "Rapid dialogue",
        "Fast-paced action",
        "Swift plot progression"
      ]
    };
  };

  const rhythmStyles = [
    { 
      label: 'Contemplative',
      icon: Moon,
      value: 25,
      description: 'Deep exploration and reflection',
      elements: ['Internal monologues', 'Detailed descriptions', 'Character studies']
    },
    { 
      label: 'Measured',
      icon: Coffee,
      value: 50,
      description: 'Balanced storytelling approach',
      elements: ['Mixed pacing', 'Regular progression', 'Varied scenes']
    },
    { 
      label: 'Dynamic',
      icon: Wind,
      value: 75,
      description: 'Energetic and engaging flow',
      elements: ['Quick transitions', 'Active scenes', 'Regular tension']
    },
    { 
      label: 'Intense',
      icon: Flame,
      value: 100,
      description: 'Swift and powerful delivery',
      elements: ['Rapid progression', 'High energy', 'Constant movement']
    }
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="space-y-1.5">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-indigo-500" />
            Overall Story Pacing
          </CardTitle>
          <p className="text-sm text-gray-600">
            Define the fundamental rhythm and flow of your narrative
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Main Pacing Control */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <Shell className="w-6 h-6 text-emerald-500" />
            <div className="flex-1">
              <Slider 
                defaultValue={[50]} 
                max={100} 
                step={1}
                className="w-full"
                onValueChange={(value) => setPaceValue(value[0])}
              />
            </div>
            <Zap className="w-6 h-6 text-amber-500" />
          </div>

          <div className="text-center p-4 rounded-xl bg-indigo-50/70">
            <div className="flex items-center justify-center gap-2 text-lg font-medium text-indigo-900">
              {React.createElement(getPaceDetails(paceValue).icon, { 
                className: `w-5 h-5 ${
                  paceValue < 25 ? 'text-indigo-600' :
                  paceValue < 50 ? 'text-emerald-600' :
                  paceValue < 75 ? 'text-amber-600' :
                  'text-rose-600'
                }`
              })}
              {getPaceDetails(paceValue).text}
            </div>
            <div className="mt-2 text-sm text-indigo-700">
              {getPaceDetails(paceValue).description}
            </div>
          </div>
        </div>

        {/* Rhythm Styles Grid */}
        <div className="grid grid-cols-4 gap-4">
          {rhythmStyles.map(({label, icon: Icon, value, description, elements}, i) => (
            <div 
              key={label}
              onClick={() => setPaceValue(value)}
              onMouseEnter={() => setActiveDetail(label)}
              onMouseLeave={() => setActiveDetail(null)}
              className={`p-4 rounded-xl transition-all cursor-pointer relative group
                ${paceValue <= value && paceValue > (value - 25)
                  ? 'bg-indigo-50 shadow-sm transform scale-105 border border-indigo-100' 
                  : 'bg-gray-50/70 hover:bg-gray-100/80 border border-gray-100'
                }`}
            >
              <Icon className={`w-6 h-6 mb-2 mx-auto ${
                paceValue <= value && paceValue > (value - 25)
                  ? value <= 25 ? 'text-indigo-600' :
                    value <= 50 ? 'text-emerald-600' :
                    value <= 75 ? 'text-amber-600' :
                    'text-rose-600'
                  : 'text-gray-600'
              }`} />
              <div className="font-medium text-center">{label}</div>
              <div className="text-xs text-center text-gray-600 mt-1">{description}</div>
              
              {/* Hover Details */}
              {activeDetail === label && (
                <div className="absolute z-10 left-0 right-0 -bottom-2 transform translate-y-full bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <div className="text-sm font-medium mb-2 text-indigo-900">Key Elements:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {elements.map((element, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <ArrowRight className="w-3 h-3 text-indigo-400" />
                        {element}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 