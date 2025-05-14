'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-3xl w-full py-24">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight">
          PITCH<br />SLAP<br />CLUB
        </h1>
        <p className="text-xl mt-6 text-gray-300">
          Bold takes, brutal honesty, and no-nonsense feedback for founders who can handle the truth.
        </p>
        <div className="mt-10">
          <a
            href="#"
            className="inline-block bg-white text-black font-bold py-4 px-6 text-xl rounded-lg transition-all hover:bg-gray-200 hover:scale-105"
          >
            Pitch Roast →
          </a>
        </div>
      </div>
    </main>
  );
} 