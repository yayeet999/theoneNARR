import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  AlertCircle
} from 'lucide-react';

interface Character {
  id: string;
  name: string;
}

interface ArcEvent {
  id: string;
  type: 'emotional_beat' | 'revelation' | 'transformation';
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  intensity: number;
}

interface Props {
  character: Character;
  onArcUpdate: (arcData: {
    arcType: 'positive' | 'negative' | 'flat';
    events: ArcEvent[];
  }) => void;
}

const ARC_TYPES = [
  {
    id: 'positive',
    name: 'Positive Change Arc',
    description: 'Character grows and improves over time',
    icon: TrendingUp,
    examples: ['Coming of Age', 'Growth', 'Redemption']
  },
  {
    id: 'negative',
    name: 'Negative Change Arc',
    description: 'Character faces decline or corruption',
    icon: TrendingDown,
    examples: ['Fall from Grace', 'Corruption', 'Tragic Downfall']
  },
  {
    id: 'flat',
    name: 'Flat Arc',
    description: 'Character remains constant, acting as a moral compass',
    icon: Minus,
    examples: ['Stabilizing Force', 'Moral Center', 'Consistent Guide']
  }
];

export const CharacterArc: React.FC<Props> = ({
  character,
  onArcUpdate
}) => {
  const [arcType, setArcType] = useState<'positive' | 'negative' | 'flat'>('positive');
  const [events, setEvents] = useState<ArcEvent[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<ArcEvent>>({
    type: 'emotional_beat',
    impact: 'positive',
    intensity: 5
  });

  const handleAddEvent = () => {
    if (newEvent.type && newEvent.description && newEvent.impact && newEvent.intensity !== undefined) {
      const event: ArcEvent = {
        id: Math.random().toString(36).substr(2, 9),
        type: newEvent.type as ArcEvent['type'],
        description: newEvent.description,
        impact: newEvent.impact as ArcEvent['impact'],
        intensity: newEvent.intensity
      };

      const updatedEvents = [...events, event];
      setEvents(updatedEvents);
      onArcUpdate({ arcType, events: updatedEvents });

      setNewEvent({
        type: 'emotional_beat',
        impact: 'positive',
        intensity: 5
      });
    }
  };

  const removeEvent = (id: string) => {
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    onArcUpdate({ arcType, events: updatedEvents });
  };

  const handleArcTypeChange = (type: 'positive' | 'negative' | 'flat') => {
    setArcType(type);
    onArcUpdate({ arcType: type, events });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Character Arc for {character.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARC_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  p-4 rounded-xl border cursor-pointer transition-all duration-300
                  ${arcType === type.id 
                    ? 'border-indigo-600 bg-indigo-50 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300'}
                `}
                onClick={() => handleArcTypeChange(type.id as 'positive' | 'negative' | 'flat')}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className={`w-5 h-5 ${arcType === type.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <h3 className={`font-medium ${arcType === type.id ? 'text-indigo-600' : 'text-slate-900'}`}>
                    {type.name}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 mb-3">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Arc Events Timeline</CardTitle>
          <CardDescription>Add key moments that shape your character's arc</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Timeline Visualization */}
            <div className="relative h-24 bg-slate-100 rounded-lg overflow-hidden">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-0 group"
                  style={{ 
                    left: `${(index / Math.max(events.length - 1, 1)) * 100}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div 
                    className={`w-4 h-4 rounded-full cursor-pointer ${
                      event.impact === 'positive' ? 'bg-green-500' :
                      event.impact === 'negative' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}
                  />
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <p className="text-sm font-medium">{event.description}</p>
                    <p className="text-xs text-slate-500">Impact: {event.impact}</p>
                    <p className="text-xs text-slate-500">Intensity: {event.intensity}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add New Event Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Event Type</Label>
                  <Select 
                    value={newEvent.type}
                    onValueChange={(value: ArcEvent['type']) => 
                      setNewEvent(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emotional_beat">Emotional Beat</SelectItem>
                      <SelectItem value="revelation">Revelation</SelectItem>
                      <SelectItem value="transformation">Transformation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Impact</Label>
                  <Select
                    value={newEvent.impact}
                    onValueChange={(value: ArcEvent['impact']) => 
                      setNewEvent(prev => ({ ...prev, impact: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Event Description</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newEvent.description || ''}
                  onChange={(e) => setNewEvent(prev => ({ 
                    ...prev, 
                    description: e.target.value
                  }))}
                  placeholder="Describe the event"
                />
              </div>

              <div>
                <Label>Event Intensity</Label>
                <div className="pt-4">
                  <Slider
                    value={[newEvent.intensity || 5]}
                    onValueChange={([value]) => setNewEvent(prev => ({ 
                      ...prev, 
                      intensity: value
                    }))}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>
              </div>

              <Button
                onClick={handleAddEvent}
                className="w-full"
                disabled={!newEvent.type || !newEvent.description || !newEvent.impact}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Event to Timeline
              </Button>
            </div>

            {/* Events List */}
            <div className="space-y-2">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-2 bg-slate-50 p-3 rounded-md"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${
                        event.impact === 'positive' ? 'bg-green-500' :
                        event.impact === 'negative' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`} />
                      <p className="text-sm font-medium">{event.description}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Impact: {event.impact} | Intensity: {event.intensity}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEvent(event.id)}
                  >
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterArc;