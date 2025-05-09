'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

const getVCName = (vcId: string) => {
  switch (vcId) {
    case 'sequoia':
      return 'Sequoia Capital';
    case 'andreessen':
      return 'Andreessen Horowitz';
    case 'accel':
      return 'Accel';
    case 'ycombinator':
      return 'Y Combinator';
    default:
      return 'VC';
  }
};

export default function ProcessingPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [commentary, setCommentary] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const processPitchDeck = async () => {
      // Get file and VC from sessionStorage (or however you store them)
      const fileData = window.sessionStorage.getItem('pitchDeckFile');
      const selectedVC = window.sessionStorage.getItem('selectedVC');
      if (!fileData || !selectedVC) {
        router.push('/');
        return;
      }
      // Reconstruct the File object from base64 (if needed)
      const file = JSON.parse(fileData);
      const realFile = new File([Uint8Array.from(file.data)], file.name, { type: file.type });

      try {
        // Simulate progress
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(interval);
              return 90;
            }
            return prev + 10;
          });
        }, 1000);

        const formData = new FormData();
        formData.append('file', realFile);
        formData.append('vcName', selectedVC);

        const response = await fetch('/api/process', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to process pitch deck');
        }

        const data = await response.json();
        setProgress(100);
        clearInterval(interval);
        setCommentary(data.commentary);

        // Trigger confetti when processing is complete
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        setError('Failed to process your pitch deck. Please try again.');
        console.error('Error during pitch deck processing:', err);
      }
    };

    processPitchDeck();
  }, [router]);

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-xl text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (commentary) {
    const selectedVC = localStorage.getItem('selectedVC');
    const vcName = getVCName(selectedVC || '');

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-[#2e2e2e]">VC Feedback</h1>
                <span className="text-lg font-medium text-[#ff4154]">{vcName}</span>
              </div>
              <div className="prose max-w-none">
                {commentary.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 whitespace-pre-wrap">
                    {paragraph.replace(/[#*]/g, '')}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => router.push('/')}
                  className="btn-primary"
                >
                  Get Another Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">
            Analyzing Your Pitch Deck
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Our AI is reviewing your pitch deck and preparing detailed feedback...
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div 
                className="absolute inset-y-0 left-0 bg-[#ff4154] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{progress}% complete</p>
          </div>

          {/* Loading Animation */}
          <div className="mt-12 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#ff4154]/20 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-[#ff4154] rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 