'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VCSelector from './components/VCSelector';

export default function Home() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<string>('');

  const handleVCSelect = (vcId: string) => {
    setSelectedVC(vcId);
    router.push('/upload');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get VC Feedback on Your Pitch Deck</h1>
          <p className="text-xl text-gray-600">
            Upload your pitch deck and get personalized feedback from top VCs
          </p>
        </div>

        <VCSelector onSelect={handleVCSelect} />
      </div>
    </main>
  );
} 