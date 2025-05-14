'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoastPage() {
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
    router.push('/processing');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Glowing Flame Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative text-6xl">🔥</div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
          ROAST
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl mb-12">
          Drop your pitch deck and get brutally honest feedback from top VCs
        </p>

        {/* File Dropzone */}
        <div
          className={`w-full max-w-2xl p-8 rounded-2xl border-2 border-dashed transition-all duration-200 ${
            isDragging
              ? 'border-red-500 bg-red-500/10'
              : 'border-gray-700 hover:border-gray-600'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="text-4xl mb-4">📄</div>
            <p className="text-lg text-gray-300 mb-2">
              Drag and drop your pitch deck here
            </p>
            <p className="text-sm text-gray-500">
              PDF, PPTX, or Keynote files up to 10MB
            </p>
          </div>
        </div>

        {/* Floating Feedback Bubbles */}
        <div className="fixed left-6 bottom-6 flex flex-col gap-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-xs">
            <p className="text-sm text-gray-300">
              "This is exactly what I needed. Brutal but fair feedback!"
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-xs">
            <p className="text-sm text-gray-300">
              "The VCs here don't sugarcoat anything. Love it!"
            </p>
          </div>
        </div>

        <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-xs">
            <p className="text-sm text-gray-300">
              "Finally, someone who tells it like it is!"
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-xs">
            <p className="text-sm text-gray-300">
              "The feedback helped me pivot my pitch completely."
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 