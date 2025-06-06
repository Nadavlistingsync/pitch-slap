import { FiArrowLeft } from 'react-icons/fi';

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

export default function DeckFeedbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pitch Deck Feedback
          </h1>
          <p className="text-lg text-gray-600">
            Review feedback for each slide of your pitch deck
          </p>
        </div>

        <div className="grid gap-8">
          {mockFeedback.map((item) => (
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
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Preview
          </a>
        </div>
      </div>
    </div>
  );
} 