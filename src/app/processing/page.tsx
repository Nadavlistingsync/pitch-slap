'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

const getVCName = (vcId: string) => {
  switch (vcId) {
    case 'sequoia':
      return 'Sequoia Capital';
    case 'andreessen':
      return 'Andreessen Horowitz';
    case 'accel':
      return 'Accel';
    case 'ycombinator':
      return 'Y Combinator';
    default:
      return 'VC';
  }
};

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [commentary, setCommentary] = useState<string | null>(null);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate getting feedback
          setTimeout(() => {
            setCommentary("Your pitch deck needs work. The market size slide is too optimistic, and your unit economics don't make sense. However, your team slide is strong. Focus on realistic projections and clear go-to-market strategy.");
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (commentary) {
      // Trigger confetti when feedback is ready
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [commentary]);

  if (commentary) {
    const selectedVC = localStorage.getItem('selectedVC');
    const vcName = getVCName(selectedVC || '');

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="card">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-between mb-6"
              >
                <h1 className="text-3xl font-bold text-[#2e2e2e]">VC Feedback</h1>
                <motion.span 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-lg font-medium text-[#ff4154]"
                >
                  {vcName}
                </motion.span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="prose max-w-none"
              >
                {commentary.split('\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="mb-4 text-gray-700 whitespace-pre-wrap"
                  >
                    {paragraph.replace(/[#*]/g, '')}
                  </motion.p>
                ))}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 flex justify-end"
              >
                <button
                  onClick={() => router.push('/')}
                  className="btn-primary group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Another Review
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff4154] to-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">
            Analyzing Your Pitch Deck
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Our AI is reviewing your pitch deck and preparing detailed feedback...
          </p>

          {/* Modern Animated Progress Bar */}
          <div className="max-w-md mx-auto">
            <motion.div
              className="relative h-6 bg-gray-200 rounded-full overflow-hidden mb-4 shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff4154] via-[#ff6b6b] to-[#ff4154] animate-gradient-x"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-600"
            >
              {progress}% complete
            </motion.p>
          </div>

          {/* Modern Morphing SVG Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <motion.svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ scale: 0.8, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            >
              <motion.path
                d="M48 8C62 8 88 24 88 48C88 72 62 88 48 88C34 88 8 72 8 48C8 24 34 8 48 8Z"
                fill="#ff4154"
                initial={{ pathLength: 0.7 }}
                animate={{ pathLength: 1 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', repeatType: 'reverse' }}
                opacity={0.15}
              />
              <motion.circle
                cx="48"
                cy="48"
                r="32"
                stroke="#ff4154"
                strokeWidth="8"
                initial={{ r: 28 }}
                animate={{ r: 32 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', repeatType: 'reverse' }}
                opacity={0.5}
              />
              <motion.circle
                cx="48"
                cy="48"
                r="16"
                fill="#ff4154"
                initial={{ r: 12 }}
                animate={{ r: 16 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', repeatType: 'reverse' }}
                opacity={0.8}
              />
            </motion.svg>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 w-24 h-24 bg-[#ff4154]/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#a78bfa]/10 rounded-full blur-2xl animate-float-delayed" />
        </motion.div>
      </div>
    </main>
  );
} 