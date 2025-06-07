import React from 'react';
import Image from 'next/image';

export default function RoastsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Community Roasts</h1>
          <button className="btn-primary">
            Share Your Roast
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example roast card - replace with actual data */}
          <div className="card hover-glow">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/placeholder-vc.jpg"
                  alt="VC Name"
                  className="object-cover"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h3 className="font-medium text-white">VC Name</h3>
                <p className="text-sm text-gray-400">Firm Name</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Roast Title
            </h2>
            <p className="text-gray-400 mb-4">
              Roast content goes here...
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 hover:text-indigo-400">
                  <span>👍</span>
                  <span>42</span>
                </button>
                <button className="flex items-center gap-1 hover:text-indigo-400">
                  <span>💬</span>
                  <span>12</span>
                </button>
              </div>
              <span>2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 