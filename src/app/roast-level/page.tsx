"use client";
import { useEffect, useState } from "react";

export default function RoastLevelPage() {
  const [selectedVC, setSelectedVC] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedVC(localStorage.getItem("selectedVC"));
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a]">
      <h1 className="text-4xl font-bold text-white mb-4">Roast Level Page</h1>
      {selectedVC ? (
        <p className="text-lg text-gray-300">Selected VC: <span className="font-mono text-pink-400">{selectedVC}</span></p>
      ) : (
        <p className="text-lg text-gray-400">No VC selected.</p>
      )}
      <p className="mt-8 text-gray-500">(You can customize this page with your roast level selection UI.)</p>
    </main>
  );
} 