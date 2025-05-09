'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

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
  const [error, setError] = useState<string | null>(null);
  const [commentary, setCommentary] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Read the result from sessionStorage and display it
    const result = window.sessionStorage.getItem('processingResult');
    if (result) {
      try {
        const data = JSON.parse(result);
        setCommentary(data.commentary);
      } catch (e) {
        setError('Failed to parse processing result.');
      }
    } else {
      setError('No processing result found.');
    }
  }, []);

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-xl text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (commentary) {
    const selectedVC = localStorage.getItem('selectedVC');
    const vcName = getVCName(selectedVC || '');

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-[#2e2e2e]">VC Feedback</h1>
                <span className="text-lg font-medium text-[#ff4154]">{vcName}</span>
              </div>
              <div className="prose max-w-none">
                {commentary.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 whitespace-pre-wrap">
                    {paragraph.replace(/[#*]/g, '')}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => router.push('/')}
                  className="btn-primary"
                >
                  Get Another Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
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
              style={{ width: `${progress}%` }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff4154] via-[#ff6b6b] to-[#ff4154] animate-gradient-x"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </motion.div>
            <p className="text-sm text-gray-600">{progress}% complete</p>
          </div>

          {/* Modern Morphing SVG Animation */}
          <div className="mt-12 flex justify-center">
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
          </div>
        </div>
      </div>
    </main>
  );
} 