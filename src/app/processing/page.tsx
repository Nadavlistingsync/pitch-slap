'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { vcPrompts } from '@/lib/vcPrompts';

export default function ProcessingPage() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [roastIntensity, setRoastIntensity] = useState<'gentle' | 'balanced' | 'brutal'>('balanced');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const vcId = localStorage.getItem('selectedVC');
    const intensity = localStorage.getItem('roastIntensity') as 'gentle' | 'balanced' | 'brutal';
    const storedResult = window.sessionStorage.getItem('processingResult');
    
    if (!vcId) {
      router.push('/select');
      return;
    }

    setSelectedVC(vcId);
    setRoastIntensity(intensity || 'balanced');
    
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, [router]);

  const selectedVCData = vcPrompts.find(vc => vc.id === selectedVC);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Processing Your Pitch Deck</h1>
          {selectedVCData && (
            <p className="text-xl text-gray-400">
              Getting roasted by <span className="text-[#ff4154]">{selectedVCData.name}</span> from{' '}
              <span className="text-[#ff4154]">{selectedVCData.firm}</span>
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Roast Intensity: <span className="capitalize text-[#ff4154]">{roastIntensity}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl p-8 text-center"
        >
          <div className="text-6xl mb-6">🤖</div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            {result?.error ? 'Oops! Something went wrong' : 'Analyzing your pitch deck...'}
          </h2>
          <p className="text-gray-400 mb-8">
            {result?.error
              ? result.error
              : 'Our AI is carefully reviewing your pitch deck and preparing personalized feedback.'}
          </p>

          {!result?.error && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4154]" />
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => router.push('/select')}
              className="btn-primary group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {result?.error ? 'Try Again' : 'Cancel'}
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
        </motion.div>
      </div>
    </main>
  );
} 