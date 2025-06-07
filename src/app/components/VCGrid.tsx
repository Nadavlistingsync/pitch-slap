'use client';

import Image from 'next/image';

interface VC {
  name: string;
  firm: string;
  avatar: string;
  description: string;
  specialties: string[];
}

const vcs: VC[] = [
  {
    name: 'Sarah Chen',
    firm: 'Sequoia Capital',
    avatar: 'https://via.placeholder.com/150',
    description: 'Early-stage investor with a focus on AI and enterprise software. Known for brutal honesty and high standards.',
    specialties: ['AI', 'Enterprise', 'SaaS']
  },
  {
    name: 'Michael Rodriguez',
    firm: 'Andreessen Horowitz',
    avatar: 'https://via.placeholder.com/150',
    description: 'Consumer tech investor with a passion for disruptive marketplaces. No sugar coating, just straight talk.',
    specialties: ['Consumer', 'Marketplaces', 'Mobile']
  },
  {
    name: 'Alex Thompson',
    firm: 'First Round Capital',
    avatar: 'https://via.placeholder.com/150',
    description: 'Fintech and crypto specialist. Expect detailed technical feedback and market analysis.',
    specialties: ['Fintech', 'Crypto', 'Payments']
  },
  {
    name: 'Priya Patel',
    firm: 'Accel',
    avatar: 'https://via.placeholder.com/150',
    description: 'Healthcare and biotech investor. Brings scientific rigor to pitch deck reviews.',
    specialties: ['Healthcare', 'Biotech', 'Medtech']
  },
  {
    name: 'David Kim',
    firm: 'Founders Fund',
    avatar: 'https://via.placeholder.com/150',
    description: 'Deep tech and hardware investor. Known for asking the tough questions.',
    specialties: ['Hardware', 'Deep Tech', 'Robotics']
  },
  {
    name: 'Emma Wilson',
    firm: 'Benchmark',
    avatar: 'https://via.placeholder.com/150',
    description: 'Consumer and social media investor. Expert at spotting viral potential.',
    specialties: ['Social', 'Consumer', 'Mobile']
  }
];

export default function VCGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vcs.map((vc) => (
          <div
            key={vc.name}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={vc.avatar}
                  alt={vc.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{vc.name}</h3>
                <p className="text-gray-400 mb-2">{vc.firm}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {vc.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm">{vc.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 