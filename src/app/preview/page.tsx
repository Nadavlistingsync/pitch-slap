'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const slides = [
  { id: 1, title: 'Introduction' },
  { id: 2, title: 'Problem Statement' },
  { id: 3, title: 'Solution' },
  { id: 4, title: 'Market Opportunity' },
  { id: 5, title: 'Business Model' },
  { id: 6, title: 'Team' },
  { id: 7, title: 'Financials' },
  { id: 8, title: 'Next Steps' },
];

export default function PreviewPage() {
  const router = useRouter();
  const [selectedSlide, setSelectedSlide] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // In a real app, we would trigger the actual download here
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const handleStartOver = () => {
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-6">
          <button
            onClick={() => router.push('/feedback-style')}
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Change VC
          </button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Transformed Deck
          </h1>
          <p className="text-lg text-gray-600">
            Preview your slides and download in your preferred format
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Slide Thumbnails */}
          <div className="lg:col-span-1 space-y-4">
            {slides.map((slide) => (
              <motion.div
                key={slide.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSlide(slide.id)}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-colors duration-200 ${
                  selectedSlide === slide.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="aspect-[4/3] bg-gray-100 rounded mb-2 flex items-center justify-center">
                  <span className="text-gray-400">Slide {slide.id}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{slide.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-400">Slide {selectedSlide} Preview</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartOver}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Start Over
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
                >
                  {isDownloading ? 'Downloading...' : 'Download Deck'}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 