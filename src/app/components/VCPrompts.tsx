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

const vcData = [
  {
    name: 'VC Name 1',
    comment: "This is a brutally good idea. Nobody else is doing it this raw. I'm in.",
    logo: 'https://via.placeholder.com/80x40?text=Logo+1'
  },
  {
    name: 'VC Name 2',
    comment: 'Finally, someone who tells it like it is. This is exactly what founders need.',
    logo: 'https://via.placeholder.com/80x40?text=Logo+2'
  },
  {
    name: 'VC Name 3',
    comment: 'The feedback is harsh but fair. It\'s what makes this platform unique.',
    logo: 'https://via.placeholder.com/80x40?text=Logo+3'
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
    <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
      {vcData.map((vc, i) => (
        <div
          key={i}
          className="bg-[#111] p-6 rounded-2xl w-full sm:w-[300px] text-left border border-gray-800"
        >
          <div className="text-lg font-semibold mb-2">{vc.name}</div>
          <p className="text-gray-400 text-sm">
            "{vc.comment}"
          </p>
          <div className="mt-4">
            <img
              src={vc.logo}
              alt={`${vc.name} logo`}
              className="h-6"
            />
          </div>
        </div>
      ))}
    </div>
  );
} 