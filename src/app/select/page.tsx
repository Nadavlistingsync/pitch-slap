'use client';
import { useRouter } from 'next/navigation';
import VCSelector from '../components/VCSelector';

export default function SelectPage() {
  const router = useRouter();

  const handleSelect = (vcId: string) => {
    // Save selected VC and navigate to the next step (customize as needed)
    localStorage.setItem('selectedVC', vcId);
    router.push('/branding'); // or the next step in your flow
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <VCSelector onSelect={handleSelect} />
      </div>
    </main>
  );
} 