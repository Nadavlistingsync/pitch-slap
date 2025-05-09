'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../components/LoadingScreen';

export default function UploadPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const vcId = localStorage.getItem('selectedVC');
    if (!vcId) {
      router.push('/');
    } else {
      setSelectedVC(vcId);
    }
  }, [router]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && selectedVC) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('vcId', selectedVC);

      try {
        const response = await fetch('/api/process', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          window.sessionStorage.setItem('processingResult', await response.text());
          router.push('/processing');
        } else {
          alert('Failed to process your pitch deck. Please try again.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error processing file:', error);
        alert('An error occurred while processing your file. Please try again.');
        setIsLoading(false);
      }
    }
  }, [router, selectedVC]);

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

  if (!selectedVC) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Pitch Deck</h1>
            <p className="text-lg text-gray-600">
              Drop your pitch deck here or click to browse
            </p>
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-[#ff4154] bg-[#ff4154]/5' : 'border-gray-300 hover:border-[#ff4154]/50'}`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-[#ff4154]/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#ff4154]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {isDragActive ? 'Drop your file here' : 'Drag and drop your pitch deck'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports PDF and PowerPoint files
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingScreen />}
    </main>
  );
} 