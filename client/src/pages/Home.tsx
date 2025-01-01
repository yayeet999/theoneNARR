import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">NarrativeAI</div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-slate-200">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-6">
            Craft Your Story with AI
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Transform your ideas into compelling narratives with our AI-powered novel writing platform.
            Create rich characters, intricate plots, and immersive worlds.
          </p>
          <div className="space-x-4">
            <Link href="/signup">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Get Started Free
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Writing</h3>
            <p className="text-slate-300">
              Leverage advanced AI to enhance your creative writing process and overcome writer's block.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">Story Structure</h3>
            <p className="text-slate-300">
              Build compelling narratives with our intuitive story structure tools and templates.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">Character Development</h3>
            <p className="text-slate-300">
              Create deep, memorable characters with our character development system.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home; 