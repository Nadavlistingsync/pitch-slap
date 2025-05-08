'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const vcs = [
  {
    city: 'Paris',
    people: [
      { name: 'Jean de La Rochebrochard', firm: 'Kima Ventures', desc: 'Direct, constructive criticism focused on market fit and execution.' },
      { name: 'Alice Zagury', firm: 'The Family', desc: 'Strategic feedback on business model and growth potential.' },
      { name: 'Marie Ekeland', firm: '2050', desc: 'Critical analysis of sustainability and long-term viability.' },
      { name: 'Nicolas Debock', firm: 'Cathay Innovation', desc: 'Detailed feedback on market positioning and competitive advantage.' },
      { name: 'Pauline Roux', firm: 'Elaia Partners', desc: 'Technical and market validation feedback.' },
      { name: 'Roxanne Varza', firm: 'Station F', desc: 'Comprehensive ecosystem and market opportunity analysis.' },
      { name: 'Marc Simoncini', firm: 'Jaïna Capital', desc: 'Entrepreneurial perspective on execution and scaling.' },
      { name: 'Oussama Ammar', firm: 'The Family', desc: 'Challenging questions on business fundamentals.' },
      { name: 'Céline Lazorthes', firm: 'Leetchi / Mangopay', desc: 'Fintech-specific market and regulatory feedback.' },
      { name: 'Xavier Niel', firm: 'Iliad / Station F', desc: 'Strategic market positioning and competitive analysis.' },
    ],
  },
  {
    city: 'New York',
    people: [
      { name: 'Fred Wilson', firm: 'Union Square Ventures', desc: 'Deep technical and market analysis feedback.' },
      { name: 'Alexis Ohanian', firm: 'Seven Seven Six', desc: 'Consumer-focused market validation feedback.' },
      { name: 'Rebecca Kaden', firm: 'Union Square Ventures', desc: 'Detailed analysis of market opportunity and execution.' },
      { name: 'Ben Sun', firm: 'Primary Venture Partners', desc: 'Early-stage market validation and team assessment.' },
      { name: 'Angela Lee', firm: '37 Angels', desc: 'Comprehensive market and team evaluation feedback.' },
      { name: "Charlie O'Donnell", firm: 'Brooklyn Bridge Ventures', desc: 'Transparent feedback on market opportunity and execution.' },
      { name: 'Anu Duggal', firm: 'Female Founders Fund', desc: 'Market opportunity and execution strategy feedback.' },
      { name: 'Hunter Walk', firm: 'Homebrew', desc: 'Detailed product-market fit analysis.' },
      { name: 'Jenny Fielding', firm: 'The Fund', desc: 'Early-stage market validation and execution feedback.' },
      { name: 'David Tisch', firm: 'BoxGroup', desc: 'Comprehensive market and team evaluation.' },
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