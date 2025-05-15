'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const vcs = [
  {
    city: 'Paris',
    people: [
      { name: 'Jean de La Rochebrochard', firm: 'Kima Ventures', desc: 'High-velocity investing (600+ startups), founder-first approach' },
      { name: 'Pauline Roux', firm: 'Elaia Partners', desc: 'B2B SaaS + Deep Tech conviction, surgical due diligence' },
      { name: 'Roxanne Varza', firm: 'Station F', desc: 'Community queen of French tech, founder enabler' },
      { name: 'Guillaume Moubeche', firm: 'Lemlist', desc: 'Bootstrapped success, marketing-native founder, now angel/VC hybrid' },
      { name: 'Partech', firm: 'Partech', desc: 'Global firm with Paris HQ; strong B2B SaaS, fintech, climate' },
    ],
  },
  {
    city: 'New York',
    people: [
      { name: 'Y Combinator', firm: 'Y Combinator', desc: 'Launchpad of unicorns (Airbnb, Stripe, Reddit)' },
      { name: 'Andreessen Horowitz', firm: 'a16z', desc: 'Big bets, big checks, and content-rich thought leadership' },
      { name: 'BoxGroup', firm: 'BoxGroup', desc: 'Quiet power players of NYC pre-seed scene' },
      { name: 'Lerer Hippeau', firm: 'Lerer Hippeau', desc: 'NYC DTC + SaaS engine; backers of Glossier, Warby Parker, Allbirds' },
    ],
  },
];

export default function FeedbackStylePage() {
  const router = useRouter();
  const [selected, setSelected] = useState('');
  const [filter, setFilter] = useState<'all' | 'Paris' | 'New York'>('all');
  const [search, setSearch] = useState('');

  const filteredVCs = vcs
    .filter(group => filter === 'all' || group.city === filter)
    .flatMap(group => group.people.map(vc => ({ ...vc, city: group.city })));

  const searchedVCs = filteredVCs.filter(vc =>
    vc.name.toLowerCase().includes(search.toLowerCase()) ||
    vc.firm.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    if (!selected) return;
    const [name, firm] = selected.split(' | ');
    localStorage.setItem('selectedVC', JSON.stringify({ name, firm }));
    router.push('/upload');
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
              const value = `${vc.name} | ${vc.firm} | ${vc.desc}`;
              return (
                <div key={vc.name}>
                  <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${selected === value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                    <input
                      type="radio"
                      name="vc"
                      value={value}
                      checked={selected === value}
                      onChange={() => setSelected(value)}
                      className="mr-3"
                    />
                    <span className="font-bold">{vc.name}</span> <span className="text-gray-500">({vc.firm})</span>
                    <div className="text-sm text-gray-600 mt-1">{vc.desc}</div>
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