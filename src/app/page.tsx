'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VCSelector from './components/VCSelector';
import Hero from './components/Hero';
import VCGrid from './components/VCGrid';

export default function Home() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<string>('');

  const handleVCSelect = (vcId: string) => {
    setSelectedVC(vcId);
    router.push('/upload');
  };

  return (
    <main>
      <Hero />
      <VCGrid />
    </main>
  );
} 