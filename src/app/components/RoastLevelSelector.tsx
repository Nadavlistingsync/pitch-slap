import React from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiZap, FiFlame } from 'react-icons/fi';

export type RoastLevel = 'gentle' | 'balanced' | 'brutal';

interface RoastLevelSelectorProps {
  selectedLevel: RoastLevel;
  onSelect: (level: RoastLevel) => void;
}

const roastLevels: { level: RoastLevel; label: string; description: string; icon: React.ReactNode }[] = [
  {
    level: 'gentle',
    label: 'Gentle',
    description: 'Constructive feedback with a soft touch',
    icon: <FiCoffee className="w-6 h-6" />
  },
  {
    level: 'balanced',
    label: 'Balanced',
    description: 'Mix of tough love and helpful advice',
    icon: <FiZap className="w-6 h-6" />
  },
  {
    level: 'brutal',
    label: 'Brutal',
    description: 'No holds barred, prepare for impact',
    icon: <FiFlame className="w-6 h-6" />
  }
];

export default function RoastLevelSelector({ selectedLevel, onSelect }: RoastLevelSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Roast Intensity</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roastLevels.map(({ level, label, description, icon }) => (
          <motion.button
            key={level}
            onClick={() => onSelect(level)}
            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedLevel === level
                ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/20'
                : 'border-gray-700 hover:border-pink-500/50 hover:bg-gray-800/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`mb-4 p-3 rounded-full ${
                selectedLevel === level
                  ? 'bg-pink-500/20 text-pink-400'
                  : 'bg-gray-800 text-gray-400'
              }`}>
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{label}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
            
            {selectedLevel === level && (
              <motion.div
                className="absolute inset-0 border-2 border-pink-500 rounded-2xl"
                layoutId="selectedRoastLevel"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
} 