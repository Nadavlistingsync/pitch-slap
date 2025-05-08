'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      router.push('/upload');
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="flex items-center justify-center gap-2 p-4 lg:p-0">
            <span className="text-4xl font-bold">PitchSlap</span>
          </div>
        </div>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-8">Get Your Pitch Deck Roasted</h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Upload your pitch deck and get brutally honest feedback from top VCs in their unique style.
          </p>
          <button
            onClick={() => router.push('/select')}
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            AI-Powered Design
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Get instant feedback on your pitch deck design and content.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Custom Branding
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Apply your brand colors and style to your pitch deck.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Export Options
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Download your pitch deck in multiple formats.
          </p>
        </div>
      </div>
    </main>
  );
} 