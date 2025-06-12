"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { vcs } from '../lib/vcs';

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