'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import VCSelector from './components/VCSelector';

export default function Home() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<string>('');
  const [showUpload, setShowUpload] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      // Store the selected VC in localStorage for use in the upload process
      localStorage.setItem('selectedVC', selectedVC);
      router.push('/upload');
    }
  }, [router, selectedVC]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    },
    multiple: false,
  });

  const handleVCSelect = (vcId: string) => {
    setSelectedVC(vcId);
    setShowUpload(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Flair */}
        <div className="absolute inset-0 bg-[#ff4154]/5">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#2e2e2e] tracking-tight">
              Get Roasted.
              <br />
              <span className="text-[#ff4154]">Get Funded.</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Upload your pitch deck and get brutally honest feedback from AI-powered VCs. Transform your pitch and increase your chances of getting funded.
            </p>
          </div>
        </div>
      </div>

      {/* VC Selection Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <VCSelector onSelect={handleVCSelect} />
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div
              {...getRootProps()}
              className={`mt-10 p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragActive ? 'border-[#ff4154] bg-[#ff4154]/5' : 'border-gray-300 hover:border-[#ff4154]'
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
                  <p className="text-lg font-medium">Drop your pitch deck here</p>
                  <p className="text-sm">or click to select a file</p>
                  <p className="text-xs mt-2">Supports PDF and PPTX files</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-[#ff4154]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#ff4154]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Feedback</h3>
            <p className="text-gray-600">Get detailed feedback from AI-powered VCs who know what investors are looking for.</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-[#ff4154]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#ff4154]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
            <p className="text-gray-600">Get feedback in minutes, not days. No more waiting for investor meetings.</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-[#ff4154]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#ff4154]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
            <p className="text-gray-600">Get specific, actionable feedback based on successful pitch deck patterns.</p>
          </div>
        </div>
      </div>
    </main>
  );
} 