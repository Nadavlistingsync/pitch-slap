'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { vcPrompts } from '@/lib/vcPrompts';

export default function SelectPage() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [roastIntensity, setRoastIntensity] = useState<'gentle' | 'balanced' | 'brutal'>('balanced');

  const handleSelect = (vc: typeof vcPrompts[0]) => {
    setSelectedVC(vc.id);
    localStorage.setItem('selectedVC', vc.id);
    localStorage.setItem('roastIntensity', roastIntensity);
    router.push('/upload');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Choose Your VC</h1>
          <p className="text-xl text-gray-600">
            Select a VC to roast your pitch deck in their unique style
          </p>
        </div>

        {/* Roast Intensity Selector */}
        <div className="max-w-md mx-auto mb-12">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Roast Intensity</h3>
            <div className="flex justify-between items-center mb-2">
              <label className={`cursor-pointer px-3 py-1 rounded-lg ${roastIntensity === 'gentle' ? 'bg-green-400 text-white' : 'bg-gray-100 text-gray-700'}`}> 
                <input type="radio" name="roastIntensity" value="gentle" checked={roastIntensity === 'gentle'} onChange={() => setRoastIntensity('gentle')} className="mr-2" />
                Gentle
              </label>
              <label className={`cursor-pointer px-3 py-1 rounded-lg ${roastIntensity === 'balanced' ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-700'}`}> 
                <input type="radio" name="roastIntensity" value="balanced" checked={roastIntensity === 'balanced'} onChange={() => setRoastIntensity('balanced')} className="mr-2" />
                Balanced
              </label>
              <label className={`cursor-pointer px-3 py-1 rounded-lg ${roastIntensity === 'brutal' ? 'bg-[#ff4154] text-white' : 'bg-gray-100 text-gray-700'}`}> 
                <input type="radio" name="roastIntensity" value="brutal" checked={roastIntensity === 'brutal'} onChange={() => setRoastIntensity('brutal')} className="mr-2" />
                Brutal
              </label>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Gentle</span>
              <span>Balanced</span>
              <span>Brutal</span>
            </div>
          </div>
        </div>

        {/* VC Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vcPrompts.map((vc) => (
            <button
              key={vc.name}
              onClick={() => handleSelect(vc)}
              className={`card text-left transition-all duration-200 hover:scale-105
                ${selectedVC === vc.id ? 'ring-2 ring-[#ff4154]' : 'hover:shadow-lg'}`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#ff4154]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[#ff4154]">
                    {vc.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2e2e2e]">{vc.name}</h3>
                  <p className="text-sm text-gray-600">{vc.firm}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
} 