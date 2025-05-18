import React from 'react';
import { RealVCPersonality, realVCPersonalities } from '../types/realVCPersonalities';

interface VCPersonalitySelectorProps {
  selectedPersonality: string | null;
  onPersonalitySelect: (personalityId: string) => void;
  carousel?: boolean;
}

const VCPersonalitySelector: React.FC<VCPersonalitySelectorProps> = ({
  selectedPersonality,
  onPersonalitySelect,
  carousel,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Select VC Personality</h2>
      <div className={carousel ? "flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 hide-scrollbar" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        {realVCPersonalities.map((personality) => (
          <div
            key={personality.id}
            className={`min-w-[320px] max-w-xs flex-shrink-0 p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-xl hover:scale-105 snap-center relative group ${
              selectedPersonality === personality.id
                ? 'border-gradient-to-r from-purple-500 to-pink-500 shadow-glow scale-105 animate-pulse'
                : 'border-gray-200 bg-white'
            }`}
            onClick={() => onPersonalitySelect(personality.id)}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-2">
              {personality.name}
              {/* Example badge logic */}
              {personality.id === 'ycombinator' && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded bg-purple-100 text-purple-700 font-bold animate-fade-in">Popular</span>
              )}
              {personality.id === 'pauline-roux' && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded bg-pink-100 text-pink-700 font-bold animate-fade-in">New</span>
              )}
            </h3>
            <p className="text-gray-600 mb-4">{personality.prompt.split('\n')[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VCPersonalitySelector; 