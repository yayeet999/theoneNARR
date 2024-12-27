import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
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
  AlertCircle,
  X
} from 'lucide-react';
import cn from 'classnames';

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
  timelinePosition: number;
  chapter: 'introduction' | 'rising_action' | 'climax' | 'resolution';
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

const CHAPTERS = [
  { id: 'introduction', name: 'Introduction', range: [0, 25] },
  { id: 'rising_action', name: 'Rising Action', range: [26, 50] },
  { id: 'climax', name: 'Climax', range: [51, 75] },
  { id: 'resolution', name: 'Resolution', range: [76, 100] }
];

const EVENT_TYPES = {
  emotional_beat: {
    label: 'Emotional Beat',
    description: 'Character experiences a significant emotional moment',
    icon: '💭'
  },
  revelation: {
    label: 'Revelation',
    description: 'Character discovers or realizes something important',
    icon: '✨'
  },
  transformation: {
    label: 'Transformation',
    description: 'Character undergoes a significant change',
    icon: '🔄'
  }
};

export const CharacterArc: React.FC<Props> = ({
  character,
  onArcUpdate
}) => {
  const [arcType, setArcType] = useState<'positive' | 'negative' | 'flat'>('positive');
  const [events, setEvents] = useState<ArcEvent[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<ArcEvent>>({
    type: 'emotional_beat',
    impact: 'positive',
    intensity: 5,
    timelinePosition: 50,
    chapter: 'rising_action'
  });
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const getChapterFromPosition = (position: number): ArcEvent['chapter'] => {
    if (position <= 25) return 'introduction';
    if (position <= 50) return 'rising_action';
    if (position <= 75) return 'climax';
    return 'resolution';
  };

  const handleAddEvent = () => {
    if (!newEvent.type || !newEvent.description || !newEvent.impact) return;

    const event: ArcEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type: newEvent.type as ArcEvent['type'],
      description: newEvent.description,
      impact: newEvent.impact as ArcEvent['impact'],
      intensity: newEvent.intensity || 5,
      timelinePosition: newEvent.timelinePosition || 50,
      chapter: getChapterFromPosition(newEvent.timelinePosition || 50)
    };

    const updatedEvents = [...events, event].sort((a, b) => a.timelinePosition - b.timelinePosition);
    setEvents(updatedEvents);
    onArcUpdate({ arcType, events: updatedEvents });

    // Reset form
    setNewEvent({
      type: 'emotional_beat',
      impact: 'positive',
      intensity: 5,
      timelinePosition: 50,
      chapter: 'rising_action'
    });
  };

  const removeEvent = (id: string) => {
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    onArcUpdate({ arcType, events: updatedEvents });
    setSelectedEvent(null);
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

        {/* Arc Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARC_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all duration-300",
                  arcType === type.id 
                    ? 'border-indigo-600 bg-indigo-50 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300'
                )}
                onClick={() => handleArcTypeChange(type.id as 'positive' | 'negative' | 'flat')}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className={cn(
                    "w-5 h-5",
                    arcType === type.id ? "text-indigo-600" : "text-slate-400"
                  )} />
                  <h3 className={cn(
                    "font-medium",
                    arcType === type.id ? "text-indigo-600" : "text-slate-900"
                  )}>
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
          <CardTitle>Story Timeline</CardTitle>
          <CardDescription>Map out key moments in your character's journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Chapter Sections */}
            <div className="relative pt-8">
              <div className="grid grid-cols-4 gap-px bg-slate-200">
                {CHAPTERS.map((chapter, index) => (
                  <div 
                    key={chapter.id}
                    className={cn(
                      "p-4 relative",
                      index === 0 ? "rounded-l-lg" : "",
                      index === CHAPTERS.length - 1 ? "rounded-r-lg" : ""
                    )}
                  >
                    <div className="text-center mb-2">
                      <h4 className="font-medium text-sm text-slate-700">{chapter.name}</h4>
                      <span className="text-xs text-slate-500">{chapter.range[0]}%-{chapter.range[1]}%</span>
                    </div>

                    {/* Events in this chapter */}
                    <div className="min-h-[100px] relative">
                      {events
                        .filter(event => event.chapter === chapter.id)
                        .map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              "absolute p-2 rounded-md cursor-pointer transition-all",
                              "hover:scale-105",
                              selectedEvent === event.id ? "ring-2 ring-indigo-500" : "",
                              event.impact === 'positive' ? 'bg-green-100' :
                              event.impact === 'negative' ? 'bg-red-100' :
                              'bg-blue-100'
                            )}
                            style={{
                              left: `${((event.timelinePosition - chapter.range[0]) / (chapter.range[1] - chapter.range[0])) * 100}%`,
                              top: `${(events.indexOf(event) % 3) * 30}px`
                            }}
                            onClick={() => setSelectedEvent(event.id)}
                          >
                            <span className="text-lg" role="img" aria-label={EVENT_TYPES[event.type].label}>
                              {EVENT_TYPES[event.type].icon}
                            </span>

                            {/* Event details tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 z-10">
                              <div className="bg-white rounded-lg shadow-lg p-3 text-sm w-64">
                                <div className="font-medium mb-1">{event.description}</div>
                                <div className="text-xs text-slate-500">
                                  <div>Type: {EVENT_TYPES[event.type].label}</div>
                                  <div>Impact: {event.impact}</div>
                                  <div>Intensity: {event.intensity}/10</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline progress indicator */}
              <div className={cn(
                "absolute bottom-0 left-0 h-1 transition-all duration-500",
                arcType === 'positive' ? 'bg-gradient-to-r from-blue-500 via-green-500 to-emerald-500' :
                arcType === 'negative' ? 'bg-gradient-to-r from-blue-500 via-orange-500 to-red-500' :
                'bg-gradient-to-r from-blue-500 to-blue-500'
              )} style={{ width: `${Math.min(100, (events.length / 12) * 100)}%` }} />
            </div>

            {/* Event Details Panel */}
            <AnimatePresence>
              {selectedEvent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-slate-50 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Event Details</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEvent(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {(() => {
                    const event = events.find(e => e.id === selectedEvent);
                    if (!event) return null;

                    return (
                      <div className="space-y-4">
                        <div>
                          <Label>Description</Label>
                          <p className="mt-1 text-sm">{event.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Type</Label>
                            <p className="mt-1 text-sm">{EVENT_TYPES[event.type].label}</p>
                          </div>
                          <div>
                            <Label>Impact</Label>
                            <p className="mt-1 text-sm capitalize">{event.impact}</p>
                          </div>
                        </div>

                        <div>
                          <Label>Intensity</Label>
                          <div className="mt-2">
                            <Slider
                              value={[event.intensity]}
                              onValueChange={([value]) => {
                                const updatedEvents = events.map(e =>
                                  e.id === event.id ? { ...e, intensity: value } : e
                                );
                                setEvents(updatedEvents);
                                onArcUpdate({ arcType, events: updatedEvents });
                              }}
                              min={1}
                              max={10}
                              step={1}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeEvent(event.id)}
                          >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Remove Event
                          </Button>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add New Event Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
                <CardDescription>Create a new moment in your character's journey</CardDescription>
              </CardHeader>
              <CardContent>
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
                          {Object.entries(EVENT_TYPES).map(([value, { label }]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
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
                    <textarea
                      className="w-full mt-1 p-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={newEvent.description || ''}
                      onChange={(e) => setNewEvent(prev => ({ 
                        ...prev, 
                        description: e.target.value
                      }))}
                      placeholder="Describe what happens in this event..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Timeline Position ({getChapterFromPosition(newEvent.timelinePosition || 0).replace('_', ' ')})</Label>
                    <div className="pt-4">
                      <Slider
                        value={[newEvent.timelinePosition || 50]}
                        onValueChange={([value]) => setNewEvent(prev => ({ 
                          ...prev, 
                          timelinePosition: value,
                          chapter: getChapterFromPosition(value)
                        }))}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Event Intensity ({newEvent.intensity || 5}/10)</Label>
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
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterArc;