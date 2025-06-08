'use client';

import React, { useState, FormEvent } from 'react';
import type { RoastLevel } from '@/components/RoastLevelSelector';
import { RoastLevelSelector } from '@/components/RoastLevelSelector';

export default function RoastPage() {
  const [selectedLevel, setSelectedLevel] = useState<RoastLevel>('balanced');
  const [roastContent, setRoastContent] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // TODO: Implement roast submission
    console.log({
      roastLevel: selectedLevel,
      content: roastContent
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Create Your Roast</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <RoastLevelSelector
            selectedLevel={selectedLevel}
            onSelect={setSelectedLevel}
          />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Your Roast</h3>
            <textarea
              value={roastContent}
              onChange={(e) => setRoastContent(e.target.value)}
              placeholder="Write your roast here..."
              className="input-field min-h-[200px]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!roastContent.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Roast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 