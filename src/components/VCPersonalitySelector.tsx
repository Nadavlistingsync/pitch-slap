import React from 'react';
import { RealVCPersonality, realVCPersonalities } from '../types/realVCPersonalities';

interface VCPersonalitySelectorProps {
  selectedPersonality: string | null;
  onPersonalitySelect: (personalityId: string) => void;
}

const VCPersonalitySelector: React.FC<VCPersonalitySelectorProps> = ({
  selectedPersonality,
  onPersonalitySelect,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Select VC Personality</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {realVCPersonalities.map((personality) => (
          <div
            key={personality.id}
            className={`p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
              selectedPersonality === personality.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
            onClick={() => onPersonalitySelect(personality.id)}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{personality.name}</h3>
            <p className="text-gray-600 mb-4">{personality.prompt.split('\n')[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VCPersonalitySelector; 