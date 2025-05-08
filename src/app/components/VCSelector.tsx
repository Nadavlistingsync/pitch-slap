'use client';

import { useState } from 'react';
import { vcPrompts } from '@/lib/vcPrompts';

interface VCSelectorProps {
  onSelect: (vc: { name: string; firm: string }) => void;
}

export default function VCSelector({ onSelect }: VCSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'paris' | 'nyc'>('all');

  const filteredVCs = vcPrompts.filter(vc => {
    const matchesSearch = vc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vc.firm.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' ||
                         (selectedRegion === 'paris' && !vc.firm.includes('NYC')) ||
                         (selectedRegion === 'nyc' && vc.firm.includes('NYC'));
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your VC Critic</h2>
        <p className="text-gray-600 mb-6">Select a venture capitalist to review your pitch deck with their unique perspective and style.</p>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedRegion('all')}
            className={`px-4 py-2 rounded-md ${
              selectedRegion === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All VCs
          </button>
          <button
            onClick={() => setSelectedRegion('paris')}
            className={`px-4 py-2 rounded-md ${
              selectedRegion === 'paris' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Paris VCs
          </button>
          <button
            onClick={() => setSelectedRegion('nyc')}
            className={`px-4 py-2 rounded-md ${
              selectedRegion === 'nyc' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            NYC VCs
          </button>
        </div>

        <input
          type="text"
          placeholder="Search VCs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVCs.map((vc) => (
          <button
            key={`${vc.name}-${vc.firm}`}
            onClick={() => onSelect({ name: vc.name, firm: vc.firm })}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-left"
          >
            <h3 className="font-semibold text-gray-900">{vc.name}</h3>
            <p className="text-sm text-gray-600">{vc.firm}</p>
          </button>
        ))}
      </div>
    </div>
  );
} 