'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

export default function WaitPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    // Helper to convert base64 to Blob
    function dataURLtoBlob(dataurl: string) {
      const arr = dataurl.split(',');
      const match = arr[0].match(/:(.*?);/);
      if (!match) throw new Error('Invalid data URL');
      const mime = match[1];
      const bstr = atob(arr[1]);
      const n = bstr.length;
      const u8arr = new Uint8Array(n);
      for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
      return new Blob([u8arr], { type: mime });
    }

    async function processFeedback() {
      const fileDataUrl = sessionStorage.getItem('uploadedFile');
      const fileName = sessionStorage.getItem('uploadedFileName') || 'deck.pdf';
      const roastLevel = localStorage.getItem('roastLevel') || 'balanced';
      const personality = localStorage.getItem('selectedVC') || 'sequoia';
      const userName = localStorage.getItem('userName') || '';

      if (!fileDataUrl) {
        setError('No uploaded file found. Please start over.');
        setShowRetry(true);
        return;
      }

      try {
        const file = dataURLtoBlob(fileDataUrl);
        const formData = new FormData();
        formData.append('file', file, fileName);
        formData.append('roastIntensity', roastLevel);
        formData.append('personality', personality);
        formData.append('userName', userName);

        const res = await fetch('/api/process', {
          method: 'POST',
          body: formData
        });

        const result = await res.json();
        if (!result.success) throw new Error(result.error || 'Unknown error');
        
        sessionStorage.setItem('feedbackResult', JSON.stringify(result));
        setProgress(100);
        setTimeout(() => router.push('/results'), 800);
      } catch (e: any) {
        setError(e.message || 'Failed to process feedback.');
        setShowRetry(true);
      }
    }

    // Animate progress
    let interval: NodeJS.Timeout;
    let progressValue = 0;

    const startProgress = () => {
      interval = setInterval(() => {
        progressValue += Math.random() * 10;
        if (progressValue > 90) {
          clearInterval(interval);
          setProgress(90);
        } else {
          setProgress(progressValue);
        }
      }, 500);
    };

    startProgress();
    processFeedback();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto w-16 h-16 mb-8"
        >
          <FiLoader className="w-full h-full text-pink-500" />
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">Processing Your Pitch Deck</h1>
        
        <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <p className="text-gray-400 mb-8">
          {progress < 30
            ? "Reading your pitch deck..."
            : progress < 60
            ? "Analyzing your content..."
            : progress < 90
            ? "Generating feedback..."
            : "Almost there..."}
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8"
          >
            <p className="text-red-400">{error}</p>
            {showRetry && (
              <button
                onClick={() => router.push('/')}
                className="mt-4 text-sm text-red-400 hover:text-red-300 underline"
              >
                Start Over
              </button>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
} 