'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

export default function WaitPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const feedbackId = localStorage.getItem('feedbackId');
    if (!feedbackId) {
      setError('No feedback ID found. Please start over.');
      return;
    }

    const checkFeedback = async () => {
      try {
        const response = await fetch(`/api/feedback/${feedbackId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch feedback');
        }

        const data = await response.json();
        if (data.success) {
          // Store feedback in session storage for results page
          sessionStorage.setItem('feedbackResult', JSON.stringify(data));
          router.push('/results');
        } else {
          // If feedback is not ready, increment progress and check again
          setProgress(prev => Math.min(prev + 10, 90));
          setTimeout(checkFeedback, 2000);
        }
      } catch (err) {
        console.error('Error checking feedback:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    };

    checkFeedback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-6">Processing Your Pitch Deck</h1>
          <div className="relative w-32 h-32 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <FaSpinner className="w-full h-full text-blue-500" />
            </motion.div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-blue-600 h-2.5 rounded-full"
            />
          </div>
          <p className="text-gray-400">
            {progress < 30 && "Analyzing your pitch deck..."}
            {progress >= 30 && progress < 60 && "Generating feedback..."}
            {progress >= 60 && "Finalizing your roast..."}
          </p>
        </motion.div>
      </div>
    </div>
  );
} 