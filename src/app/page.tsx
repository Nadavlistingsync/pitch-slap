"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const vcs = [
  {
    id: "jean-de-la-rochebrochard",
    name: "Jean de La Rochebrochard",
    firm: "Kima Ventures",
    knownFor: "High-velocity investing (600+ startups), founder-first approach",
    stage: "Pre-seed, Seed",
    whyFoundersCare: "Fast yes/no decisions. Clear communication. No BS.",
    vibe: "Twitter-native, blunt, speed-obsessed operator",
  },
  {
    id: "pauline-roux",
    name: "Pauline Roux",
    firm: "Elaia Partners",
    knownFor: "B2B SaaS + Deep Tech conviction, surgical due diligence",
    stage: "Seed to Series A",
    whyFoundersCare: "Operator-first feedback, honest support, sharp GTM critiques",
    vibe: "Quiet force, clear-eyed, precision over hype",
  },
  {
    id: "roxanne-varza",
    name: "Roxanne Varza",
    firm: "Station F",
    knownFor: "Community queen of French tech, founder enabler",
    stage: "Pre-seed ecosystem",
    whyFoundersCare: "Curator of who's who, powerful early-stage connector",
    vibe: "Visionary with IRL warmth and startup empathy",
  },
  {
    id: "guillaume-moubeche",
    name: "Guillaume Moubeche",
    firm: "Lemlist",
    knownFor: "Bootstrapped success, marketing-native founder, now angel/VC hybrid",
    stage: "Angel / pre-seed via Lemlist fund",
    whyFoundersCare: "Champion of underdogs, high-growth hacks, and ownership",
    vibe: "Internet-native, Gen Z-style hype meets founder grit",
  },
  {
    id: "partech",
    name: "Partech",
    firm: "Partech",
    knownFor: "Global firm with Paris HQ; strong B2B SaaS, fintech, climate",
    stage: "Seed to Series C",
    whyFoundersCare: "Institutional backing + operational support + global ambition",
    vibe: "Smart, structured, a bit formal but founder-centric",
  },
  {
    id: "y-combinator",
    name: "Y Combinator",
    firm: "Y Combinator",
    knownFor: "Launchpad of unicorns (Airbnb, Stripe, Reddit)",
    stage: "Pre-seed, Seed",
    whyFoundersCare: "World-class signal. The YC badge alone opens doors to follow-on capital.",
    vibe: "Blunt, pragmatic, growth-obsessed",
  },
  {
    id: "andreessen-horowitz",
    name: "Andreessen Horowitz (a16z)",
    firm: "Andreessen Horowitz",
    knownFor: "Big bets, big checks, and content-rich thought leadership",
    stage: "Seed to Series C+",
    whyFoundersCare: "Top-tier distribution, talent network, and massive capital",
    vibe: "Intellectual, polished, often thesis-first",
  },
  {
    id: "boxgroup",
    name: "BoxGroup (David Tisch, Nimi Katragadda)",
    firm: "BoxGroup",
    knownFor: "Quiet power players of NYC pre-seed scene",
    stage: "Pre-seed, Seed",
    whyFoundersCare: "They move fast, don't over-engineer deals, and co-invest with everyone",
    vibe: "Chill, smart, operator-friendly",
  },
  {
    id: "lerer-hippeau",
    name: "Lerer Hippeau",
    firm: "Lerer Hippeau",
    knownFor: "NYC DTC + SaaS engine; backers of Glossier, Warby Parker, Allbirds",
    stage: "Pre-seed, Seed",
    whyFoundersCare: "Strong support on brand, storytelling, and go-to-market",
    vibe: "Brand-builder brain meets savvy NYC operator",
  },
];

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Select Your VC Roaster</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vcs.map((vc) => (
            <button
              key={vc.id}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                selected === vc.id
                  ? "border-pink-500 bg-pink-500/10"
                  : "border-gray-700 hover:border-pink-500/50 hover:bg-gray-800/50"
              }`}
              onClick={() => {
                setSelected(vc.id);
                router.push(`/upload?vc=${vc.id}`);
              }}
            >
              <h2 className="text-2xl font-semibold mb-2">{vc.name}</h2>
              <p className="text-pink-400 mb-1">{vc.firm}</p>
              <p className="text-gray-300 mb-1">{vc.knownFor}</p>
              <p className="text-gray-400 text-sm mb-1">Stage: {vc.stage}</p>
              <p className="text-gray-400 text-sm mb-1">Why founders care: {vc.whyFoundersCare}</p>
              <p className="text-gray-500 italic text-sm">Vibe: {vc.vibe}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
} 