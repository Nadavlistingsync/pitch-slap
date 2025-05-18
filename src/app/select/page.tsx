'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VCSelector from '../components/VCSelector';

const roastLevels = [
  { value: 'gentle', label: 'Gentle' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'brutal', label: 'Brutal' },
];

const feedbackStyles = [
  { value: 'helpful', label: 'Helpful VC' },
  { value: 'brutal', label: 'Brutal Honesty' },
  { value: 'roast', label: 'Roast Mode' },
  { value: 'wildcard', label: 'Wildcard' },
];

export default function SelectPage() {
  const router = useRouter();
  const [roastLevel, setRoastLevel] = useState('balanced');
  const [feedbackStyle, setFeedbackStyle] = useState('helpful');
  const [selectedVC, setSelectedVC] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedVC) return;
    localStorage.setItem('selectedVC', selectedVC);
    localStorage.setItem('roastLevel', roastLevel);
    localStorage.setItem('feedbackStyle', feedbackStyle);
    router.push('/wait');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 py-12 flex flex-col items-center">
      <div className="max-w-3xl w-full mx-auto bg-white/10 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6">Pick Your Feedback Style</h2>
        <div className="mb-8 flex flex-col md:flex-row gap-6 justify-center">
          <div className="flex flex-col gap-2">
            <span className="text-lg text-white font-semibold mb-2">Roast Intensity:</span>
            <div className="flex gap-2">
              {roastLevels.map(l => (
                <button
                  key={l.value}
                  className={`px-4 py-2 rounded-full font-bold transition-all ${roastLevel === l.value ? 'bg-pink-500 text-white' : 'bg-white/20 text-white hover:bg-pink-400/40'}`}
                  onClick={() => setRoastLevel(l.value)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-white font-semibold mb-2">Feedback Style:</span>
            <div className="flex gap-2">
              {feedbackStyles.map(s => (
                <button
                  key={s.value}
                  className={`px-4 py-2 rounded-full font-bold transition-all ${feedbackStyle === s.value ? 'bg-indigo-500 text-white' : 'bg-white/20 text-white hover:bg-indigo-400/40'}`}
                  onClick={() => setFeedbackStyle(s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <VCSelector onSelect={setSelectedVC} />
        <button
          className="mt-8 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all bg-pink-500 text-white hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed w-full"
          onClick={handleContinue}
          disabled={!selectedVC}
        >
          Continue
        </button>
      </div>
    </main>
  );
} 