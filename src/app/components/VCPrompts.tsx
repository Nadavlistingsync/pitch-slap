'use client';

import { useState } from 'react';
import { Search, MapPin, Building2, Award, Users, MessageSquare } from 'lucide-react';
import { realVCPersonalities } from '../../types/realVCPersonalities';
import { useRouter } from 'next/navigation';

interface VC {
  id: string;
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
    id: "jean-de-la-rochebrochard",
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
    id: "pauline-roux",
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
    id: "roxanne-varza",
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
    id: "guillaume-moubeche",
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
    id: "partech",
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
    id: "y-combinator",
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
    id: "andreessen-horowitz",
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
    id: "nyc-operator-vc",
    name: "NYC Operator VC",
    firm: "NYC Operator VC",
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
    id: "lerer-hippeau",
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
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<VC | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVCs = vcs.filter(vc => 
    vc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vc.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vc.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search VCs by name, firm, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12"
          />
        </div>
      </div>

      {/* VC Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVCs.map((vc) => (
          <div
            key={vc.id}
            className="card hover-lift cursor-pointer transition-all duration-300"
            onClick={() => router.push(`/roast/${vc.id}`)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{vc.name}</h3>
                <div className="flex items-center text-gray-400 text-sm gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{vc.firm}</span>
                </div>
              </div>
              <div className="text-sm font-medium px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400">
                {vc.stage}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <span className="text-sm text-gray-300">{vc.location}</span>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-gray-400 mt-1" />
                <span className="text-sm text-gray-300">{vc.knownFor}</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-gray-400 mt-1" />
                <span className="text-sm text-gray-300">{vc.whyFoundersCare}</span>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400 mt-1" />
                <span className="text-sm text-gray-300">{vc.vibe}</span>
              </div>
            </div>

            {/* Podcasts */}
            <div className="mt-4 pt-4 border-t border-gray-800/50">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Featured Podcasts</h4>
              <div className="space-y-2">
                {vc.podcasts.slice(0, 2).map((podcast, i) => (
                  <div key={i} className="text-sm text-gray-500 line-clamp-1">
                    {podcast}
                  </div>
                ))}
                {vc.podcasts.length > 2 && (
                  <div className="text-sm text-indigo-400">
                    +{vc.podcasts.length - 2} more
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VC Detail Modal */}
      {selectedVC && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedVC.name}</h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <Building2 className="w-4 h-4" />
                  <span>{selectedVC.firm}</span>
                  <span className="mx-2">•</span>
                  <MapPin className="w-4 h-4" />
                  <span>{selectedVC.location}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedVC(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Known For</h3>
                <p className="text-gray-300">{selectedVC.knownFor}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Investment Stage</h3>
                <p className="text-gray-300">{selectedVC.stage}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Why Founders Care</h3>
                <p className="text-gray-300">{selectedVC.whyFoundersCare}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Vibe</h3>
                <p className="text-gray-300">{selectedVC.vibe}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Featured Podcasts</h3>
                <ul className="space-y-2">
                  {selectedVC.podcasts.map((podcast, i) => (
                    <li key={i} className="text-gray-300 text-sm">
                      {podcast}
                    </li>
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