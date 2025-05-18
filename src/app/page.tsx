'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import VCPersonalitySelector from '../components/VCPersonalitySelector';

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
  });

  const handleNext = () => {
    if (file) {
      // Persist file in sessionStorage for later steps
      const reader = new FileReader();
      reader.onload = function(e) {
        if (e.target?.result) {
          // Store as base64 string
          sessionStorage.setItem('uploadedFile', e.target.result as string);
          sessionStorage.setItem('uploadedFileName', file.name);
        }
        // Navigate to next step
        router.push('/select');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-800 to-indigo-900 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto text-center p-8 rounded-2xl bg-white/10 shadow-xl">
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">Get Roasted. Get Funded.</h1>
        <p className="text-xl text-gray-200 mb-8">Upload your pitch deck and get brutally honest feedback from real VCs. No sugar coating, just straight talk to help you raise your next round.</p>
        <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 mb-6 cursor-pointer transition-all ${isDragActive ? 'border-pink-500 bg-pink-50/20' : 'border-white/30 bg-white/5'}`}>
          <input {...getInputProps()} />
          {file ? (
            <span className="text-lg text-green-300">{file.name} uploaded!</span>
          ) : (
            <span className="text-lg text-white/80">Drag & drop your PDF here, or click to select</span>
          )}
        </div>
        <button
          className={`mt-4 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all bg-pink-500 text-white hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={handleNext}
          disabled={!file}
        >
          Next: Pick Your VC
        </button>
      </div>
    </main>
  );
} 