'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

interface FeedbackResult {
  id: string;
  content: string;
  vcName: string;
  timestamp: string;
  score: number;
}

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
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const storedFeedback = localStorage.getItem('feedback');
        if (storedFeedback) {
          setFeedback(JSON.parse(storedFeedback));
        }
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleExport = () => {
    const text = `From: ${feedback?.vcName}\nDate: ${feedback?.timestamp ? new Date(feedback.timestamp).toLocaleString() : 'N/A'}\n\n${buckets.map(b => `${b.label}\n${feedback?.content?.split('\n').find(c => c.startsWith(b.key))?.split(': ')[1] || ''}\n\n`).join('')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLinkedIn = () => {
    if (feedback) {
      const text = `🔥 Just got my pitch deck absolutely ROASTED by ${feedback.vcName} on PitchDeck Roaster! No sugar coating, just brutal honesty. Check out this savage feedback:`;
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(feedback.id)}&summary=${encodeURIComponent(text)}`;
      window.open(linkedInUrl, '_blank');
    }
  };

  const handleShareTwitter = () => {
    if (feedback) {
      const text = `🔥 My pitch deck just got absolutely DESTROYED by ${feedback.vcName} on @PitchDeckRoaster! No mercy, just pure unfiltered truth. Check out this brutal feedback:`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(feedback.id)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No feedback found</h2>
          <p className="text-gray-400">Please try submitting your pitch deck again.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Feedback Results</h1>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              New Analysis
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">VC Feedback</h2>
              <p className="text-gray-400">{feedback.content}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">VC Name</p>
                  <p className="text-white">{feedback.vcName}</p>
                </div>
                <div>
                  <p className="text-gray-400">Date</p>
                  <p className="text-white">{new Date(feedback.timestamp).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Score</p>
                  <p className="text-white">{feedback.score}/100</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <button
            className="px-6 py-3 rounded-full font-bold text-lg bg-pink-500 text-white hover:bg-pink-600 shadow-lg transition-all"
            onClick={handleExport}
          >
            {copied ? 'Copied!' : 'Copy Email'}
          </button>
          {feedback && (
            <>
              <button
                className="px-6 py-3 rounded-full font-bold text-lg bg-[#0077B5] text-white hover:bg-[#006399] shadow-lg transition-all flex items-center gap-2"
                onClick={handleShareLinkedIn}
              >
                <FaLinkedin className="w-5 h-5" />
                Share on LinkedIn
              </button>
              <button
                className="px-6 py-3 rounded-full font-bold text-lg bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] shadow-lg transition-all flex items-center gap-2"
                onClick={handleShareTwitter}
              >
                <FaTwitter className="w-5 h-5" />
                Share on X
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 