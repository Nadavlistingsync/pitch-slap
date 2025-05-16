'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResult = window.sessionStorage.getItem('processingResult');
    if (storedResult) {
      setFeedback(JSON.parse(storedResult));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No feedback found</h2>
          <p className="text-gray-400">Please upload your pitch deck and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Feedback Summary</h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg mb-8"
      >
        <h2 className="text-xl font-semibold mb-2">{feedback.feedback?.summary || 'Feedback'}</h2>
        <ul className="list-disc pl-6 text-gray-200">
          {feedback.feedback?.points?.map((point: string, idx: number) => (
            <li key={idx} className="mb-2">{point}</li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 rounded-lg p-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {feedback.vc?.name?.charAt(0) || 'V'}
          </div>
          <div>
            <h3 className="font-bold text-lg">{feedback.vc?.name || 'VC'}</h3>
            <p className="text-sm text-gray-400">{feedback.vc?.firm || ''}</p>
            <p className="text-xs text-gray-400 mt-1">Roast Intensity: <span className="capitalize text-[#ff4154]">{feedback.roastIntensity}</span></p>
          </div>
        </div>
        {feedback.vc?.description && (
          <p className="text-gray-400 mt-4">{feedback.vc.description}</p>
        )}
      </motion.div>
    </div>
  );
} 