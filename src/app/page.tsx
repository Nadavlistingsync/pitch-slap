'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<'all' | 'Paris' | 'New York'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredVCs = realVCPersonalities.filter(vc => {
    const matchesSearch = vc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || 
                       (selectedCity === 'Paris' && vc.description.includes('Paris')) ||
                       (selectedCity === 'New York' && vc.description.includes('NYC'));
    return matchesSearch && matchesCity;
  });

  const handleSelect = async (vcId: string) => {
    setIsLoading(true);
    const vcObj = realVCPersonalities.find(vc => vc.id === vcId);
    if (vcObj) {
      localStorage.setItem('selectedVC', JSON.stringify(vcObj));
      await router.push('/upload');
    }
    setIsLoading(false);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Pitch Deck Roaster
          </h1>
          <p className="text-xl text-gray-300">
            Get brutally honest feedback on your pitch deck from top VCs
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
          <div className="relative flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search VCs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all duration-200"
                aria-label="Search VCs"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'Paris', 'New York'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city as 'all' | 'Paris' | 'New York')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                  selectedCity === city
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                aria-pressed={selectedCity === city}
              >
                {city !== 'all' && <MapPin className="w-4 h-4" />}
                {city === 'all' ? 'All' : city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVCs.map((vc) => (
            <div
              key={vc.id}
              className="bg-gray-800 rounded-xl p-6 cursor-pointer border border-gray-700 hover:border-pink-500/50 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-pink-500/10"
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(vc.id)}
              onKeyPress={(e) => e.key === 'Enter' && handleSelect(vc.id)}
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
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl flex items-center gap-4">
              <Loader2 className="w-6 h-6 text-pink-500 animate-spin" />
              <span className="text-white">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 