'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { logger } from '@/lib/logger';

interface SlideFeedbackProps {
  slideNumber: number;
  onSubmit: (feedback: {
    slideNumber: number;
    content: string;
    rating: number;
    comments?: string;
    brutalityLevel: string;
  }) => void;
}

const brutalityLevels = [
  { id: 'gentle', label: 'Gentle', description: 'Constructive and supportive feedback' },
  { id: 'moderate', label: 'Moderate', description: 'Balanced critique with some tough love' },
  { id: 'brutal', label: 'Brutal', description: 'No holds barred, direct and harsh feedback' },
  { id: 'savage', label: 'Savage', description: 'Extremely critical and unforgiving feedback' },
];

export default function SlideFeedback({ slideNumber, onSubmit }: SlideFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [comments, setComments] = useState('');
  const [brutalityLevel, setBrutalityLevel] = useState('moderate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    logger.info('Submitting slide feedback', {
      slideNumber,
      rating,
      brutalityLevel,
      hasContent: !!content,
      hasComments: !!comments
    });

    try {
      onSubmit({
        slideNumber,
        content,
        rating,
        comments,
        brutalityLevel,
      });

      logger.debug('Feedback submitted successfully');
      
      // Reset form
      setRating(0);
      setContent('');
      setComments('');
      setBrutalityLevel('moderate');
    } catch (error) {
      logger.error('Error submitting feedback', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold mb-4">Slide {slideNumber} Feedback</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Feedback Intensity</label>
          <div className="grid grid-cols-2 gap-2">
            {brutalityLevels.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => setBrutalityLevel(level.id)}
                className={`p-3 rounded-lg border transition-all ${
                  brutalityLevel === level.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="font-medium">{level.label}</div>
                <div className="text-xs text-gray-400">{level.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setRating(star);
                  logger.debug('Rating updated', { rating: star });
                }}
                className={`text-2xl ${
                  rating >= star ? 'text-yellow-400' : 'text-gray-400'
                } hover:text-yellow-400 transition-colors`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Feedback</label>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              logger.debug('Feedback content updated', { 
                contentLength: e.target.value.length 
              });
            }}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
            placeholder="What are your thoughts on this slide?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Additional Comments (Optional)</label>
          <textarea
            value={comments}
            onChange={(e) => {
              setComments(e.target.value);
              logger.debug('Additional comments updated', { 
                commentsLength: e.target.value.length 
              });
            }}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Any additional comments or suggestions?"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Submit Feedback
        </button>
      </form>
    </motion.div>
  );
} 