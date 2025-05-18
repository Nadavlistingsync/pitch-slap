'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const messages = [
  "VCs reviewing your brilliance...",
  "Counting buzzwords...",
  "Checking for real traction...",
  "Roast mode engaged...",
  "Looking for LinkedIn links...",
  "Summoning brutal honesty...",
  "Analyzing market size claims...",
  "Verifying founder credentials...",
  "Calculating burn rate...",
  "Evaluating product-market fit..."
];

export default function WaitPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);
  const [typedMessage, setTypedMessage] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showRetry, setShowRetry] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (error) return;
    setTypedMessage('');
    setCharIdx(0);
    const message = messages[messageIdx];
    let typingTimeout: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;
    function typeChar() {
      setTypedMessage((prev) => {
        if (prev.length < message.length) {
          typingTimeout = setTimeout(typeChar, 40);
          return message.slice(0, prev.length + 1);
        } else {
          pauseTimeout = setTimeout(() => {
            setMessageIdx((i) => (i + 1) % messages.length);
          }, 1200);
          return prev;
        }
      });
    }
    typingTimeout = setTimeout(typeChar, 40);
    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(pauseTimeout);
    };
  }, [messageIdx, error]);

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
      const file = dataURLtoBlob(fileDataUrl);
      const formData = new FormData();
      formData.append('file', file, fileName);
      formData.append('roastIntensity', roastLevel);
      formData.append('personality', personality);
      formData.append('userName', userName);
      try {
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
    interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        progressValue = p + 10;
        return progressValue;
      });
    }, 600);
    processFeedback();
    return () => clearInterval(interval);
  }, [router]);

  const handleRetry = () => {
    setError(null);
    setShowRetry(false);
    setProgress(0);
    router.push('/');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-950">
      <div className="max-w-lg w-full bg-white/10 rounded-2xl p-8 shadow-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Generating Your Feedback</h2>
          <div className="w-full bg-white/20 rounded-full h-6 mb-4 overflow-hidden">
            <motion.div
              className="bg-pink-500 h-6 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg text-red-400"
              >
                {error}
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg text-white/80 font-mono min-h-[2.5em]"
                style={{letterSpacing: '0.01em'}}
              >
                {typedMessage}
                <span className="animate-pulse">|</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <FiLoader className="w-8 h-8 text-white/60 animate-spin" />
        </motion.div>

        <AnimatePresence>
          {showRetry && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              <button
                onClick={handleRetry}
                className="px-6 py-3 rounded-full font-bold text-lg bg-pink-500 text-white hover:bg-pink-600 shadow-lg transition-all"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
} 