import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Users, Activity, Network } from "lucide-react";
import CharacterArc from './CharacterArc';
import SceneDynamics from './SceneDynamics';
import Relationships from './Relationships';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Character {
  id: string;
  name: string;
  // ... other character properties
}

interface Props {
  characters: Character[];
}

const AdvancedCharacterFeatures: React.FC<Props> = ({ characters }) => {
  const [activeTab, setActiveTab] = useState('arc');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16"
    >
      <div className="border-t border-slate-200 pt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Advanced Character Features</h2>
        
        {characters.length === 1 && (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Add more characters to your story to unlock the full potential of these features.
              Character relationships and dynamics become more meaningful with a larger cast!
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="arc" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="arc" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Character Arcs
            </TabsTrigger>
            <TabsTrigger value="dynamics" className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              Scene Dynamics
            </TabsTrigger>
            <TabsTrigger value="relationships" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Relationships
            </TabsTrigger>
          </TabsList>

          <TabsContent value="arc" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Character Arcs</CardTitle>
                <CardDescription>
                  Define how your characters evolve throughout the story
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CharacterArc
                  characters={characters}
                  // Add necessary props based on your CharacterArc component
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dynamics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Scene Dynamics</CardTitle>
                <CardDescription>
                  Visualize how characters interact in different scenes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SceneDynamics
                  characters={characters}
                  // Add necessary props based on your SceneDynamics component
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relationships" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Character Relationships</CardTitle>
                <CardDescription>
                  Map out the connections between your characters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Relationships
                  characters={characters}
                  // Add necessary props based on your Relationships component
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default AdvancedCharacterFeatures;
