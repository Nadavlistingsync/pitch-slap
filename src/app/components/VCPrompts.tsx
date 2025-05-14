'use client';

import { useState } from 'react';

interface VC {
  name: string;
  firm: string;
  location: string;
  knownFor: string;
  stage: string;
  whyFoundersCare: string;
  vibe: string;
  podcasts: string[];
}

const vcs: VC[] = [
  {
    name: "Jean de La Rochebrochard",
    firm: "Kima Ventures",
    location: "🇫🇷 Paris",
    knownFor: "High-velocity investing (600+ startups), founder-first approach",
    stage: "Pre-seed, Seed",
    whyFoundersCare: "Fast yes/no decisions. Clear communication. No BS.",
    vibe: "Twitter-native, blunt, speed-obsessed operator",
    podcasts: [
      "GDIY Podcast with Jean de La Rochebrochard – 'Les secrets de Kima'",
      "Start to Scale – 'Investir vite, décider vite'",
      "Génération Do It Yourself – Ep. 164",
      "VCCast Podcast – Kima",
      "YouTube: Jean on Vivatech"
    ]
  },
  {
    name: "Pauline Roux",
    firm: "Elaia Partners",
    location: "🇫🇷 Paris",
    knownFor: "B2B SaaS + Deep Tech conviction, surgical due diligence",
    stage: "Seed to Series A",
    whyFoundersCare: "Operator-first feedback, honest support, sharp GTM critiques",
    vibe: "Quiet force, clear-eyed, precision over hype",
    podcasts: [
      "Finscale Podcast – Pauline Roux",
      "La French Touch Conference Interview",
      "Elaia Partners YouTube Channel",
      "Investir dans la tech en 2024 – FrenchWeb",
      "VivaTech Talks – Female VC Leadership"
    ]
  },
  {
    name: "Roxanne Varza",
    firm: "Station F",
    location: "🇫🇷 Paris",
    knownFor: "Community queen of French tech, founder enabler",
    stage: "Pre-seed ecosystem",
    whyFoundersCare: "Curator of who's who, powerful early-stage connector",
    vibe: "Visionary with IRL warmth and startup empathy",
    podcasts: [
      "Roxanne on The Family 'How I Became a French Tech Icon'",
      "Roxanne on Outliers Podcast",
      "Femmes d'Influence Interview",
      "Station F Masterclass: Scaling from France",
      "VivaTech Keynote: Women in Tech"
    ]
  },
  {
    name: "Guillaume Moubeche",
    firm: "Lemlist",
    location: "🇫🇷 Paris",
    knownFor: "Bootstrapped success, marketing-native founder, now angel/VC hybrid",
    stage: "Angel / pre-seed via Lemlist fund",
    whyFoundersCare: "Champion of underdogs, high-growth hacks, and ownership",
    vibe: "Internet-native, Gen Z-style hype meets founder grit",
    podcasts: [
      "Guillaume on Indie Hackers",
      "Lemlist YouTube: $10M ARR Bootstrapped",
      "The SaaS Podcast",
      "Growth Makers Podcast (French)",
      "Marketing Mania with Stan Leloup"
    ]
  },
  {
    name: "Partech",
    firm: "Partech",
    location: "🇫🇷 Paris",
    knownFor: "Global firm with Paris HQ; strong B2B SaaS, fintech, climate",
    stage: "Seed to Series C",
    whyFoundersCare: "Institutional backing + operational support + global ambition",
    vibe: "Smart, structured, a bit formal but founder-centric",
    podcasts: [
      "Romain Lavault on SaaS Revolution",
      "Partech Shaker YouTube (Events & Panels)",
      "Romain Lavault on Station F Keynote",
      "Partech on Seed to Scale",
      "Web Summit Panel (Partech GP)"
    ]
  },
  {
    name: "Y Combinator",
    firm: "Y Combinator",
    location: "🇺🇸 NYC",
    knownFor: "Launchpad of unicorns (Airbnb, Stripe, Reddit)",
    stage: "Pre-seed, Seed",
    whyFoundersCare: "World-class signal. The YC badge alone opens doors to follow-on capital.",
    vibe: "Blunt, pragmatic, growth-obsessed",
    podcasts: [
      "Y Combinator Podcast – Official feed",
      "Startup School YouTube – Founder Q&As and investor talks",
      "Dalton Caldwell on Lenny's Podcast",
      "Michael Seibel on The Tim Ferriss Show",
      "YC YouTube: 'How to Apply to YC' + office hours"
    ]
  },
  {
    name: "Andreessen Horowitz",
    firm: "a16z",
    location: "🇺🇸 NYC",
    knownFor: "Big bets, big checks, and content-rich thought leadership",
    stage: "Seed to Series C+",
    whyFoundersCare: "Top-tier distribution, talent network, and massive capital",
    vibe: "Intellectual, polished, often thesis-first",
    podcasts: [
      "a16z Podcast – Official",
      "Ben Horowitz on Invest Like The Best",
      "Marc Andreessen on Lex Fridman",
      "Angela Strange on Fintech at a16z",
      "A16Z YouTube Channel"
    ]
  },
  {
    name: "BoxGroup",
    firm: "BoxGroup",
    location: "🇺🇸 NYC",
    knownFor: "Quiet power players of NYC pre-seed scene",
    stage: "Pre-seed, Seed",
    whyFoundersCare: "They move fast, don't over-engineer deals, and co-invest with everyone",
    vibe: "Chill, smart, operator-friendly",
    podcasts: [
      "David Tisch on 20VC",
      "Nimi Katragadda on Seed to Scale (Accel)",
      "David Tisch on Harry Stebbings",
      "BoxGroup portfolio + essays",
      "Nimi Katragadda on This Week in Startups"
    ]
  },
  {
    name: "Lerer Hippeau",
    firm: "Lerer Hippeau",
    location: "🇺🇸 NYC",
    knownFor: "NYC DTC + SaaS engine; backers of Glossier, Warby Parker, Allbirds",
    stage: "Pre-seed, Seed",
    whyFoundersCare: "Strong support on brand, storytelling, and go-to-market",
    vibe: "Brand-builder brain meets savvy NYC operator",
    podcasts: [
      "Ben Lerer on Masters of Scale",
      "Eric Hippeau on StrictlyVC",
      "Lerer Hippeau Medium Essays",
      "Managing Partner Andrea Hippeau on 20VC",
      "Lerer Hippeau YouTube channel"
    ]
  }
];

export default function VCPrompts() {
  const [selectedVC, setSelectedVC] = useState<VC | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVCs = vcs.filter(vc => 
    vc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vc.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vc.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search VCs..."
          className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-[#ff4154] focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVCs.map((vc) => (
          <div
            key={vc.name}
            className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => setSelectedVC(vc)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{vc.name}</h3>
                <p className="text-gray-400">{vc.firm}</p>
              </div>
              <span className="text-2xl">{vc.location}</span>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300"><span className="font-semibold">Known for:</span> {vc.knownFor}</p>
              <p className="text-gray-300"><span className="font-semibold">Stage:</span> {vc.stage}</p>
              <p className="text-gray-300"><span className="font-semibold">Why founders care:</span> {vc.whyFoundersCare}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedVC && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white">{selectedVC.name}</h2>
                <p className="text-xl text-gray-400">{selectedVC.firm}</p>
              </div>
              <button
                onClick={() => setSelectedVC(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
                <p className="text-gray-300">{selectedVC.location}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Known For</h3>
                <p className="text-gray-300">{selectedVC.knownFor}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Investment Stage</h3>
                <p className="text-gray-300">{selectedVC.stage}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Why Founders Care</h3>
                <p className="text-gray-300">{selectedVC.whyFoundersCare}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Vibe</h3>
                <p className="text-gray-300">{selectedVC.vibe}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Top Podcasts & Interviews</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {selectedVC.podcasts.map((podcast, index) => (
                    <li key={index}>{podcast}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 