'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { vcPrompts } from '@/lib/vcPrompts';
import { motion, AnimatePresence } from 'framer-motion';

export default function SelectPage() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [roastIntensity, setRoastIntensity] = useState<'gentle' | 'balanced' | 'brutal'>('balanced');

  const handleContinue = () => {
    if (!selectedVC) return;
    localStorage.setItem('selectedVC', selectedVC);
    localStorage.setItem('roastIntensity', roastIntensity);
    router.push('/upload');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Roast Experience</h1>
          <p className="text-xl text-gray-400">
            Select a VC and set your preferred roast intensity
          </p>
        </motion.div>

        {/* Roast Intensity Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto mb-12"
        >
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Roast Intensity</h3>
          <div className="grid grid-cols-3 gap-4">
            {(['gentle', 'balanced', 'brutal'] as const).map((intensity) => (
              <button
                key={intensity}
                onClick={() => setRoastIntensity(intensity)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  roastIntensity === intensity
                    ? 'border-[#ff4154] bg-[#ff4154]/5 shadow-lg scale-105'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {intensity === 'gentle' ? '😊' : intensity === 'balanced' ? '😐' : '😈'}
                  </div>
                  <span className="capitalize text-sm font-medium text-gray-300">
                    {intensity}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* VC Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {vcPrompts.map((vc) => (
            <button
              key={vc.id}
              onClick={() => setSelectedVC(vc.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                selectedVC === vc.id
                  ? 'border-[#ff4154] bg-[#ff4154]/5 shadow-lg scale-105'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={vc.image || '/placeholder-vc.jpg'}
                    alt={vc.name}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-white">{vc.name}</h3>
                  <p className="text-sm text-gray-400">{vc.firm}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{vc.description}</p>
            </button>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={handleContinue}
            disabled={!selectedVC}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            Continue to Upload
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </main>
  );
} 