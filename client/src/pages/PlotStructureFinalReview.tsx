import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  BookOpen,
  Activity,
  Users,
  Network,
} from 'lucide-react';

const PlotStructureFinalReview: React.FC = () => {
  const [, navigate] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[80%] mx-auto py-16"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Plot Structure Review</h2>
        <p className="text-slate-600 mt-2">
          Review and finalize your plot structure settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Structure Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <span>Story Structure</span>
            </CardTitle>
            <CardDescription>Your chosen structure and key beats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-900">Three-Act Structure</h4>
                  <p className="text-sm text-slate-500">
                    Classic setup-challenge-resolution format
                  </p>
                </div>
              </div>
              <div className="pl-8 space-y-2">
                <div className="text-sm text-slate-600">
                  <span className="font-medium">Key Beats:</span>
                  <ul className="mt-1 list-disc pl-5 space-y-1">
                    <li>Setup & Inciting Incident</li>
                    <li>Rising Action & Midpoint</li>
                    <li>Climax & Resolution</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Elements Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              <span>Core Elements</span>
            </CardTitle>
            <CardDescription>Conflicts, stakes, and subplots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Main Conflicts</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-600">Person vs Person</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Network className="w-4 h-4 text-slate-600" />
                    <span className="text-sm text-slate-600">Person vs Society</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Stakes</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-slate-600">Personal: High</div>
                  <div className="text-sm text-slate-600">Societal: Medium</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Subplots</h4>
                <div className="space-y-1">
                  <div className="text-sm text-slate-600">• Major: Romance</div>
                  <div className="text-sm text-slate-600">• Supporting: Mystery</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pacing Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              <span>Pacing & Rhythm</span>
            </CardTitle>
            <CardDescription>Scene balance and tension flow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Overall Pace</h4>
                <div className="flex items-center space-x-2">
                  <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: '60%' }}
                    />
                  </div>
                  <span className="text-sm text-slate-600">Moderate (6/10)</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Scene Distribution</h4>
                <div className="space-y-1">
                  <div className="text-sm text-slate-600">• Action: 30%</div>
                  <div className="text-sm text-slate-600">• Dialogue: 40%</div>
                  <div className="text-sm text-slate-600">• Reflection: 20%</div>
                  <div className="text-sm text-slate-600">• World-Building: 10%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Network className="w-5 h-5 text-indigo-500" />
              <span>Integration Features</span>
            </CardTitle>
            <CardDescription>Connected story elements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-900">Story Momentum</h4>
                  <p className="text-sm text-slate-500">
                    Energy peaks at key story beats
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-900">Character Arcs</h4>
                  <p className="text-sm text-slate-500">
                    3 character development paths mapped
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-900">Multiple Viewpoints</h4>
                  <p className="text-sm text-slate-500">
                    2 parallel storylines connected
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Button */}
      <div className="mt-12 flex justify-end">
        <Button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
          size="lg"
          onClick={() => navigate("/scene-creation")}
        >
          Continue to Scene Creation
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default PlotStructureFinalReview; 