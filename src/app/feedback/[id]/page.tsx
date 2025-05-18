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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Shared Feedback</h2>
          <div className="text-white/80">
            By {feedback.personality} • {new Date(feedback.timestamp).toLocaleDateString()}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {buckets.map((b, index) => (
            <motion.div
              key={b.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/20 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-pink-300 mb-2">{b.label}</h3>
              <p className="text-pink-200 mb-1 font-semibold">Roast:</p>
              <p className="text-white mb-2">{feedback.feedback[b.key]?.roast || <span className="text-gray-400">No roast for this section.</span>}</p>
              <p className="text-indigo-200 mb-1 font-semibold">Constructive:</p>
              <p className="text-white">{feedback.feedback[b.key]?.constructive || <span className="text-gray-400">No constructive feedback for this section.</span>}</p>
            </motion.div>
          ))}
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