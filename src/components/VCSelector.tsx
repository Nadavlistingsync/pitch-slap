import React from 'react';
import Image from 'next/image';

export interface VC {
  id: string;
  name: string;
  firm: string;
  image: string;
  specialties: string[];
  description: string;
}

interface VCSelectorProps {
  vcs: VC[];
  selectedVC: VC | null;
  onSelect: (vc: VC) => void;
}

export const VCSelector: React.FC<VCSelectorProps> = ({
  vcs,
  selectedVC,
  onSelect
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Choose Your VC</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vcs.map((vc) => (
          <button
            key={vc.id}
            onClick={() => onSelect(vc)}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              selectedVC?.id === vc.id
                ? 'border-indigo-500 bg-indigo-500/10 shadow-glow'
                : 'border-gray-800 hover:border-indigo-500/50 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={vc.image}
                  alt={vc.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-medium text-white">{vc.name}</h4>
                <p className="text-sm text-indigo-400">{vc.firm}</p>
                <p className="text-sm text-gray-400 mt-2">{vc.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {vc.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 