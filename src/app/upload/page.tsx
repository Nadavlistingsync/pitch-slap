"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const intensities = [
  { value: "gentle", label: "Gentle" },
  { value: "balanced", label: "Balanced" },
  { value: "brutal", label: "Brutal" },
];

// Helper function to safely stringify objects
function safeStringify(obj: any): string {
  try {
    // First try to stringify the object
    const str = JSON.stringify(obj);
    // If it's already a string, return it
    if (typeof obj === 'string') return obj;
    // If it's an object that stringifies to [object Object], handle it specially
    if (str === '[object Object]') {
      return JSON.stringify({
        ...obj,
        toString: undefined // Remove toString to prevent recursion
      });
    }
    return str;
  } catch (e) {
    console.error('Error stringifying object:', e);
    return JSON.stringify({ error: 'Failed to stringify object' });
  }
}

function UploadContent() {
  const router = useRouter();
  const params = useSearchParams();
  const vcId = params.get("vc");
  const vc = vcs.find((v) => v.id === vcId);

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [intensity, setIntensity] = useState("balanced");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!vc) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div>
          <h2 className="text-2xl font-bold mb-4">No VC selected</h2>
          <button className="bg-pink-500 px-4 py-2 rounded" onClick={() => router.push("/")}>Go Home</button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setText("");
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !vc) return;

    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: safeStringify({
          pitchDeck: text,
          vc: vc
        }),
      });

      let data;
      try {
        const text = await response.text();
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get feedback');
      }

      if (!data.roast || !data.vc) {
        throw new Error('Invalid response format');
      }

      // Create a clean result object
      const result = {
        roast: data.roast,
        vc: {
          id: data.vc.id || '',
          name: data.vc.name || '',
          knownFor: data.vc.knownFor || '',
          vibe: data.vc.vibe || ''
        }
      };

      // Store the result with safe serialization
      sessionStorage.setItem('roastResult', safeStringify(result));

      // Redirect to results page
      router.push(`/results?roast=${encodeURIComponent(data.roast)}`);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to get feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Upload Your Pitch Deck</h1>
        <h2 className="mb-2">Roaster: <span className="text-pink-400 font-semibold">{vc.name}</span></h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Upload PDF or paste text:</label>
            <input type="file" accept=".pdf,.txt" onChange={handleFileChange} className="mb-2" />
            <textarea
              className="w-full p-2 rounded bg-gray-800 text-white"
              rows={6}
              placeholder="Or paste your pitch deck text here..."
              value={text}
              onChange={handleTextChange}
            />
          </div>
          <div>
            <label className="block mb-2">Roast Intensity:</label>
            <div className="flex gap-4">
              {intensities.map((i) => (
                <label key={i.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="intensity"
                    value={i.value}
                    checked={intensity === i.value}
                    onChange={() => setIntensity(i.value)}
                  />
                  {i.label}
                </label>
              ))}
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="bg-pink-500 px-6 py-2 rounded text-white font-bold disabled:opacity-50"
            disabled={loading || (!file && !text)}
          >
            {loading ? "Roasting..." : "Get Roasted"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <UploadContent />
    </Suspense>
  );
} 