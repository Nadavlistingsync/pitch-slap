'use client';

import { useState } from 'react';
import { vcPrompts, VCPrompt } from '../lib/vcPrompts';

interface VCSelectorProps {
  onSelect: (vcId: string) => void;
}

export default function VCSelector({ onSelect }: VCSelectorProps) {
  const [selectedVC, setSelectedVC] = useState<string>('');

  const handleSelect = (vc: VCPrompt) => {
    setSelectedVC(vc.id);
    localStorage.setItem('selectedVC', vc.id);
    onSelect(vc.id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Target VC</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vcPrompts.map((vc) => (
          <div
            key={vc.id}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedVC === vc.id
                ? 'border-[#ff4154] bg-[#ff4154]/5'
                : 'border-gray-200 hover:border-[#ff4154]/50'
            }`}
            onClick={() => handleSelect(vc)}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{vc.name}</h3>
            <p className="text-gray-600 mb-4">{vc.prompt.split('\n')[0]}</p>
            {/* Optionally add more VC info here if available */}
          </div>
        ))}
      </div>
    </div>
  );
} 