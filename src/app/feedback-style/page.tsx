'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const styles = [
  { key: 'helpful', label: 'Helpful VC', desc: 'Constructive, actionable advice.' },
  { key: 'brutal', label: 'Brutal Honesty', desc: 'No sugarcoating, just the hard truth.' },
  { key: 'roast', label: 'Roast Mode', desc: 'Savage, funny, and a little mean.' },
  { key: 'wildcard', label: 'Wildcard', desc: 'Anything goes—expect the unexpected.' },
];

export default function FeedbackStylePage() {
  const router = useRouter();
  const [selected, setSelected] = useState('helpful');

  const handleContinue = () => {
    // Save to localStorage or context for now
    localStorage.setItem('feedbackStyle', selected);
    router.push('/pick-vc');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Feedback Style</h1>
          <p className="text-lg text-gray-600">How do you want your deck reviewed?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {styles.map((style) => (
            <motion.button
              key={style.key}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(style.key)}
              className={`rounded-lg border-2 p-6 text-left transition-colors duration-200 w-full ${
                selected === style.key ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-bold text-xl mb-2">{style.label}</div>
              <div className="text-gray-600">{style.desc}</div>
            </motion.button>
          ))}
        </div>
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            Continue
          </motion.button>
        </div>
      </div>
    </main>
  );
} 