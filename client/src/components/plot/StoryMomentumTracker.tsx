import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Activity,
  Flag,
  Star,
  Zap,
} from 'lucide-react';

interface MomentumPoint {
  id: string;
  position: number; // 0-100
  intensity: number; // 1-10
  label?: string;
  isKeyBeat?: boolean;
}

export const StoryMomentumTracker: React.FC = () => {
  const [momentumPoints, setMomentumPoints] = useState<MomentumPoint[]>([
    { id: '1', position: 0, intensity: 3, label: 'Story Start' },
    { id: '2', position: 25, intensity: 6, label: 'Inciting Incident', isKeyBeat: true },
    { id: '3', position: 50, intensity: 8, label: 'Midpoint', isKeyBeat: true },
    { id: '4', position: 75, intensity: 7, label: 'Pre-Climax' },
    { id: '5', position: 90, intensity: 10, label: 'Climax', isKeyBeat: true },
    { id: '6', position: 100, intensity: 4, label: 'Resolution' }
  ]);

  const handlePointDrag = (id: string, newPosition: number, newIntensity: number) => {
    setMomentumPoints(prev => prev.map(point => 
      point.id === id 
        ? { ...point, position: newPosition, intensity: newIntensity }
        : point
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          <span>Story Momentum</span>
        </CardTitle>
        <CardDescription>
          Track how your story's energy builds and flows
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 bg-slate-50 rounded-lg p-4">
          {/* Timeline Base */}
          <div className="absolute bottom-12 left-0 right-0 h-0.5 bg-slate-200" />

          {/* Progress Markers */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-between text-xs text-slate-400">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>

          {/* Momentum Line */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path
              d={`M ${momentumPoints.map(point => 
                `${point.position}% ${100 - (point.intensity * 10)}%`
              ).join(' L ')}`}
              fill="none"
              stroke="rgb(99 102 241)"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          </svg>

          {/* Momentum Points */}
          {momentumPoints.map((point) => (
            <motion.div
              key={point.id}
              drag
              dragConstraints={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }}
              dragElastic={0}
              className="absolute"
              style={{
                left: `${point.position}%`,
                top: `${100 - (point.intensity * 10)}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onDrag={(e, info) => {
                const rect = (e.target as HTMLElement).parentElement?.getBoundingClientRect();
                if (!rect) return;

                const newPosition = Math.max(0, Math.min(100, 
                  ((info.point.x - rect.left) / rect.width) * 100
                ));
                const newIntensity = Math.max(1, Math.min(10,
                  10 - (((info.point.y - rect.top) / rect.height) * 10)
                ));

                handlePointDrag(point.id, newPosition, newIntensity);
              }}
            >
              <div 
                className={`w-4 h-4 rounded-full cursor-grab active:cursor-grabbing ${
                  point.isKeyBeat 
                    ? 'bg-indigo-600 ring-4 ring-indigo-100' 
                    : 'bg-white border-2 border-indigo-500'
                }`}
              />
              {point.label && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-medium text-slate-600">
                    {point.label}
                  </span>
                </div>
              )}
            </motion.div>
          ))}

          {/* Intensity Scale */}
          <div className="absolute left-4 top-0 bottom-12 w-8 flex flex-col justify-between text-xs text-slate-400">
            <span>High</span>
            <span>Med</span>
            <span>Low</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-indigo-500" />
              <span className="text-xs text-slate-500">Regular Point</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-indigo-600 ring-2 ring-indigo-100" />
              <span className="text-xs text-slate-500">Key Beat</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const id = Math.random().toString(36).substr(2, 9);
              const lastPoint = momentumPoints[momentumPoints.length - 1];
              const newPosition = Math.min(100, lastPoint.position + 10);
              
              setMomentumPoints(prev => [...prev, {
                id,
                position: newPosition,
                intensity: 5
              }]);
            }}
          >
            Add Point
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 