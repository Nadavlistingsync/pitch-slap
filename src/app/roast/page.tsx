'use client';

import React from 'react';
import { RoastLevelSelector, RoastLevel } from '@/components/RoastLevelSelector';
import { VCSelector, VC } from '@/components/VCSelector';

// Example VCs - replace with actual data
const exampleVCs: VC[] = [
  {
    id: '1',
    name: 'John Smith',
    firm: 'Tech Ventures',
    image: '/placeholder-vc.jpg',
    specialties: ['AI', 'SaaS', 'Fintech'],
    description: 'Early-stage investor focused on disruptive technologies'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    firm: 'Future Capital',
    image: '/placeholder-vc.jpg',
    specialties: ['Healthcare', 'Biotech', 'Clean Energy'],
    description: 'Growth-stage investor with a passion for sustainable solutions'
  }
];

export default function RoastPage() {
  const [selectedLevel, setSelectedLevel] = React.useState<RoastLevel>('medium');
  const [selectedVC, setSelectedVC] = React.useState<VC | null>(null);
  const [roastContent, setRoastContent] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVC) return;

    // TODO: Implement roast submission
    console.log({
      roastLevel: selectedLevel,
      vc: selectedVC,
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

          <VCSelector
            vcs={exampleVCs}
            selectedVC={selectedVC}
            onSelect={setSelectedVC}
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
              disabled={!selectedVC || !roastContent.trim()}
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