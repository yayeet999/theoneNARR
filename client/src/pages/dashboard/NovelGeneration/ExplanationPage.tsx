import React from 'react';
import { useLocation } from 'wouter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ExplanationPage: React.FC = () => {
  const [, navigate] = useLocation();

  const startWorkflow = () => {
    navigate('/novel-workshop/generation/workflow');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Novel Generation</CardTitle>
          <CardDescription>
            Create a complete novel outline with our AI-powered workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose">
            <h3>What to Expect</h3>
            <p>
              Our AI-powered novel generation workflow will guide you through creating
              a complete and detailed novel outline. You'll define your story's world,
              characters, plot structure, and themes with intelligent assistance at every step.
            </p>
            
            <h3>Features</h3>
            <ul>
              <li>World Building - Create rich, detailed settings for your story</li>
              <li>Character Creation - Develop deep, compelling characters</li>
              <li>Plot Structure - Design engaging story arcs and plot points</li>
              <li>Theme Development - Weave meaningful themes throughout your narrative</li>
              <li>Style & Tone - Define your unique narrative voice</li>
            </ul>

            <h3>How it Works</h3>
            <p>
              You'll progress through each section step by step, with AI assistance
              helping you make creative decisions and maintain consistency throughout
              your novel's development.
            </p>
          </div>
          
          <Button
            onClick={startWorkflow}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            size="lg"
          >
            Begin Novel Generation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}; 