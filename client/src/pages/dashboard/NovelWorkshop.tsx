import React from 'react';
import { useLocation } from 'wouter';
import { WorkshopCards } from '@/components/dashboard/novel-workshop/WorkshopCards';
import { NovelGenerationCard } from '@/components/dashboard/novel-workshop/NovelGenerationCard';

export const NovelWorkshop: React.FC = () => {
  const [, navigate] = useLocation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Novel Workshop</h1>
        <p className="mt-2 text-slate-600">
          Create and manage your novels with AI assistance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <WorkshopCards />
        <NovelGenerationCard
          onClick={() => navigate('/novel-workshop/generation')}
        />
      </div>
    </div>
  );
}; 