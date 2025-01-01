import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Activity,
  MessageSquare,
  Brain,
  Globe,
  ArrowRight,
  PieChart,
} from 'lucide-react';
import { useLocation } from 'wouter';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { StoryPacingDesigner } from './StoryPacingDesigner';

interface SceneType {
  type: 'action' | 'dialogue' | 'reflection' | 'worldbuilding';
  percentage: number;
  icon: React.ElementType;
  label: string;
}

interface SceneLength {
  type: 'short' | 'medium' | 'long';
  percentage: number;
  label: string;
  description: string;
}

const SCENE_TYPES: SceneType[] = [
  { type: 'action', percentage: 25, icon: Activity, label: 'Action Scenes' },
  { type: 'dialogue', percentage: 25, icon: MessageSquare, label: 'Dialogue Scenes' },
  { type: 'reflection', percentage: 25, icon: Brain, label: 'Reflection Scenes' },
  { type: 'worldbuilding', percentage: 25, icon: Globe, label: 'World-Building Scenes' }
];

const INITIAL_SCENE_LENGTHS: SceneLength[] = [
  {
    type: 'short',
    percentage: 30,
    label: 'Short Scenes',
    description: 'Quick, punchy scenes that maintain high energy'
  },
  {
    type: 'medium',
    percentage: 50,
    label: 'Medium Scenes',
    description: 'Balanced scenes for steady story progression'
  },
  {
    type: 'long',
    percentage: 20,
    label: 'Long Scenes',
    description: 'Extended scenes for deep character moments'
  }
];

const SCENE_LENGTH_COLORS = {
  short: {
    main: '#60A5FA', // blue-400
    light: '#EFF6FF', // blue-50
    hover: '#3B82F6', // blue-500
    ring: '#2563EB', // blue-600
  },
  medium: {
    main: '#34D399', // emerald-400
    light: '#ECFDF5', // emerald-50
    hover: '#10B981', // emerald-500
    ring: '#059669', // emerald-600
  },
  long: {
    main: '#FBBF24', // amber-400
    light: '#FFFBEB', // amber-50
    hover: '#F59E0B', // amber-500
    ring: '#D97706', // amber-600
  }
};

const SCENE_TYPE_COLORS = {
  action: {
    main: '#F87171', // red-400
    light: '#FEF2F2', // red-50
    hover: '#EF4444', // red-500
    ring: '#DC2626', // red-600
  },
  dialogue: {
    main: '#818CF8', // indigo-400
    light: '#EEF2FF', // indigo-50
    hover: '#6366F1', // indigo-500
    ring: '#4F46E5', // indigo-600
  },
  reflection: {
    main: '#A78BFA', // purple-400
    light: '#F5F3FF', // purple-50
    hover: '#8B5CF6', // purple-500
    ring: '#7C3AED', // purple-600
  },
  worldbuilding: {
    main: '#2DD4BF', // teal-400
    light: '#F0FDFA', // teal-50
    hover: '#14B8A6', // teal-500
    ring: '#0D9488', // teal-600
  }
};

export const PacingAndIntegration: React.FC = () => {
  const [, navigate] = useLocation();
  const [overallPace, setOverallPace] = useState(5);
  const [sceneTypes, setSceneTypes] = useState(SCENE_TYPES);
  const [sceneLengths, setSceneLengths] = useState(INITIAL_SCENE_LENGTHS);

  const handleSceneTypeChange = (type: string, value: number) => {
    const total = sceneTypes.reduce((acc, scene) => 
      scene.type === type ? acc : acc + scene.percentage, 
      value
    );

    if (total <= 100) {
      setSceneTypes(prev => prev.map(scene => 
        scene.type === type ? { ...scene, percentage: value } : scene
      ));
    }
  };

  const handleSceneLengthChange = (type: string, value: number) => {
    const total = sceneLengths.reduce((acc, scene) => 
      scene.type === type ? acc : acc + scene.percentage, 
      value
    );

    if (total <= 100) {
      setSceneLengths(prev => prev.map(scene => 
        scene.type === type ? { ...scene, percentage: value } : scene
      ));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[80%] mx-auto py-16"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Pace Master</h2>
        <p className="text-slate-600 mt-2">
          Shape your story's pacing, rhythm, and flow
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Overall Pace Selection */}
        <StoryPacingDesigner />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scene Length Mix */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-indigo-500" />
                <span>Scene Length Mix</span>
              </CardTitle>
              <CardDescription>
                Balance your story's pacing with different scene lengths
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column - Pie Chart */}
                <div className="flex items-center justify-center bg-slate-50/50 rounded-lg p-3">
                  <div className="w-full h-[210px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsChart>
                        <Pie
                          data={sceneLengths}
                          dataKey="percentage"
                          nameKey="label"
                          cx="50%"
                          cy="40%"
                          innerRadius={53}
                          outerRadius={72}
                          paddingAngle={3}
                          strokeWidth={1}
                          stroke="#fff"
                        >
                          <Cell key="short" fill={SCENE_LENGTH_COLORS.short.main} />
                          <Cell key="medium" fill={SCENE_LENGTH_COLORS.medium.main} />
                          <Cell key="long" fill={SCENE_LENGTH_COLORS.long.main} />
                        </Pie>
                        <Legend 
                          verticalAlign="bottom" 
                          height={28}
                          formatter={(value) => {
                            const scene = sceneLengths.find(s => s.label === value);
                            return (
                              <span className="text-sm font-medium">
                                {scene?.label} ({scene?.percentage}%)
                              </span>
                            );
                          }}
                        />
                      </RechartsChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right Column - Sliders */}
                <div className="space-y-4">
                  {sceneLengths.map(scene => {
                    const colors = SCENE_LENGTH_COLORS[scene.type as keyof typeof SCENE_LENGTH_COLORS];
                    return (
                      <div 
                        key={scene.type} 
                        className={`space-y-2 p-3 rounded-lg transition-colors ${colors.light}`}
                      >
                        <div className="flex justify-between items-center">
                          <Label className="text-sm font-medium text-slate-700">
                            {scene.label}
                          </Label>
                          <span 
                            className={`px-2 py-0.5 rounded-full text-xs font-medium`}
                            style={{ backgroundColor: colors.main, color: 'white' }}
                          >
                            {scene.percentage}%
                          </span>
                        </div>
                        <Slider
                          value={[scene.percentage]}
                          onValueChange={([value]) => handleSceneLengthChange(scene.type, value)}
                          min={0}
                          max={100}
                          step={5}
                          className="w-full"
                          style={{
                            '--slider-color': colors.main,
                          } as React.CSSProperties}
                        />
                        <p className="text-xs text-slate-600">
                          {scene.description}
                        </p>
                      </div>
                    );
                  })}
                  
                  <div className={`p-2 rounded-lg ${
                    sceneLengths.reduce((acc, scene) => acc + scene.percentage, 0) === 100
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    <p className="text-sm font-medium">
                      Total: {sceneLengths.reduce((acc, scene) => acc + scene.percentage, 0)}%
                      {sceneLengths.reduce((acc, scene) => acc + scene.percentage, 0) !== 100 && 
                        ' (Adjust to reach 100%)'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scene Type Balance */}
          <Card>
            <CardHeader>
              <CardTitle>Scene Balance</CardTitle>
              <CardDescription>Adjust the mix of different scene types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column - Pie Chart */}
                <div className="flex items-center justify-center bg-slate-50/50 rounded-lg p-3">
                  <div className="w-full h-[210px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsChart>
                        <Pie
                          data={sceneTypes}
                          dataKey="percentage"
                          nameKey="label"
                          cx="50%"
                          cy="40%"
                          innerRadius={53}
                          outerRadius={72}
                          paddingAngle={3}
                          strokeWidth={1}
                          stroke="#fff"
                        >
                          {sceneTypes.map((scene) => (
                            <Cell 
                              key={scene.type} 
                              fill={SCENE_TYPE_COLORS[scene.type as keyof typeof SCENE_TYPE_COLORS].main} 
                            />
                          ))}
                        </Pie>
                        <Legend 
                          verticalAlign="bottom" 
                          height={28}
                          formatter={(value) => {
                            const scene = sceneTypes.find(s => s.label === value);
                            return (
                              <span className="text-sm font-medium">
                                {scene?.label} ({scene?.percentage}%)
                              </span>
                            );
                          }}
                        />
                      </RechartsChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right Column - Sliders */}
                <div className="space-y-4">
                  {sceneTypes.map(scene => {
                    const colors = SCENE_TYPE_COLORS[scene.type as keyof typeof SCENE_TYPE_COLORS];
                    return (
                      <div 
                        key={scene.type} 
                        className={`space-y-2 p-3 rounded-lg transition-colors ${colors.light}`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            {React.createElement(scene.icon, {
                              className: "w-4 h-4",
                              style: { color: colors.main }
                            })}
                            <Label className="text-sm font-medium text-slate-700">
                              {scene.label}
                            </Label>
                          </div>
                          <span 
                            className={`px-2 py-0.5 rounded-full text-xs font-medium`}
                            style={{ backgroundColor: colors.main, color: 'white' }}
                          >
                            {scene.percentage}%
                          </span>
                        </div>
                        <Slider
                          value={[scene.percentage]}
                          onValueChange={([value]) => handleSceneTypeChange(scene.type, value)}
                          min={0}
                          max={100}
                          step={5}
                          className="w-full"
                          style={{
                            '--slider-color': colors.main,
                          } as React.CSSProperties}
                        />
                      </div>
                    );
                  })}
                  
                  <div className={`p-2 rounded-lg ${
                    sceneTypes.reduce((acc, scene) => acc + scene.percentage, 0) === 100
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    <p className="text-sm font-medium">
                      Total: {sceneTypes.reduce((acc, scene) => acc + scene.percentage, 0)}%
                      {sceneTypes.reduce((acc, scene) => acc + scene.percentage, 0) !== 100 && 
                        ' (Adjust to reach 100%)'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="mt-12 flex justify-end">
          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
            size="lg"
            onClick={() => navigate("/novel-workshop/generation/workflow/themes")}
          >
            Continue to Themes
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}; 