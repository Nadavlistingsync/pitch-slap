'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUpload, FiFile } from 'react-icons/fi';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if VC is selected
    const selectedVC = localStorage.getItem('selectedVC');
    if (!selectedVC) {
      router.push('/select');
      return;
    }
  }, [router]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setLoading(true);
      console.log('Uploading file:', selectedFile.name);
      // Convert file to base64 and store in sessionStorage
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        sessionStorage.setItem('uploadedFile', base64);
        sessionStorage.setItem('uploadedFileName', selectedFile.name);
        console.log('File uploaded and stored, navigating to /roast-level');
        router.push('/roast-level');
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      if (droppedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(droppedFile);
      setError(null);
      setLoading(true);
      console.log('Uploading file:', droppedFile.name);
      // Convert file to base64 and store in sessionStorage
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        sessionStorage.setItem('uploadedFile', base64);
        sessionStorage.setItem('uploadedFileName', droppedFile.name);
        console.log('File uploaded and stored, navigating to /roast-level');
        router.push('/roast-level');
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Upload Your Pitch Deck</h1>
          <p className="text-gray-400">Upload your PDF pitch deck to get feedback</p>
        </motion.div>

        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            isDragging ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
              <span className="text-lg text-pink-500">Uploading and processing...</span>
            </div>
          ) : file ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-4">
                <FiFile className="w-8 h-8 text-pink-500" />
                <span className="text-lg">{file.name}</span>
              </div>
            </div>
          ) : (
            <div>
              <FiUpload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300 mb-4">
                Drag and drop your pitch deck here, or click to select
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium cursor-pointer inline-block"
              >
                Select File
              </label>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}
      </div>
    </main>
  );
} 