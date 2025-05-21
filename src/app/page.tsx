'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const vcs = [
  {
    id: 1,
    name: "Sequoia Capital",
    image: "/vcs/sequoia.png",
    description: "Early-stage venture capital firm"
  },
  {
    id: 2,
    name: "Andreessen Horowitz",
    image: "/vcs/a16z.png",
    description: "Silicon Valley venture capital firm"
  },
  {
    id: 3,
    name: "Y Combinator",
    image: "/vcs/yc.png",
    description: "Startup accelerator and venture capital firm"
  },
  {
    id: 4,
    name: "Accel",
    image: "/vcs/accel.png",
    description: "Global venture capital firm"
  },
  {
    id: 5,
    name: "Kleiner Perkins",
    image: "/vcs/kleiner.png",
    description: "Venture capital firm focused on early-stage investments"
  },
  {
    id: 6,
    name: "First Round Capital",
    image: "/vcs/firstround.png",
    description: "Seed-stage venture capital firm"
  },
  {
    id: 7,
    name: "Benchmark",
    image: "/vcs/benchmark.png",
    description: "Venture capital firm investing in early-stage startups"
  },
  {
    id: 8,
    name: "Founders Fund",
    image: "/vcs/founders.png",
    description: "Venture capital firm founded by Peter Thiel"
  },
  {
    id: 9,
    name: "Greylock Partners",
    image: "/vcs/greylock.png",
    description: "Venture capital firm investing in consumer and enterprise software"
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