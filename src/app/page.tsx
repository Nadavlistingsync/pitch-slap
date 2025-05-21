'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiUpload, FiArrowRight, FiCheck, FiStar, FiAward, FiTrendingUp } from 'react-icons/fi';
import RoastMeter from './components/RoastMeter';
import VCGrid from './components/VCGrid';
import TrustBar from './components/TrustBar';

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

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
        router.push('/feedback');
      };
      reader.readAsDataURL(fileToProcess);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-64 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 blur-3xl opacity-60"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[80vw] h-[80vh] bg-gradient-to-tl from-[#ff4154]/20 to-transparent blur-3xl opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 text-pink-500/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiStar size={40} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-purple-500/20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiAward size={40} />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/4 text-indigo-500/20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiTrendingUp size={40} />
        </motion.div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
        style={{ opacity, scale }}
      >
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-7xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white"
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Get Your Pitch Deck<br />
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Absolutely Roasted
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Upload your pitch deck and get brutally honest feedback from real VCs. No sugar coating, just straight talk to help you raise your next round.
            </motion.p>
          </motion.div>

          {/* Upload Section with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className={`relative rounded-2xl p-8 border-2 border-dashed transition-all duration-300 ${
                isDragging 
                  ? 'border-pink-500 bg-pink-500/10' 
                  : 'border-gray-700 hover:border-pink-500/50'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
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
              <motion.div 
                className="text-center"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="mb-4">
                  <motion.svg 
                    className="mx-auto h-12 w-12 text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </motion.svg>
                </div>
                <motion.p 
                  className="text-lg text-gray-300 mb-2"
                  animate={{
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {file ? file.name : 'Drag and drop your pitch deck here'}
                </motion.p>
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
              </motion.div>
            </motion.div>

            <motion.button
              className={`w-full mt-6 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all
                flex items-center justify-center gap-2
                ${file ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}
              onClick={() => file && handleNext(file)}
              disabled={!file}
              whileHover={file ? { scale: 1.02 } : {}}
              whileTap={file ? { scale: 0.98 } : {}}
            >
              Next: Get Feedback
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section with enhanced animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { value: stats.totalRoasts, label: "Pitch Decks Roasted", icon: FiStar, color: "pink" },
            { value: stats.activeUsers, label: "Active Founders", icon: FiAward, color: "purple" },
            { value: stats.successStories, label: "Success Stories", icon: FiTrendingUp, color: "indigo" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10"
              whileHover={{ 
                scale: 1.02,
                borderColor: `rgba(var(--${stat.color}-500), 0.5)`,
              }}
            >
              <motion.div 
                className={`text-4xl font-bold text-white mb-2`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.5 + index * 0.1
                }}
              >
                {stat.value.toLocaleString()}+
              </motion.div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Features Section with enhanced animations */}
        <div className="mt-20">
          <motion.h2 
            className="text-3xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Why Founders Love Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Brutal Honesty",
                description: "Get real feedback from experienced VCs who tell it like it is.",
                icon: FiStar,
                color: "pink"
              },
              {
                title: "Actionable Insights",
                description: "Receive specific, actionable feedback to improve your pitch.",
                icon: FiAward,
                color: "purple"
              },
              {
                title: "Save Time",
                description: "Get instant feedback without scheduling multiple VC meetings.",
                icon: FiTrendingUp,
                color: "indigo"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: `rgba(var(--${feature.color}-500), 0.5)`,
                }}
              >
                <motion.div 
                  className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center mb-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* How it Works Section */}
      <section className="max-w-5xl mx-auto py-24 px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Upload',
              desc: 'Drop your pitch deck (PDF) and get ready for the roast.',
              icon: <FiUpload className="w-10 h-10 text-pink-500" />,
            },
            {
              title: 'Get Roasted',
              desc: 'Receive brutally honest, actionable feedback from real VCs.',
              icon: <FiArrowRight className="w-10 h-10 text-purple-500" />,
            },
            {
              title: 'Level Up',
              desc: 'Use the feedback to improve and impress investors.',
              icon: <FiCheck className="w-10 h-10 text-indigo-500" />,
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              className="bg-white/5 rounded-2xl p-8 text-center shadow-xl card-hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.7 }}
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <div className="text-2xl font-bold mb-2 text-white">{step.title}</div>
              <div className="text-gray-300">{step.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RoastMeter Demo Section */}
      <section className="max-w-4xl mx-auto py-24 px-4 flex flex-col items-center">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 gradient-text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          See Your Roast Level
        </motion.h2>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <RoastMeter score={87} />
        </motion.div>
        <div className="mt-6 text-lg text-gray-400 text-center max-w-xl">
          Our AI + VC panel gives you a roast score and detailed feedback. The higher the score, the spicier the roast!
        </div>
      </section>

      {/* Featured VCs Section */}
      <section className="py-24 bg-gradient-to-br from-[#23272f]/60 to-[#18181b]/60">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Meet Some of Our VCs
        </motion.h2>
        <VCGrid />
      </section>

      {/* Animated Testimonials Section */}
      <section className="max-w-5xl mx-auto py-24 px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          What VCs Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: 'VC Name 1',
              comment: "This is a brutally good idea. Nobody else is doing it this raw. I'm in.",
              logo: 'https://via.placeholder.com/80x40?text=Logo+1',
            },
            {
              name: 'VC Name 2',
              comment: 'Finally, someone who tells it like it is. This is exactly what founders need.',
              logo: 'https://via.placeholder.com/80x40?text=Logo+2',
            },
            {
              name: 'VC Name 3',
              comment: "The feedback is harsh but fair. It's what makes this platform unique.",
              logo: 'https://via.placeholder.com/80x40?text=Logo+3',
            },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-white/5 rounded-2xl p-8 text-center shadow-xl card-hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.7 }}
            >
              <img src={t.logo} alt={t.name} className="mx-auto mb-4 h-10" />
              <div className="text-lg text-gray-300 mb-4">"{t.comment}"</div>
              <div className="text-sm text-gray-400 font-bold">{t.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Bar Section */}
      <section className="max-w-5xl mx-auto py-24 px-4">
        <TrustBar />
      </section>

      {/* Big Animated CTA Section */}
      <section className="py-24 flex flex-col items-center justify-center">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 gradient-text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Ready to Get Roasted?
        </motion.h2>
        <motion.button
          className="btn-gradient text-white text-2xl font-bold py-6 px-16 rounded-full shadow-xl hover:scale-105 transition-all"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/feedback')}
        >
          Upload Your Deck &rarr;
        </motion.button>
      </section>
    </main>
  );
} 