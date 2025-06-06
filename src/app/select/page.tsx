'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { realVCPersonalities, RealVCPersonality } from '@/types/realVCPersonalities';

export default function SelectPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'seed' | 'series-a' | 'growth'>('all');

  const filteredVCs = realVCPersonalities.filter((vc: RealVCPersonality) => {
    const matchesSearch = vc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || vc.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSelect = (vcId: string) => {
    setSelectedVC(vcId);
    localStorage.setItem('selectedVC', vcId);
    router.push('/upload');
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Select Your VC</h1>
          <p className="text-gray-400">Choose a VC to get feedback in their unique style</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search VCs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50"
              />
            </div>
            <div className="relative">
              <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'seed' | 'series-a' | 'growth')}
                className="pl-12 pr-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-pink-500/50 appearance-none"
              >
                <option value="all">All Types</option>
                <option value="seed">Seed</option>
                <option value="series-a">Series A</option>
                <option value="growth">Growth</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVCs.map((vc) => (
            <div
              key={vc.id}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all cursor-pointer
                ${selectedVC === vc.id 
                  ? 'border-pink-500 shadow-lg shadow-pink-500/20' 
                  : 'border-white/10 hover:border-pink-500/50'}`}
              onClick={() => handleSelect(vc.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{vc.name}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{vc.description}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="px-2 py-1 rounded-full bg-white/5">{vc.type}</span>
                  <span className="px-2 py-1 rounded-full bg-white/5">{vc.focus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVCs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No VCs found matching your search criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
} 