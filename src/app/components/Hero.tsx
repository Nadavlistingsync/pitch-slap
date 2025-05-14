import { FC } from 'react';
import UploadCard from './UploadCard';
import TrustBar from './TrustBar';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Hero: FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-64 bg-ego-gradient blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[80vw] h-[80vh] bg-gradient-to-tl from-[#ff4154]/20 to-transparent blur-3xl opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-7xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white" style={{fontFamily: 'Inter, sans-serif'}}>
            Get Roasted.<br />Get Funded.
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
            Upload your pitch deck and get brutally honest feedback from real VCs. No sugar coating, just straight talk to help you raise your next round.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            className="group bg-[#ff4154] hover:bg-[#ff6b6b] text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 mb-12 relative overflow-hidden"
            onClick={() => router.push('/select')}
          >
            <span className="relative z-10 flex items-center gap-2">
              Upload Your Deck
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff4154] to-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TrustBar />
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-[#ff4154]/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#a78bfa]/10 rounded-full blur-2xl animate-float-delayed" />
    </div>
  );
};

export default Hero; 