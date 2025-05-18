'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiArrowRight, FiCheck } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [stats, setStats] = useState({
    totalRoasts: 0,
    activeUsers: 0,
    successStories: 0
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setShowSuccess(true);
          setTimeout(() => {
            handleNext(acceptedFiles[0]);
          }, 1000);
        }
      }, 100);
    },
  });

  useEffect(() => {
    // Fetch stats from backend
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  const handleNext = (fileToProcess: File) => {
    if (fileToProcess) {
      const reader = new FileReader();
      reader.onload = function(e) {
        if (e.target?.result) {
          sessionStorage.setItem('uploadedFile', e.target.result as string);
          sessionStorage.setItem('uploadedFileName', fileToProcess.name);
        }
        router.push('/select');
      };
      reader.readAsDataURL(fileToProcess);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-64 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[80vw] h-[80vh] bg-gradient-to-tl from-[#ff4154]/20 to-transparent blur-3xl opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
              Get Your Pitch Deck<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Absolutely Roasted
              </span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
              Upload your pitch deck and get brutally honest feedback from real VCs. No sugar coating, just straight talk to help you raise your next round.
            </p>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mx-auto"
          >
            <div 
              className={`relative rounded-2xl p-8 border-2 border-dashed transition-all duration-300 ${
                isDragging 
                  ? 'border-pink-500 bg-pink-500/10' 
                  : 'border-gray-700 hover:border-pink-500/50'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const droppedFile = e.dataTransfer.files[0];
                if (droppedFile?.type === 'application/pdf') {
                  setFile(droppedFile);
                }
              }}
            >
              <div className="text-center">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-lg text-gray-300 mb-2">
                  {file ? file.name : 'Drag and drop your pitch deck here'}
                </p>
                <p className="text-sm text-gray-400">
                  or click to browse (PDF only)
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  }}
                />
              </div>
            </div>

            <button
              className={`w-full mt-6 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all
                flex items-center justify-center gap-2
                ${file ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}
              onClick={() => file && handleNext(file)}
              disabled={!file}
            >
              Next: Pick Your VC
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10"
          >
            <div className="text-4xl font-bold text-white mb-2">{stats.totalRoasts.toLocaleString()}+</div>
            <div className="text-gray-300">Pitch Decks Roasted</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10"
          >
            <div className="text-4xl font-bold text-white mb-2">{stats.activeUsers.toLocaleString()}+</div>
            <div className="text-gray-300">Active Founders</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10"
          >
            <div className="text-4xl font-bold text-white mb-2">{stats.successStories.toLocaleString()}+</div>
            <div className="text-gray-300">Success Stories</div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Founders Love Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-pink-500/50 transition-colors"
            >
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Brutal Honesty</h3>
              <p className="text-gray-300">Get real feedback from experienced VCs who tell it like it is.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-colors"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Actionable Insights</h3>
              <p className="text-gray-300">Receive specific, actionable feedback to improve your pitch.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-indigo-500/50 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Save Time</h3>
              <p className="text-gray-300">Get instant feedback without scheduling multiple VC meetings.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 