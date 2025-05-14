import { FC, useState } from 'react';
import Image from 'next/image';

const tags = ['All', 'Seed', 'Series A', 'Series B+', 'AI', 'Fintech', 'Health', 'Enterprise'];

const VCGrid: FC = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20 bg-transparent">
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-6 py-2 rounded-full text-base font-semibold transition-colors shadow-sm border border-[#23272f] backdrop-blur-sm
              ${selectedTag === tag
                ? 'bg-[#ff4154] text-white border-[#ff4154] shadow-lg'
                : 'bg-[#18181b] text-gray-200 hover:bg-[#23272f] border-[#23272f]'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="aspect-square relative rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.25)] border-2 border-[#23272f] bg-[#23272f] hover:scale-105 hover:shadow-xl transition-transform duration-200">
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