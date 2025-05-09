import { FC, useState } from 'react';
import Image from 'next/image';

const tags = ['All', 'Seed', 'Series A', 'Series B+', 'AI', 'Fintech', 'Health', 'Enterprise'];

const VCGrid: FC = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedTag === tag
                ? 'bg-[#ff4154] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="aspect-square relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <Image
              src={`/vcs/vc${i + 1}.jpg`}
              alt={`VC ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VCGrid; 