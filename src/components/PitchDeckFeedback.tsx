'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideFeedback from './SlideFeedback';

interface PitchDeckFeedbackProps {
  currentSlide: number;
  totalSlides: number;
}

export default function PitchDeckFeedback({ currentSlide, totalSlides }: PitchDeckFeedbackProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = async (feedback: {
    slideNumber: number;
    content: string;
    rating: number;
    comments?: string;
  }) => {
    try {
      const response = await fetch('/api/slide-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setShowFeedback(false);
          setSubmitted(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {showFeedback ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-96"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-500 text-white p-4 rounded-lg shadow-lg"
              >
                Thank you for your feedback!
              </motion.div>
            ) : (
              <SlideFeedback
                slideNumber={currentSlide}
                onSubmit={handleSubmitFeedback}
              />
            )}
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFeedback(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            Give Feedback
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
} 