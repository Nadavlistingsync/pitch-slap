'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoastPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    router.push('/processing');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-64 bg-ego-gradient blur-3xl opacity-60 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[80vw] h-[80vh] bg-gradient-to-tl from-[#ff4154]/20 to-transparent blur-3xl opacity-40" />
        </div>

        {/* Glowing Flame Icon */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse" />
          <motion.div 
            className="relative text-6xl"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🔥
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500"
        >
          ROAST
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl mb-12"
        >
          Drop your pitch deck and get brutally honest feedback from top VCs
        </motion.p>

        {/* File Dropzone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full max-w-2xl"
        >
          <div
            className={`relative p-8 rounded-2xl border-2 border-dashed transition-all duration-300 ${
              isDragging
                ? 'border-red-500 bg-red-500/10 scale-105'
                : 'border-gray-700 hover:border-gray-600'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <AnimatePresence mode="wait">
              {isUploading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="inline-block w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-lg text-gray-300">Uploading your deck...</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <motion.div 
                    className="text-4xl mb-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📄
                  </motion.div>
                  <p className="text-lg text-gray-300 mb-2">
                    Drag and drop your pitch deck here
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, PPTX, or Keynote files up to 10MB
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Floating Feedback Bubbles */}
        <div className="fixed left-6 bottom-6 flex flex-col gap-4 z-50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-xs"
          >
            <p className="text-sm text-gray-300">
              "This is exactly what I needed. Brutal but fair feedback!"
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-xs"
          >
            <p className="text-sm text-gray-300">
              "The VCs here don't sugarcoat anything. Love it!"
            </p>
          </motion.div>
        </div>

        <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-xs"
          >
            <p className="text-sm text-gray-300">
              "Finally, someone who tells it like it is!"
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-xs"
          >
            <p className="text-sm text-gray-300">
              "The feedback helped me pivot my pitch completely."
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 