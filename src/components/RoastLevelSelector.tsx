import React from 'react';
import { FiCoffee } from 'react-icons/fi';
import { FiZap } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

export type RoastLevel = 'gentle' | 'balanced' | 'brutal';

interface RoastLevelSelectorProps {
  selectedLevel: RoastLevel;
  onSelect: (level: RoastLevel) => void;
}

const roastLevels: { level: RoastLevel; label: string; description: string; icon: React.ReactNode; color: string }[] = [
  {
    level: 'gentle',
    label: 'Gentle',
    description: 'Constructive feedback with a soft touch',
    icon: <FiCoffee className="w-6 h-6" />,
    color: 'bg-blue-500'
  },
  {
    level: 'balanced',
    label: 'Balanced',
    description: 'Mix of tough love and helpful advice',
    icon: <FiZap className="w-6 h-6" />,
    color: 'bg-yellow-500'
  },
  {
    level: 'brutal',
    label: 'Brutal',
    description: 'No holds barred, prepare for impact',
    icon: <FaFire className="w-6 h-6" />,
    color: 'bg-red-500'
  },
];

export const RoastLevelSelector: React.FC<RoastLevelSelectorProps> = ({
  selectedLevel,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white mb-6">Choose Your Roast Intensity</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roastLevels.map(({ level, label, description, icon, color }) => (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
              selectedLevel === level
                ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20'
                : 'border-gray-800 hover:border-indigo-500/50 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`p-3 rounded-full ${color} text-white`}>
                {icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">{label}</h4>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 