'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const vcs = [
  {
    id: 1,
    name: "Jean de La Rochebrochard",
    image: "/vcs/jean.png",
    description: "Kima Ventures - High-velocity investing, founder-first approach",
    personality: "Twitter-native, blunt, speed-obsessed operator"
  },
  {
    id: 2,
    name: "Pauline Roux",
    image: "/vcs/pauline.png",
    description: "Elaia Partners - B2B SaaS + Deep Tech conviction",
    personality: "Quiet force, clear-eyed, precision over hype"
  },
  {
    id: 3,
    name: "Roxanne Varza",
    image: "/vcs/roxanne.png",
    description: "Station F - Community queen of French tech",
    personality: "Visionary with IRL warmth and startup empathy"
  },
  {
    id: 4,
    name: "Guillaume Moubeche",
    image: "/vcs/guillaume.png",
    description: "Lemlist - Bootstrapped success, marketing-native founder",
    personality: "Internet-native, Gen Z-style hype meets founder grit"
  },
  {
    id: 5,
    name: "Partech",
    image: "/vcs/partech.png",
    description: "Global firm with Paris HQ - B2B SaaS, fintech, climate",
    personality: "Smart, structured, a bit formal but founder-centric"
  },
  {
    id: 6,
    name: "Y Combinator",
    image: "/vcs/yc.png",
    description: "Launchpad of unicorns (Airbnb, Stripe, Reddit)",
    personality: "Blunt, pragmatic, growth-obsessed"
  },
  {
    id: 7,
    name: "Andreessen Horowitz",
    image: "/vcs/a16z.png",
    description: "Big bets, big checks, content-rich thought leadership",
    personality: "Intellectual, polished, often thesis-first"
  },
  {
    id: 8,
    name: "BoxGroup",
    image: "/vcs/boxgroup.png",
    description: "Quiet power players of NYC pre-seed scene",
    personality: "Chill, smart, operator-friendly"
  },
  {
    id: 9,
    name: "Lerer Hippeau",
    image: "/vcs/lerer.png",
    description: "NYC DTC + SaaS engine - Glossier, Warby Parker, Allbirds",
    personality: "Brand-builder brain meets savvy NYC operator"
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