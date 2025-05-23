import React from 'react';

export type RoastLevel = 'gentle' | 'balanced' | 'brutal';

interface RoastLevelSelectorProps {
  selectedLevel: RoastLevel;
  onSelect: (level: RoastLevel) => void;
}

const roastLevels: { level: RoastLevel; label: string; description: string }[] = [
  {
    level: 'gentle',
    label: 'Gentle',
    description: 'Constructive feedback with a soft touch',
  },
  {
    level: 'balanced',
    label: 'Balanced',
    description: 'Mix of tough love and helpful advice',
  },
  {
    level: 'brutal',
    label: 'Brutal',
    description: 'No holds barred, prepare for impact',
  },
];

export const RoastLevelSelector: React.FC<RoastLevelSelectorProps> = ({
  selectedLevel,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Choose Your Roast Level</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roastLevels.map(({ level, label, description }) => (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              selectedLevel === level
                ? 'border-indigo-500 bg-indigo-500/10 shadow-glow'
                : 'border-gray-800 hover:border-indigo-500/50 hover:bg-gray-800/50'
            }`}
          >
            <div className="text-left">
              <h4 className="font-medium text-white">{label}</h4>
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 