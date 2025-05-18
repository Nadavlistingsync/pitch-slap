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
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Characteristics:</h4>
              <ul className="list-disc list-inside text-gray-600">
                {personality.characteristics.map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Focus Areas:</h4>
              <div className="flex flex-wrap gap-2">
                {personality.focusAreas.map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Risk Tolerance: {personality.riskTolerance}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {personality.investmentStyle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VCPersonalitySelector; 