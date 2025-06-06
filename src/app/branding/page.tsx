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
  const selectedColor = colorOptions[0];
  const selectedFont = fontOptions[0];
  const previewText = 'Your Brand Name';

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Customize Your Brand</h1>
            <p className="text-xl text-gray-600">
              Choose your brand colors and typography to make your pitch deck stand out
            </p>
          </div>

          {/* Preview Section */}
          <div className="card mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50" />
            <div className="relative z-10 p-8">
              <div className="text-center">
                <h2 
                  className={`text-5xl font-bold mb-4 ${selectedFont.className}`}
                  style={{ color: selectedColor.value }}
                >
                  {previewText}
                </h2>
                <p className="text-gray-600 text-lg">
                  Your brand, your style
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-10 w-24 h-24 bg-[#ff4154]/10 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#a78bfa]/10 rounded-full blur-2xl animate-float-delayed" />
          </div>

          {/* Color Selection */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Color</h3>
            <div className="grid grid-cols-5 gap-4">
              {colorOptions.map((color) => (
                <div
                  key={color.value}
                  className={`relative p-4 rounded-xl border-2 ${color.value === selectedColor.value ? 'border-[#ff4154] shadow-lg scale-105' : 'border-gray-200'}`}
                >
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <div className={`w-full h-full ${color.bg}`} />
                  </div>
                  <span className="block text-sm font-medium text-gray-700 mt-2">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Font Selection */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
            <div className="grid grid-cols-3 gap-4">
              {fontOptions.map((font) => (
                <div
                  key={font.value}
                  className={`relative p-4 rounded-xl border-2 ${font.value === selectedFont.value ? 'border-[#ff4154] shadow-lg scale-105' : 'border-gray-200'}`}
                >
                  <div className={`text-center ${font.className}`}>
                    <span className="block text-lg font-medium text-gray-900">
                      {font.name}
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">
                      Aa
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons (static, no navigation) */}
          <div className="flex justify-end gap-4">
            <button
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium cursor-not-allowed opacity-50"
              disabled
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 bg-[#ff4154] text-white rounded-full font-medium opacity-50 cursor-not-allowed"
              disabled
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 