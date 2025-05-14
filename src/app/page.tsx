'use client';

import { useRouter } from 'next/navigation';
import VCPrompts from './components/VCPrompts';

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="bg-black text-white min-h-screen font-sans">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4">
        <h1 className="text-6xl font-extrabold uppercase leading-tight tracking-tight">
          PITCH<br />SLAP<br />CLUB
        </h1>
        <p className="text-gray-400 text-lg mt-6 max-w-md">
          Bold takes, brutal honesty, and no-nonsense feedback for founders who can handle the truth.
        </p>
        <button
          onClick={() => router.push('/upload')}
          className="mt-10 bg-white text-black font-semibold text-lg px-6 py-3 rounded-full hover:bg-gray-200 transition-transform hover:scale-105"
        >
          Pitch Roast →
        </button>
      </section>

      {/* VCs Section */}
      <section className="bg-black text-center py-16 px-4 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-12">Top VCs in Paris & NYC</h2>
        <VCPrompts />
      </section>

      {/* Floating Feedback + Share */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 items-end z-50">
        <button 
          onClick={() => router.push('/feedback')}
          className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition"
        >
          💬 Feedback
        </button>
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Pitch Slap Club',
                text: 'Check out Pitch Slap Club - Get brutal feedback on your pitch!',
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition"
        >
          🔗 Share
        </button>
      </div>
    </main>
  );
} 