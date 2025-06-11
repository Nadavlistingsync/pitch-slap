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
    if (!file || !vc) {
      setError('Please select a file and VC');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🔵 Upload: Starting file processing for:', file.name);
      let pitchDeckContent = '';
      
      try {
        if (file.type === 'application/pdf') {
          console.log('🔵 Upload: Processing PDF file');
          const arrayBuffer = await file.arrayBuffer();
          pitchDeckContent = new TextDecoder().decode(arrayBuffer);
          console.log('🔵 Upload: PDF content length:', pitchDeckContent.length);
        } else {
          console.log('🔵 Upload: Processing text file');
          pitchDeckContent = await file.text();
          console.log('🔵 Upload: Text content length:', pitchDeckContent.length);
        }

        if (!pitchDeckContent || pitchDeckContent.trim().length === 0) {
          throw new Error('The file appears to be empty or could not be read properly');
        }

        console.log('🔵 Upload: Content preview:', pitchDeckContent.substring(0, 200) + '...');
      } catch (readError) {
        console.error('❌ Upload: File reading error:', readError);
        throw new Error('Failed to read the file. Please make sure it\'s a valid PDF or text file.');
      }

      // Create a clean VC object
      const cleanVc = {
        name: vc.name,
        firm: vc.firm,
        knownFor: vc.knownFor,
        vibe: vc.vibe
      };

      console.log('🔵 Upload: Preparing API request with VC:', cleanVc);
      const requestBody = JSON.stringify({
        pitchDeck: pitchDeckContent,
        vc: cleanVc
      });

      console.log('🔵 Upload: Sending API request with content length:', requestBody.length);
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: requestBody,
      });

      console.log('🔵 Upload: Received API response status:', response.status);
      let data;
      try {
        const responseText = await response.text();
        console.log('🔵 Upload: Raw API response:', responseText.substring(0, 200) + '...');
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Upload: Failed to parse response:', parseError);
        throw new Error('Invalid response from server. Please try again.');
      }

      if (!response.ok) {
        console.error('❌ Upload: API error:', data.error);
        throw new Error(data.error || 'Failed to get feedback');
      }

      if (!data.roast || typeof data.roast !== 'string') {
        console.error('❌ Upload: Invalid feedback format:', data);
        throw new Error('Invalid feedback format received');
      }

      console.log('🔵 Upload: Successfully received feedback, length:', data.roast.length);

      // Store the result
      const result = {
        roast: data.roast,
        vc: cleanVc
      };

      sessionStorage.setItem('roastResult', JSON.stringify(result));
      sessionStorage.setItem('selectedVC', JSON.stringify(cleanVc));

      // Redirect to results page
      const encodedRoast = encodeURIComponent(data.roast);
      router.push(`/results?roast=${encodedRoast}`);
    } catch (error) {
      console.error('❌ Upload: Error in submission process:', error);
      
      let errorMessage = 'Failed to process your pitch deck. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        errorMessage = error.message || error.error || 'An unexpected error occurred';
      }
      
      setError(errorMessage);
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
            <label className="block mb-2">Upload a PDF or text file:</label>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800"
            />
          </div>
          <div>
            <label className="block mb-2">Or paste your pitch deck text:</label>
            <textarea
              value={text}
              onChange={handleTextChange}
              className="w-full h-32 p-2 border border-gray-600 rounded bg-gray-800"
              placeholder="Paste your pitch deck content here..."
            />
          </div>
          <div>
            <label className="block mb-2">Feedback Intensity:</label>
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800"
            >
              {intensities.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <div className="text-red-500">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || (!file && !text)}
            className={`w-full py-2 px-4 rounded ${
              loading || (!file && !text)
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-pink-500 hover:bg-pink-600'
            }`}
          >
            {loading ? 'Processing...' : 'Get Feedback'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadContent />
    </Suspense>
  );
} 