'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { logger } from '@/lib/logger';

// Performance monitoring
const logProcessingPerformance = (startTime: number, operation: string) => {
  const duration = Date.now() - startTime;
  logger.info(`Processing ${operation} took ${duration}ms`);
};

export default function ProcessingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const processDeck = async () => {
      const startTime = Date.now();
      const vcId = localStorage.getItem('selectedVC');
      const roastIntensity = localStorage.getItem('roastIntensity') as 'gentle' | 'balanced' | 'brutal';
      const fileName = localStorage.getItem('uploadedFileName');
      const fileData = localStorage.getItem('uploadedFileData');

      if (!vcId || !fileName || !fileData) {
        logger.error('Missing required data for processing', { vcId, fileName, hasFileData: !!fileData });
        setError('Missing required data. Please try uploading your pitch deck again.');
        setLoading(false);
        return;
      }

      try {
        setStatus('Preparing your file...');
        setProgress(10);
        const file = new File([Uint8Array.from(atob(fileData), c => c.charCodeAt(0))], fileName);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('vcId', vcId);
        formData.append('roastIntensity', roastIntensity || 'balanced');

        setStatus('Analyzing your pitch deck...');
        setProgress(30);
        const res = await fetch('/api/process', { 
          method: 'POST', 
          body: formData,
          headers: {
            'Accept': 'application/json',
          }
        });

        setStatus('Generating feedback...');
        setProgress(60);
        const result = await res.json();

        if (result.error) {
          logger.error('Error processing pitch deck', { error: result.error });
          setError(result.error);
          setLoading(false);
        } else if (result.status === 'complete') {
          logger.info('Successfully processed pitch deck', { vcId, roastIntensity });
          window.sessionStorage.setItem('processingResult', JSON.stringify(result.result));
          setStatus('Finalizing...');
          setProgress(100);
          setTimeout(() => router.push('/feedback'), 500);
        } else {
          logger.error('Unexpected response format', { result });
          setError('Unexpected response from server. Please try again.');
          setLoading(false);
        }
      } catch (err) {
        logger.error('Failed to process pitch deck', { error: err });
        setError('Failed to process your pitch deck. Please try again.');
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
            {error ? 'Oops! Something went wrong' : status}
          </h2>
          <p className="text-gray-400 mb-8">
            {error ? error : 'Our AI is carefully reviewing your pitch deck and preparing personalized feedback.'}
          </p>
          
          {!error && loading && (
            <div className="space-y-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <motion.div 
                  className="bg-[#ff4154] h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-gray-400">Progress: {progress}%</p>
            </div>
          )}

          {error && (
            <button
              onClick={() => router.push('/upload')}
              className="mt-4 px-6 py-2 bg-[#ff4154] text-white rounded-lg hover:bg-[#ff4154]/90 transition-colors"
            >
              Try Again
            </button>
          )}
        </motion.div>
      </div>
    </main>
  );
} 