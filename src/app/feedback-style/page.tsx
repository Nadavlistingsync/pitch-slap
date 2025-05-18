'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { realVCPersonalities } from '../../types/realVCPersonalities';

const roastLevels = [
  { value: 'gentle', label: 'Gentle', description: 'Constructive feedback with a soft touch' },
  { value: 'balanced', label: 'Balanced', description: 'Mix of tough love and helpful advice' },
  { value: 'brutal', label: 'Brutal', description: 'No holds barred, prepare for impact' },
];

const feedbackStyles = [
  { value: 'helpful', label: 'Helpful VC', description: 'Focus on actionable improvements' },
  { value: 'brutal', label: 'Brutal Honesty', description: 'Direct and unfiltered feedback' },
  { value: 'roast', label: 'Roast Mode', description: 'Maximum entertainment value' },
  { value: 'wildcard', label: 'Wildcard', description: 'Surprise me with any style' },
];

export default function FeedbackStylePage() {
  const router = useRouter();
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const searchedVCs = realVCPersonalities.filter(vc => {
    const matchesSearch = vc.name.toLowerCase().includes(search.toLowerCase()) ||
                         vc.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' ||
                         (filter === 'Paris' && vc.description.includes('Paris')) ||
                         (filter === 'New York' && vc.description.includes('NYC'));
    return matchesSearch && matchesFilter;
  });

  const handleContinue = () => {
    if (selected) {
      const [name, firm] = selected.split(' | ');
      router.push(`/upload?vc=${encodeURIComponent(name)}&firm=${encodeURIComponent(firm)}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your VC Feedback Style
          </h1>
          <p className="text-lg text-gray-600">
            Select a VC whose critical feedback style you want to receive. Each VC has their own unique approach to providing constructive criticism and market analysis.
          </p>
        </div>
        <div className="flex justify-center gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('all')}
          >
            All VCs
          </button>
          <button
            className={`px-4 py-2 rounded ${filter === 'Paris' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('Paris')}
          >
            Paris VCs
          </button>
          <button
            className={`px-4 py-2 rounded ${filter === 'New York' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('New York')}
          >
            New York VCs
          </button>
        </div>
        <input
          type="text"
          placeholder="Search VCs..."
          className="w-full mb-6 px-4 py-2 border rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {searchedVCs.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500">No VCs found.</div>
          ) : (
            searchedVCs.map(vc => {
              const value = `${vc.name} | ${vc.description}`;
              return (
                <div key={vc.id}>
                  <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${selected === value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                    <input
                      type="radio"
                      name="vc"
                      value={value}
                      checked={selected === value}
                      onChange={() => setSelected(value)}
                      className="mr-3"
                    />
                    <span className="font-bold">{vc.name}</span>
                    <div className="text-sm text-gray-600 mt-1">{vc.description}</div>
                  </label>
                </div>
              );
            })
          )}
        </div>
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={!selected}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
          >
            Continue to Upload
          </motion.button>
        </div>
      </div>
    </main>
  );
} 