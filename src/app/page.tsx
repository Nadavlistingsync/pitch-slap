'use client';

import { useRouter } from 'next/navigation';
import VCPrompts from './components/VCPrompts';

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="text-center max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-7xl font-black tracking-tight leading-tight">
          PITCH<br />SLAP<br />CLUB
        </h1>
        <p className="text-xl mt-8 text-gray-400 max-w-xl mx-auto">
          Bold takes, brutal honesty, and no-nonsense feedback for founders who can handle the truth.
        </p>
        <div className="mt-12">
          <button
            onClick={() => router.push('/upload')}
            className="btn-primary"
          >
            Pitch Roast →
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-16">Top VCs in Paris & NYC</h2>
          <VCPrompts />
        </div>
      </div>
    </main>
  );
} 