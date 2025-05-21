'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const vcs = [
  {
    id: 1,
    name: "Sequoia Capital",
    image: "/vcs/sequoia.png",
    description: "Early-stage venture capital firm"
  },
  {
    id: 2,
    name: "Andreessen Horowitz",
    image: "/vcs/a16z.png",
    description: "Silicon Valley venture capital firm"
  },
  {
    id: 3,
    name: "Y Combinator",
    image: "/vcs/yc.png",
    description: "Startup accelerator and venture capital firm"
  },
];

export default function RoastPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [pitchDeck, setPitchDeck] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [roastLevel, setRoastLevel] = useState<number | null>(null);

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

  const handleRoast = () => {
    if (pitchDeck) {
      // Simulate roast level generation
      const randomRoastLevel = Math.floor(Math.random() * 100);
      setRoastLevel(randomRoastLevel);
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
              <p className="text-gray-400">{selectedVC.description}</p>
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
            <p className="text-gray-300">
              {roastLevel < 30
                ? "Your pitch deck is actually pretty good! But we can still find some things to roast..."
                : roastLevel < 70
                ? "Oof, there's definitely room for improvement here. Let's get into the details."
                : "This is going to be brutal. Your pitch deck needs some serious work."}
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
} 