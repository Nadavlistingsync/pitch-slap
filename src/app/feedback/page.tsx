'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SlideFeedback {
  id: string;
  slideNumber: number;
  content: string;
  rating: number;
  comments?: string;
  createdAt: string;
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<SlideFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('/api/slide-feedback');
        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Slide Feedback</h1>
      <div className="grid gap-6">
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Slide {item.slideNumber}</h2>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{item.rating}/5</span>
              </div>
            </div>
            <p className="text-gray-200 mb-4">{item.content}</p>
            {item.comments && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400">Additional Comments:</p>
                <p className="text-gray-200 mt-1">{item.comments}</p>
              </div>
            )}
            <div className="mt-4 text-sm text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 