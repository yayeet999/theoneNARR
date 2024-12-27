import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Milestone,
  Heart,
  Target,
  Trophy,
  Cloud,
  Clock
} from 'lucide-react';

interface LifeEvent {
  id: string;
  type: 'early_life' | 'defining_moment' | 'major_victory' | 'significant_loss';
  age: number;
  description: string;
}

interface BackgroundStoryProps {
  events: LifeEvent[];
  onEventAdd: (event: LifeEvent) => void;
  onEventUpdate: (id: string, event: Partial<LifeEvent>) => void;
}

const eventTypes = {
  early_life: {
    label: 'Early Life',
    icon: Clock,
    description: 'Formative childhood experiences'
  },
  defining_moment: {
    label: 'Defining Moment',
    icon: Milestone,
    description: 'A pivotal event that shaped the character'
  },
  major_victory: {
    label: 'Major Victory',
    icon: Trophy,
    description: 'A significant achievement or triumph'
  },
  significant_loss: {
    label: 'Significant Loss',
    icon: Cloud,
    description: 'A profound loss or setback'
  }
};

const BackgroundStory: React.FC<BackgroundStoryProps> = ({
  events,
  onEventAdd,
  onEventUpdate
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Background Story</h3>
        <Button
          variant="outline"
          onClick={() => {
            onEventAdd({
              id: Math.random().toString(36).substr(2, 9),
              type: 'early_life',
              age: 0,
              description: ''
            });
          }}
          className="text-sm"
          disabled={events.length >= 5}
        >
          Add Life Event
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    <Label>Event Type</Label>
                    <select
                      className="w-full mt-1 rounded-md border border-slate-200 p-2"
                      value={event.type}
                      onChange={(e) => onEventUpdate(event.id, { type: e.target.value as LifeEvent['type'] })}
                    >
                      {Object.entries(eventTypes).map(([value, { label }]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <Label>Age</Label>
                    <Input
                      type="number"
                      value={event.age}
                      onChange={(e) => onEventUpdate(event.id, { age: parseInt(e.target.value) })}
                      className="mt-1"
                      min="0"
                    />
                  </div>
                  
                  <div className="col-span-7">
                    <Label>Description</Label>
                    <textarea
                      className="w-full mt-1 rounded-md border border-slate-200 p-2"
                      value={event.description}
                      onChange={(e) => onEventUpdate(event.id, { description: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-slate-500">
                  {eventTypes[event.type].description}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          Add life events to build your character's background story
        </div>
      )}
    </div>
  );
};

export default BackgroundStory;
