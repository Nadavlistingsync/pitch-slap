'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiArrowRight, FiCheck } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
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
    <main className="min-h-screen bg-gradient-to-b from-purple-800 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-4"
          >
            Get Roasted. Get Funded.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Upload your pitch deck and get brutally honest feedback from real VCs. No sugar coating, just straight talk to help you raise your next round.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 rounded-xl p-6 text-center"
          >
            <div className="text-4xl font-bold text-white mb-2">{stats.totalRoasts.toLocaleString()}+</div>
            <div className="text-gray-200">Pitch Decks Roasted</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 rounded-xl p-6 text-center"
          >
            <div className="text-4xl font-bold text-white mb-2">{stats.activeUsers.toLocaleString()}+</div>
            <div className="text-gray-200">Active Founders</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 rounded-xl p-6 text-center"
          >
            <div className="text-4xl font-bold text-white mb-2">{stats.successStories.toLocaleString()}+</div>
            <div className="text-gray-200">Success Stories</div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div 
            {...getRootProps()} 
            className={`
              border-2 border-dashed rounded-xl p-8 mb-6 cursor-pointer transition-all
              ${isDragActive ? 'border-pink-500 bg-pink-50/20' : 'border-white/30 bg-white/5'}
              hover:border-pink-500 hover:bg-pink-50/10
            `}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <FiUpload className="w-12 h-12 mx-auto mb-4 text-white/80" />
              {file ? (
                <div className="flex items-center justify-center gap-2 text-green-300">
                  <FiCheck className="w-5 h-5" />
                  <span className="text-lg">{file.name}</span>
                </div>
              ) : (
                <span className="text-lg text-white/80">
                  Drag & drop your PDF here, or click to select
                </span>
              )}
            </div>
          </div>

          {uploadProgress > 0 && (
            <div className="w-full bg-white/20 rounded-full h-2 mb-6">
              <motion.div
                className="bg-pink-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-green-300 mb-6"
              >
                File uploaded successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className={`
              w-full px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all
              flex items-center justify-center gap-2
              ${file ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-white/20 text-white/50 cursor-not-allowed'}
            `}
            onClick={() => file && handleNext(file)}
            disabled={!file}
          >
            Next: Pick Your VC
            <FiArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Why Founders Love Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Brutal Honesty</h3>
              <p className="text-gray-300">Get real feedback from experienced VCs who tell it like it is.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Actionable Insights</h3>
              <p className="text-gray-300">Receive specific, actionable feedback to improve your pitch.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/5 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Save Time</h3>
              <p className="text-gray-300">Get instant feedback without scheduling multiple VC meetings.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 