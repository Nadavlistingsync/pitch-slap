'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SlideFeedback {
  id: string;
  slideNumber: number;
  content: string;
  rating: number;
  comments?: string;
  brutalityLevel: string;
  createdAt: string;
}

interface DeckFeedbackPageProps {
  params: {
    id: string;
  };
}

const brutalityLevelColors = {
  gentle: 'bg-green-100 text-green-800',
  moderate: 'bg-blue-100 text-blue-800',
  brutal: 'bg-orange-100 text-orange-800',
  savage: 'bg-red-100 text-red-800',
};

export default function DeckFeedbackPage({ params }: DeckFeedbackPageProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<SlideFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [deckTitle, setDeckTitle] = useState('Your Pitch Deck');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`/api/slide-feedback?deckId=${params.id}`);
        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {deckTitle} Feedback
          </h1>
          <p className="text-lg text-gray-600">
            Review feedback for each slide of your pitch deck
          </p>
        </div>

        <div className="grid gap-8">
          {feedback.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Slide {item.slideNumber}</h2>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${brutalityLevelColors[item.brutalityLevel as keyof typeof brutalityLevelColors]}`}>
                    {item.brutalityLevel.charAt(0).toUpperCase() + item.brutalityLevel.slice(1)}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{item.rating}/5</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{item.content}</p>
              {item.comments && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Additional Comments:</p>
                  <p className="text-gray-700 mt-1">{item.comments}</p>
                </div>
              )}
              <div className="mt-4 text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/preview')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Back to Preview
          </button>
        </div>
      </div>
    </div>
  );
} 