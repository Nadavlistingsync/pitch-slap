'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../components/LoadingScreen';
import { vcPrompts } from '@/lib/vcPrompts';

export default function UploadPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [roastIntensity, setRoastIntensity] = useState<'gentle' | 'balanced' | 'brutal'>('balanced');
  const [isLoading, setIsLoading] = useState(false);

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
          window.sessionStorage.setItem('processingResult', JSON.stringify({ error: data.error || 'Failed to process your pitch deck.' }));
          router.push('/processing');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error processing file:', error);
        window.sessionStorage.setItem('processingResult', JSON.stringify({ error: 'An error occurred while processing your file. Please try again.' }));
        router.push('/processing');
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
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upload Your Pitch Deck</h1>
          <p className="text-xl text-gray-400">
            {selectedVCData ? (
              <>
                Get roasted by <span className="text-[#ff4154]">{selectedVCData.name}</span> from{' '}
                <span className="text-[#ff4154]">{selectedVCData.firm}</span>
              </>
            ) : (
              'Upload your pitch deck to get started'
            )}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Roast Intensity: <span className="capitalize text-[#ff4154]">{roastIntensity}</span>
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
            isDragActive
              ? 'border-[#ff4154] bg-[#ff4154]/5'
              : 'border-gray-700 hover:border-gray-600'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="text-6xl mb-4">📄</div>
            {isDragActive ? (
              <p className="text-xl text-[#ff4154]">Drop your pitch deck here</p>
            ) : (
              <>
                <p className="text-xl text-white">Drag and drop your pitch deck here</p>
                <p className="text-gray-400">or click to select a file</p>
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: PDF, PPT, PPTX
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/select')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Choose a different VC
          </button>
        </div>
      </div>
    </main>
  );
} 