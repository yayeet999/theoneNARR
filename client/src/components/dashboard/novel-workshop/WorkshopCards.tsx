import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Compass, Wrench, Files } from 'lucide-react';
import type { WorkshopCard as WorkshopCardType } from '@/types/workshop';

const WorkshopCard: React.FC<WorkshopCardType> = ({
  title,
  description,
  icon: Icon,
  action,
  isPlaceholder
}) => {
  return (
    <Card
      onClick={action}
      className={`
        ${action ? 'cursor-pointer hover:shadow-lg' : ''}
        ${isPlaceholder ? 'opacity-50' : ''}
        transition-all duration-200
      `}
    >
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Icon className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export const WorkshopCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <WorkshopCard
        title="Quick Start Guide"
        description="Get started with novel writing"
        icon={Compass}
        isPlaceholder
      />
      <WorkshopCard
        title="Writing Tools"
        description="Essential tools for writers"
        icon={Wrench}
        isPlaceholder
      />
      <WorkshopCard
        title="Recent Drafts"
        description="Your work in progress"
        icon={Files}
        isPlaceholder
      />
    </div>
  );
}; 