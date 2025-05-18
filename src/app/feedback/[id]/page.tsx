'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const buckets = [
  { key: 'hook', label: 'Hook / Traction' },
  { key: 'pain', label: 'Pain Clarity' },
  { key: 'numbers', label: 'Numbers / Proof Points' },
  { key: 'solution', label: 'Solution Clarity' },
  { key: 'visual', label: 'Product Tease / Visual Excitement' },
  { key: 'ease', label: 'Ease of Use' },
  { key: 'demo', label: 'Demo / Visual Clarity' },
  { key: 'team', label: 'Team Credibility' },
  { key: 'story', label: 'Personal Story / Founder Narrative' },
  { key: 'icp', label: 'ICP Clarity' },
  { key: 'whynow', label: 'Why Now' },
  { key: 'competition', label: 'Competitive Landscape' },
  { key: 'bizmodel', label: 'Business Model' },
];

export default function SharedFeedbackPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await fetch(`/api/feedback/${params.id}`);
        if (!response.ok) {
          throw new Error('Feedback not found');
        }
        const data = await response.json();
        setFeedback(data);
      } catch (err) {
        setError('Failed to load feedback');
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 py-12 flex flex-col items-center justify-center">
        <div className="text-white text-xl">Loading feedback...</div>
      </main>
    );
  }

  if (error || !feedback) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 py-12 flex flex-col items-center justify-center">
        <div className="text-white text-xl">{error || 'Feedback not found'}</div>
        <button
          className="mt-4 px-6 py-3 rounded-full font-bold text-lg bg-purple-500 text-white hover:bg-purple-600 shadow-lg transition-all"
          onClick={() => router.push('/')}
        >
          Get New Feedback
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 py-12 flex flex-col items-center">
      <div className="max-w-3xl w-full mx-auto bg-white/10 rounded-2xl p-8 shadow-xl">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-gray-800">Re: Your Pitch Deck</h2>
              <span className="text-gray-500 text-sm">{new Date(feedback.timestamp).toLocaleString()}</span>
            </div>
            <div className="text-gray-600">
              <p>From: {feedback.personality}</p>
              <p>To: You</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {buckets.map((b, index) => (
              <motion.div
                key={b.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-100 pb-6 last:border-0"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{b.label}</h3>
                {feedback.feedback[b.key]?.feedback && (
                  <div>
                    <p className="text-gray-700">{feedback.feedback[b.key].feedback}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="px-6 py-3 rounded-full font-bold text-lg bg-purple-500 text-white hover:bg-purple-600 shadow-lg transition-all"
            onClick={() => router.push('/')}
          >
            Get Your Own Feedback
          </button>
        </div>
      </div>
    </main>
  );
} 