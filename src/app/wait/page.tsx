'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const messages = [
  "VCs reviewing your brilliance...",
  "Counting buzzwords...",
  "Checking for real traction...",
  "Roast mode engaged...",
  "Looking for LinkedIn links...",
  "Summoning brutal honesty..."
];

export default function WaitPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Helper to convert base64 to Blob
    function dataURLtoBlob(dataurl: string) {
      const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
      return new Blob([u8arr], { type: mime });
    }

    async function processFeedback() {
      const fileDataUrl = sessionStorage.getItem('uploadedFile');
      const fileName = sessionStorage.getItem('uploadedFileName') || 'deck.pdf';
      const roastLevel = localStorage.getItem('roastLevel') || 'balanced';
      const personality = localStorage.getItem('selectedVC') || 'sequoia';
      if (!fileDataUrl) {
        setError('No uploaded file found. Please start over.');
        return;
      }
      const file = dataURLtoBlob(fileDataUrl);
      const formData = new FormData();
      formData.append('file', file, fileName);
      formData.append('roastIntensity', roastLevel);
      formData.append('personality', personality);
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
      }
    }

    // Animate progress and messages
    let interval: NodeJS.Timeout;
    let progressValue = 0;
    interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        progressValue = p + 10;
        return progressValue;
      });
      setMessageIdx((i) => (i + 1) % messages.length);
    }, 600);
    processFeedback();
    return () => clearInterval(interval);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-950">
      <div className="max-w-lg w-full bg-white/10 rounded-2xl p-8 shadow-xl text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Generating Your Feedback</h2>
        <div className="w-full bg-white/20 rounded-full h-6 mb-4 overflow-hidden">
          <div
            className="bg-pink-500 h-6 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        {error ? (
          <p className="text-lg text-red-400 animate-pulse">{error}</p>
        ) : (
          <p className="text-lg text-white/80 animate-pulse">{messages[messageIdx]}</p>
        )}
      </div>
    </main>
  );
} 