'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Zap, Upload } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [roastIntensity, setRoastIntensity] = useState<'gentle' | 'balanced' | 'brutal'>('balanced');
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    }
  });

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('roastIntensity', roastIntensity);

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setFeedback(data.feedback);
      } else {
        setFeedback('Error: ' + data.error);
      }
    } catch (error) {
      setFeedback('Error processing file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-64 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[80vw] h-[80vh] bg-gradient-to-tl from-purple-500/20 to-transparent blur-3xl opacity-40" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
            Pitch Deck Roaster
          </h1>
          <p className="text-xl text-gray-300">
            Get brutally honest feedback from AI-powered VCs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive 
                ? 'border-purple-400 bg-purple-500/10' 
                : 'border-purple-500/50 hover:border-purple-400 hover:bg-white/5'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <Upload className="w-12 h-12 text-purple-400" />
              {file ? (
                <div className="text-white">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="text-white">
                  <p className="font-medium">Drag & drop your pitch deck here</p>
                  <p className="text-sm text-gray-400">or click to select a PDF file</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-white mb-3 font-medium">Roast Intensity:</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'gentle', label: 'Gentle', icon: Star },
                { value: 'balanced', label: 'Balanced', icon: Zap },
                { value: 'brutal', label: 'Brutal', icon: ArrowRight }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setRoastIntensity(value as any)}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 ${
                    roastIntensity === value
                      ? 'bg-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!file || loading}
            className="mt-8 w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              'Roast My Pitch Deck'
            )}
          </motion.button>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Feedback:</h2>
                <p className="text-white/90 whitespace-pre-wrap leading-relaxed">{feedback}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
} 