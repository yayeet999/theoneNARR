import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface NovelGenerationCardProps {
  onClick: () => void;
}

export const NovelGenerationCard: React.FC<NovelGenerationCardProps> = ({ onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-indigo-500 to-purple-600"
    >
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg text-white">Novel Generation</CardTitle>
            <CardDescription className="text-white/80">
              Create your next masterpiece
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}; 