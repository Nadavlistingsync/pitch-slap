import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-[#ff4154] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Pitch</h2>
          <p className="text-gray-600 text-center">
            Our AI is carefully reviewing your pitch deck. This might take a moment...
          </p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#ff4154] h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 