import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Users,
  ArrowRight,
  ArrowDown,
  Plus,
  Minus,
  Link,
  Unlink,
} from 'lucide-react';

interface ViewpointEvent {
  id: string;
  viewpointId: string;
  position: number; // 0-100
  label: string;
  connectedTo?: string; // ID of another event this connects to
}

interface Viewpoint {
  id: string;
  character: string;
  color: string;
  events: ViewpointEvent[];
}

const INITIAL_VIEWPOINTS: Viewpoint[] = [
  {
    id: '1',
    character: 'Main Character',
    color: 'rgb(99 102 241)',
    events: [
      { id: '1', viewpointId: '1', position: 20, label: 'Discovers mystery' },
      { id: '2', viewpointId: '1', position: 50, label: 'Confronts rival' },
      { id: '3', viewpointId: '1', position: 80, label: 'Reaches revelation' }
    ]
  },
  {
    id: '2',
    character: 'Secondary Character',
    color: 'rgb(34 197 94)',
    events: [
      { id: '4', viewpointId: '2', position: 30, label: 'Enters story' },
      { id: '5', viewpointId: '2', position: 60, label: 'Makes decision' },
      { id: '6', viewpointId: '2', position: 90, label: 'Resolves arc' }
    ]
  }
];

export const MultipleViewpointSystem: React.FC = () => {
  const [viewpoints, setViewpoints] = useState<Viewpoint[]>(INITIAL_VIEWPOINTS);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [connectingMode, setConnectingMode] = useState(false);

  const handleAddViewpoint = () => {
    const newId = (viewpoints.length + 1).toString();
    const colors = ['rgb(99 102 241)', 'rgb(34 197 94)', 'rgb(239 68 68)', 'rgb(234 179 8)'];
    
    setViewpoints(prev => [...prev, {
      id: newId,
      character: `Character ${newId}`,
      color: colors[prev.length % colors.length],
      events: []
    }]);
  };

  const handleRemoveViewpoint = (id: string) => {
    setViewpoints(prev => prev.filter(vp => vp.id !== id));
  };

  const handleAddEvent = (viewpointId: string) => {
    const viewpoint = viewpoints.find(vp => vp.id === viewpointId);
    if (!viewpoint) return;

    const newEvent: ViewpointEvent = {
      id: Math.random().toString(36).substr(2, 9),
      viewpointId,
      position: 50,
      label: 'New Event'
    };

    setViewpoints(prev => prev.map(vp =>
      vp.id === viewpointId
        ? { ...vp, events: [...vp.events, newEvent] }
        : vp
    ));
  };

  const handleEventClick = (eventId: string) => {
    if (!connectingMode) return;
    
    if (!selectedEvent) {
      setSelectedEvent(eventId);
    } else {
      // Connect the events
      setViewpoints(prev => prev.map(vp => ({
        ...vp,
        events: vp.events.map(event =>
          event.id === selectedEvent
            ? { ...event, connectedTo: eventId }
            : event
        )
      })));
      setSelectedEvent(null);
      setConnectingMode(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-indigo-500" />
          <span>Multiple Viewpoints</span>
        </CardTitle>
        <CardDescription>
          Track parallel storylines and character perspectives
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Viewpoint Controls */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddViewpoint}
              disabled={viewpoints.length >= 4}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Viewpoint
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConnectingMode(!connectingMode)}
              className={connectingMode ? 'bg-indigo-50' : ''}
            >
              {connectingMode ? <Unlink className="w-4 h-4 mr-2" /> : <Link className="w-4 h-4 mr-2" />}
              {connectingMode ? 'Cancel Connection' : 'Connect Events'}
            </Button>
          </div>

          {/* Viewpoints Timeline */}
          <div className="space-y-6">
            {viewpoints.map((viewpoint, index) => (
              <div key={viewpoint.id} className="relative">
                {/* Viewpoint Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: viewpoint.color }}
                    />
                    <Input
                      value={viewpoint.character}
                      onChange={(e) => setViewpoints(prev => prev.map(vp =>
                        vp.id === viewpoint.id
                          ? { ...vp, character: e.target.value }
                          : vp
                      ))}
                      className="h-7 text-sm"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddEvent(viewpoint.id)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    {viewpoints.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveViewpoint(viewpoint.id)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative h-24 bg-slate-50 rounded-lg">
                  {/* Base Timeline */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200" />

                  {/* Events */}
                  {viewpoint.events.map(event => (
                    <div
                      key={event.id}
                      className="absolute top-1/2 -translate-y-1/2"
                      style={{ left: `${event.position}%` }}
                    >
                      <button
                        className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-200 ${
                          selectedEvent === event.id || event.connectedTo
                            ? 'ring-4 ring-indigo-100'
                            : ''
                        }`}
                        style={{ backgroundColor: viewpoint.color }}
                        onClick={() => handleEventClick(event.id)}
                      />
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-xs font-medium text-slate-600">
                          {event.label}
                        </span>
                      </div>

                      {/* Connection Lines */}
                      {event.connectedTo && (
                        <svg
                          className="absolute top-1/2 left-1/2 pointer-events-none"
                          style={{
                            width: '100px',
                            height: '50px',
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <path
                            d="M 0,0 C 50,0 50,50 100,50"
                            fill="none"
                            stroke="rgb(99 102 241)"
                            strokeWidth="2"
                            strokeDasharray="4 2"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 