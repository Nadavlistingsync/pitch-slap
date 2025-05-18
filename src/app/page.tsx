'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Zap, Upload, ClipboardCopy } from 'lucide-react';
import VCPersonalitySelector from '../components/VCPersonalitySelector';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [roastIntensity, setRoastIntensity] = useState<'gentle' | 'balanced' | 'brutal'>('balanced');
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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
    if (!file || !selectedPersonality) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('roastIntensity', roastIntensity);
    formData.append('personality', selectedPersonality);

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

  const handleCopy = () => {
    if (feedback) {
      navigator.clipboard.writeText(feedback);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8 relative overflow-hidden">
      <Hero />
      <div className="max-w-4xl mx-auto relative z-10 mt-[-80px]">
        {/* Glassmorphic Upload Card with animated overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card max-w-2xl mx-auto p-8 mb-10 shadow-glass animate-fade-in relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-2xl opacity-40 pointer-events-none animate-float" />
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 relative z-10 ${
              isDragActive 
                ? 'border-purple-400 bg-purple-500/10' 
                : 'border-purple-500/50 hover:border-purple-400 hover:bg-white/5'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <Upload className="w-12 h-12 text-purple-400 animate-float" />
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
          {/* Roast Intensity */}
          <div className="mt-4">
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
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 focus-ring active-scale hover-lift shadow-lg ${
                    roastIntensity === value
                      ? 'bg-purple-600 text-white shadow-glow scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* VC Selector with carousel effect */}
          <div className="mt-8">
            <VCPersonalitySelector
              selectedPersonality={selectedPersonality}
              onPersonalitySelect={setSelectedPersonality}
              carousel
            />
          </div>
          {/* Roast Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!file || !selectedPersonality || loading}
            className="mt-8 w-full glass-button bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-glow hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active-scale tracking-wide"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="spinner" />
                Processing...
              </div>
            ) : (
              'Roast My Pitch Deck'
            )}
          </motion.button>
        </motion.div>
        {/* Feedback Card with confetti burst on copy */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 max-w-2xl mx-auto gradient-border animate-scale-in"
            >
              <div className="p-6 bg-white/10 rounded-xl border border-white/10 relative overflow-hidden">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  Feedback
                  <button
                    onClick={() => { handleCopy(); /* trigger confetti here */ }}
                    className="ml-2 glass-button px-2 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-white/20 transition-all duration-200 focus-ring"
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </h2>
                <p className="text-white/90 whitespace-pre-wrap leading-relaxed text-lg">{feedback}</p>
                {/* Confetti burst animation (conditionally rendered) */}
                {copied && <div className="absolute inset-0 pointer-events-none z-20 confetti-burst" />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Sticky TrustBar at the bottom */}
      <div className="fixed bottom-0 left-0 w-full z-30">
        <TrustBar />
      </div>
    </main>
  );
} 