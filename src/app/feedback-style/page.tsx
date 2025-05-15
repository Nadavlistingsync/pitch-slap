'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const vcs = [
  {
    name: 'Jean de La Rochebrochard',
    firm: 'Kima Ventures',
    location: 'Paris',
    knownFor: 'High-velocity investing (600+ startups), founder-first approach',
    stage: 'Pre-seed to Series A',
    whyFoundersCare: 'Quick decisions, founder-friendly terms, global network',
    vibe: 'Humorous, direct, founder-first',
    podcasts: ['The Twenty Minute VC', 'Sifted']
  },
  {
    name: 'Pauline Roux',
    firm: 'Elaia Partners',
    location: 'Paris',
    knownFor: 'B2B SaaS + Deep Tech conviction, surgical due diligence',
    stage: 'Series A to B',
    whyFoundersCare: 'Deep tech expertise, strong follow-on capabilities',
    vibe: 'Technical, analytical, clear',
    podcasts: ['Sifted']
  },
  {
    name: 'Roxanne Varza',
    firm: 'Station F',
    location: 'Paris',
    knownFor: 'Community queen of French tech, founder enabler',
    stage: 'Pre-seed to Series A',
    whyFoundersCare: 'Access to largest startup campus, strong ecosystem',
    vibe: 'Community-focused, supportive, ecosystem builder',
    podcasts: ['Sifted']
  },
  {
    name: 'Guillaume Moubeche',
    firm: 'Lemlist',
    location: 'Paris',
    knownFor: 'Bootstrapped success, marketing-native founder, now angel/VC hybrid',
    stage: 'Pre-seed to Seed',
    whyFoundersCare: 'Marketing expertise, founder perspective',
    vibe: 'Marketing-focused, direct, helpful',
    podcasts: ['Sifted']
  },
  {
    name: 'Partech',
    firm: 'Partech',
    location: 'Paris',
    knownFor: 'Global firm with Paris HQ; strong B2B SaaS, fintech, climate',
    stage: 'Series A to Growth',
    whyFoundersCare: 'Global reach, strong follow-on, sector expertise',
    vibe: 'Structured, founder-centric, global',
    podcasts: ['Sifted']
  },
  {
    name: 'Y Combinator',
    firm: 'Y Combinator',
    location: 'San Francisco',
    knownFor: 'Launchpad of unicorns (Airbnb, Stripe, Reddit)',
    stage: 'Pre-seed to Seed',
    whyFoundersCare: 'Massive follow-on capital, global network',
    vibe: 'Blunt, pragmatic, helpful',
    podcasts: ['The Twenty Minute VC']
  },
  {
    name: 'Andreessen Horowitz',
    firm: 'a16z',
    location: 'San Francisco',
    knownFor: 'Big bets, big checks, and content-rich thought leadership',
    stage: 'Series A to Growth',
    whyFoundersCare: 'Massive follow-on capital, strong brand',
    vibe: 'Intellectual, thesis-first, big picture',
    podcasts: ['The Twenty Minute VC']
  },
  {
    name: 'BoxGroup',
    firm: 'BoxGroup',
    location: 'New York',
    knownFor: 'Quiet power players of NYC pre-seed scene',
    stage: 'Pre-seed to Seed',
    whyFoundersCare: 'Quick decisions, founder-friendly terms',
    vibe: 'Chill, smart, helpful',
    podcasts: ['The Twenty Minute VC']
  },
  {
    name: 'Lerer Hippeau',
    firm: 'Lerer Hippeau',
    location: 'New York',
    knownFor: 'NYC DTC + SaaS engine; backers of Glossier, Warby Parker, Allbirds',
    stage: 'Seed to Series A',
    whyFoundersCare: 'Strong brand building expertise, NYC network',
    vibe: 'Brand-focused, savvy, helpful',
    podcasts: ['The Twenty Minute VC']
  }
];

export default function FeedbackStylePage() {
  const router = useRouter();
  const [selected, setSelected] = useState('');
  const [filter, setFilter] = useState<'all' | 'Paris' | 'New York'>('all');
  const [search, setSearch] = useState('');

  const filteredVCs = vcs
    .filter(group => filter === 'all' || group.location === filter)
    .flatMap(group => group.map(vc => ({ ...vc, city: group.location })));

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
              const value = `${vc.name} | ${vc.firm} | ${vc.knownFor}`;
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
                    <div className="text-sm text-gray-600 mt-1">{vc.knownFor}</div>
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