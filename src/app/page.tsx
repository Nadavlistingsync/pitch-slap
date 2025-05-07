'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        // TODO: Implement actual file upload logic
        router.push('/upload');
      }
    }
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Pitch Deck with AI
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Upload your pitch deck and let our AI-powered platform enhance your presentation with professional design suggestions and custom branding options.
          </p>
          <Link 
            href="/upload"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Design</h3>
            <p className="text-gray-600">Get intelligent suggestions to improve your deck's layout and visual appeal.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Branding</h3>
            <p className="text-gray-600">Apply your brand colors and style consistently across all slides.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Export Options</h3>
            <p className="text-gray-600">Download your enhanced deck in multiple formats including PPTX.</p>
          </div>
        </div>
      </div>
    </main>
  );
} 