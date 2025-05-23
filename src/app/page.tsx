'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { realVCPersonalities } from '../types/realVCPersonalities';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<'all' | 'Paris' | 'New York'>('all');

  const filteredVCs = realVCPersonalities.filter(vc => {
    const matchesSearch = vc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || 
                       (selectedCity === 'Paris' && vc.description.includes('Paris')) ||
                       (selectedCity === 'New York' && vc.description.includes('NYC'));
    return matchesSearch && matchesCity;
  });

  const handleSelect = (vcId: string) => {
    localStorage.setItem('selectedVC', vcId);
    router.push('/roast-level');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Pitch Deck Roaster
          </h1>
          <p className="text-xl text-gray-300">
            Get brutally honest feedback on your pitch deck from top VCs
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search VCs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCity('all')}
              className={`px-4 py-2 rounded-lg ${
                selectedCity === 'all'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCity('Paris')}
              className={`px-4 py-2 rounded-lg ${
                selectedCity === 'Paris'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Paris
            </button>
            <button
              onClick={() => setSelectedCity('New York')}
              className={`px-4 py-2 rounded-lg ${
                selectedCity === 'New York'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              New York
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVCs.map((vc) => (
            <motion.div
              key={vc.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(vc.id)}
              className="bg-gray-800 rounded-xl p-6 cursor-pointer border border-gray-700 hover:border-pink-500/50 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-2">{vc.name}</h3>
              <p className="text-gray-400 mb-4">{vc.description}</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300">
                  {vc.type}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300">
                  {vc.focus}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
} 