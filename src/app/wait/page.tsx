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

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push('/results'), 800);
          return 100;
        }
        return p + 10;
      });
      setMessageIdx((i) => (i + 1) % messages.length);
    }, 600);
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
        <p className="text-lg text-white/80 animate-pulse">{messages[messageIdx]}</p>
      </div>
    </main>
  );
} 