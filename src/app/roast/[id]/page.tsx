'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const vcs = [
  {
    id: 1,
    name: "Jean de La Rochebrochard",
    image: "/vcs/jean.png",
    description: "Kima Ventures - High-velocity investing, founder-first approach",
    personality: "Twitter-native, blunt, speed-obsessed operator"
  },
  {
    id: 2,
    name: "Pauline Roux",
    image: "/vcs/pauline.png",
    description: "Elaia Partners - B2B SaaS + Deep Tech conviction",
    personality: "Quiet force, clear-eyed, precision over hype"
  },
  {
    id: 3,
    name: "Roxanne Varza",
    image: "/vcs/roxanne.png",
    description: "Station F - Community queen of French tech",
    personality: "Visionary with IRL warmth and startup empathy"
  },
  {
    id: 4,
    name: "Guillaume Moubeche",
    image: "/vcs/guillaume.png",
    description: "Lemlist - Bootstrapped success, marketing-native founder",
    personality: "Internet-native, Gen Z-style hype meets founder grit"
  },
  {
    id: 5,
    name: "Partech",
    image: "/vcs/partech.png",
    description: "Global firm with Paris HQ - B2B SaaS, fintech, climate",
    personality: "Smart, structured, a bit formal but founder-centric"
  },
  {
    id: 6,
    name: "Y Combinator",
    image: "/vcs/yc.png",
    description: "Launchpad of unicorns (Airbnb, Stripe, Reddit)",
    personality: "Blunt, pragmatic, growth-obsessed"
  },
  {
    id: 7,
    name: "Andreessen Horowitz",
    image: "/vcs/a16z.png",
    description: "Big bets, big checks, content-rich thought leadership",
    personality: "Intellectual, polished, often thesis-first"
  },
  {
    id: 8,
    name: "BoxGroup",
    image: "/vcs/boxgroup.png",
    description: "Quiet power players of NYC pre-seed scene",
    personality: "Chill, smart, operator-friendly"
  },
  {
    id: 9,
    name: "Lerer Hippeau",
    image: "/vcs/lerer.png",
    description: "NYC DTC + SaaS engine - Glossier, Warby Parker, Allbirds",
    personality: "Brand-builder brain meets savvy NYC operator"
  }
];

export default function RoastPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [pitchDeck, setPitchDeck] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [roastLevel, setRoastLevel] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const selectedVC = vcs.find(vc => vc.id === parseInt(params.id));

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') {
      setPitchDeck(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === 'application/pdf') {
      setPitchDeck(file);
    }
  };

  const getFeedbackByVC = (level: number, vc: typeof vcs[0]) => {
    const feedbacks = {
      low: {
        "Jean de La Rochebrochard": "Not bad, but you're moving too slow. Speed up or get left behind.",
        "Pauline Roux": "Interesting technical foundation, but your market approach needs refinement.",
        "Roxanne Varza": "You've got potential, but need to build stronger community connections.",
        "Guillaume Moubeche": "Solid start, but your marketing needs more growth hacking.",
        "Partech": "Good fundamentals, but need more global ambition.",
        "Y Combinator": "Ship faster, iterate quicker. Your MVP needs more velocity.",
        "Andreessen Horowitz": "Interesting thesis, but needs more intellectual rigor.",
        "BoxGroup": "You're on the right track, but need more operator focus.",
        "Lerer Hippeau": "Good product, but your brand story needs work."
      },
      medium: {
        "Jean de La Rochebrochard": "You're taking too long to make decisions. Move faster!",
        "Pauline Roux": "Your technical depth is good, but market fit is unclear.",
        "Roxanne Varza": "You need to leverage the ecosystem better. Network more.",
        "Guillaume Moubeche": "Your growth metrics are decent, but not exceptional.",
        "Partech": "You're thinking too small. Scale your ambition.",
        "Y Combinator": "Your execution is mediocre. Need more focus and speed.",
        "Andreessen Horowitz": "Your thesis is weak. Need stronger market analysis.",
        "BoxGroup": "You're moving too slow. Need more operator mindset.",
        "Lerer Hippeau": "Your brand needs work. Focus on storytelling."
      },
      high: {
        "Jean de La Rochebrochard": "This is taking forever! Where's the speed?",
        "Pauline Roux": "Your technical approach is fundamentally flawed.",
        "Roxanne Varza": "You're not leveraging the ecosystem at all.",
        "Guillaume Moubeche": "Your growth strategy is completely wrong.",
        "Partech": "You're thinking way too small. Think global!",
        "Y Combinator": "This is going nowhere. Start over.",
        "Andreessen Horowitz": "Your thesis is completely wrong.",
        "BoxGroup": "You're not thinking like an operator at all.",
        "Lerer Hippeau": "Your brand story is a complete mess."
      }
    };

    if (level < 30) return feedbacks.low[vc.name as keyof typeof feedbacks.low];
    if (level < 70) return feedbacks.medium[vc.name as keyof typeof feedbacks.medium];
    return feedbacks.high[vc.name as keyof typeof feedbacks.high];
  };

  const handleRoast = () => {
    if (pitchDeck && selectedVC) {
      // Simulate roast level generation
      const randomRoastLevel = Math.floor(Math.random() * 100);
      setRoastLevel(randomRoastLevel);
      setFeedback(getFeedbackByVC(randomRoastLevel, selectedVC));
    }
  };

  if (!selectedVC) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <h1 className="text-2xl">VC not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold">Roast with {selectedVC.name}</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={selectedVC.image}
                alt={selectedVC.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">{selectedVC.name}</h2>
              <p className="text-gray-400 mb-2">{selectedVC.description}</p>
              <p className="text-pink-400 italic">{selectedVC.personality}</p>
            </div>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
          >
            {pitchDeck ? (
              <div className="text-gray-300">
                <p className="mb-2">Selected file: {pitchDeck.name}</p>
                <button
                  onClick={handleRoast}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Get Roasted
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-300 mb-4">
                  Drag and drop your pitch deck here
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Select File
                </label>
              </div>
            )}
          </div>
        </div>

        {roastLevel !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Roast Level: {roastLevel}%</h3>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full"
                style={{ width: `${roastLevel}%` }}
              />
            </div>
            <p className="text-gray-300 mb-4">{feedback}</p>
            <p className="text-sm text-gray-500 italic">
              {roastLevel < 30
                ? "Not bad, but there's room for improvement..."
                : roastLevel < 70
                ? "Oof, this needs some serious work."
                : "This is going to be brutal. Your pitch deck needs a complete overhaul."}
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
} 