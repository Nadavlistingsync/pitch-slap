'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const vcs = [
  {
    id: 1,
    name: "Marc Andreessen",
    image: "/vcs/andreessen.png",
    description: "Co-founder of Andreessen Horowitz"
  },
  {
    id: 2,
    name: "Naval Ravikant",
    image: "/vcs/naval.png",
    description: "Founder of AngelList"
  },
  {
    id: 3,
    name: "Paul Graham",
    image: "/vcs/paul.png",
    description: "Co-founder of Y Combinator"
  },
  {
    id: 4,
    name: "Sam Altman",
    image: "/vcs/sam.png",
    description: "CEO of OpenAI, former YC President"
  },
  {
    id: 5,
    name: "Fred Wilson",
    image: "/vcs/fred.png",
    description: "Co-founder of Union Square Ventures"
  },
  {
    id: 6,
    name: "Chris Sacca",
    image: "/vcs/sacca.png",
    description: "Founder of Lowercase Capital"
  },
  {
    id: 7,
    name: "Peter Thiel",
    image: "/vcs/thiel.png",
    description: "Co-founder of PayPal, Founders Fund"
  },
  {
    id: 8,
    name: "Reid Hoffman",
    image: "/vcs/reid.png",
    description: "Co-founder of LinkedIn, Greylock"
  },
  {
    id: 9,
    name: "Chamath Palihapitiya",
    image: "/vcs/chamath.png",
    description: "Founder of Social Capital"
  }
];

export default function Home() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<number | null>(null);

  const handleVCSelect = (vcId: number) => {
    setSelectedVC(vcId);
    router.push(`/roast/${vcId}`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Select a VC to Roast
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vcs.map((vc) => (
            <motion.div
              key={vc.id}
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleVCSelect(vc.id)}
            >
              <div className="aspect-square mb-4 bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={vc.image}
                  alt={vc.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{vc.name}</h2>
              <p className="text-gray-400">{vc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 