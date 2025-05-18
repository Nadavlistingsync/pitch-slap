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

export default function ResultsPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState<any>({});
  const [rawFeedback, setRawFeedback] = useState<string | null>(null);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  useEffect(() => {
    // Read feedback from sessionStorage
    const stored = sessionStorage.getItem('feedbackResult');
    if (stored) {
      const result = JSON.parse(stored);
      if (typeof result.feedback === 'object') {
        setFeedback(result.feedback);
      } else if (typeof result.feedback === 'string') {
        setRawFeedback(result.feedback);
      }
      if (result.feedbackId) {
        setFeedbackId(result.feedbackId);
        // Generate share URL
        const url = `${window.location.origin}/feedback/${result.feedbackId}`;
        setShareUrl(url);
      }
    } else {
      // No feedback found, redirect to home
      router.push('/');
    }
  }, [router]);

  const handleExport = () => {
    const text = buckets.map(b => `${b.label}\nRoast: ${feedback[b.key]?.roast || ''}\nConstructive: ${feedback[b.key]?.constructive || ''}\n`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (shareUrl) {
      try {
        await navigator.share({
          title: 'My Pitch Deck Feedback',
          text: 'Check out the feedback I got on my pitch deck!',
          url: shareUrl,
        });
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  if (!feedback && !rawFeedback) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 py-12 flex flex-col items-center justify-center">
        <div className="text-white text-xl">Loading feedback...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 py-12 flex flex-col items-center">
      <div className="max-w-3xl w-full mx-auto bg-white/10 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6">Your VC Roast & Feedback</h2>
        {rawFeedback ? (
          <div className="bg-white/20 rounded-xl p-6 text-white whitespace-pre-line">{rawFeedback}</div>
        ) : (
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
                <p className="text-white mb-2">{feedback[b.key]?.roast || <span className="text-gray-400">No roast for this section.</span>}</p>
                <p className="text-indigo-200 mb-1 font-semibold">Constructive:</p>
                <p className="text-white">{feedback[b.key]?.constructive || <span className="text-gray-400">No constructive feedback for this section.</span>}</p>
              </motion.div>
            ))}
          </div>
        )}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            className="px-6 py-3 rounded-full font-bold text-lg bg-pink-500 text-white hover:bg-pink-600 shadow-lg transition-all"
            onClick={handleExport}
          >
            {copied ? 'Copied!' : 'Copy Feedback'}
          </button>
          {shareUrl && (
            <button
              className="px-6 py-3 rounded-full font-bold text-lg bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg transition-all"
              onClick={handleShare}
            >
              Share Feedback
            </button>
          )}
          <button
            className="px-6 py-3 rounded-full font-bold text-lg bg-purple-500 text-white hover:bg-purple-600 shadow-lg transition-all"
            onClick={() => router.push('/')}
          >
            New Feedback
          </button>
        </div>
      </div>
    </main>
  );
} 