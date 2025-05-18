'use client';

import { FC, useState } from 'react';
import { realVCPersonalities } from '../../types/realVCPersonalities';

interface VCSelectorProps {
  onSelect: (vcId: string) => void;
}

export default function VCSelector({ onSelect }: VCSelectorProps) {
  const [selectedVC, setSelectedVC] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<'all' | 'Paris' | 'New York'>('all');

  const filteredVCs = realVCPersonalities.filter(vc => {
    const matchesSearch = vc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || 
                       (selectedCity === 'Paris' && vc.description.includes('Paris')) ||
                       (selectedCity === 'New York' && vc.description.includes('NYC'));
    return matchesSearch && matchesCity;
  });

  const handleSelect = (vc: typeof realVCPersonalities[0]) => {
    setSelectedVC(vc.id);
    onSelect(vc.id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Target VC</h2>
        <p className="text-gray-600 mb-6">Choose a VC to get feedback in their unique style</p>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search VCs..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4154] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCity('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCity === 'all' 
                  ? 'bg-[#ff4154] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCity('Paris')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCity === 'Paris' 
                  ? 'bg-[#ff4154] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Paris
            </button>
            <button
              onClick={() => setSelectedCity('New York')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCity === 'New York' 
                  ? 'bg-[#ff4154] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              New York
            </button>
          </div>
        </div>

        {/* VC Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVCs.map((vc) => (
            <div
              key={vc.id}
              onClick={() => handleSelect(vc)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                selectedVC === vc.id
                  ? 'border-[#ff4154] bg-[#ff4154]/5'
                  : 'border-gray-200 hover:border-[#ff4154]/50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#ff4154]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[#ff4154]">
                    {vc.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{vc.name}</h3>
                  <p className="text-gray-600 mb-2">{vc.description}</p>
                  <p className="text-sm text-gray-500">{vc.prompt.split('\n')[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVCs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No VCs found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 