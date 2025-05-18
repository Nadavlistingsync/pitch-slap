'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { realVCPersonalities, RealVCPersonality } from '@/types/realVCPersonalities';
import { FiSearch, FiFilter } from 'react-icons/fi';

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
    router.push('/roast-level');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-64 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[80vw] h-[80vh] bg-gradient-to-tl from-[#ff4154]/20 to-transparent blur-3xl opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Choose Your VC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Select the VC personality that will roast your pitch deck
          </motion.p>
        </div>

        {/* Search and Filter */}
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

        {/* VC Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVCs.map((vc) => (
            <motion.div
              key={vc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 