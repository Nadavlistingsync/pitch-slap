import React from 'react';

export type RoastLevel = 'light' | 'medium' | 'dark' | 'extra-dark';

interface RoastLevelSelectorProps {
  selectedLevel: RoastLevel;
  onSelect: (level: RoastLevel) => void;
}

const roastLevels: { level: RoastLevel; label: string; description: string }[] = [
  {
    level: 'light',
    label: 'Light Roast',
    description: 'Subtle, bright, and acidic with more caffeine'
  },
  {
    level: 'medium',
    label: 'Medium Roast',
    description: 'Balanced flavor, aroma, and acidity'
  },
  {
    level: 'dark',
    label: 'Dark Roast',
    description: 'Bold, rich, and full-bodied with less acidity'
  },
  {
    level: 'extra-dark',
    label: 'Extra Dark Roast',
    description: 'Intense, smoky, and bitter with minimal acidity'
  }
];

export const RoastLevelSelector: React.FC<RoastLevelSelectorProps> = ({
  selectedLevel,
  onSelect
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Choose Your Roast Level</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="flex items-start gap-3">
              <div className={`w-4 h-4 rounded-full mt-1 ${
                level === 'light' ? 'bg-yellow-400' :
                level === 'medium' ? 'bg-orange-500' :
                level === 'dark' ? 'bg-brown-600' :
                'bg-brown-900'
              }`} />
              <div className="text-left">
                <h4 className="font-medium text-white">{label}</h4>
                <p className="text-sm text-gray-400 mt-1">{description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 