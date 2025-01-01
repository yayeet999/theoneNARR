import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GenerateNovel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[95%] mx-auto py-6 space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Generate Novel</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Novel generation preview will appear here...</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GenerateNovel; 