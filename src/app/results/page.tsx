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
  const [vcName, setVcName] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');

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
      if (result.personality) {
        setVcName(result.personality);
      }
      if (result.timestamp) {
        setTimestamp(new Date(result.timestamp).toLocaleString());
      }
    } else {
      // No feedback found, redirect to home
      router.push('/');
    }
  }, [router]);

  const handleExport = () => {
    const text = `From: ${vcName}\nDate: ${timestamp}\n\n${buckets.map(b => `${b.label}\n${feedback[b.key]?.roast || ''}\n\n${feedback[b.key]?.constructive || ''}\n\n`).join('')}`;
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
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-gray-800">Re: Your Pitch Deck</h2>
              <span className="text-gray-500 text-sm">{timestamp}</span>
            </div>
            <div className="text-gray-600">
              <p>From: {vcName}</p>
              <p>To: You</p>
            </div>
          </div>
          
          {rawFeedback ? (
            <div className="text-gray-700 whitespace-pre-line">{rawFeedback}</div>
          ) : (
            <div className="space-y-6">
              {buckets.map((b, index) => (
                feedback[b.key]?.feedback && (
                  <motion.div
                    key={b.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <p className="text-gray-700">{feedback[b.key].feedback}</p>
                  </motion.div>
                )
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <button
            className="px-6 py-3 rounded-full font-bold text-lg bg-pink-500 text-white hover:bg-pink-600 shadow-lg transition-all"
            onClick={handleExport}
          >
            {copied ? 'Copied!' : 'Copy Email'}
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