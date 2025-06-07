'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const styleOptions = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, minimalist design with bold typography and ample white space',
    preview: '🎨',
    colors: ['#ff4154', '#a78bfa', '#60a5fa'],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional and polished look with subtle gradients and refined typography',
    preview: '💼',
    colors: ['#2e2e2e', '#4b5563', '#6b7280'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and vibrant design with dynamic layouts and playful elements',
    preview: '✨',
    colors: ['#f59e0b', '#10b981', '#8b5cf6'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Stripped-down aesthetic focusing on content and typography',
    preview: '⚪',
    colors: ['#18181b', '#27272a', '#3f3f46'],
  },
];

export default function StylePage() {
  const router = useRouter();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Choose Your Style</h1>
            <p className="text-xl text-gray-600">
              Select a design style that matches your brand&apos;s personality
            </p>
          </div>

          {/* Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {styleOptions.map((style) => (
              <div
                key={style.id}
              >
                <button
                  onClick={() => setSelectedStyle(style.id)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 ${
                    selectedStyle === style.id
                      ? 'border-[#ff4154] bg-[#ff4154]/5 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-16 h-16 rounded-xl bg-white shadow-lg flex items-center justify-center text-3xl"
                    >
                      {style.preview}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {style.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {style.description}
                      </p>
                      <div className="flex gap-2">
                        {style.colors.map((color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Preview Section */}
          {selectedStyle && (
            <div className="card mb-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50" />
              <div className="relative z-10 p-8">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4">
                    {styleOptions.find(s => s.id === selectedStyle)?.name} Style Preview
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {styleOptions.find(s => s.id === selectedStyle)?.description}
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-1/4 left-10 w-24 h-24 bg-[#ff4154]/10 rounded-full blur-2xl animate-float" />
              <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#a78bfa]/10 rounded-full blur-2xl animate-float-delayed" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => router.push('/branding')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => router.push('/roast')}
              className="px-6 py-3 bg-[#ff4154] text-white rounded-full font-medium hover:bg-[#ff6b6b] transition-colors group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Continue
                <span
                >
                  →
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff4154] to-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 