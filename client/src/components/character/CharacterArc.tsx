import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  AlertCircle
} from 'lucide-react';

interface ArcEvent {
  id: string;
  type: 'emotional_beat' | 'revelation' | 'transformation';
  description: string;
  impact: string;
  position: number; // 0-100 to represent position in timeline
}

interface Props {
  arcType: 'positive' | 'negative' | 'flat';
  arcEvents: ArcEvent[];
  onArcTypeChange: (type: 'positive' | 'negative' | 'flat') => void;
  onAddEvent: (event: ArcEvent) => void;
  onRemoveEvent: (id: string) => void;
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
  arcType,
  arcEvents,
  onArcTypeChange,
  onAddEvent,
  onRemoveEvent
}) => {
  const [newEvent, setNewEvent] = useState({
    type: 'emotional_beat' as const,
    description: '',
    impact: '',
    position: 50
  });

  const selectedArcType = ARC_TYPES.find(type => type.id === arcType);

  const handleAddEvent = () => {
    if (newEvent.description && newEvent.impact) {
      onAddEvent({
        id: Math.random().toString(36).substr(2, 9),
        ...newEvent
      });
      setNewEvent({
        type: 'emotional_beat',
        description: '',
        impact: '',
        position: 50
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Character Arc</h2>
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
                onClick={() => onArcTypeChange(type.id as 'positive' | 'negative' | 'flat')}
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

      {selectedArcType && (
        <Card>
          <CardHeader>
            <CardTitle>Arc Events Timeline</CardTitle>
            <CardDescription>Add key moments that shape your character's arc</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Timeline Visualization */}
              <div className="relative h-24 bg-slate-100 rounded-lg overflow-hidden">
                {arcEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-0 w-4 h-4 -ml-2 cursor-pointer"
                    style={{ left: `${event.position}%` }}
                  >
                    <div 
                      className={`w-full h-full rounded-full ${
                        event.type === 'emotional_beat' ? 'bg-blue-500' :
                        event.type === 'revelation' ? 'bg-purple-500' :
                        'bg-green-500'
                      }`}
                    />
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {event.description}
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
                      onValueChange={(value: any) => setNewEvent(prev => ({ ...prev, type: value }))}
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
                    <Label>Timeline Position (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={newEvent.position}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, position: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the event"
                  />
                </div>
                <div>
                  <Label>Impact on Character</Label>
                  <Input
                    value={newEvent.impact}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, impact: e.target.value }))}
                    placeholder="How does this event affect the character?"
                  />
                </div>
                <Button
                  onClick={handleAddEvent}
                  className="w-full"
                  disabled={!newEvent.description || !newEvent.impact}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event to Timeline
                </Button>
              </div>

              {/* Events List */}
              <div className="space-y-2">
                {arcEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-2 bg-slate-50 p-3 rounded-md"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${
                          event.type === 'emotional_beat' ? 'bg-blue-500' :
                          event.type === 'revelation' ? 'bg-purple-500' :
                          'bg-green-500'
                        }`} />
                        <p className="text-sm font-medium">{event.description}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{event.impact}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveEvent(event.id)}
                    >
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CharacterArc;
