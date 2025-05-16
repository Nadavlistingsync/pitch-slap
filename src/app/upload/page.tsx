'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../components/LoadingScreen';
import { vcPrompts } from '@/lib/vcPrompts';

export default function UploadPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVC, setSelectedVC] = useState<string>('');
  const [roastIntensity, setRoastIntensity] = useState<'gentle' | 'balanced' | 'brutal'>('balanced');

  useEffect(() => {
    const vcId = localStorage.getItem('selectedVC');
    const intensity = localStorage.getItem('roastIntensity') as 'gentle' | 'balanced' | 'brutal';
    
    if (!vcId) {
      router.push('/select');
    } else {
      setSelectedVC(vcId);
      setRoastIntensity(intensity || 'balanced');
    }
  }, [router]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && selectedVC) {
      setIsLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('vcId', selectedVC);
      formData.append('roastIntensity', roastIntensity);

      try {
        const response = await fetch('/api/process', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        
        if (response.ok && data.success) {
          window.sessionStorage.setItem('processingResult', JSON.stringify(data));
          router.push('/processing');
        } else {
          const errorMessage = data.error || 'Failed to process your pitch deck.';
          setError(errorMessage);
          window.sessionStorage.setItem('processingResult', JSON.stringify({ error: errorMessage }));
          router.push('/processing');
        }
      } catch (error) {
        const errorMessage = 'An error occurred while processing your file. Please try again.';
        setError(errorMessage);
        window.sessionStorage.setItem('processingResult', JSON.stringify({ error: errorMessage }));
        router.push('/processing');
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedVC, roastIntensity, router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-powerpoint': ['.ppt']
    },
    maxFiles: 1,
    multiple: false
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const selectedVCData = vcPrompts.find(vc => vc.id === selectedVC);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upload Your Pitch Deck</h1>
          <p className="text-gray-400">Get brutally honest feedback from AI-powered VCs</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-8">
          <div className="bg-gray-800/50 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-4">Choose Your VC</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vcPrompts.map((vc) => (
                <button
                  key={vc.id}
                  onClick={() => setSelectedVC(vc.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedVC === vc.id
                      ? 'border-[#ff4154] bg-[#ff4154]/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <h3 className="text-lg font-medium text-white">{vc.name}</h3>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-4">Choose Feedback Intensity</h2>
            <div className="grid grid-cols-3 gap-4">
              {['gentle', 'balanced', 'brutal'].map((intensity) => (
                <button
                  key={intensity}
                  onClick={() => setRoastIntensity(intensity as 'gentle' | 'balanced' | 'brutal')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    roastIntensity === intensity
                      ? 'border-[#ff4154] bg-[#ff4154]/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <h3 className="text-lg font-medium text-white capitalize">{intensity}</h3>
                </button>
              ))}
            </div>
          </div>

          <div
            {...getRootProps()}
            className={`bg-gray-800/50 rounded-xl p-8 border-2 border-dashed transition-all ${
              isDragActive ? 'border-[#ff4154] bg-[#ff4154]/10' : 'border-gray-700'
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-xl font-semibold text-white mb-2">
                {isDragActive ? 'Drop your pitch deck here' : 'Drag & drop your pitch deck'}
              </h2>
              <p className="text-gray-400">
                or click to select a file (PDF, PPT, or PPTX)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 