'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { vcPrompts } from '@/lib/vcPrompts';

// Performance monitoring
const logProcessingPerformance = (startTime: number, operation: string) => {
  const duration = Date.now() - startTime;
  console.log(`Processing ${operation} took ${duration}ms`);
};

export default function ProcessingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const processDeck = async () => {
      const startTime = Date.now();
      const vcId = localStorage.getItem('selectedVC');
      const roastIntensity = localStorage.getItem('roastIntensity') as 'gentle' | 'balanced' | 'brutal';
      const fileName = localStorage.getItem('uploadedFileName');
      const fileData = localStorage.getItem('uploadedFileData');

      if (!vcId || !fileName || !fileData) {
        logProcessingPerformance(startTime, 'validation_failed');
        router.push('/select');
        return;
      }

      try {
        setProgress(10);
        const file = new File([Uint8Array.from(atob(fileData), c => c.charCodeAt(0))], fileName);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('vcId', vcId);
        formData.append('roastIntensity', roastIntensity || 'balanced');

        setProgress(30);
        const res = await fetch('/api/process', { 
          method: 'POST', 
          body: formData,
          headers: {
            'Accept': 'application/json',
          }
        });

        setProgress(60);
        const result = await res.json();

        if (result.error) {
          logProcessingPerformance(startTime, 'error');
          setError(result.error);
          setLoading(false);
        } else {
          logProcessingPerformance(startTime, 'success');
          window.sessionStorage.setItem('processingResult', JSON.stringify(result));
          setProgress(100);
          setTimeout(() => router.push('/feedback'), 500); // Small delay for smooth transition
        }
      } catch (err) {
        logProcessingPerformance(startTime, 'error');
        setError('Failed to process your pitch deck.');
        setLoading(false);
      }
    };

    processDeck();
  }, [router]);

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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl p-8 text-center"
        >
          <div className="text-6xl mb-6">🤖</div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            {error ? 'Oops! Something went wrong' : 'Analyzing your pitch deck...'}
          </h2>
          <p className="text-gray-400 mb-8">
            {error ? error : 'Our AI is carefully reviewing your pitch deck and preparing personalized feedback.'}
          </p>
          
          {!error && loading && (
            <div className="space-y-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-[#ff4154] h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-400">Progress: {progress}%</p>
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
                {error ? 'Try Again' : 'Cancel'}
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