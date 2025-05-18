'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiInfo } from 'react-icons/fi';
import VCSelector from '../components/VCSelector';

const roastLevels = [
  { value: 'gentle', label: 'Gentle', description: 'Constructive feedback with a soft touch' },
  { value: 'balanced', label: 'Balanced', description: 'Mix of tough love and helpful advice' },
  { value: 'brutal', label: 'Brutal', description: 'No holds barred, prepare for impact' },
];

const feedbackStyles = [
  { value: 'helpful', label: 'Helpful VC', description: 'Focus on actionable improvements' },
  { value: 'brutal', label: 'Brutal Honesty', description: 'Direct and unfiltered feedback' },
  { value: 'roast', label: 'Roast Mode', description: 'Maximum entertainment value' },
  { value: 'wildcard', label: 'Wildcard', description: 'Surprise me with any style' },
];

export default function SelectPage() {
  const router = useRouter();
  const [roastLevel, setRoastLevel] = useState('balanced');
  const [feedbackStyle, setFeedbackStyle] = useState('helpful');
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get the uploaded file name from sessionStorage
    const storedFileName = sessionStorage.getItem('uploadedFileName');
    if (storedFileName) {
      setFileName(storedFileName);
    } else {
      // No file found, redirect to home
      router.push('/');
    }
  }, [router]);

  const handleContinue = () => {
    if (!selectedVC || !userName.trim()) return;
    localStorage.setItem('selectedVC', selectedVC);
    localStorage.setItem('roastLevel', roastLevel);
    localStorage.setItem('feedbackStyle', feedbackStyle);
    localStorage.setItem('userName', userName.trim());
    router.push('/wait');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Customize Your Feedback
          </h2>
          <p className="text-xl text-gray-300">
            Select your preferred VC and feedback style for {fileName}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Roast Intensity</h3>
            <div className="space-y-4">
              {roastLevels.map(level => (
                <div
                  key={level.value}
                  className="relative"
                  onMouseEnter={() => setShowTooltip(level.value)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <button
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all ${
                      roastLevel === level.value
                        ? 'bg-pink-500 text-white'
                        : 'bg-white/20 text-white hover:bg-pink-400/40'
                    }`}
                    onClick={() => setRoastLevel(level.value)}
                  >
                    {level.label}
                  </button>
                  <AnimatePresence>
                    {showTooltip === level.value && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                      >
                        {level.description}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Feedback Style</h3>
            <div className="space-y-4">
              {feedbackStyles.map(style => (
                <div
                  key={style.value}
                  className="relative"
                  onMouseEnter={() => setShowTooltip(style.value)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <button
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all ${
                      feedbackStyle === style.value
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/20 text-white hover:bg-indigo-400/40'
                    }`}
                    onClick={() => setFeedbackStyle(style.value)}
                  >
                    {style.label}
                  </button>
                  <AnimatePresence>
                    {showTooltip === style.value && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                      >
                        {style.description}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Select Your VC</h3>
          <VCSelector onSelect={setSelectedVC} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/10 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Your Name</h3>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl font-medium bg-white/80 text-gray-900 placeholder-gray-400 mb-2"
            placeholder="Enter your name (for personalization)"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            maxLength={40}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <button
            className={
              `px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all flex items-center gap-2 ${selectedVC && userName.trim() ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-white/20 text-white/50 cursor-not-allowed'}`
            }
            onClick={handleContinue}
            disabled={!selectedVC || !userName.trim()}
          >
            Continue
            <FiArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </main>
  );
} 