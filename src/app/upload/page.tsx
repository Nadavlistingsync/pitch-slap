'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedVC, setSelectedVC] = useState<string | null>(null);

  useEffect(() => {
    const vc = localStorage.getItem('selectedVC');
    if (!vc) {
      router.push('/');
    } else {
      setSelectedVC(vc);
    }
  }, [router]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      localStorage.setItem('pitchDeck', file.name);
      router.push('/processing');
    }
  }, [router]);

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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Upload Your Pitch Deck</h1>
          <p className="text-xl text-gray-600">
            Get feedback from {selectedVC === 'sequoia' ? 'Sequoia Capital' :
              selectedVC === 'andreessen' ? 'Andreessen Horowitz' :
              selectedVC === 'accel' ? 'Accel' :
              'Y Combinator'}
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`card border-2 border-dashed transition-all duration-200 cursor-pointer
            ${isDragActive ? 'border-[#ff4154] bg-[#ff4154]/5' : 'border-gray-300 hover:border-[#ff4154]/50'}
            ${isDragging ? 'scale-105' : ''}`}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#ff4154]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#ff4154]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <input {...getInputProps()} />
            <p className="text-lg font-semibold text-[#2e2e2e] mb-2">
              {isDragActive ? 'Drop your pitch deck here' : 'Drag & drop your pitch deck'}
            </p>
            <p className="text-gray-500">
              Supports PDF, PPT, and PPTX files
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By uploading your pitch deck, you agree to our{' '}
            <a href="#" className="text-[#ff4154] hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-[#ff4154] hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </main>
  );
} 