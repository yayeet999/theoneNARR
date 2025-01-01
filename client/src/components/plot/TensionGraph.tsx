import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  Star,
  Plus,
  Minus,
} from 'lucide-react';

interface TensionPoint {
  id: string;
  position: number; // 0-100
  tension: number; // 1-10
  label?: string;
  isMajorPeak?: boolean;
}

const INITIAL_POINTS: TensionPoint[] = [
  { id: '1', position: 0, tension: 3, label: 'Opening' },
  { id: '2', position: 25, tension: 6, label: 'First Major Conflict', isMajorPeak: true },
  { id: '3', position: 50, tension: 8, label: 'Midpoint Crisis', isMajorPeak: true },
  { id: '4', position: 75, tension: 7, label: 'Rising Action' },
  { id: '5', position: 90, tension: 10, label: 'Climax', isMajorPeak: true },
  { id: '6', position: 100, tension: 4, label: 'Resolution' }
];

export const TensionGraph: React.FC = () => {
  const [points, setPoints] = useState<TensionPoint[]>(INITIAL_POINTS);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState<string | null>(null);

  const handlePointDrag = (id: string, newPosition: number, newTension: number) => {
    setPoints(prev => prev.map(point => 
      point.id === id 
        ? { ...point, position: newPosition, tension: newTension }
        : point
    ));
  };

  const handleLabelEdit = (id: string, newLabel: string) => {
    setPoints(prev => prev.map(point => 
      point.id === id ? { ...point, label: newLabel } : point
    ));
    setEditingLabel(null);
  };

  const togglePeakType = (id: string) => {
    setPoints(prev => prev.map(point => 
      point.id === id ? { ...point, isMajorPeak: !point.isMajorPeak } : point
    ));
  };

  const addPoint = () => {
    const newPoint: TensionPoint = {
      id: Math.random().toString(36).substr(2, 9),
      position: 50,
      tension: 5,
      label: 'New Point'
    };
    setPoints(prev => [...prev, newPoint]);
  };

  const removePoint = (id: string) => {
    if (points.length <= 3) return; // Maintain minimum points
    setPoints(prev => prev.filter(point => point.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <span>Tension Graph</span>
        </CardTitle>
        <CardDescription>
          Shape your story's emotional intensity and dramatic tension
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 bg-slate-50 rounded-lg p-4">
          {/* Base Grid */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="border-slate-200"
                style={{
                  borderRight: (i + 1) % 4 === 0 ? 'none' : '1px dashed',
                  borderBottom: i < 12 ? '1px dashed' : 'none'
                }}
              />
            ))}
          </div>

          {/* Progress Markers */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>

          {/* Tension Line */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path
              d={`M ${points.map(point => 
                `${point.position}% ${100 - (point.tension * 10)}%`
              ).join(' L ')}`}
              fill="none"
              stroke="rgb(99 102 241)"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          </svg>

          {/* Tension Points */}
          {points.map((point) => (
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
                top: `${100 - (point.tension * 10)}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onDrag={(e, info) => {
                const rect = (e.target as HTMLElement).parentElement?.getBoundingClientRect();
                if (!rect) return;

                const newPosition = Math.max(0, Math.min(100, 
                  ((info.point.x - rect.left) / rect.width) * 100
                ));
                const newTension = Math.max(1, Math.min(10,
                  10 - (((info.point.y - rect.top) / rect.height) * 10)
                ));

                handlePointDrag(point.id, newPosition, newTension);
              }}
              onClick={() => setSelectedPoint(point.id)}
            >
              <div 
                className={`w-4 h-4 rounded-full cursor-grab active:cursor-grabbing ${
                  point.isMajorPeak 
                    ? 'bg-indigo-600 ring-4 ring-indigo-100' 
                    : 'bg-white border-2 border-indigo-500'
                }`}
              />
              {point.label && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  {editingLabel === point.id ? (
                    <Input
                      value={point.label}
                      onChange={(e) => handleLabelEdit(point.id, e.target.value)}
                      onBlur={() => setEditingLabel(null)}
                      className="h-6 text-xs min-w-[100px]"
                      autoFocus
                    />
                  ) : (
                    <span 
                      className="text-xs font-medium text-slate-600 cursor-pointer"
                      onClick={() => setEditingLabel(point.id)}
                    >
                      {point.label}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}

          {/* Tension Scale */}
          <div className="absolute left-4 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-slate-400">
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
              <span className="text-xs text-slate-500">Major Peak</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={addPoint}
              disabled={points.length >= 10}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Point
            </Button>
            {selectedPoint && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePeakType(selectedPoint)}
                >
                  <Star className="w-4 h-4 mr-1" />
                  Toggle Peak
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    removePoint(selectedPoint);
                    setSelectedPoint(null);
                  }}
                  disabled={points.length <= 3}
                >
                  <Minus className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 