'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProcessingPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [commentary, setCommentary] = useState<string | null>(null);

  useEffect(() => {
    const processPitchDeck = async () => {
      const pitchDeck = localStorage.getItem('pitchDeck');
      const selectedVC = localStorage.getItem('selectedVC');

      if (!pitchDeck || !selectedVC) {
        router.push('/select');
        return;
      }

      try {
        const response = await fetch('/api/process', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: pitchDeck,
            vcStyle: JSON.parse(selectedVC).name,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to process pitch deck');
        }

        const data = await response.json();
        console.log('API response:', data);
        setCommentary(data.commentary);
      } catch (err) {
        setError('Failed to process your pitch deck. Please try again.');
        console.error('Error during pitch deck processing:', err);
      }
    };

    processPitchDeck();
  }, [router]);

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-xl text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => router.push('/select')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (commentary) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">VC Feedback</h1>
              <div className="prose max-w-none">
                {commentary.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => router.push('/select')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
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
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Analyzing Your Pitch Deck
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Our AI is reviewing your pitch deck and preparing detailed feedback...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    </main>
  );
} 