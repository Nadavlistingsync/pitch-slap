import React from 'react';
import { motion } from 'framer-motion';
import { FiCoffee } from 'react-icons/fi';
import { FiZap } from 'react-icons/fi';
import { FaFire, FaSkull, FaBomb } from 'react-icons/fa';

export type RoastLevel = 'gentle' | 'balanced' | 'brutal';

interface RoastLevelSelectorProps {
  selectedLevel?: RoastLevel;
  onSelect: (level: RoastLevel) => void;
}

const roastLevels: { level: RoastLevel; label: string; description: string; icon: React.ReactNode; color: string; intensity: number }[] = [
  {
    level: 'gentle',
    label: 'Gentle',
    description: 'Constructive feedback with a soft touch',
    icon: <FiCoffee className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    intensity: 1
  },
  {
    level: 'balanced',
    label: 'Balanced',
    description: 'Mix of tough love and helpful advice',
    icon: <FiZap className="w-8 h-8" />,
    color: 'from-yellow-500 to-orange-500',
    intensity: 2
  },
  {
    level: 'brutal',
    label: 'BRUTAL',
    description: 'No holds barred, prepare for impact',
    icon: <FaFire className="w-8 h-8" />,
    color: 'from-red-500 to-pink-500',
    intensity: 3
  }
];

export const RoastLevelSelector: React.FC<RoastLevelSelectorProps> = ({
  selectedLevel,
  onSelect,
}) => {
  const handleSelect = (level: RoastLevel) => {
    console.log('Selecting roast level:', level);
    onSelect(level);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-2">Choose Your Roast Intensity</h3>
        <p className="text-gray-400">Select how brutally honest you want the feedback to be</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roastLevels.map(({ level, label, description, icon, color, intensity }) => (
          <motion.button
            key={level}
            onClick={() => handleSelect(level)}
            className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
              selectedLevel === level
                ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/20'
                : 'border-gray-800 hover:border-pink-500/50 hover:bg-gray-800/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`p-4 rounded-full bg-gradient-to-r ${color} text-white transform transition-transform duration-300 ${
                selectedLevel === level ? 'scale-110' : ''
              }`}>
                {icon}
              </div>
              
              <div>
                <h4 className={`text-2xl font-bold mb-2 ${
                  level === 'brutal' ? 'text-red-500' : 'text-white'
                }`}>
                  {label}
                </h4>
                <p className="text-sm text-gray-400">{description}</p>
              </div>

              {/* Intensity Indicators */}
              <div className="flex space-x-1">
                {[...Array(intensity)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      selectedLevel === level
                        ? 'bg-pink-500'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {selectedLevel === level && (
              <motion.div
                className="absolute inset-0 border-2 border-pink-500 rounded-2xl"
                layoutId="selectedRoastLevel"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {/* Decorative elements for brutal level */}
            {level === 'brutal' && (
              <>
                <FaSkull className="absolute top-2 right-2 text-red-500/20 w-6 h-6" />
                <FaBomb className="absolute bottom-2 left-2 text-red-500/20 w-6 h-6" />
              </>
            )}
          </motion.button>
        ))}
      </div>

      {/* Warning message for brutal level */}
      {selectedLevel === 'brutal' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <p className="text-red-400 font-medium">
            ⚠️ Warning: Brutal mode will provide extremely direct and unfiltered feedback
          </p>
        </motion.div>
      )}
    </div>
  );
}; 