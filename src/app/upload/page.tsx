'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';

export default function UploadPage() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<{ name: string; firm: string } | null>(null);

  useEffect(() => {
    const storedVC = localStorage.getItem('selectedVC');
    if (!storedVC) {
      router.push('/feedback-style');
      return;
    }
    try {
      const parsedVC = JSON.parse(storedVC);
      setSelectedVC(parsedVC);
    } catch (error) {
      console.error('Error parsing stored VC:', error);
      router.push('/feedback-style');
    }
  }, [router]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      // Store the file in localStorage or state management
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem('pitchDeck', reader.result as string);
        router.push('/processing');
      };
      reader.readAsDataURL(file);
    }
  }, [router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    },
    multiple: false,
  });

  if (!selectedVC) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your Pitch Deck
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {selectedVC.name} from {selectedVC.firm} is ready to review your pitch deck.
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`max-w-2xl mx-auto p-12 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-500 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-gray-600">
              <p className="text-lg font-medium">
                {isDragActive ? 'Drop your file here' : 'Drag and drop your pitch deck here'}
              </p>
              <p className="text-sm">or click to select a file</p>
            </div>
            <p className="text-xs text-gray-500">
              Supports PDF and PPTX files
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 