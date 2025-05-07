'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const steps = [
  'Analyzing your deck structure...',
  'Extracting content and images...',
  'Applying your branding...',
  'Optimizing layouts...',
  'Finalizing design...',
];

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          router.push('/preview');
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Transforming Your Deck
          </h1>

          <div className="mb-12">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xl text-gray-600 mb-12"
          >
            {steps[currentStep]}
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((slide) => (
              <motion.div
                key={slide}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: slide * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="aspect-[4/3] bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400">Slide {slide}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 