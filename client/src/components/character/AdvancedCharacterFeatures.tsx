import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Users, Activity, Network } from "lucide-react";
import CharacterArc from './CharacterArc';
import SceneDynamics from './SceneDynamics';
import Relationships from './Relationships';
import { cn } from "@/lib/utils";

interface Character {
  id: string;
  name: string;
  role: string;
}

interface Props {
  characters: Character[];
}

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}> = ({ title, description, icon: Icon, isActive, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "cursor-pointer rounded-xl p-6 transition-all duration-300",
      isActive
        ? "bg-indigo-50 border-2 border-indigo-600"
        : "bg-white border border-slate-200 hover:border-slate-300"
    )}
    onClick={onClick}
  >
    <div className="flex items-center space-x-4">
      <Icon className={cn(
        "w-8 h-8",
        isActive ? "text-indigo-600" : "text-slate-400"
      )} />
      <div>
        <h3 className={cn(
          "font-medium text-lg",
          isActive ? "text-indigo-600" : "text-slate-900"
        )}>{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  </motion.div>
);

const CharacterMiniCard: React.FC<{
  character: Character;
  isSelected: boolean;
  onClick: () => void;
}> = ({ character, isSelected, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={cn(
      "cursor-pointer p-4 rounded-lg transition-all duration-200",
      isSelected
        ? "bg-indigo-50 border-2 border-indigo-600"
        : "bg-white border border-slate-200 hover:border-slate-300"
    )}
    onClick={onClick}
  >
    <h4 className="font-medium text-sm">{character.name}</h4>
    <p className="text-xs text-slate-500">{character.role}</p>
  </motion.div>
);

const AdvancedCharacterFeatures: React.FC<Props> = ({ characters }) => {
  const [activeFeature, setActiveFeature] = useState<'arc' | 'dynamics' | 'relationships'>('arc');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    characters.length > 0 ? characters[0].id : null
  );

  const features = [
    {
      id: 'arc' as const,
      title: 'Character Arcs',
      description: 'Define how your characters evolve throughout the story',
      icon: Activity
    },
    {
      id: 'dynamics' as const,
      title: 'Scene Dynamics',
      description: 'Visualize how characters interact in different scenes',
      icon: Network
    },
    {
      id: 'relationships' as const,
      title: 'Character Relationships',
      description: 'Map out the connections between your characters',
      icon: Users
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16"
    >
      <div className="border-t border-slate-200 pt-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Advanced Character Features</h2>
          <p className="text-slate-600 mt-2">
            Enhance your story with advanced character development tools
          </p>
        </div>

        {characters.length === 1 && (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Consider adding more characters to unlock the full potential of these features.
              Character relationships and dynamics become more meaningful with a larger cast!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              isActive={activeFeature === feature.id}
              onClick={() => setActiveFeature(feature.id)}
            />
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-slate-900 mb-2">Select Character</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {characters.map((character) => (
                <CharacterMiniCard
                  key={character.id}
                  character={character}
                  isSelected={selectedCharacter === character.id}
                  onClick={() => setSelectedCharacter(character.id)}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeFeature === 'arc' && selectedCharacter && (
              <motion.div
                key="arc"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mt-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Character Arc Development</CardTitle>
                    <CardDescription>
                      Shape the journey and growth of your character throughout the story
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CharacterArc
                      character={characters.find(c => c.id === selectedCharacter)!}
                      onArcUpdate={(arcData) => {
                        console.log('Arc updated:', arcData);
                        // Handle arc update
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeFeature === 'dynamics' && selectedCharacter && (
              <motion.div
                key="dynamics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mt-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Scene Dynamics</CardTitle>
                    <CardDescription>
                      Explore and define how your character interacts with others in various scenes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SceneDynamics
                      sceneInteractions={[]}
                      powerDynamics={[]}
                      onAddInteraction={() => {}}
                      onRemoveInteraction={() => {}}
                      onAddPowerDynamic={() => {}}
                      onRemovePowerDynamic={() => {}}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeFeature === 'relationships' && selectedCharacter && (
              <motion.div
                key="relationships"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mt-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Character Relationships</CardTitle>
                    <CardDescription>
                      Define and visualize the connections between your characters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Relationships
                      relationships={[]}
                      onRelationshipAdd={() => {}}
                      onRelationshipUpdate={() => {}}
                      availableCharacters={characters.map(char => ({
                        id: char.id,
                        name: char.name
                      }))}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedCharacterFeatures;