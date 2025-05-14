'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { vcPrompts } from '@/lib/vcPrompts';
import { motion, AnimatePresence } from 'framer-motion';

export default function SelectPage() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [roastIntensity, setRoastIntensity] = useState<'gentle' | 'balanced' | 'brutal'>('balanced');

  const handleSelect = (vc: typeof vcPrompts[0]) => {
    setSelectedVC(vc.id);
    localStorage.setItem('selectedVC', vc.id);
    localStorage.setItem('roastIntensity', roastIntensity);
    router.push('/upload');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Choose Your VC</h1>
          <p className="text-xl text-gray-600">
            Select a VC to roast your pitch deck in their unique style
          </p>
        </motion.div>

        {/* Roast Intensity Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto mb-12"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Roast Intensity</h3>
          <div className="grid grid-cols-3 gap-4">
            {(['gentle', 'balanced', 'brutal'] as const).map((intensity) => (
              <button
                key={intensity}
                onClick={() => setRoastIntensity(intensity)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  roastIntensity === intensity
                    ? 'border-[#ff4154] bg-[#ff4154]/5 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {intensity === 'gentle' ? '😊' : intensity === 'balanced' ? '😐' : '😈'}
                  </div>
                  <span className="capitalize text-sm font-medium text-gray-700">
                    {intensity}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {vcPrompts.map((vc, index) => (
              <motion.button
                key={vc.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(vc)}
                className={`card text-left transition-all duration-200 hover:shadow-xl
                  ${selectedVC === vc.id ? 'ring-2 ring-[#ff4154]' : 'hover:shadow-lg'}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#ff4154]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-[#ff4154]">
                      {vc.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2e2e2e]">{vc.name}</h3>
                    <p className="text-sm text-gray-600">{vc.firm}</p>
                    <div className="mt-2 flex gap-1">
                      {vc.tags?.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
} 