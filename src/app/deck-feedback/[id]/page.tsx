// 'use client';

import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const brutalityLevelColors = {
  gentle: 'bg-green-100 text-green-800',
  moderate: 'bg-blue-100 text-blue-800',
  brutal: 'bg-orange-100 text-orange-800',
  savage: 'bg-red-100 text-red-800',
};

// Static mock feedback data
const mockFeedback = [
  {
    id: '1',
    slideNumber: 1,
    content: 'Great introduction, but consider clarifying your value proposition.',
    rating: 4,
    brutalityLevel: 'moderate',
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    slideNumber: 2,
    content: 'Market size is impressive, but add more data sources.',
    rating: 3,
    brutalityLevel: 'gentle',
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '3',
    slideNumber: 3,
    content: 'Financial projections seem optimistic. Provide more realistic numbers.',
    rating: 2,
    brutalityLevel: 'brutal',
    comments: 'Investors may be skeptical of high growth rates without supporting evidence.',
    createdAt: '2024-03-15T10:00:00Z',
  },
];

// Generate static params for the mock data
export async function generateStaticParams() {
  return mockFeedback.map((item) => ({
    id: item.id,
  }));
}

export default function DeckFeedbackPage({ params }: { params: { id: string } }) {
  const feedback = mockFeedback.find(item => item.id === params.id);

  if (!feedback) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Feedback Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The requested feedback could not be found.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pitch Deck Feedback
          </h1>
          <p className="text-lg text-gray-600">
            Review feedback for slide {feedback.slideNumber}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Slide {feedback.slideNumber}</h2>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${brutalityLevelColors[feedback.brutalityLevel as keyof typeof brutalityLevelColors]}`}>
                {feedback.brutalityLevel.charAt(0).toUpperCase() + feedback.brutalityLevel.slice(1)}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{feedback.rating}/5</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{feedback.content}</p>
          {feedback.comments && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">Additional Comments:</p>
              <p className="text-gray-700 mt-1">{feedback.comments}</p>
            </div>
          )}
          <div className="mt-4 text-sm text-gray-500">
            {new Date(feedback.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 