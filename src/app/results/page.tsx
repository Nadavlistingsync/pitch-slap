"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const [roast, setRoast] = useState<string>("");
  const [vc, setVc] = useState<any>(null);
  const [intensity, setIntensity] = useState<string>("");
  const [pitchDeck, setPitchDeck] = useState<string>("");

  useEffect(() => {
    const data = sessionStorage.getItem("roastResult");
    if (data) {
      const parsed = JSON.parse(data);
      setRoast(parsed.roast);
      setVc(parsed.vc);
      setIntensity(parsed.intensity);
      setPitchDeck(parsed.pitchDeck);
    }
  }, []);

  if (!roast || !vc) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div>
          <h2 className="text-2xl font-bold mb-4">No roast result found</h2>
          <button className="bg-pink-500 px-4 py-2 rounded" onClick={() => router.push("/")}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Your VC Roast</h1>
        <h2 className="mb-2">Roaster: <span className="text-pink-400 font-semibold">{vc.name}</span></h2>
        <div className="mb-4">
          <span className="bg-pink-700 px-3 py-1 rounded-full text-sm font-semibold">Intensity: {intensity}</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 mb-6 whitespace-pre-line">
          {roast}
        </div>
        <button
          className="bg-purple-600 px-6 py-2 rounded text-white font-bold"
          onClick={() => router.push(`/ego-dump?vc=${vc.id}`)}
        >
          Go to Ego Dump
        </button>
      </div>
    </main>
  );
} 