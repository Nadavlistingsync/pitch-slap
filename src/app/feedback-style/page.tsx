'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const vcs = [
  {
    city: 'Paris',
    people: [
      { name: 'Jean de La Rochebrochard', firm: 'Kima Ventures', desc: 'Candid insights, active on Twitter and LinkedIn.' },
      { name: 'Alice Zagury', firm: 'The Family', desc: 'Vocal advocate for entrepreneurs, startup culture.' },
      { name: 'Marie Ekeland', firm: '2050', desc: 'Thoughtful on sustainable innovation and VC trends.' },
      { name: 'Nicolas Debock', firm: 'Cathay Innovation', desc: 'Global investment strategies, startup growth.' },
      { name: 'Pauline Roux', firm: 'Elaia Partners', desc: 'AI, deep tech investments.' },
      { name: 'Roxanne Varza', firm: 'Station F', desc: 'Central in Paris startup scene, innovation.' },
      { name: 'Marc Simoncini', firm: 'Jaïna Capital', desc: 'Entrepreneurial background, investment insights.' },
      { name: 'Oussama Ammar', firm: 'The Family', desc: 'Provocative takes on startups and VC.' },
      { name: 'Céline Lazorthes', firm: 'Leetchi / Mangopay', desc: 'Fintech, entrepreneurship.' },
      { name: 'Xavier Niel', firm: 'Iliad / Station F', desc: 'Influential in French tech ecosystem.' },
    ],
  },
  {
    city: 'New York',
    people: [
      { name: 'Fred Wilson', firm: 'Union Square Ventures', desc: 'Daily blog, deep tech/investing insights.' },
      { name: 'Alexis Ohanian', firm: 'Seven Seven Six', desc: 'Startups, tech, social issues.' },
      { name: 'Rebecca Kaden', firm: 'Union Square Ventures', desc: 'Consumer tech, venture investing.' },
      { name: 'Ben Sun', firm: 'Primary Venture Partners', desc: 'Early-stage investing, NYC startups.' },
      { name: 'Angela Lee', firm: '37 Angels', desc: 'Diversity in tech, educational content.' },
      { name: "Charlie O'Donnell", firm: 'Brooklyn Bridge Ventures', desc: 'Transparent VC, active blogging.' },
      { name: 'Anu Duggal', firm: 'Female Founders Fund', desc: 'Women-led startups, related content.' },
      { name: 'Hunter Walk', firm: 'Homebrew', desc: 'Venture trends, broad influence.' },
      { name: 'Jenny Fielding', firm: 'The Fund', desc: 'Early-stage investing, startup advice.' },
      { name: 'David Tisch', firm: 'BoxGroup', desc: 'Early-stage tech, investment thoughts.' },
    ],
  },
];

export default function FeedbackStylePage() {
  const router = useRouter();
  const [selected, setSelected] = useState('');

  const handleContinue = () => {
    if (!selected) return;
    localStorage.setItem('selectedVC', selected);
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
            Select a VC whose style you want the AI to emulate in its feedback.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vcs.map((group) => (
            <div key={group.city}>
              <h2 className="text-2xl font-semibold mb-4">{group.city}</h2>
              <ul className="space-y-4">
                {group.people.map((vc) => {
                  const value = `${vc.name} | ${vc.firm} | ${vc.desc}`;
                  return (
                    <li key={vc.name}>
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
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
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