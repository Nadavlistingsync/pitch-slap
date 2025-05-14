'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 py-20">
      <div className="w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-xl" style={{fontFamily: 'Inter, sans-serif'}}>PITCH SLAP CLUB</h1>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#ff4154]">Get Your Pitch Deck Roasted</h2>
        <p className="text-lg md:text-2xl text-gray-300 mb-10 font-medium">Brutally honest, VC-style feedback. No sugar coating. Upload your deck and get roasted by the best.</p>
        <button
          className="bg-[#ff4154] hover:bg-[#ff6b6b] text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-200 tracking-wide flex items-center gap-2 mx-auto"
          onClick={() => router.push('/upload')}
        >
          Pitch Roast <span className="text-2xl">→</span>
        </button>
      </div>
    </main>
  );
} 