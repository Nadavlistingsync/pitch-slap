'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FeedbackStylePage() {
  const router = useRouter();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
    localStorage.setItem('selectedStyle', style);
    router.push('/roast-level');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Choose Your Feedback Style
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Select how you want your pitch deck to be reviewed
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <button
            onClick={() => handleStyleSelect('constructive')}
            className={`p-8 rounded-2xl bg-white/5 backdrop-blur-lg transition-all ${
              selectedStyle === 'constructive' ? 'ring-2 ring-pink-500' : ''
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">Constructive</h3>
            <p className="text-gray-400">
              Get detailed, actionable feedback with specific suggestions for improvement
            </p>
          </button>

          <button
            onClick={() => handleStyleSelect('roast')}
            className={`p-8 rounded-2xl bg-white/5 backdrop-blur-lg transition-all ${
              selectedStyle === 'roast' ? 'ring-2 ring-pink-500' : ''
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">Roast</h3>
            <p className="text-gray-400">
              Get brutally honest feedback that pulls no punches
            </p>
          </button>
        </div>
      </div>
    </div>
  );
} 