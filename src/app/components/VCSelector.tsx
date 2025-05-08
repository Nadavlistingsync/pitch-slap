'use client';

import { useState } from 'react';

interface VC {
  id: string;
  name: string;
  description: string;
  focus: string[];
  investmentRange: string;
}

const vcs: VC[] = [
  {
    id: 'sequoia',
    name: 'Sequoia Capital',
    description: 'One of the most successful venture capital firms, known for early investments in companies like Apple, Google, and WhatsApp.',
    focus: ['Technology', 'Healthcare', 'Consumer', 'Enterprise'],
    investmentRange: 'Seed to Growth'
  },
  {
    id: 'andreessen',
    name: 'Andreessen Horowitz',
    description: 'A venture capital firm that backs bold entrepreneurs building the future through technology.',
    focus: ['Software', 'Fintech', 'Crypto', 'Consumer'],
    investmentRange: 'Seed to Growth'
  },
  {
    id: 'accel',
    name: 'Accel',
    description: 'A leading venture capital firm that partners with exceptional founders building category-defining companies.',
    focus: ['Enterprise', 'Consumer', 'Fintech', 'Healthcare'],
    investmentRange: 'Seed to Growth'
  },
  {
    id: 'ycombinator',
    name: 'Y Combinator',
    description: 'The most successful startup accelerator, known for funding companies like Airbnb, Dropbox, and Stripe.',
    focus: ['All sectors'],
    investmentRange: 'Pre-seed to Series A'
  }
];

interface VCSelectorProps {
  onSelect: (vcId: string) => void;
}

export default function VCSelector({ onSelect }: VCSelectorProps) {
  const [selectedVC, setSelectedVC] = useState<string>('');

  const handleSelect = (vcId: string) => {
    setSelectedVC(vcId);
    onSelect(vcId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Target VC</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vcs.map((vc) => (
          <div
            key={vc.id}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedVC === vc.id
                ? 'border-[#ff4154] bg-[#ff4154]/5'
                : 'border-gray-200 hover:border-[#ff4154]/50'
            }`}
            onClick={() => handleSelect(vc.id)}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{vc.name}</h3>
            <p className="text-gray-600 mb-4">{vc.description}</p>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Focus Areas:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {vc.focus.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Investment Range:</span>
                <p className="text-sm text-gray-700 mt-1">{vc.investmentRange}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 