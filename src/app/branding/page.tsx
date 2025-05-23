'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const colorOptions = [
  { name: 'PitchSlap Red', value: '#ff4154', bg: 'bg-[#ff4154]' },
  { name: 'Deep Purple', value: '#a78bfa', bg: 'bg-[#a78bfa]' },
  { name: 'Ocean Blue', value: '#60a5fa', bg: 'bg-[#60a5fa]' },
  { name: 'Emerald', value: '#34d399', bg: 'bg-[#34d399]' },
  { name: 'Sunset', value: '#fbbf24', bg: 'bg-[#fbbf24]' },
];

const fontOptions = [
  { name: 'Inter', value: 'Inter', className: 'font-sans' },
  { name: 'Playfair Display', value: 'Playfair Display', className: 'font-serif' },
  { name: 'Space Grotesk', value: 'Space Grotesk', className: 'font-mono' },
];

export default function BrandingPage() {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]);
  const [previewText, setPreviewText] = useState('Your Brand Name');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Customize Your Brand</h1>
            <p className="text-xl text-gray-600">
              Choose your brand colors and typography to make your pitch deck stand out
            </p>
          </motion.div>

          {/* Preview Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card mb-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50" />
            <div className="relative z-10 p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <motion.h2 
                  className={`text-5xl font-bold mb-4 ${selectedFont.className}`}
                  style={{ color: selectedColor.value }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  {previewText}
                </motion.h2>
                <motion.p 
                  className="text-gray-600 text-lg"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Your brand, your style
                </motion.p>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-10 w-24 h-24 bg-[#ff4154]/10 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#a78bfa]/10 rounded-full blur-2xl animate-float-delayed" />
          </motion.div>

          {/* Color Selection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Color</h3>
            <div className="grid grid-cols-5 gap-4">
              {colorOptions.map((color) => (
                <motion.button
                  key={color.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedColor(color)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedColor.value === color.value
                      ? 'border-[#ff4154] shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <div className={`w-full h-full ${color.bg}`} />
                  </div>
                  <span className="block text-sm font-medium text-gray-700 mt-2">
                    {color.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Font Selection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
            <div className="grid grid-cols-3 gap-4">
              {fontOptions.map((font) => (
                <motion.button
                  key={font.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFont(font)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedFont.value === font.value
                      ? 'border-[#ff4154] shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`text-center ${font.className}`}>
                    <span className="block text-lg font-medium text-gray-900">
                      {font.name}
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">
                      Aa
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-end gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/roast')}
              className="px-6 py-3 bg-[#ff4154] text-white rounded-full font-medium hover:bg-[#ff6b6b] transition-colors group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Continue
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff4154] to-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 