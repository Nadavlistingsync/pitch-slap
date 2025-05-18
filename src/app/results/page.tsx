'use client';
import { useEffect, useState } from 'react';

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
  const [feedback, setFeedback] = useState<any>({});
  const [rawFeedback, setRawFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Read feedback from sessionStorage
    const stored = sessionStorage.getItem('feedbackResult');
    if (stored) {
      const result = JSON.parse(stored);
      // Try to parse feedback into buckets if possible
      if (typeof result.feedback === 'object') {
        setFeedback(result.feedback);
      } else if (typeof result.feedback === 'string') {
        setRawFeedback(result.feedback);
      }
    }
  }, []);

  const handleExport = () => {
    // Export feedback as text (implement PDF export as needed)
    const text = buckets.map(b => `${b.label}\nRoast: ${feedback[b.key]?.roast || ''}\nConstructive: ${feedback[b.key]?.constructive || ''}\n`).join('\n');
    navigator.clipboard.writeText(text);
    alert('Feedback copied to clipboard!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 py-12 flex flex-col items-center">
      <div className="max-w-3xl w-full mx-auto bg-white/10 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6">Your VC Roast & Feedback</h2>
        {rawFeedback ? (
          <div className="bg-white/20 rounded-xl p-6 text-white whitespace-pre-line">{rawFeedback}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {buckets.map(b => (
              <div key={b.key} className="bg-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-pink-300 mb-2">{b.label}</h3>
                <p className="text-pink-200 mb-1 font-semibold">Roast:</p>
                <p className="text-white mb-2">{feedback[b.key]?.roast || <span className="text-gray-400">No roast for this section.</span>}</p>
                <p className="text-indigo-200 mb-1 font-semibold">Constructive:</p>
                <p className="text-white">{feedback[b.key]?.constructive || <span className="text-gray-400">No constructive feedback for this section.</span>}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            className="px-6 py-3 rounded-full font-bold text-lg bg-pink-500 text-white hover:bg-pink-600 shadow-lg"
            onClick={handleExport}
          >
            Copy Feedback
          </button>
          {/* Add PDF export and share buttons as needed */}
        </div>
      </div>
    </main>
  );
} 