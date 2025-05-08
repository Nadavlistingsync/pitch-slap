'use client';

import { useRouter } from 'next/navigation';
import VCSelector from '../components/VCSelector';

export default function SelectPage() {
  const router = useRouter();

  const handleVCSelect = (vc: { name: string; firm: string }) => {
    // Store the selected VC in localStorage
    localStorage.setItem('selectedVC', JSON.stringify(vc));
    // Navigate to the upload page
    router.push('/upload');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your VC Critic
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a venture capitalist to review your pitch deck with their unique perspective and style.
          </p>
        </div>

        <VCSelector onSelect={handleVCSelect} />
      </div>
    </main>
  );
} 