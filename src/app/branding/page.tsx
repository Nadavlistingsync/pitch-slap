'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const fontOptions = [
  { name: 'Inter', value: 'inter' },
  { name: 'Roboto', value: 'roboto' },
  { name: 'Open Sans', value: 'open-sans' },
  { name: 'Montserrat', value: 'montserrat' },
];

const styleOptions = [
  { name: 'Modern', value: 'modern' },
  { name: 'Minimal', value: 'minimal' },
  { name: 'Corporate', value: 'corporate' },
  { name: 'Creative', value: 'creative' },
];

export default function BrandingPage() {
  const router = useRouter();
  const [primaryColor, setPrimaryColor] = useState('#4F46E5');
  const [secondaryColor, setSecondaryColor] = useState('#818CF8');
  const [selectedFont, setSelectedFont] = useState('inter');
  const [selectedStyle, setSelectedStyle] = useState('modern');

  const handleContinue = () => {
    // In a real app, we would save these settings
    router.push('/style');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customize Your Branding
          </h1>
          <p className="text-lg text-gray-600">
            Choose your colors, fonts, and style to make your pitch deck uniquely yours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Color</h3>
              <div className="flex items-center space-x-4">
                <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                <div className="flex-1">
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Secondary Color</h3>
              <div className="flex items-center space-x-4">
                <HexColorPicker color={secondaryColor} onChange={setSecondaryColor} />
                <div className="flex-1">
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Family</h3>
              <div className="grid grid-cols-2 gap-4">
                {fontOptions.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => setSelectedFont(font.value)}
                    className={`p-4 rounded-lg border ${
                      selectedFont === font.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={`font-${font.value}`}>{font.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Style</h3>
              <div className="grid grid-cols-2 gap-4">
                {styleOptions.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setSelectedStyle(style.value)}
                    className={`p-4 rounded-lg border ${
                      selectedStyle === style.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            Continue to Style Selection
          </motion.button>
        </div>
      </div>
    </main>
  );
} 