'use client';

import { useRouter } from 'next/navigation';
import VCPrompts from './components/VCPrompts';

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="text-center max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight">
          PITCH<br />SLAP<br />CLUB
        </h1>
        <p className="text-xl mt-6 text-gray-300">
          Bold takes, brutal honesty, and no-nonsense feedback for founders who can handle the truth.
        </p>
        <div className="mt-10">
          <button
            onClick={() => router.push('/upload')}
            className="inline-block bg-white text-black font-bold py-4 px-6 text-xl rounded-lg transition-all hover:bg-gray-200 hover:scale-105"
          >
            Pitch Roast →
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-center mb-12">Top VCs in Paris & NYC</h2>
          <VCPrompts />
        </div>
      </div>
    </main>
  );
} 