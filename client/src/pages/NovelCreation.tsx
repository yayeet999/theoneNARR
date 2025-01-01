import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  Sparkles,
  Rocket,
  Search,
  PenTool,
  Heart,
  Zap,
  Ghost,
  Clock,
  Map,
  Sun,
  Atom,
  X,
  BookText,
  BookMarked,
  BookUp
} from 'lucide-react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

const NovelCreation = () => {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [novelLength, setNovelLength] = useState<string | null>(null);
  const [chapterStructure, setChapterStructure] = useState<string | null>(null);
  const [showChapterOptions, setShowChapterOptions] = useState(false);
  const [hasShownChapters, setHasShownChapters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedSubgenres, setSelectedSubgenres] = useState<string[]>([]);
  const [showSubgenres, setShowSubgenres] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const genres = [
    {
      id: 'fantasy',
      label: 'Fantasy',
      icon: Sparkles,
      desc: 'Stories with magical or supernatural elements',
      subgenres: {
        pure: ['High Fantasy', 'Low Fantasy', 'Urban Fantasy'],
        hybrid: ['Science Fantasy', 'Historical Fantasy', 'Romantic Fantasy'],
        style: ['Dark Fantasy', 'Epic Fantasy', 'Mythic Fantasy']
      }
    },
    {
      id: 'scifi',
      label: 'Science Fiction',
      icon: Rocket,
      desc: 'Futuristic or scientific exploration',
      subgenres: {
        pure: ['Hard Science Fiction', 'Space Opera', 'Cyberpunk'],
        hybrid: ['Military Sci-Fi', 'Romance Sci-Fi', 'Horror Sci-Fi'],
        style: ['Post-Apocalyptic', 'Time Travel', 'First Contact']
      }
    },
    {
      id: 'mystery',
      label: 'Mystery',
      icon: Search,
      desc: 'Focus on solving crimes or puzzles',
      subgenres: {
        pure: ['Detective', 'Cozy Mystery', 'Police Procedural'],
        hybrid: ['Mystery Thriller', 'Legal Thriller', 'Techno-Thriller'],
        style: ['Noir', 'Psychological Mystery', 'Paranormal Mystery']
      }
    },
    {
      id: 'literary',
      label: 'Literary Fiction',
      icon: BookOpen,
      desc: 'Character-driven, emphasis on style',
      subgenres: {
        pure: ['Coming-of-Age', 'Historical Literary', 'Realist'],
        hybrid: ['Magical Realism', 'Speculative Literary', 'Philosophical'],
        style: ['Stream of Consciousness', 'Minimalist', 'Epistolary']
      }
    },
    {
      id: 'romance',
      label: 'Romance',
      icon: Heart,
      desc: 'Focus on romantic relationships',
      subgenres: {
        pure: ['Contemporary Romance', 'Historical Romance', 'Paranormal Romance'],
        hybrid: ['Romantic Suspense', 'Romantic Comedy', 'Erotic Romance'],
        style: ['Dark Romance', 'Fantasy Romance', 'Science Fiction Romance']
      }
    },
    {
      id: 'thriller',
      label: 'Thriller',
      icon: Zap,
      desc: 'Suspense-driven narratives',
      subgenres: {
        pure: ['Psychological Thriller', 'Action Thriller', 'Crime Thriller'],
        hybrid: ['Techno-Thriller', 'Legal Thriller', 'Medical Thriller'],
        style: ['Espionage', 'Conspiracy Thriller', 'Supernatural Thriller']
      }
    },
    {
      id: 'horror',
      label: 'Horror',
      icon: Ghost,
      desc: 'Intended to frighten or disturb',
      subgenres: {
        pure: ['Supernatural Horror', 'Psychological Horror', 'Gothic Horror'],
        hybrid: ['Cosmic Horror', 'Folk Horror', 'Body Horror'],
        style: ['Slasher', 'Haunted House', 'Survival Horror']
      }
    },
    {
      id: 'historical',
      label: 'Historical Fiction',
      icon: Clock,
      desc: 'Set in past historical periods',
      subgenres: {
        pure: ['Ancient History', 'Medieval', 'Renaissance'],
        hybrid: ['Historical Romance', 'Historical Mystery', 'Alternative History'],
        style: ['Biographical Fiction', 'Military Historical', 'Social Historical']
      }
    },
    {
      id: 'adventure',
      label: 'Adventure',
      icon: Map,
      desc: 'Action-focused journeys',
      subgenres: {
        pure: ['Exploration', 'Survival', 'Quest'],
        hybrid: ['Historical Adventure', 'Science Adventure', 'Fantasy Adventure'],
        style: ['Sea Adventure', 'Wilderness', 'Lost World']
      }
    },
    {
      id: 'contemporary',
      label: 'Contemporary Fiction',
      icon: Sun,
      desc: 'Modern-day realistic stories',
      subgenres: {
        pure: ['Slice of Life', 'Urban Life', 'Family Drama'],
        hybrid: ['Contemporary Romance', 'Social Issues', 'Cultural'],
        style: ['Literary Contemporary', 'New Adult', 'Domestic Fiction']
      }
    },
    {
      id: 'satire',
      label: 'Satire',
      icon: PenTool,
      desc: 'Social commentary through humor',
      subgenres: {
        pure: ['Political Satire', 'Social Satire', 'Cultural Satire'],
        hybrid: ['Satirical Fantasy', 'Satirical Science Fiction', 'Dark Comedy'],
        style: ['Parody', 'Black Comedy', 'Absurdist']
      }
    },
    {
      id: 'speculative',
      label: 'Speculative Fiction',
      icon: Atom,
      desc: 'Alternative realities',
      subgenres: {
        pure: ['Alternate History', 'Dystopian', 'Utopian'],
        hybrid: ['Magical Realism', 'Slipstream', 'Climate Fiction'],
        style: ['Weird Fiction', 'New Weird', 'Metaphysical']
      }
    }
  ];

  const handleNext = () => {
    if (step === 2 && selectedGenre && selectedSubgenres.length > 0) {
      navigate('/novel-workshop/generation/workflow/world-building');
      return;
    }

    setAnimate(false);
    setTimeout(() => {
      setStep(prevStep => prevStep + 1);
      setAnimate(true);
    }, 300);
  };

  const handleBack = () => {
    setAnimate(false);
    setTimeout(() => {
      setStep(prevStep => prevStep - 1);
      setAnimate(true);
    }, 300);
  };

  const handleLengthSelection = (length: string) => {
    setNovelLength(length);
    if (!hasShownChapters) {
      setShowChapterOptions(false);
      setTimeout(() => {
        setShowChapterOptions(true);
        setHasShownChapters(true);
      }, 100);
    } else {
      setShowChapterOptions(false);
      setTimeout(() => setShowChapterOptions(true), 100);
    }
  };

  const handleSubgenreSelect = (subgenre: string) => {
    setSelectedSubgenres(current => {
      if (current.includes(subgenre)) {
        return current.filter(sg => sg !== subgenre);
      }
      if (current.length >= 2) {
        return [...current.slice(1), subgenre];
      }
      return [...current, subgenre];
    });
  };

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId);
    setShowSubgenres(false);
    setIsExpanded(true);
    setTimeout(() => setShowSubgenres(true), 500);
    setSelectedSubgenres([]);
  };

  const handleResetGenreSelection = () => {
    setIsExpanded(false);
    setShowSubgenres(false);
    setTimeout(() => {
      setSelectedGenre(null);
      setSelectedSubgenres([]);
    }, 300);
  };

  const renderStep1 = () => (
    <div className={`space-y-8 transition-all duration-500 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      {/* Title Input */}
      <div className="space-y-4 mb-12">
        <Label className="text-lg text-slate-900">Give your novel a title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-medium h-16 px-6 border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 ring-slate-200"
          placeholder="Enter your novel's title..."
        />
      </div>

      {/* Length Selection */}
      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-lg text-slate-900">Choose your novel's length</Label>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                label: 'Short',
                pages: '200-250 pages',
                words: '50-62.5K words',
                description: 'Perfect for focused, concise storytelling',
                icon: BookText
              },
              {
                label: 'Medium',
                pages: '250-350 pages',
                words: '62.5-87.5K words',
                description: 'Ideal for most novels and stories',
                icon: BookMarked
              },
              {
                label: 'Long',
                pages: '350-500 pages',
                words: '87.5-125K words',
                description: 'Great for epic, detailed narratives',
                icon: BookUp
              }
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => handleLengthSelection(option.label.toLowerCase())}
                className={`group relative p-6 rounded-xl border bg-white transition-all duration-300 hover:shadow-lg ${
                  novelLength === option.label.toLowerCase()
                    ? 'border-indigo-600 ring-2 ring-indigo-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <option.icon className={`w-8 h-8 ${
                    novelLength === option.label.toLowerCase()
                      ? 'text-indigo-600'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`} />
                  <div className="space-y-2 text-center">
                    <div className="font-medium text-lg text-slate-900">{option.label}</div>
                    <div className="text-sm text-slate-600">{option.pages}</div>
                    <div className="text-xs text-slate-500">{option.words}</div>
                    <div className="mt-4 text-sm text-slate-600/80">{option.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter Structure */}
      {showChapterOptions && (
        <div
          className={`space-y-8 transition-all duration-700 ${
            hasShownChapters
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="space-y-4">
            <Label className="text-lg text-slate-900">Select chapter structure</Label>
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  label: `${novelLength?.charAt(0).toUpperCase()}${novelLength?.slice(1)} Concise`,
                  description: 'More chapters, shorter length each',
                  chapters: novelLength === 'short' ? '15-20' : novelLength === 'medium' ? '20-25' : '25-35',
                  wordsPer: novelLength === 'short' ? '3000-4000' : novelLength === 'medium' ? '3000-4000' : '3500-4500'
                },
                {
                  label: `${novelLength?.charAt(0).toUpperCase()}${novelLength?.slice(1)} Standard`,
                  description: 'Balanced chapter length',
                  chapters: novelLength === 'short' ? '12-15' : novelLength === 'medium' ? '15-20' : '20-25',
                  wordsPer: novelLength === 'short' ? '4000-5000' : novelLength === 'medium' ? '4000-5500' : '4500-6000'
                },
                {
                  label: `${novelLength?.charAt(0).toUpperCase()}${novelLength?.slice(1)} Extended`,
                  description: 'Fewer chapters, longer length each',
                  chapters: novelLength === 'short' ? '8-12' : novelLength === 'medium' ? '12-15' : '15-20',
                  wordsPer: novelLength === 'short' ? '5000-7500' : novelLength === 'medium' ? '5500-7000' : '6000-8000'
                }
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => setChapterStructure(option.label.toLowerCase())}
                  className={`p-6 rounded-xl border transition-all duration-500 transform hover:scale-[1.02] hover:shadow-lg group ${
                    chapterStructure === option.label.toLowerCase()
                      ? 'border-indigo-600 ring-2 ring-indigo-100 bg-white shadow-md scale-[1.02]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-2 text-center">
                    <div className="font-medium text-lg text-slate-900">{option.label}</div>
                    <div className="text-sm text-slate-600">{option.chapters} chapters</div>
                    <div className="text-xs text-slate-500">{option.wordsPer} words each</div>
                    <div className="mt-4 text-sm text-slate-600/80">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderGenreSelection = () => (
    <div className={`space-y-8 transition-all duration-500 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-lg text-slate-900">Choose your primary genre</Label>
          {isExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetGenreSelection}
              className="text-slate-600 hover:text-slate-900"
            >
              <X className="w-4 h-4 mr-2" />
              Other genres
            </Button>
          )}
        </div>

        <motion.div
          layout
          className="grid grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {genres.map((genre) => {
              const isSelected = selectedGenre === genre.id;
              const shouldShow = !isExpanded || isSelected;

              return shouldShow ? (
                <motion.div
                  key={genre.id}
                  layout
                  initial={false}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    gridColumn: isExpanded ? 'span 3' : 'span 1'
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={isExpanded ? 'col-span-3' : ''}
                >
                  <button
                    onClick={() => handleGenreSelect(genre.id)}
                    className={`w-full group relative p-6 rounded-xl border bg-white transition-all duration-300 hover:shadow-lg ${
                      isSelected
                        ? 'border-indigo-600 ring-2 ring-indigo-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`flex items-center space-x-4 ${isExpanded ? 'justify-start' : 'justify-center'}`}>
                      <genre.icon className={`w-8 h-8 ${
                        isSelected
                          ? 'text-indigo-600'
                          : 'text-slate-400 group-hover:text-slate-600'
                      }`} />
                      <div className="text-left">
                        <div className="font-medium text-lg text-slate-900">{genre.label}</div>
                        <div className="text-sm text-slate-600">{genre.desc}</div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ) : null;
            })}
          </AnimatePresence>
        </motion.div>

        {/* Subgenres Section */}
        <AnimatePresence>
          {selectedGenre && showSubgenres && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label className="text-lg text-slate-900">Select up to two subgenres</Label>
                  <span className="text-sm text-slate-600">{selectedSubgenres.length}/2 selected</span>
                </div>

                {/* Pure Subgenres */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">Genre Variations</Label>
                  <motion.div
                    className="grid grid-cols-3 gap-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                  >
                    {genres.find(g => g.id === selectedGenre)?.subgenres.pure.map(subgenre => (
                      <motion.button
                        key={subgenre}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        onClick={() => handleSubgenreSelect(subgenre)}
                        className={`p-3 rounded-lg border text-sm transition-all ${
                          selectedSubgenres.includes(subgenre)
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {subgenre}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* Hybrid Subgenres */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">Genre Blends</Label>
                  <motion.div
                    className="grid grid-cols-3 gap-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                  >
                    {genres.find(g => g.id === selectedGenre)?.subgenres.hybrid.map(subgenre => (
                      <motion.button
                        key={subgenre}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        onClick={() => handleSubgenreSelect(subgenre)}
                        className={`p-3 rounded-lg border text-sm transition-all ${
                          selectedSubgenres.includes(subgenre)
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {subgenre}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* Style Variations */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">Style Approaches</Label>
                  <motion.div
                    className="grid grid-cols-3 gap-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                  >
                    {genres.find(g => g.id === selectedGenre)?.subgenres.style.map(subgenre => (
                      <motion.button
                        key={subgenre}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        onClick={() => handleSubgenreSelect(subgenre)}
                        className={`p-3 rounded-lg border text-sm transition-all ${
                          selectedSubgenres.includes(subgenre)
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {subgenre}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderStep2 = () => renderGenreSelection();

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      default:
        return null;
    }
  };

  const isContinueDisabled = () => {
    if (step === 1) {
      return !(title && novelLength && chapterStructure);
    } else if (step === 2) {
      return !(selectedGenre && selectedSubgenres.length > 0);
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-slate-900">Create Your Novel</h1>
              <p className="text-sm text-slate-600">Let's bring your story to life</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="h-1 bg-slate-100 rounded-full mt-4">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-12 max-w-4xl mx-auto px-6">
        {renderCurrentStep()}

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          {step > 1 && (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-slate-600"
            >
              Back
            </Button>
          )}
          <div className="ml-auto">
            <Button
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
              onClick={handleNext}
              disabled={isContinueDisabled()}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelCreation;